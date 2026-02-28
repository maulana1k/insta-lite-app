import { CropMinimalistic } from "@solar-icons/react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  RectangleVertical,
  Square,
} from "lucide-react";
import { useCallback } from "react";
import type { Area } from "react-easy-crop";
import Cropper from "react-easy-crop";
import { cn } from "@/lib/utils";
import { useCreatePostStore } from "../store/create-post-store";
import { getCroppedImg } from "../utils/image-utils";

export function CropStep() {
  const {
    previewUrl,
    crop,
    zoom,
    aspectRatio,
    croppedAreaPixels,
    setCrop,
    setZoom,
    setAspectRatio,
    setCroppedAreaPixels,
    setCroppedImage,
    setMediaStep,
    reset,
  } = useCreatePostStore();

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [setCroppedAreaPixels],
  );

  const handleCropNext = async () => {
    if (!previewUrl || !croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(previewUrl, croppedAreaPixels);
      if (croppedImage) {
        setCroppedImage(croppedImage);
        setMediaStep("edit");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <motion.div
      key="crop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-end px-8 py-6"
    >
      {/* Navigation Controls - Fixed Side Buttons */}
      <div className="fixed top-8 ">
        <CropMinimalistic size={26} />
      </div>
      <button
        onClick={reset}
        className="fixed left-10 top-1/2 -translate-y-1/2 p-4 hover:bg-gray-100 text-gray-800 rounded-full transition-all z-50"
      >
        <ChevronLeft className="size-8 stroke-2" />
      </button>

      <button
        onClick={handleCropNext}
        className="fixed right-10 top-1/2 -translate-y-1/2 p-4 hover:bg-gray-100 text-gray-800 rounded-full transition-all z-50"
      >
        <ChevronRight className="size-8 stroke-2" />
      </button>

      {/* Main Crop Area */}
      <div className="relative aspect-square h-[75dvh] bg-black overflow-hidden">
        {previewUrl && (
          <Cropper
            image={previewUrl}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio === "square" ? 1 : 3 / 4}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            objectFit="contain"
            style={{
              containerStyle: {
                backgroundColor: "#000",
              },
              cropAreaStyle: {
                borderColor: "rgba(255, 255, 255, 0.5)",
                borderWidth: 1,
              },
            }}
          />
        )}
      </div>

      {/* Minimalist Ratio Logic */}
      <div className="mt-4 bg-muted/70 backdrop-blur-sm rounded-full px-1 w-fit flex items-center justify-center gap-2 ">
        <button
          onClick={() => {
            setAspectRatio("square");
            setCrop({ x: 0, y: 0 });
            setZoom(1);
          }}
          className={cn(
            "h-12 w-12 flex items-center justify-center rounded-full text-xs font-semibold uppercase tracking-wider transition-all",
            aspectRatio === "square"
              ? "bg-black text-white"
              : "text-muted-foreground hover:bg-muted",
          )}
        >
          <Square className="size-5" />
        </button>
        <button
          onClick={() => {
            setAspectRatio("portrait");
            setCrop({ x: 0, y: 0 });
            setZoom(1);
          }}
          className={cn(
            "h-12 w-12 flex items-center justify-center rounded-full text-xs font-semibold uppercase tracking-wider transition-all",
            aspectRatio === "portrait"
              ? "bg-black text-white shadow-sm"
              : "text-muted-foreground hover:bg-muted",
          )}
        >
          <RectangleVertical className="size-5" />
        </button>
      </div>
    </motion.div>
  );
}
