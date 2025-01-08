"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, User2, X, ChevronRight, BookOpen } from "lucide-react";

export default function DashboardPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const totalSlides = 3;

  const hotBooks = [
    { title: "人工智能革命", author: "李明", color: "bg-cyan-300" },
    { title: "數據科學入門", author: "張華", color: "bg-purple-300" },
    { title: "區塊鏈技術", author: "王強", color: "bg-yellow-300" },
  ];

  const recommendedBooks = [
    { title: "未來簡史", author: "尤瓦爾·赫拉利", color: "bg-orange-200" },
    { title: "思考，快與慢", author: "丹尼爾·卡尼曼", color: "bg-green-200" },
    { title: "原子習慣", author: "詹姆斯·克利爾", color: "bg-pink-200" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 relative pb-16">
      {/* Top Navigation */}
      <div className="bg-blue-200 p-4 rounded-b-[30px]">
        {/* All Books Button */}
        <Link
          href="/all-books"
          className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-gray-700 hover:text-gray-900"
        >
          <BookOpen className="w-5 h-5" />
          <span>所有書籍</span>
        </Link>

        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white rounded-full p-2 px-4 flex-1">
            <Menu className="w-6 h-6 text-gray-500" />
            <input type="search" placeholder="搜尋專案" className="flex-1 bg-transparent outline-none" />
            <Search className="w-6 h-6 text-gray-500" />
          </div>
          <button
            onClick={() => setIsPanelOpen(true)}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:shadow-md transition-all duration-300"
          >
            <User2 className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="mt-4 bg-gray-200 rounded-lg p-8 mx-4">
          <h2 className="text-2xl font-semibold mb-4">Lam 的自傳</h2>
          <p className="text-gray-600">這裡是 Lam 的個人簡介和故事...</p>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">最後更新: 2024-01-09</div>
            <button className="text-blue-600 text-sm flex items-center hover:underline transition-all duration-300">
              查看更多
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-1 mt-4">
          {[...Array(totalSlides)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full ${currentSlide === i ? "bg-blue-600" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="p-4 space-y-6">
        {/* Hot Section */}
        <div>
          <h2 className="text-base font-medium mb-3">熱門</h2>
          <div className="grid grid-cols-3 gap-3">
            {hotBooks.map((book, i) => (
              <div
                key={i}
                className={`aspect-square ${book.color} rounded-lg p-3 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer`}
              >
                <div className="text-sm font-medium text-gray-800">{book.title}</div>
                <div className="text-xs text-gray-600">{book.author}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-1 mt-3">
            {[...Array(3)].map((_, i) => (
              <button key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            ))}
          </div>
        </div>

        {/* Recommended Books Section */}
        <div>
          <h2 className="text-base font-medium mb-3">推薦書籍</h2>
          <div className="grid grid-cols-3 gap-3">
            {recommendedBooks.map((book, i) => (
              <div
                key={i}
                className={`aspect-[3/4] ${book.color} rounded-lg p-3 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer`}
              >
                <div className="text-sm font-medium text-gray-800">{book.title}</div>
                <div className="text-xs text-gray-600">{book.author}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-1 mt-3">
            {[...Array(3)].map((_, i) => (
              <button key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            ))}
          </div>
        </div>
      </div>

      {/* User Info Panel */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity ${
          isPanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsPanelOpen(false)}
      />
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform ${
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">讀者資料</h2>
            <button
              onClick={() => setIsPanelOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-500">帳戶ID</label>
              <div className="p-2 bg-gray-100 rounded">demo123</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500">會員等級</label>
              <div className="p-2 bg-gray-100 rounded">收費會員</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500">收費詳情</label>
              <div className="p-2 bg-gray-100 rounded h-20"></div>
            </div>

            <button
              onClick={() => setIsPanelOpen(false)}
              className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
            >
              返回
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
