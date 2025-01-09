"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, MessageSquare, Headphones } from "lucide-react";
import { ChapterSelection } from "./ChapterSelection";

export default function BookPage() {
  const router = useRouter();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Alice",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "這本書真的很棒！推薦大家閱讀。",
      timestamp: "2024-01-09 14:30",
    },
    {
      id: 2,
      user: "Bob",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "內容非常精彩，值得一讀。",
      timestamp: "2024-01-09 15:45",
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [isPremiumUser, setIsPremiumUser] = useState(false); // This would typically come from your auth system

  const chapters = [
    { number: 1, title: "開始的旅程", isPremium: false },
    { number: 2, title: "意外的相遇", isPremium: false },
    { number: 3, title: "隱藏的秘密", isPremium: true },
    { number: 4, title: "真相大白", isPremium: true },
    { number: 5, title: "最後的決定", isPremium: true },
  ];

  useEffect(() => {
    // In a real app, you would fetch the book data from an API
    const allBooks = [
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
        cover:
          "https://imageproxy.pixnet.cc/imgproxy?url=https://pic.pimg.tw/heero/bf520dcbda8e9b34c03e4da9692a36f1.jpg",
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

    const foundBook = allBooks.find((b) => b.id === Number(id));
    setBook(foundBook || null);
  }, [id]);

  const addComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: "User",
        avatar: "/placeholder.svg?height=32&width=32",
        content: newComment,
        timestamp: new Date().toLocaleString(),
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const handleChapterSelect = (chapterNumber) => {
    if (chapters[chapterNumber - 1].isPremium && !isPremiumUser) {
      alert("此章節需要高級會員才能訪問。請升級您的帳戶。");
    } else {
      setSelectedChapter(chapterNumber);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto h-full">
        <Link href="/all-books" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回
        </Link>

        {book && (
          <div className="p-4 bg-gray-50 border-b">
            <div className="md:flex">
              <div className="md:flex-shrink-0 h-72">
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={300}
                  height={400}
                  className="h-48 w-full object-cover md:h-full md:w-48"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{book.title}</h2>
                    <p className="mt-2 text-gray-500">{book.author}</p>
                  </div>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full ${isFavorite ? "text-red-500" : "text-gray-400"}`}
                  >
                    <Heart className="w-6 h-6" fill={isFavorite ? "currentColor" : "none"} />
                  </button>
                </div>
                <p className="mt-4 text-gray-600">{book.preview}</p>
                <div className="mt-6 space-y-4">
                  <ChapterSelection
                    chapters={chapters}
                    selectedChapter={selectedChapter}
                    onSelectChapter={handleChapterSelect}
                    isPremiumUser={isPremiumUser}
                  />
                  <div className="flex justify-center text-center">
                    <Link
                      href={`/voice-book/${id}`}
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                    >
                      閱讀此章節
                    </Link>
                  </div>
                  {!isPremiumUser && (
                    <button
                      onClick={() => setIsPremiumUser(true)}
                      className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-200"
                    >
                      升級為高級會員
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            評論
          </h3>

          {/* Add Comment */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="寫下你的評論..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addComment}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              發送
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                  <img src={comment.avatar} alt={comment.user} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{comment.user}</span>
                    <span className="text-sm text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
