"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, User2, X, ChevronRight, BookOpen } from "lucide-react";

export default function DashboardPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const totalSlides = 3;

  const hotBooks = [
    {
      id: 1,
      title: "水滸傳",
      author: "金庸",
      preview: "《水滸傳》，是以官話白話文寫成的章回小說，列為中國古典四大文學名著之一，六才子書之一...",
      cover: "https://cdn.readmoo.com/cover/8d/6c98l67_460x580.jpg",
    },
    {
      id: 2,
      title: "傲慢與偏見",
      author: "珍·奧斯汀",
      preview: "這部經典小說探討了愛情、婚姻、道德、教育等主題...",
      cover: "https://s.eslite.com/upload/product/o/2680416845006/ec327725.jpg",
    },
    {
      id: 3,
      title: "簡愛",
      author: "夏洛蒂·勃朗特",
      preview: "一個孤兒女子追求愛情與獨立的動人故事...",
      cover: "https://imageproxy.pixnet.cc/imgproxy?url=https://pic.pimg.tw/heero/bf520dcbda8e9b34c03e4da9692a36f1.jpg",
    },
    {
      id: 4,
      title: "如有雷同實屬不幸",
      author: "藍橘子",
      preview: "一個心理諮詢師，一隻導盲犬，一對自以為天生一對的情侶…",
      cover: "https://cdn.readmoo.com/share/cover/hb/bhlloed_460x580.jpg?t=1657770939",
    },
  ];

  const recommendedBooks = [
    {
      id: 5,
      title: "記憶管理局",
      author: "冒業",
      preview: "零犯罪率都市陷入空前危機尖端科技 vs. 原始情感的激烈衝突自此，「記憶管理局」就是敵人！",
      cover: "https://cdn.readmoo.com/cover/a8/9fcci54_460x580.jpg?v=1735262983",
    },
    {
      id: 6,
      title: "變形記",
      author: "法蘭茨·卡夫卡",
      preview: "一個人變成巨大昆蟲後的超現實故事...",
      cover: "https://www.hkreadingcity.net/sites/default/redirect/getCover.php?file=12170_cover.jpg",
    },
    {
      id: 7,
      title: "羅密歐與朱麗葉",
      author: "威廉·莎士比亞",
      preview: "一個關於愛情與命運的永恆悲劇...",
      cover: "https://upload.wikimedia.org/wikipedia/zh/b/b4/William_shakespeares_romeo_and_juliet_movie_poster.jpg",
    },
    {
      id: 8,
      title: "戰爭與和平",
      author: "列夫·托爾斯泰",
      preview: "這部史詩般的作品描繪了拿破崙戰爭期間的俄羅斯社會...",
      cover: "https://i1.momoshop.com.tw/1692982928/goodsimg/0008/543/247/8543247_O_m.webp",
    },
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

        <Link
          href="/"
          className="absolute top-4 right-4 text-gray-600 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full hover:text-gray-800 transition-all duration-300"
        >
          Logout
        </Link>

        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white rounded-full p-2 px-4 flex-1">
            <Menu className="w-6 h-6 text-gray-500" />
            <input type="search" placeholder="搜尋書本..." className="flex-1 bg-transparent outline-none" />
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
          <h2 className="font-semibold mb-3 text-3xl text-center">熱門</h2>
          <div className="grid grid-cols-4 gap-3">
            {hotBooks.map((book) => (
              <Link href={`/book/${book.id}`} key={book.id}>
                <div className="relative group aspect-[3/4] rounded-lg overflow-hidden cursor-pointer">
                  <Image src={book.cover} alt={book.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col">
                    <h3 className="text-white font-semibold mb-2">{book.title}</h3>
                    <p className="text-gray-300 text-sm mb-2">{book.author}</p>
                    <p className="text-gray-400 text-xs line-clamp-3">{book.preview}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center gap-1 mt-3">
            {[...Array(4)].map((_, i) => (
              <button key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            ))}
          </div>
        </div>

        {/* Recommended Books Section */}
        <div>
          <h2 className="font-semibold mb-3 text-3xl text-center">推薦書籍</h2>
          <div className="grid grid-cols-4 gap-3">
            {recommendedBooks.map((book) => (
              <Link href={`/book/${book.id}`} key={book.id}>
                <div className="relative group aspect-[3/4] rounded-lg overflow-hidden cursor-pointer">
                  <Image src={book.cover} alt={book.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col">
                    <h3 className="text-white font-semibold mb-2">{book.title}</h3>
                    <p className="text-gray-300 text-sm mb-2">{book.author}</p>
                    <p className="text-gray-400 text-xs line-clamp-3">{book.preview}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center gap-1 mt-3">
            {[...Array(4)].map((_, i) => (
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
