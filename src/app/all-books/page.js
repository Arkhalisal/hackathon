"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, X } from "lucide-react";
import { useState, useMemo } from "react";

export default function AllBooksPage() {
  const books = [
    {
      id: 1,
      title: "水滸傳",
      author: "金庸",
      preview: "《水滸傳》，是以官話白話文寫成的章回小說，列為中國古典四大文學名著之一，六才子書之一...",
      cover: "https://cdn.readmoo.com/cover/8d/6c98l67_460x580.jpg",
      tags: ["古典", "武俠", "中國文學"],
    },
    {
      id: 2,
      title: "傲慢與偏見",
      author: "珍·奧斯汀",
      preview: "這部經典小說探討了愛情、婚姻、道德、教育等主題...",
      cover: "https://s.eslite.com/upload/product/o/2680416845006/ec327725.jpg",
      tags: ["經典", "愛情", "社會"],
    },
    {
      id: 3,
      title: "簡愛",
      author: "夏洛蒂·勃朗特",
      preview: "一個孤兒女子追求愛情與獨立的動人故事...",
      cover: "https://imageproxy.pixnet.cc/imgproxy?url=https://pic.pimg.tw/heero/bf520dcbda8e9b34c03e4da9692a36f1.jpg",
      tags: ["經典", "愛情", "成長"],
    },
    {
      id: 4,
      title: "如有雷同實屬不幸",
      author: "藍橘子",
      preview: "一個心理諮詢師，一隻導盲犬，一對自以為天生一對的情侶…",
      cover: "https://cdn.readmoo.com/share/cover/hb/bhlloed_460x580.jpg?t=1657770939",
      tags: ["現代", "愛情", "心理"],
    },
    {
      id: 5,
      title: "記憶管理局",
      author: "冒業",
      preview: "零犯罪率都市陷入空前危機尖端科技 vs. 原始情感的激烈衝突自此，「記憶管理局」就是敵人！",
      cover: "https://cdn.readmoo.com/cover/a8/9fcci54_460x580.jpg?v=1735262983",
      tags: ["科幻", "懸疑", "犯罪"],
    },
    {
      id: 6,
      title: "變形記",
      author: "法蘭茨·卡夫卡",
      preview: "一個人變成巨大昆蟲後的超現實故事...",
      cover: "https://www.hkreadingcity.net/sites/default/redirect/getCover.php?file=12170_cover.jpg",
      tags: ["經典", "超現實", "哲學"],
    },
    {
      id: 7,
      title: "羅密歐與朱麗葉",
      author: "威廉·莎士比亞",
      preview: "一個關於愛情與命運的永恆悲劇...",
      cover: "https://upload.wikimedia.org/wikipedia/zh/b/b4/William_shakespeares_romeo_and_juliet_movie_poster.jpg",
      tags: ["經典", "愛情", "悲劇"],
    },
    {
      id: 8,
      title: "戰爭與和平",
      author: "列夫·托爾斯泰",
      preview: "這部史詩般的作品描繪了拿破崙戰爭期間的俄羅斯社會...",
      cover: "https://i1.momoshop.com.tw/1692982928/goodsimg/0008/543/247/8543247_O_m.webp",
      tags: ["經典", "歷史", "戰爭"],
    },
    {
      id: 9,
      title: "百年孤寂",
      author: "加布里埃爾·加西亞·馬爾克斯",
      preview: "一個家族七代人的魔幻現實主義故事...",
      cover: "https://cyberrevue.com/wp-content/uploads/2024/11/%E7%99%BE%E5%B9%B4%E5%AD%A4%E5%AF%82.jpg",
      tags: ["魔幻現實主義", "家族史", "拉丁美洲文學"],
    },
    {
      id: 10,
      title: "小王子",
      author: "安東尼·德·聖埃克蘇佩里",
      preview: "一個關於愛與友誼的童話故事...",
      cover:
        "https://nrapp-prd.oss-cn-hongkong.aliyuncs.com/prod/9789863186410/9789863186410_bc_01.jpg?x-oss-process=image/resize,w_500",
      tags: ["童話", "哲學", "成長"],
    },
    {
      id: 11,
      title: "追風箏的孩子",
      author: "卡勒德·胡賽尼",
      preview: "一個關於友誼、背叛與救贖的故事...",
      cover:
        "https://cdn.kobo.com/book-images/41bd9de6-17f7-498e-bea0-f7b405f19556/180/1000/False/fO1JdipJ7jCfLx6Nb3neaQ.jpg",
      tags: ["現代", "友誼", "救贖"],
    },
    {
      id: 12,
      title: "挪威的森林",
      author: "村上春樹",
      preview: "一個關於愛情、失去與成長的故事...",
      cover: "https://upload.wikimedia.org/wikipedia/zh/3/32/%E6%8C%AA%E5%A8%81%E7%9A%84%E6%A3%AE%E6%9E%97.jpg",
      tags: ["現代", "愛情", "成長"],
    },
    {
      id: 13,
      title: "1Q84",
      author: "村上春樹",
      preview: "一個關於平行世界與愛情的科幻小說...",
      cover: "https://cdn.kobo.com/book-images/16754515-6651-41cc-bf7e-f43c9f590ee9/1200/1200/False/1q84-12.jpg",
      tags: ["科幻", "愛情", "平行世界"],
    },
    {
      id: 14,
      title: "哈利波特與魔法石",
      author: "J.K.羅琳",
      preview: "一個關於魔法與友誼的故事...",
      cover: "https://upload.wikimedia.org/wikipedia/zh/3/3c/Hp1tw.jpg",
      tags: ["奇幻", "魔法", "冒險"],
    },
    {
      id: 15,
      title: "愛麗斯夢遊仙境",
      author: "路易斯·卡羅",
      preview: "故事的主角愛麗絲，從兔子洞掉進充滿擬人化動物的夢幻世界，遇到各種懂得說話的動物...",
      cover: "https://d3tvwjfge35btc.cloudfront.net/Assets/08/354/L_p0039335408.jpg",
      tags: ["奇幻", "童話", "冒險"],
    },
    {
      id: 16,
      title: "孤星淚",
      author: "維克多·雨果",
      preview:
        "故事的主線圍繞主角獲釋罪犯尚萬強試圖贖罪的歷程。小說試圖檢視他的贖罪行為在當時的社會環境下的所造成的影響...",
      cover: "https://www.parenting.com.tw/files/md5/4f/d3/4fd3bfb505047db685762d9116a369b7-87029.jpg",
      tags: ["經典", "社會", "救贖"],
    },
    {
      id: 17,
      title: "阿公講鬼II",
      author: "藍橘子",
      preview: "香港風水陣、住在學校鏡子裡的學生、專吃靈魂的鬼，延續地道港式鬼故風格！",
      cover: "https://cdn.readmoo.com/share/cover/61/c088g86_460x580.jpg?t=1538657935",
      tags: ["恐怖", "鬼故事", "港式"],
    },
    {
      id: 18,
      title: "夜谷賓館營業中",
      author: "藍橘子",
      preview: "一間永不客滿的賓館，一本神奇的帳冊，一位百年不死的劊子手，一樁又一樁的神奇買賣……",
      cover: "https://cdn.readmoo.com/cover/je/gckhrjq_460x580.jpg",
      tags: ["奇幻", "懸疑", "驚悚"],
    },
  ];

  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleBookmark = (bookId) => {
    setBookmarkedBooks((prev) => (prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]));
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const filteredBooks = useMemo(() => {
    if (selectedTags.length === 0) return books;
    return books.filter((book) => selectedTags.every((tag) => book.tags.includes(tag)));
  }, [books, selectedTags]);

  const allTags = useMemo(() => {
    const tags = new Set();
    books.forEach((book) => {
      book.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, [books]);

  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      {/* Navigation Bar */}
      <div className="bg-yellow-400 p-4 flex flex-wrap items-center gap-4 sticky top-0 z-10 shadow-md">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-800 hover:text-gray-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          返回
        </Link>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-1 rounded-full transition-colors ${
                selectedTags.includes(tag) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="bg-white p-2 flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
            >
              {tag}
              <button onClick={() => toggleTag(tag)} className="ml-1 focus:outline-none">
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Books Grid */}
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredBooks.map((book) => (
            <Link
              key={book.id}
              className="relative group aspect-[3/4] rounded-lg overflow-hidden cursor-pointer"
              href={`/book/${book.id}`}
            >
              <Image src={book.cover} alt={book.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col">
                <h3 className="text-white font-semibold mb-2">{book.title}</h3>
                <p className="text-gray-300 text-sm mb-2">{book.author}</p>
                <p className="text-gray-400 text-xs line-clamp-3">{book.preview}</p>
                <div className="mt-auto flex flex-wrap gap-1">
                  {book.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm truncate">
                {book.title}
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleBookmark(book.id);
                }}
                className="absolute top-2 right-2 text-yellow-500 hover:text-yellow-400 z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill={bookmarkedBooks.includes(book.id) ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
