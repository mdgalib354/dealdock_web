import React, { useState } from 'react';
import { Story } from '../../types';
import { Plus, X } from 'lucide-react';

interface StoriesSectionProps {
  stories: Story[];
  onStoryView: (storyId: string) => void;
}

interface StoryModalProps {
  story: Story;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ story, onClose, onNext, onPrevious }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative max-w-md w-full h-full max-h-screen bg-black">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Story content */}
        <div className="relative h-full flex flex-col">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 z-10 p-4">
            <div className="w-full h-1 bg-white bg-opacity-30 rounded-full">
              <div className="h-full bg-white rounded-full w-full"></div>
            </div>
          </div>

          {/* Business info */}
          <div className="absolute top-8 left-4 right-16 z-10 flex items-center space-x-3">
            <img
              src={story.businessAvatar}
              alt={story.businessName}
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
            <div>
              <p className="text-white font-semibold text-sm">{story.businessName}</p>
              <p className="text-white text-opacity-80 text-xs">2h ago</p>
            </div>
          </div>

          {/* Story image */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Story title */}
          <div className="absolute bottom-20 left-4 right-4">
            <h3 className="text-white text-xl font-bold text-center">{story.title}</h3>
          </div>

          {/* Navigation areas */}
          <div className="absolute inset-0 flex">
            <div 
              className="flex-1 cursor-pointer"
              onClick={onPrevious}
            />
            <div 
              className="flex-1 cursor-pointer"
              onClick={onNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StoriesSection: React.FC<StoriesSectionProps> = ({ stories, onStoryView }) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);

  const handleStoryClick = (index: number) => {
    setSelectedStoryIndex(index);
    onStoryView(stories[index].id);
  };

  const handleNext = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex < stories.length - 1) {
      const nextIndex = selectedStoryIndex + 1;
      setSelectedStoryIndex(nextIndex);
      onStoryView(stories[nextIndex].id);
    } else {
      setSelectedStoryIndex(null);
    }
  };

  const handlePrevious = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex > 0) {
      const prevIndex = selectedStoryIndex - 1;
      setSelectedStoryIndex(prevIndex);
      onStoryView(stories[prevIndex].id);
    }
  };

  const handleClose = () => {
    setSelectedStoryIndex(null);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {/* Add Story Button */}
          <div className="flex-shrink-0 flex flex-col items-center space-y-2 cursor-pointer group">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 group-hover:border-blue-500 group-hover:bg-blue-50 transition-colors">
              <Plus className="h-6 w-6 text-gray-400 group-hover:text-blue-500" />
            </div>
            <span className="text-xs text-gray-600 text-center">Add Story</span>
          </div>

          {/* Stories */}
          {stories.map((story, index) => (
            <div
              key={story.id}
              className="flex-shrink-0 flex flex-col items-center space-y-2 cursor-pointer group"
              onClick={() => handleStoryClick(index)}
            >
              <div className={`w-16 h-16 rounded-full p-0.5 ${
                story.viewed 
                  ? 'bg-gray-300' 
                  : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500'
              }`}>
                <img
                  src={story.businessAvatar}
                  alt={story.businessName}
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>
              <span className="text-xs text-gray-600 text-center max-w-16 truncate">
                {story.businessName}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Story Modal */}
      {selectedStoryIndex !== null && (
        <StoryModal
          story={stories[selectedStoryIndex]}
          onClose={handleClose}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </>
  );
};

export default StoriesSection;