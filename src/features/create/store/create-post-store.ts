import { create } from 'zustand';
import { Point, Area } from 'react-easy-crop';
import { MediaStep, AspectRatio, Filter } from '../types';
import { FILTERS, DEFAULT_ADJUSTMENTS } from '../constants';

interface CreatePostState {
  // Navigation
  mediaStep: MediaStep;
  setMediaStep: (step: MediaStep) => void;

  // Media
  selectedFile: File | null;
  previewUrl: string | undefined;
  setFile: (file: File | null) => void;
  setPreviewUrl: (url: string | undefined) => void;

  // Crop
  aspectRatio: AspectRatio;
  crop: Point;
  zoom: number;
  croppedAreaPixels: Area | undefined;
  croppedImage: string | undefined;
  setAspectRatio: (ratio: AspectRatio) => void;
  setCrop: (crop: Point) => void;
  setZoom: (zoom: number) => void;
  setCroppedAreaPixels: (area: Area | undefined) => void;
  setCroppedImage: (url: string | undefined) => void;

  // Edit
  currentFilter: Filter;
  adjustments: typeof DEFAULT_ADJUSTMENTS;
  activeTab: 'filter' | 'edit';
  activeTool: string | null;
  setCurrentFilter: (filter: Filter) => void;
  setAdjustments: (adjustments: typeof DEFAULT_ADJUSTMENTS) => void;
  setAdjustment: (key: string, value: number) => void;
  setActiveTab: (tab: 'filter' | 'edit') => void;
  setActiveTool: (tool: string | null) => void;

  // Caption
  caption: string;
  setCaption: (caption: string) => void;

  // Post Type
  postType: 'media' | 'text';
  setPostType: (type: 'media' | 'text') => void;

  // Text Post
  textCaption: string;
  setTextCaption: (caption: string) => void;
  textAttachments: File[];
  addTextAttachment: (file: File) => void;
  removeTextAttachment: (index: number) => void;

  // Actions
  reset: () => void;
}

export const useCreatePostStore = create<CreatePostState>((set) => ({
  // Navigation
  mediaStep: 'upload',
  setMediaStep: (mediaStep) => set({ mediaStep }),

  // Media
  selectedFile: null,
  previewUrl: undefined,
  setFile: (selectedFile) => set({ selectedFile }),
  setPreviewUrl: (previewUrl) => set({ previewUrl }),

  // Post Type
  postType: 'media',
  setPostType: (postType) => set({ postType }),

  // Text Post
  textCaption: '',
  setTextCaption: (textCaption) => set({ textCaption }),
  textAttachments: [],
  addTextAttachment: (file) =>
    set((state) => ({ textAttachments: [...state.textAttachments, file] })),
  removeTextAttachment: (index) =>
    set((state) => ({
      textAttachments: state.textAttachments.filter((_, i) => i !== index),
    })),

  // Crop
  aspectRatio: 'square',
  crop: { x: 0, y: 0 },
  zoom: 1,
  croppedAreaPixels: undefined,
  croppedImage: undefined,
  setAspectRatio: (aspectRatio) => set({ aspectRatio }),
  setCrop: (crop) => set({ crop }),
  setZoom: (zoom) => set({ zoom }),
  setCroppedAreaPixels: (croppedAreaPixels) => set({ croppedAreaPixels }),
  setCroppedImage: (croppedImage) => set({ croppedImage }),

  // Edit
  currentFilter: FILTERS[0],
  adjustments: DEFAULT_ADJUSTMENTS,
  activeTab: 'edit',
  activeTool: null,
  setCurrentFilter: (currentFilter) => set({ currentFilter }),
  setAdjustments: (adjustments) => set({ adjustments }),
  setAdjustment: (key, value) =>
    set((state) => ({
      adjustments: { ...state.adjustments, [key]: value },
    })),
  setActiveTab: (activeTab) => set({ activeTab }),
  setActiveTool: (activeTool) => set({ activeTool }),

  // Caption
  caption: '',
  setCaption: (caption) => set({ caption }),

  // Actions
  reset: () =>
    set({
      mediaStep: 'upload',
      selectedFile: null,
      previewUrl: undefined,
      postType: 'media',
      textCaption: '',
      textAttachments: [],
      aspectRatio: 'square',
      crop: { x: 0, y: 0 },
      zoom: 1,
      croppedAreaPixels: undefined,
      croppedImage: undefined,
      currentFilter: FILTERS[0],
      adjustments: DEFAULT_ADJUSTMENTS,
      activeTab: 'edit',
      activeTool: null,
      caption: '',
    }),
}));
