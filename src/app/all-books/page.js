"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AllBooksPage() {
  // Generate 30 demo books
  const books = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `書本封面 ${i + 1}`,
    author: `作者 ${String.fromCharCode(65 + (i % 26))}`,
    preview: "這是一個示例預覽文本，描述了這本書的內容梗概...",
    subscribed: Math.random() > 0.5,
  }));

  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      {/* Navigation Bar */}
      <div className="bg-yellow-400 p-4 flex items-center gap-4 sticky top-0 z-10 shadow-md">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-800 hover:text-gray-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          返回
        </Link>
        <div className="flex gap-2">
          <button className="px-4 py-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
            小說
          </button>
          <button className="px-4 py-1 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors">
            科幻
          </button>
          <button className="px-4 py-1 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors">
            教育
          </button>
          <button className="px-4 py-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors">
            其他類別
          </button>
        </div>
      </div>

      {/* Books Grid */}
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="p-4 flex flex-col h-full">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                  <span className="text-sm text-gray-500">#{book.id}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">作者：{book.author}</p>
                <p className="text-sm text-gray-600 flex-grow">{book.preview}</p>
                <Link
                  href={`/book/${book.id}`}
                  className={`mt-4 w-full py-2 rounded-md transition-colors bg-purple-600 text-white hover:bg-purple-700`}
                >
                  閱讀此書
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
