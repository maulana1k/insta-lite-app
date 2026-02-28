import { useCreatePostStore } from "../store/create-post-store";

export function useImageStyle() {
  const { adjustments } = useCreatePostStore();

  return {
    filter: `brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturation}%) sepia(${adjustments.warmth > 100 ? (adjustments.warmth - 100) * 0.5 : 0}%) hue-rotate(${adjustments.warmth < 100 ? (100 - adjustments.warmth) * -0.5 : 0}deg) opacity(${100 - adjustments.fade}%)`,
  };
}
