"use client";
import React, { useEffect } from "react";
import { getImgPath } from "@/utils/image";

interface PdfModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    pdfUrl: string;
}

const PdfModal = ({ isOpen, onClose, title, pdfUrl }: PdfModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isOpen && e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !pdfUrl) return null;

    const fullPath = getImgPath(pdfUrl);

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl overflow-hidden max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl relative">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-black truncate pr-4">{title}</h3>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors text-black relative overflow-hidden"
                    >
                        <span className="text-xl font-bold leading-none relative z-10">&times;</span>
                    </button>
                </div>
                <div className="flex-1 w-full bg-gray-100 p-2 relative">
                    <iframe src={fullPath} className="w-full h-full rounded-lg bg-white" title={title}></iframe>
                </div>
            </div>
        </div>
    );
};

export default PdfModal;
