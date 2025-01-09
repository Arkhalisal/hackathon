import { useState } from "react";
import { ChevronDown, Lock } from "lucide-react";

export function ChapterSelection({ chapters, selectedChapter, onSelectChapter, isPremiumUser }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        第 {selectedChapter} 章 {chapters.find((chapter) => chapter.number === selectedChapter).title}
        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2" />
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {chapters.map((chapter) => (
            <li
              key={chapter.number}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                chapter.isPremium && !isPremiumUser ? "opacity-50" : ""
              }`}
              onClick={() => {
                if (!chapter.isPremium || isPremiumUser) {
                  onSelectChapter(chapter.number);
                  setIsOpen(false);
                }
              }}
            >
              第 {chapter.number} 章: {chapter.title}
              {chapter.isPremium && !isPremiumUser && <Lock className="inline-block ml-2 w-4 h-4 text-gray-500" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
