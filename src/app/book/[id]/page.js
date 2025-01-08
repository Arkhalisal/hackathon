"use client";

import { useState, useRef } from "react";
import { ArrowLeft, SkipBack, Play, Pause, SkipForward, Heart, MessageSquare, X } from "lucide-react";
import Link from "next/link";

export default function BookPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(599); // 9:59 in seconds
  const [isFavorite, setIsFavorite] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showComments, setShowComments] = useState(false);
  const audioRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
      } else {
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const demoComments = [
    { id: 1, user: "User123", text: "很棒的一章！", time: "2024-01-09" },
    { id: 2, user: "Reader456", text: "期待下一章", time: "2024-01-09" },
    { id: 3, user: "Bookworm", text: "內容很有意思", time: "2024-01-09" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5e6] relative">
      {/* Hidden audio element */}
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)}>
        <source src="/demo-audio.mp3" type="audio/mpeg" />
      </audio>

      {/* Header */}
      <div className="p-6 space-y-6">
        <Link
          href="/all-books"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回
        </Link>

        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-gray-900">Lam 的自傳</h1>
          <div className="text-gray-600">書本封面</div>
          <div className="text-gray-600">作者：管德林</div>
          <div className="text-gray-600 border-t border-gray-300 pt-3">現正播放：章節 1</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="relative h-1.5 bg-gray-200 rounded-full">
          <div
            className="absolute h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 space-y-6">
        <div className="flex justify-center items-center gap-12">
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            <SkipBack className="w-8 h-8" />
          </button>
          <button
            className="w-16 h-16 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </button>
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            <SkipForward className="w-8 h-8" />
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-gray-600">播放速度</span>
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              className="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1.0x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2.0x</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowComments(true)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <MessageSquare className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 transition-colors ${isFavorite ? "text-red-500" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Heart className="w-6 h-6" fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>

      {/* Comments Panel */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          showComments ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowComments(false)}
      />
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg transform transition-transform duration-300 ${
          showComments ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">評論</h2>
            <button
              onClick={() => setShowComments(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            {demoComments.map((comment) => (
              <div key={comment.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-gray-900">{comment.user}</span>
                  <span className="text-sm text-gray-500">{comment.time}</span>
                </div>
                <p className="text-gray-600">{comment.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <textarea
              placeholder="添加評論..."
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
            <button className="mt-2 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              發送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
