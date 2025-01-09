"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { Heart, SkipBack, Play, Pause, SkipForward, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function VoiceBookPage() {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(36);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Alice",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "這本有聲書真的很棒！",
      timestamp: "2024-01-09 14:30",
    },
    {
      id: 2,
      user: "Bob",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "朗讀者的聲音很舒服",
      timestamp: "2024-01-09 15:45",
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [book, setBook] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const allBooks = [
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
        cover:
          "https://imageproxy.pixnet.cc/imgproxy?url=https://pic.pimg.tw/heero/bf520dcbda8e9b34c03e4da9692a36f1.jpg",
      },
      {
        id: 4,
        title: "如有雷同實屬不幸",
        author: "藍橘子",
        preview: "一個心理諮詢師，一隻導盲犬，一對自以為天生一對的情侶…",
        cover: "https://cdn.readmoo.com/share/cover/hb/bhlloed_460x580.jpg?t=1657770939",
      },
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
      {
        id: 9,
        title: "百年孤寂",
        author: "加布里埃爾·加西亞·馬爾克斯",
        preview: "一個家族七代人的魔幻現實主義故事...",
        cover: "https://cyberrevue.com/wp-content/uploads/2024/11/%E7%99%BE%E5%B9%B4%E5%AD%A4%E5%AF%82.jpg",
      },
      {
        id: 10,
        title: "小王子",
        author: "安東尼·德·聖埃克蘇佩里",
        preview: "一個關於愛與友誼的童話故事...",
        cover:
          "https://nrapp-prd.oss-cn-hongkong.aliyuncs.com/prod/9789863186410/9789863186410_bc_01.jpg?x-oss-process=image/resize,w_500",
      },
      {
        id: 11,
        title: "追風箏的孩子",
        author: "卡勒德·胡賽尼",
        preview: "一個關於友誼、背叛與救贖的故事...",
        cover:
          "https://cdn.kobo.com/book-images/41bd9de6-17f7-498e-bea0-f7b405f19556/180/1000/False/fO1JdipJ7jCfLx6Nb3neaQ.jpg",
      },
      {
        id: 12,
        title: "挪威的森林",
        author: "村上春樹",
        preview: "一個關於愛情、失去與成長的故事...",
        cover: "https://upload.wikimedia.org/wikipedia/zh/3/32/%E6%8C%AA%E5%A8%81%E7%9A%84%E6%A3%AE%E6%9E%97.jpg",
      },
      {
        id: 13,
        title: "1Q84",
        author: "村上春樹",
        preview: "一個關於平行世界與愛情的科幻小說...",
        cover: "https://cdn.kobo.com/book-images/16754515-6651-41cc-bf7e-f43c9f590ee9/1200/1200/False/1q84-12.jpg",
      },
      {
        id: 14,
        title: "哈利波特與魔法石",
        author: "J.K.羅琳",
        preview: "一個關於魔法與友誼的故事...",
        cover: "https://upload.wikimedia.org/wikipedia/zh/3/3c/Hp1tw.jpg",
      },
      {
        id: 15,
        title: "愛麗斯夢遊仙境",
        author: "路易斯·卡羅",
        preview: "故事的主角愛麗絲，從兔子洞掉進充滿擬人化動物的夢幻世界，遇到各種懂得說話的動物...",
        cover: "https://d3tvwjfge35btc.cloudfront.net/Assets/08/354/L_p0039335408.jpg",
      },
      {
        id: 16,
        title: "孤星淚",
        author: "維克多·雨果",
        preview:
          "故事的主線圍繞主角獲釋罪犯尚萬強試圖贖罪的歷程。小說試圖檢視他的贖罪行為在當時的社會環境下的所造成的影響...",
        cover: "https://www.parenting.com.tw/files/md5/4f/d3/4fd3bfb505047db685762d9116a369b7-87029.jpg",
      },
      {
        id: 17,
        title: "阿公講鬼II",
        author: "藍橘子",
        preview: "香港風水陣、住在學校鏡子裡的學生、專吃靈魂的鬼，延續地道港式鬼故風格！",
        cover: "https://cdn.readmoo.com/share/cover/61/c088g86_460x580.jpg?t=1538657935",
      },
      {
        id: 18,
        title: "夜谷賓館營業中",
        author: "藍橘子",
        preview: "一間永不客滿的賓館，一本神奇的帳冊，一位百年不死的劊子手，一樁又一樁的神奇買賣……",
        cover: "https://cdn.readmoo.com/cover/je/gckhrjq_460x580.jpg",
      },
    ];

    const foundBook = allBooks.find((b) => b.id === Number(id));
    setBook(foundBook || null);
  }, [id]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSliderChange = (e) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handlePlaybackRateChange = () => {
    const rates = [1, 1.5, 2, 0.5];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 5;
    }
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 5;
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Link href={`/book/${id}`} className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
        <ArrowLeft className="w-5 h-5 mr-2" />
        返回
      </Link>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Audio Player */}
        <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} src="/demo.mp3" />

        {/* Book Info */}
        {book && (
          <div className="p-4 bg-gray-50 border-b">
            <h1 className="text-xl font-semibold mb-1">{book.title}</h1>
            <h2 className="text-gray-600 mb-1">書本封面</h2>
            <p className="text-sm text-gray-500">作者：{book.author}</p>
          </div>
        )}

        {/* Chapter Info */}
        <div className="px-4 py-2 bg-gray-50 border-b">
          <p className="text-sm text-gray-600">現正播放：第1節</p>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-2">
          <input
            type="range"
            value={currentTime}
            min={0}
            max={duration || 100}
            step={1}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 flex items-center justify-between">
          <button
            onClick={handlePlaybackRateChange}
            className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 text-gray-600"
          >
            {playbackRate}x
          </button>

          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-800">
              <SkipBack className="w-6 h-6" onClick={handleBackward} />
            </button>
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <SkipForward className="w-6 h-6" onClick={handleForward} />
            </button>
          </div>

          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`text-gray-600 hover:text-red-500 ${isFavorite ? "text-red-500" : ""}`}
          >
            <Heart className="w-6 h-6" fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Comments Section */}
        <div className="border-t">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">評論</h3>

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
    </div>
  );
}
