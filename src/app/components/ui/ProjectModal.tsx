"use client";
import { getImgPath } from "@/utils/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: any;
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
    const { t, language } = useLanguage();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setCurrentImageIndex(0);
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen || !project) return null;

    const images = project.images && project.images.length > 0 ? project.images : [project.image];

    const nextImage = () => {
        setCurrentImageIndex((prev: number) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev: number) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white text-black font-bold text-xl shadow-md transition-all overflow-hidden"
                >
                    <span className="relative z-20">&times;</span>
                </button>

                <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-100 group">
                    <Image
                        src={getImgPath(images[currentImageIndex])}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/50 hover:bg-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10 overflow-hidden"
                            >
                                <span className="text-black font-bold text-lg relative z-10">&lt;</span>
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/50 hover:bg-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10 overflow-hidden"
                            >
                                <span className="text-black font-bold text-lg relative z-10">&gt;</span>
                            </button>

                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                                {images.map((_: any, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`w-2 h-2 rounded-full transition-all overflow-hidden ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'}`}
                                    >
                                        <span className="relative z-10 block w-full h-full"></span>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h3>
                    <p className="text-primary font-medium mb-6 text-lg">{project.client}</p>

                    <div className="flex flex-col gap-4 mb-8">
                        <div className="flex items-start gap-3">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 opacity-60 text-secondary">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <div>
                                <span className="block text-sm text-gray-500 font-semibold uppercase tracking-wider">Location</span>
                                <p className="font-medium">{project.location}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            {/* Using calendar icon or reusable icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 opacity-60 text-secondary"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            <div>
                                <span className="block text-sm text-gray-500 font-semibold uppercase tracking-wider">Date</span>
                                <p className="font-medium">{project.startDate} - {project.endDate}</p>
                            </div>
                        </div>
                    </div>

                    <div className="prose max-w-none">
                        <h4 className="text-lg font-bold mb-2">About Project</h4>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {project.description[language]}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
