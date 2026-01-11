import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { useCreatePostStore } from '../store/create-post-store';
import { useImageStyle } from '../hooks/use-image-style';

export function CaptionStep() {
  const router = useRouter();
  const {
      previewUrl,
      croppedImage,
      aspectRatio,
      currentFilter,
      caption,
      adjustments,
      selectedFile,
      setMediaStep,
      setCaption
  } = useCreatePostStore();
  
  const imageStyle = useImageStyle();

  const handlePost = () => {
    console.log('Posting...', { caption, file: selectedFile, adjustments });
    router.push('/');
  };

  const imageSrc = croppedImage || previewUrl;

  return (
    <motion.div
      key="caption"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex items-center justify-center p-8"
    >
      {/* Navigation Arrows - Fixed Side Button */}
      <button
        onClick={() => setMediaStep('edit')}
        className="fixed left-10 top-1/2 -translate-y-1/2 p-4 bg-white hover:bg-gray-50 text-gray-800 rounded-full  transition-all z-50 "
      >
        <ChevronLeft className="w-6 h-6 stroke-2" />
      </button>

      <div className="w-full max-w-5xl h-[600px] bg-white flex overflow-hidden ">
        {/* Image Preview */}
        <div className={cn(
          "bg-black flex items-center justify-center",
          aspectRatio === 'square' ? "w-[60%]" : "w-[48%]"
        )}>
          {imageSrc && (
            <img
              src={imageSrc}
              className={cn(
                "object-cover",
                aspectRatio === 'square' ? "w-full aspect-square" : "w-full aspect-[4/5]",
                currentFilter.class
              )}
              style={imageStyle}
              alt="Post preview"
            />
          )}
        </div>

        {/* Caption Area */}
        <div className={cn(
          "flex flex-col",
          aspectRatio === 'square' ? "w-[40%]" : "w-[52%]"
        )}>
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
              <span className="font-semibold text-sm">shadcn</span>
            </div>
            <Button
              onClick={handlePost}
              className="bg-blue-500 hover:bg-blue-600 text-white text-base font-semibold px-4 py-1.5 rounded-lg"
            >
              Post
            </Button>
          </div>

          <Textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="flex-1 border-none resize-none p-4 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          <div className="mt-auto border-t border-gray-200">
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-sm">Add location</span>
              <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
            </button>
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors border-t border-gray-200">
              <span className="text-sm">Accessibility</span>
              <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
            </button>
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors border-t border-gray-200">
              <span className="text-sm">Advanced settings</span>
              <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
