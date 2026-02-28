"use client";

import {
  Camera,
  GalleryAdd,
  List,
  ListCheck,
  MapPoint,
  Notes,
  SmileCircle,
} from "@solar-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronDown, FileText, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SPACES } from "@/features/space/api/mock-data";

interface DraftPost {
  id: string;
  content: string;
  topicId: string | null;
  updatedAt: string;
}

const MOCK_DRAFTS: DraftPost[] = [
  {
    id: "d1",
    content:
      "Ada yang pernah coba deploy Next.js ke Cloudflare Workers? Pengen tau performanya dibanding Vercel...",
    topicId: "devid",
    updatedAt: "2025-08-14T10:30:00",
  },
  {
    id: "d2",
    content:
      "Rekomendasi tempat nongkrong buat kerja remote di area Sudirman dong, yang wifi-nya kenceng dan colokan banyak",
    topicId: "jakartavibes",
    updatedAt: "2025-08-13T15:20:00",
  },
  {
    id: "d3",
    content:
      "Mau sharing pengalaman pivot startup dari B2C ke B2B, ternyata banyak hal yang harus diubah dari sisi product...",
    topicId: "startupid",
    updatedAt: "2025-08-12T09:00:00",
  },
  {
    id: "d4",
    content:
      "Resep nasi goreng kampung yang beneran autentik itu sebenernya gimana sih? Tiap warung beda-beda rasanya",
    topicId: "kuliner",
    updatedAt: "2025-08-11T20:45:00",
  },
];

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreatePostModal({ open, onClose }: CreatePostModalProps) {
  const [content, setContent] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showDrafts, setShowDrafts] = useState(false);
  const [showDiscardAlert, setShowDiscardAlert] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Search state for topic dropdown
  const [spaceSearch, setSpaceSearch] = useState("");
  const filteredSpaces = spaceSearch
    ? SPACES.filter((t) =>
        t.name.toLowerCase().includes(spaceSearch.toLowerCase()),
      )
    : SPACES;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll + close on Escape
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") handleClose();
      };
      document.addEventListener("keydown", handleKey);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKey);
      };
    } else {
      document.body.style.overflow = "";
      setShowDrafts(false);
      setShowDiscardAlert(false);
    }
  }, [open, onClose]);

  const handleTextareaInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  // Re-apply textarea height when modal opens with existing content
  useEffect(() => {
    if (open && content) {
      requestAnimationFrame(() => handleTextareaInput());
    }
  }, [open]);

  const handleClose = () => {
    if (content.trim().length > 0) {
      setShowDiscardAlert(true);
    } else {
      onClose();
    }
  };

  const handleDiscard = () => {
    setContent("");
    setSelectedTopic(null);
    setShowDiscardAlert(false);
    onClose();
  };

  const handleSaveDraft = () => {
    // TODO: persist draft
    setShowDiscardAlert(false);
    onClose();
  };

  const selectedTopicData = SPACES.find((t) => t.id === selectedTopic);
  const canPost = content.trim().length > 0;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={handleClose}
          />

          {/* Centered modal */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
            <motion.div
              className="
                w-full max-w-2xl pointer-events-auto
                bg-background dark:bg-neutral-900
                rounded-[30px] border
                shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)]
                overflow-hidden flex flex-col max-h-[85vh]
              "
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative overflow-hidden flex-1 flex flex-col min-h-0">
                <AnimatePresence initial={false} mode="popLayout">
                  {showDrafts ? (
                    <motion.div
                      key="drafts"
                      initial={{ x: "100%", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "100%", opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                      className="flex flex-col h-full min-h-0"
                    >
                      {/* Drafts header */}
                      <div className="flex items-center gap-3 px-5 pt-5 pb-3 shrink-0">
                        <button
                          onClick={() => setShowDrafts(false)}
                          className="size-10 flex items-center justify-center rounded-full bg-muted hover:bg-muted/70 transition-colors"
                        >
                          <ArrowLeft className="size-5" />
                        </button>
                        <h2 className="text-lg font-bold">Draf</h2>
                      </div>

                      {/* Drafts list */}
                      <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-5">
                        {MOCK_DRAFTS.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                            <FileText className="size-10 mb-3 opacity-40" />
                            <p className="text-[14px]">Belum ada draf</p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            {MOCK_DRAFTS.map((draft) => {
                              const topic = SPACES.find(
                                (t) => t.id === draft.topicId,
                              );
                              const date = new Date(draft.updatedAt);
                              const timeLabel = date.toLocaleDateString(
                                "id-ID",
                                { day: "numeric", month: "short" },
                              );
                              return (
                                <div
                                  role="button"
                                  key={draft.id}
                                  onClick={() => {
                                    setContent(draft.content);
                                    setSelectedTopic(draft.topicId);
                                    setShowDrafts(false);
                                  }}
                                  className="w-full text-left p-3 rounded-2xl hover:bg-muted/50 transition-colors group"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                      {topic && (
                                        <div className="flex items-center gap-1.5 mb-1">
                                          <img
                                            src={topic.avatar_url}
                                            alt=""
                                            className="size-4 rounded object-cover"
                                          />
                                          <span className="text-[12px] font-medium text-muted-foreground">
                                            {topic.name}
                                          </span>
                                        </div>
                                      )}
                                      <p className="text-[14px] line-clamp-2 leading-snug">
                                        {draft.content}
                                      </p>
                                      <p className="text-[12px] text-muted-foreground mt-1">
                                        {timeLabel}
                                      </p>
                                    </div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                      className="size-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 hover:bg-muted transition-all text-muted-foreground hover:text-red-500 shrink-0 mt-0.5"
                                    >
                                      <Trash2 className="size-4" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="compose"
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "-100%", opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                      className="flex flex-col h-full min-h-0"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
                        <button
                          onClick={handleClose}
                          className="size-10 flex items-center justify-center rounded-full bg-muted hover:bg-muted/70 transition-colors"
                        >
                          <X className="size-5" />
                        </button>
                        <button
                          onClick={() => setShowDrafts(true)}
                          className="size-10 flex items-center justify-center rounded-full bg-muted hover:bg-muted/70 transition-colors"
                        >
                          <Notes className="size-5" />
                        </button>
                      </div>

                      {/* Compose area */}
                      <div className="flex-1 overflow-y-auto overscroll-contain">
                        <div className="px-5 pt-2 pb-2">
                          <div className="flex gap-3">
                            {/* Avatar */}
                            <div className="flex flex-col items-center">
                              <div className="size-10 rounded-full overflow-hidden shrink-0">
                                <img
                                  src="https://github.com/shadcn.png"
                                  alt="You"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>

                            {/* Content column */}
                            <div className="flex-1 min-w-0">
                              {/* Topic selector */}
                              <div className="flex items-center gap-1">
                                <DropdownMenu>
                                  <DropdownMenuTrigger className="flex items-center gap-0.5 text-[14px] text-muted-foreground hover:text-foreground transition-colors outline-none">
                                    <div className="bg-muted rounded-full px-2.5 py-1">
                                      {selectedTopicData ? (
                                        <div className="flex items-center gap-1 text-foreground font-semibold">
                                          {selectedTopicData.name}{" "}
                                          <ChevronDown className="size-3.5" />{" "}
                                        </div>
                                      ) : (
                                        <div className="flex items-center gap-1">
                                          Tambahkan topik{" "}
                                          <ChevronDown className="size-3.5" />{" "}
                                        </div>
                                      )}
                                    </div>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="start"
                                    className="w-56 z-[200] rounded-lg bg-background/50 backdrop-blur-lg"
                                  >
                                    <div className="px-2 pb-1 mb-2 border-b border-border">
                                      <input
                                        type="text"
                                        placeholder="Cari..."
                                        value={spaceSearch}
                                        onChange={(e) =>
                                          setSpaceSearch(e.target.value)
                                        }
                                        onBlur={(e) => e.stopPropagation()}
                                        className="w-full text-[13px] outline-none"
                                      />
                                    </div>
                                    {filteredSpaces.map((topic) => (
                                      <DropdownMenuItem
                                        key={topic.id}
                                        onClick={() =>
                                          setSelectedTopic(topic.id)
                                        }
                                        className="flex items-center gap-2.5"
                                      >
                                        <div className="size-5 rounded overflow-hidden shrink-0">
                                          <img
                                            src={topic.avatar_url}
                                            alt=""
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                        <span className="text-[14px]">
                                          {topic.name}
                                        </span>
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              {/* Textarea */}
                              <textarea
                                ref={textareaRef}
                                value={content}
                                onChange={(e) => {
                                  setContent(e.target.value);
                                  handleTextareaInput();
                                }}
                                placeholder="Apa yang baru?"
                                rows={3}
                                className="w-full mt-1.5 text-md leading-relaxed bg-transparent placeholder:text-muted-foreground/50 outline-none resize-none"
                                autoFocus
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer — action buttons + post */}
                      <div className="px-5 py-5 shrink-0">
                        <div className="flex items-center gap-2">
                          {[
                            { icon: Camera, label: "Image" },
                            { icon: SmileCircle, label: "Emoji" },
                            { icon: List, label: "Poll" },
                            { icon: MapPoint, label: "Location" },
                          ].map(({ icon: Icon, label }) => (
                            <button
                              key={label}
                              className="size-10 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
                            >
                              <Icon className="size-5" />
                            </button>
                          ))}
                          <button
                            disabled={!canPost}
                            className={`
                            px-5 py-2 rounded-full text-[14px] font-semibold transition-colors ml-auto
                            ${
                              canPost
                                ? "bg-foreground text-background hover:opacity-90"
                                : "bg-muted text-muted-foreground/40 cursor-default"
                            }
                          `}
                          >
                            Kirim
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Discard alert overlay */}
              <AnimatePresence>
                {showDiscardAlert && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 rounded-[30px]"
                    onClick={() => setShowDiscardAlert(false)}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.12, ease: "easeOut" }}
                      className="bg-background dark:bg-neutral-900 rounded-2xl shadow-lg w-72 overflow-hidden border"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-5 pt-5 pb-4 text-center">
                        <p className="text-[15px] font-semibold">
                          Buang postingan?
                        </p>
                        <p className="text-[13px] text-muted-foreground mt-1">
                          Konten yang belum diposting akan hilang.
                        </p>
                      </div>
                      <div className="border-t">
                        <button
                          onClick={handleDiscard}
                          className="w-full py-3 text-[14px] font-semibold text-red-500 hover:bg-muted/50 transition-colors"
                        >
                          Buang
                        </button>
                      </div>
                      <div className="border-t">
                        <button
                          onClick={handleSaveDraft}
                          className="w-full py-3 text-[14px] font-semibold hover:bg-muted/50 transition-colors"
                        >
                          Simpan draf
                        </button>
                      </div>
                      <div className="border-t">
                        <button
                          onClick={() => setShowDiscardAlert(false)}
                          className="w-full py-3 text-[14px] text-muted-foreground hover:bg-muted/50 transition-colors"
                        >
                          Batal
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/* Old create post modal designs:
 * v1: Header "New Post" + Document/X icons, full textarea, topic dropdown pill, filled "Post" button
 * v2 (Threads-style): "Batal"/"Utas baru" header, thread line, iOS sheet slide-up, Apple-native styling
 * v3 (Apple-native): iOS sheet with handle bar, spring slide-up, frosted glass separators, primary-colored Kirim button
 */
