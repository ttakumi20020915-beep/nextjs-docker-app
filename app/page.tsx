'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error('Error:', error);
      setAnswer('エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 space-y-6">
      
      {/* タイトル */}
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Difyチャット
      </h1>

      {/* チャット表示エリア */}
      <div className="min-h-[120px] bg-gray-50 rounded-lg p-4 border border-gray-200">
        {answer ? (
          <p className="text-gray-800 whitespace-pre-wrap">
            {answer}
          </p>
        ) : (
          <p className="text-gray-400">
            ここに回答が表示されます
          </p>
        )}
      </div>

      {/* 入力フォーム */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="メッセージを入力..."
          disabled={isLoading}
          className="
            flex-1
            px-4 py-2
            border border-gray-300
            rounded-lg
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            disabled:bg-gray-100
          "
        />

        <button
          type="submit"
          disabled={isLoading}
          className="
            px-5 py-2
            rounded-lg
            font-medium
            text-white
            bg-blue-500
            hover:bg-blue-600
            transition
            disabled:bg-blue-300
            disabled:cursor-not-allowed
          "
        >
          {isLoading ? '送信中...' : '送信'}
        </button>
      </form>

    </div>
  </div>
  );
}