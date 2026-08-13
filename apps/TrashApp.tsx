/**
 * @file apps/TrashApp.tsx
 * @description System Trash Manager Window Component.
 *
 * Responsibilities:
 * - Displays deleted files and deprecated project archives stored in the system trash bin.
 * - Allows users to restore items back to the desktop grid or permanently delete items with audio feedback.
 * - Supports an "Empty Trash" action with an animated empty state graphic.
 */

import React, { useState } from "react";
import { Trash2, RefreshCw, Sparkles, FileX, RotateCcw } from "lucide-react";
import { useEcosystemStore } from "../store/useEcosystemStore";
import { DESKTOP_ITEMS } from "../desktop/components/DesktopFolders";
import { playTrashWhooshSound } from "../utils/soundEffects";

export default function TrashApp() {
  const {
    trashItems,
    emptyTrash,
    restoreTrashItem,
    deleteTrashItemPermanently,
    moveToTrash,
    resetTrashItems,
    systemTheme,
  } = useEcosystemStore();

  const [searchQuery] = useState("");
  const [isWhooshing, setIsWhooshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const isLight = systemTheme === "light";

  const handleEmptyTrash = () => {
    if (trashItems.length === 0) return;
    playTrashWhooshSound();
    setIsWhooshing(true);

    setTimeout(() => {
      emptyTrash();
      setIsWhooshing(false);
    }, 380);
  };

  const handleSingleDelete = (id: string) => {
    playTrashWhooshSound();
    setDeletingId(id);
    setTimeout(() => {
      deleteTrashItemPermanently(id);
      setDeletingId(null);
    }, 250);
  };

  const handleSingleRestore = (id: string) => {
    restoreTrashItem(id);
  };

  // Drag and drop handlers to allow dropping desktop files into Trash
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    if (!isDragOver) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    let fileName = "";
    let fileType = "Desktop Item";
    let iconImg = "/images/text.webp";

    // 1. Check custom JSON payload first
    const jsonString = e.dataTransfer.getData("application/json");
    if (jsonString) {
      try {
        const item = JSON.parse(jsonString);
        if (item.title) fileName = item.title;
        if (item.kind) fileType = item.kind;
        if (item.iconImage) iconImg = item.iconImage;
      } catch (err) {
        // ignore
      }
    }

    // 2. Fallback to text/plain parsing
    if (!fileName) {
      const textData = e.dataTransfer.getData("text/plain");
      if (textData) {
        // Check if textData matches title or iconImage of any item in DESKTOP_ITEMS
        const matchedItem = DESKTOP_ITEMS.find(
          (d) =>
            d.title === textData ||
            d.iconImage === textData ||
            textData.includes(d.iconImage),
        );

        if (matchedItem) {
          fileName = matchedItem.title;
          fileType = matchedItem.kind;
          iconImg = matchedItem.iconImage;
        } else if (
          !textData.startsWith("http://") &&
          !textData.startsWith("https://")
        ) {
          fileName = textData;
        } else {
          // If it's a URL, extract clean filename from URL path
          const urlParts = textData.split("/");
          const lastPart = urlParts[urlParts.length - 1] || "";
          const cleanName = lastPart.split("?")[0] || "";
          fileName = decodeURIComponent(cleanName) || "Desktop_File";
        }
      }
    }

    if (fileName) {
      moveToTrash({
        name: fileName,
        type: fileType,
        iconImage: iconImg,
      });
      playTrashWhooshSound();
    }
  };

  const filteredItems = trashItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col h-full w-full font-sans relative overflow-hidden select-none transition-colors duration-200 ${
        isLight ? "bg-slate-50 text-slate-900" : "bg-[#16161a] text-white"
      }`}
    >
      {/* Visual Drag & Drop Highlight Overlay */}
      {isDragOver && (
        <div className="absolute inset-0 z-50 bg-blue-600/20 border-4 border-dashed border-blue-500 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none animate-fadeIn">
          <div className="w-16 h-16 rounded-3xl bg-blue-600 text-white flex items-center justify-center shadow-2xl mb-3 animate-bounce">
            <Trash2 className="w-8 h-8" />
          </div>
          <span className="text-sm font-bold text-blue-400">
            Drop file to move to Trash
          </span>
        </div>
      )}

      {/* Top Action & Search Bar */}
      <div
        className={`h-12 border-b px-3 sm:px-4 flex items-center justify-between shrink-0 transition-colors ${
          isLight
            ? "bg-slate-200/90 border-slate-300 text-slate-800"
            : "bg-[#1e1e24] border-white/10 text-white"
        }`}
      >
        <div className="flex items-center space-x-2.5 sm:space-x-3 text-xs min-w-0">
          <div className="w-7 h-7 rounded-lg bg-red-500/15 border border-red-500/30 text-red-500 flex items-center justify-center shrink-0">
            <Trash2 className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xs truncate">Trash Bin</span>
            </div>
            {trashItems.length > 0 && (
              <span
                className={`text-[10px] block truncate ${
                  isLight ? "text-slate-500" : "text-white/40"
                }`}
              >
                {trashItems.length} items
              </span>
            )}
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          {trashItems.length > 0 ? (
            <>
              <button
                onClick={handleEmptyTrash}
                disabled={isWhooshing}
                className="px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-red-600 hover:bg-red-500 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Empty Trash</span>
              </button>
            </>
          ) : (
            <button
              onClick={resetTrashItems}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95 ${
                isLight
                  ? "bg-slate-300 hover:bg-slate-400/70 text-slate-800"
                  : "bg-white/10 hover:bg-white/20 text-white/90"
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Items</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-3.5 sm:p-5 overflow-y-auto overflow-x-hidden max-w-full pb-24 md:pb-24 flex flex-col items-center justify-start relative">
        {filteredItems.length > 0 ? (
          <div
            className={`w-full space-y-2 transition-all duration-300 ${
              isWhooshing
                ? "scale-90 opacity-0 blur-md translate-y-8"
                : "scale-100 opacity-100"
            }`}
          >
            <div
              className={`flex items-center justify-between text-[11px] font-bold uppercase tracking-wider mb-2 px-1 ${
                isLight ? "text-slate-400" : "text-white/40"
              }`}
            >
              <span>Drag files onto Trash to recycle</span>
            </div>

            {filteredItems.map((item) => {
              const isDeletingThis = deletingId === item.id;

              return (
                <div
                  key={item.id}
                  className={`group border rounded-2xl p-3 flex items-center justify-between transition-all duration-200 shadow-sm hover:shadow-md ${
                    isDeletingThis
                      ? "scale-90 opacity-0 blur-sm -translate-x-4 bg-red-500/20 border-red-500/40"
                      : isLight
                        ? "bg-white border-slate-200 hover:border-slate-300"
                        : "bg-[#1f1f26] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center shrink-0">
                      <FileX className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 pr-2">
                      <span
                        className={`text-xs font-semibold block truncate ${
                          isLight ? "text-slate-900" : "text-white"
                        }`}
                      >
                        {item.name}
                      </span>
                      <div className="flex items-center space-x-2 mt-0.5">
                        <span
                          className={`text-[10px] ${
                            isLight ? "text-slate-500" : "text-white/40"
                          }`}
                        >
                          {item.type}
                        </span>
                        <span className="text-[10px] text-slate-400">•</span>
                        <span
                          className={`text-[10px] ${
                            isLight ? "text-slate-400" : "text-white/30"
                          }`}
                        >
                          {item.deletedAt || "Recently deleted"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 shrink-0">
                    {/* Per-item Restore Button */}
                    <button
                      onClick={() => handleSingleRestore(item.id)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        isLight
                          ? "bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border-slate-200 hover:border-blue-300"
                          : "bg-white/5 hover:bg-blue-600/20 text-white/70 hover:text-blue-400 border-white/10 hover:border-blue-500/40"
                      }`}
                      title="Restore to Desktop"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    {/* Per-item Permanent Delete Button */}
                    <button
                      onClick={() => handleSingleDelete(item.id)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        isLight
                          ? "bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 border-slate-200 hover:border-red-300"
                          : "bg-white/5 hover:bg-red-600/20 text-white/70 hover:text-red-400 border-white/10 hover:border-red-500/40"
                      }`}
                      title="Delete Permanently"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center max-w-sm animate-fadeIn py-8">
            <div
              className={`w-16 h-16 rounded-3xl border flex items-center justify-center mb-4 text-emerald-500 shadow-xl ${
                isLight
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-zinc-800/80 border-white/10"
              }`}
            >
              <Sparkles className="w-8 h-8 animate-pulse text-emerald-400" />
            </div>
            <h2
              className={`text-base font-bold ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              Trash is Empty
            </h2>
            <p
              className={`text-xs mt-1.5 leading-relaxed ${
                isLight ? "text-slate-500" : "text-white/50"
              }`}
            >
              All legacy artifacts cleared! You can drag desktop files here
              anytime to recycle storage.
            </p>
            <button
              onClick={resetTrashItems}
              className={`mt-4 px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all flex items-center space-x-1.5 cursor-pointer ${
                isLight
                  ? "bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-sm"
                  : "bg-white/5 hover:bg-white/10 text-white/80 border-white/10"
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Load Sample Trash Files</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
