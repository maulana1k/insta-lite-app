import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react';
import { Palette } from '@solar-icons/react';
import { Slider } from '@/components/ui/slider';
import { useCreatePostStore } from '../store/create-post-store';
import { EDIT_TOOLS } from '../constants';
import { useImageStyle } from '../hooks/use-image-style';

export function EditStep() {
  const {
    previewUrl,
    croppedImage,
    aspectRatio,
    currentFilter,
    adjustments,
    activeTab,
    activeTool,
    setMediaStep,
    setAdjustments,
    setAdjustment,
    setActiveTool,
  } = useCreatePostStore();

  const imageStyle = useImageStyle();

  const imageSrc = croppedImage || previewUrl;

  return (
    <motion.div
      key="edit"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center justify-center px-8"

    >
      {/* Navigation Arrows - Fixed Side Buttons */}
      <div className="fixed top-8 ">
        <Palette size={26} />
      </div>
      <button
        onClick={() => setMediaStep('crop')}
        className="fixed left-10 top-1/2 -translate-y-1/2 p-4 hover:bg-gray-100 text-gray-800 rounded-full "
      >
        <ChevronLeft className="size-8 stroke-2" />
      </button>

      <button
        onClick={() => setMediaStep('caption')}
        className="fixed right-10 top-1/2 -translate-y-1/2 p-4 hover:bg-gray-100 text-gray-800 rounded-full "
      >
        <ChevronRight className="size-8 stroke-2" />
      </button>

      {/* Image Area */}
      <div className="flex-1 relative flex items-end justify-end group">
        <div className={cn(
          "flex items-center justify-center p-2",
          aspectRatio === 'square' ? "aspect-square  max-h-[75dvh]" : "aspect-4/5 max-h-[75dvh]"
        )}>
          {imageSrc && (
            <img
              src={imageSrc}
              className={cn("w-full h-full object-cover", currentFilter.class)}
              style={imageStyle}
              alt="Preview"
            />
          )}
        </div>
      </div>

      {/* Controls Area */}
      <div className="">

        {/* Tools/Filters Row */}
        <div className=" pb-4">
          {activeTab === 'edit' && !activeTool && (
            <div className="flex items-center gap-8 pt-2 overflow-x-auto px-8 scrollbar-hide">
              {EDIT_TOOLS.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => tool.min !== undefined ? setActiveTool(tool.id) : null}
                  className="flex flex-col items-center gap-3 flex-shrink-0 group"
                >
                  <div className="w-16 h-16 rounded-full border border-gray-300 bg-white flex items-center justify-center group-hover:border-gray-400 group-hover:scale-105 transition-all">
                    <tool.icon className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                  </div>
                  <span className="text-[11px] font-medium text-gray-600 uppercase tracking-wide">
                    {tool.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'edit' && activeTool && (
            <div className="px-8 pt-3 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-6 gap-10">
                <button
                  onClick={() => setActiveTool(null)}
                  className="text-sm "
                >
                  <X />
                </button>
                <span className="text-sm font-semibold uppercase tracking-widest">
                  {EDIT_TOOLS.find(t => t.id === activeTool)?.label}
                </span>
                <button
                  onClick={() => setActiveTool(null)}
                  className="text-sm text-blue-500"
                >
                  <Check />
                </button>
              </div>
              <Slider
                value={[adjustments[activeTool as keyof typeof adjustments] || 100]}
                min={EDIT_TOOLS.find(t => t.id === activeTool)?.min ?? 0}
                max={EDIT_TOOLS.find(t => t.id === activeTool)?.max ?? 200}
                step={1}
                onValueChange={([v]: number[]) => {
                    if (activeTool) setAdjustment(activeTool, v)
                }}
                className="mb-2"
              />
              <div className="text-center">
                <span className="text-xs text-gray-500 font-mono">{adjustments[activeTool as keyof typeof adjustments]}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
