
"use client";

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send, Loader2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/assistant',
    } as any) as any;
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4"
                    >
                        <Card className="w-[350px] sm:w-[380px] h-[500px] shadow-2xl flex flex-col border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
                            {/* Header */}
                            <div className="p-4 bg-blue-600 text-white flex justify-between items-center shrink-0">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    <span className="font-bold">CareerPilot Assistant</span>
                                </div>
                                <div className="flex gap-1">
                                    {/* Close Button */}
                                    <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-blue-700 rounded transition-colors">
                                        <Minimize2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
                                {messages.length === 0 && (
                                    <div className="text-center text-slate-500 text-sm mt-8 px-4">
                                        <p>👋 Kushe! I can help you with CV tips, career advice, or guidance in Sierra Leone.</p>
                                        <p className="mt-2 text-xs opacity-70">Ask me anything!</p>
                                    </div>
                                )}
                                {messages.map((m: any) => (
                                    <div
                                        key={m.id}
                                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${m.role === 'user'
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-100 dark:border-slate-700'
                                                }`}
                                        >
                                            {m.content}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white dark:bg-slate-800 rounded-2xl px-4 py-2 rounded-bl-none border border-slate-100 dark:border-slate-700">
                                            <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex gap-2 shrink-0">
                                <input
                                    className="flex-1 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 border-transparent focus:bg-white dark:focus:bg-slate-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm transition-all"
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Type your message..."
                                    autoFocus
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="rounded-full w-10 h-10 shrink-0"
                                    disabled={!input.trim() || isLoading}
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-colors focus:outline-none focus:ring-4 focus:ring-blue-500/30 ${isOpen ? 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300' : 'bg-blue-600 text-white'
                    }`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
            </motion.button>
        </div>
    );
}
