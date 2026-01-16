// client/RealtimeChat.jsx
// React component demo for streaming chat using socket.io-client
// Requires: npm install socket.io-client

import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3000';
const socket = io(SOCKET_URL, { autoConnect: true });

export default function RealtimeChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const convRef = useRef(null);

  useEffect(() => {
    socket.on('connect', () => console.log('Socket connected', socket.id));

    socket.on('message_ack', (ack) => {
      // optional: show processing state
    });

    socket.on('response_token', ({ conversationId, token }) => {
      setMessages((prev) => prev.map((m) => (m.id === conversationId ? { ...m, text: m.text + token } : m)));
    });

    socket.on('response_done', ({ conversationId, text, sources }) => {
      setMessages((prev) => prev.map((m) => (m.id === conversationId ? { ...m, text, streaming: false, sources } : m)));
      convRef.current = null;
    });

    socket.on('response_error', ({ conversationId, message }) => {
      setMessages((prev) => prev.map((m) => (m.id === conversationId ? { ...m, text: (m.text || '') + `\n\n[Error] ${message}`, streaming: false } : m)));
    });

    return () => {
      socket.off('connect');
      socket.off('message_ack');
      socket.off('response_token');
      socket.off('response_done');
      socket.off('response_error');
    };
  }, []);

  function sendMessage() {
    if (!input.trim()) return;
    const id = `conv-${Date.now()}`;
    setMessages((m) => [...m, { id: id + '-user', role: 'user', text: input }, { id, role: 'assistant', text: '', streaming: true }]);
    convRef.current = id;

    socket.emit('user_message', { conversationId: id, text: input, options: {} });
    setInput('');
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ border: '1px solid #ccc', padding: 12, minHeight: 300 }}>
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: '#666' }}>{m.role}</div>
            <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}{m.streaming && <span>▌</span>}</div>
            {m.sources && <div style={{ fontSize: 12, color: '#333' }}>Sources: {m.sources.join(', ')}</div>}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <input style={{ flex: 1 }} value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
