'use client';

import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { AppLogo } from '@/components/layout/header';
import { X } from 'lucide-react';

import { useCreatePostStore } from '@/features/create/store/create-post-store';
import { UploadStep } from '@/features/create/components/upload-step';
import { CropStep } from '@/features/create/components/crop-step';
import { EditStep } from '@/features/create/components/edit-step';
import { CaptionStep } from '@/features/create/components/caption-step';

export default function CreatePostPage() {
  const router = useRouter();
  const { mediaStep } = useCreatePostStore();

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* Header - Instagram Style */}
      <header className="h-[60px] fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5">

        <div className="flex items-center gap-2">
          <AppLogo />
        </div>
      </header>
      <div className="fixed top-5 right-5 z-999">

        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="size-7" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {mediaStep === 'upload' && <UploadStep key="upload" />}
          {mediaStep === 'crop' && <CropStep key="crop" />}
          {mediaStep === 'edit' && <EditStep key="edit" />}
          {mediaStep === 'caption' && <CaptionStep key="caption" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
