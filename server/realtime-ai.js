// server/realtime-ai.js
// Minimal Socket.IO server that streams OpenAI tokens to clients.
// Requires: node >= 16, npm i express socket.io node-fetch@2 eventsource-parser dotenv

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fetch = require('node-fetch');
const { createParser } = require('eventsource-parser');
require('dotenv').config();

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const PORT = process.env.SOCKET_PORT || 3000;
const MODEL = process.env.OPENAI_STREAMING_MODEL || 'gpt-4o-mini';

if (!OPENAI_KEY) {
  console.error('Missing OPENAI_API_KEY in env');
  process.exit(1);
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }, // tighten in production
});

app.get('/', (req, res) => res.send('Realtime AI server running'));

// Build a prompt that enforces no-guess policy and asks to cite sources
function buildPromptWithDocs(userText, docs = []) {
  const docsText = docs
    .map((d, i) => `Document ${i + 1}:\n${d.text}\nSource: ${d.source}`)
    .join('\n\n');
  return `You are an assistant answering ONLY from the provided documents. If the documents do not contain enough information, say "I don't know" and explain how to obtain the answer. Do not make up facts.\n\nContext documents:\n${docsText}\n\nUser question:\n${userText}\n\nAnswer concisely and cite the document sources (e.g., [Document 1]) where you used them.`;
}

async function streamOpenAIChat({ messages, onToken }) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: MODEL, messages, stream: true }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${text}`);
  }

  const parser = createParser((event) => {
    if (event.type === 'event') {
      const data = event.data;
      if (data === '[DONE]') {
        onToken(null, { done: true });
        return;
      }
      try {
        const parsed = JSON.parse(data);
        const delta = parsed.choices?.[0]?.delta?.content || '';
        if (delta) onToken(delta, { done: false });
      } catch (err) {
        // ignore parse errors
      }
    }
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    parser.feed(decoder.decode(value, { stream: true }));
  }
}

// Placeholder: implement your vector search / retrieval here and return docs array
async function retrieveDocsForQuery(query, options = {}) {
  // Example return shape: [{ text: '...', source: 'doc-id-or-url', score: 0.95 }, ...]
  // Replace this with your existing embeddings + vector DB retrieval.
  return options.inlineDocs || [];
}

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('user_message', async (payload) => {
    const { conversationId, text, options } = payload;

    // 1) Retrieve grounding documents (RAG)
    let docs = [];
    try {
      docs = await retrieveDocsForQuery(text, options || {});
    } catch (err) {
      console.warn('Retrieval failed, continuing without docs', err);
      docs = [];
    }

    // 2) Build system + user messages
    const system = {
      role: 'system',
      content:
        'You are a helpful assistant. Answer only with information contained in the provided documents. If not present, say "I\'t know". Cite used documents.',
    };

    const userPrompt = buildPromptWithDocs(text, docs);
    const messages = [system, { role: 'user', content: userPrompt }];

    socket.emit('message_ack', { conversationId, status: 'processing' });

    // 3) Stream tokens to client
    let finalText = '';
    try {
      await streamOpenAIChat({
        messages,
        onToken: (token, meta) => {
          if (meta && meta.done) {
            socket.emit('response_done', { conversationId, text: finalText, sources: docs.map((d) => d.source) });
            return;
          }
          finalText += token;
          socket.emit('response_token', { conversationId, token });
        },
      });
    } catch (err) {
      console.error('Streaming error:', err.message || err);
      socket.emit('response_error', { conversationId, message: err.message || String(err) });
    }
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

server.listen(PORT, () => console.log(`Realtime AI server listening on ${PORT}`));
