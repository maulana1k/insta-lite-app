import {
  Camera,
  ClapperboardPlay,
  GalleryAdd,
  LinkMinimalistic2,
  Notes,
} from "@solar-icons/react";
import { motion } from "framer-motion";
import {
  AlignLeft,
  ChevronRight,
  FileText,
  Layers,
  MapPin,
  MoreHorizontal,
  Smile,
  X,
} from "lucide-react";
import { type ChangeEvent, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCreatePostStore } from "../store/create-post-store";

export function UploadStep() {
  const {
    setFile,
    setPreviewUrl,
    setMediaStep,
    postType,
    setPostType,
    textCaption,
    setTextCaption,
    textAttachments,
    addTextAttachment,
    removeTextAttachment,
  } = useCreatePostStore();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const el = textareaRef.current;
    if (!el) return;

    setTextCaption(e.target.value);
    autoResize(el);
  };

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    autoResize(el);
  }, [textCaption]);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setMediaStep("crop");
    }
  };

  return (
    <motion.div
      key="upload"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 relative flex items-center justify-center p-8 z-50"
    >
      <div className="fixed bottom-6 bg-muted/70 backdrop-blur-sm rounded-full px-1 w-fit flex items-center justify-center z-50">
        <button
          onClick={() => setPostType("media")}
          className={cn(
            "p-4 transition-opacity group hover:text-foreground",
            postType === "media" ? "text-foreground" : "text-muted-foreground",
          )}
          title="Visual Feed"
        >
          <Camera size={32} />
        </button>
        <button
          onClick={() => setPostType("text")}
          className={cn(
            "p-4 transition-opacity group hover:text-foreground",
            postType === "text" ? "text-foreground" : "text-muted-foreground",
          )}
          title="Text Feed"
        >
          <Notes size={32} />
        </button>
        <button
          className={cn("p-4 transition-opacity opacity-30 hover:opacity-100")}
          title="Video Feed"
        >
          <ClapperboardPlay size={32} />
        </button>
      </div>
      <div className="w-full  max-w-2xl">
        {postType === "media" ? (
          <div className="relative aspect-video border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer group">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              accept="image/*"
              onChange={handleFileSelect}
            />
            <div className="w-20 h-20 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform">
              <GalleryAdd className="w-10 h-10 text-gray-600" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-base mb-1">
                Drag photos or videos here
              </h3>
              <p className="text-sm text-gray-500">
                or click to select from your computer
              </p>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6">
              Select from computer
            </Button>
          </div>
        ) : (
          <div className="bg-white min-h-[500px] z-30 flex flex-col font-sans relative overflow-hidden">
            {/* Header - Mimicking the reference */}
            {/* <div className="flex items-center justify-between px-2 pb-4 border-b border-gray-100">
                <button 
                  onClick={() => setPostType('media')}
                  className="text-base text-black"
                >
                  Cancel
                </button>
                <span className="font-bold text-base">New thread</span>
                <div className="flex items-center gap-4">
                     <Layers size={20} className="stroke-[1.5]" />
                     <MoreHorizontal size={20} className="stroke-[1.5]" />
                </div>
            </div> */}

            <div className="flex flex-col flex-1 pt-4 pr-2">
              {/* Main Thread Item */}
              <div className="flex gap-3">
                {/* Left Column: Avatar & Line */}
                <div className="flex flex-col items-center w-10 shrink-0">
                  <div className="size-10 rounded-full bg-linear-to-br from-gray-200 to-gray-300 overflow-hidden shrink-0 border border-gray-100 z-20">
                    {/* Placeholder Avatar Image */}
                    <img
                      src="https://github.com/shadcn.png"
                      alt="user"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-[2.5px] grow bg-gray-200 my-2 rounded-full relative" />
                  <div className="size-5 rounded-full bg-gray-200 shrink-0 z-20">
                    <img
                      src="https://github.com/shadcn.png"
                      alt="user"
                      className="w-full h-full object-cover opacity-50 rounded-full"
                    />
                  </div>
                </div>

                {/* Right Column: Content */}
                <div className="flex-1 flex flex-col pb-4">
                  {/* Username Row */}
                  <div className="flex items-center gap-1 mb-1">
                    <span className="font-semibold text-base leading-none">
                      shadcn
                    </span>
                    {/* <span className="text-gray-500 mt-[2px]"><ChevronRight size={16}/></span>
                             <span className="text-gray-500 text-sm">Add a topic</span> */}
                  </div>

                  {/* Input */}
                  <textarea
                    ref={textareaRef}
                    placeholder="What's on your mind?"
                    value={textCaption}
                    onChange={handleChange}
                    rows={1}
                    className="w-full bg-transparent border-none focus:ring-0 outline-none p-0 text-base leading-relaxed placeholder:text-gray-400 text-black resize-none mb-2"
                    style={{ minHeight: "24px" }}
                  />

                  {/* Attachments Preview */}
                  {textAttachments.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-1">
                      {textAttachments.map((file, index) => (
                        <div
                          key={index}
                          className={cn(
                            "relative max-w-[500px] aspect-auto shrink-0 rounded-lg overflow-hidden border border-gray-200 group",
                            textAttachments.length > 1
                              ? "max-h-[300px]"
                              : "max-h-[500px]",
                          )}
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt="Attachment"
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => removeTextAttachment(index)}
                            className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Toolbar Icons */}
                  <div className="flex items-center gap-4 my-2 text-gray-400">
                    <button className="relative hover:text-black transition-colors">
                      <Camera size={24} className="stroke-[1.5]" />
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => {
                          if (e.target.files) {
                            Array.from(e.target.files).forEach((file) =>
                              addTextAttachment(file),
                            );
                          }
                        }}
                      />
                    </button>
                    <button className="hover:text-black transition-colors">
                      <Smile size={24} className="stroke-[1.5]" />
                    </button>
                    <button className="hover:text-black transition-colors">
                      <LinkMinimalistic2 size={24} className="stroke-[1.5]" />
                    </button>
                    <button className="hover:text-black transition-colors">
                      <AlignLeft size={24} className="stroke-[1.5]" />
                    </button>
                    <button className="hover:text-black transition-colors">
                      <MapPin size={24} className="stroke-[1.5]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* "Add to thread" Row */}
              {/* <div className="flex gap-3 mt-1 opacity-50">
                      <div className="w-10 flex justify-center shrink-0" />
                      <span className="text-sm text-gray-400">Add to thread</span>
                 </div> */}
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 flex items-center justify-between pb-2">
              <button className="text-gray-400 text-sm flex items-center gap-2">
                <span className="text-gray-300">Reply options</span>
              </button>
              <Button
                disabled={!textCaption && textAttachments.length === 0}
                className="rounded-xl bg-black text-white px-6 h-9 font-semibold hover:bg-neutral-800 disabled:opacity-30 transition-all font-sans text-sm border border-transparent"
              >
                Post
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
