import {
  Sun,
  Contrast,
  Droplet,
  Thermometer,
  Triangle,
} from 'lucide-react';
import { Filter, EditTool } from '../types';

// Instagram Filters
export const FILTERS: Filter[] = [
  { name: 'Normal', class: '' },
  { name: 'Moon', class: 'grayscale brightness-110 contrast-110' },
];  

// Edit Tools
export const EDIT_TOOLS: EditTool[] = [
  { id: 'brightness', label: 'Brightness', icon: Sun, min: 50, max: 150 },
  { id: 'contrast', label: 'Contrast', icon: Contrast, min: 50, max: 150 },
  { id: 'structure', label: 'Structure', icon: Triangle, min: 0, max: 100 },
  { id: 'warmth', label: 'Warmth', icon: Thermometer, min: 0, max: 200 },
  { id: 'saturation', label: 'Saturation', icon: Droplet, min: 0, max: 200 },
];

export const DEFAULT_ADJUSTMENTS = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  warmth: 100,
  fade: 0,
  structure: 0,
  highlights: 0,
  shadows: 0,
  vignette: 0,
  sharpen: 0,
};
