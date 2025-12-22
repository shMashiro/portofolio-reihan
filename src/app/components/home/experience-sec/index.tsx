"use client";
import React, { useEffect, useState } from 'react';
import { getDataPath } from "@/utils/image";
import { useLanguage } from "@/context/LanguageContext";
import PdfModal from "@/app/components/ui/PdfModal";

const ExperienceSec = () => {
    const { t, language } = useLanguage();
    const [experienceData, setExperienceData] = useState<any>(null);
    const [pdfModal, setPdfModal] = useState({ isOpen: false, title: "", url: "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(getDataPath("/data/page-data.json"));
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                setExperienceData(data?.experienceData);
            } catch (error) {
                console.error("Error fetching experience data:", error);
            }
        };

        fetchData();
    }, []);

    const openPdf = (title: string, url: string) => {
        setPdfModal({ isOpen: true, title, url });
    };

    const closePdf = () => {
        setPdfModal(prev => ({ ...prev, isOpen: false }));
    };

    return (
        <section>
            <div className="py-16 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
                        <h2>{t.experience.title}</h2>
                        <p className="text-xl text-primary">{t.experience.subtitle}</p>
                    </div>

                    <div className="space-y-7 md:space-y-12">
                        {experienceData?.experiences?.map((exp: any, index: number) => (
                            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-4 xl:gap-8 relative">
                                <div className="">
                                    <h3 className="font-bold mb-2 text-black">{exp.year}</h3>
                                    <h4 className="text-lg font-normal">{exp.title}</h4>
                                </div>

                                <div className=" relative">
                                    {index < experienceData.experiences.length && (
                                        <div className={`absolute left-0 top-3 w-px ${index < experienceData.experiences.length - 1 ? 'bottom-0' : 'h-0'} bg-softGray`}></div>
                                    )}

                                    <div className="no-print absolute left-0 top-0 transform -translate-x-1/2">
                                        <div className={`no-print w-3.5 h-3.5 rounded-full border-1 bg-white flex items-center justify-center ${index === 1 ? 'border-primary' : 'border-black'
                                            }`}>
                                            {index === 1 && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pl-4 lg:pl-7">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xl text-black font-normal">{exp.company}</span>
                                        </div>
                                        <p className="text-base font-normal">{exp.type}</p>
                                    </div>
                                </div>

                                <div className="pl-8 sm:pl-0">
                                    <p className="leading-relaxed text-base mb-4">{exp?.description?.[language]}</p>

                                    <div className="flex flex-wrap gap-3 mt-3">
                                        {exp.certificate && (
                                            <button
                                                onClick={() => openPdf(`${t.experience.btnCertificate} - ${exp.title}`, exp.certificate)}
                                                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all shadow-sm relative overflow-hidden no-print"
                                            >
                                                <span className="relative z-10">{t.experience.btnCertificate}</span>
                                            </button>
                                        )}
                                        {exp.transcript && (
                                            <button
                                                onClick={() => openPdf(`${t.experience.btnTranscript} - ${exp.title}`, exp.transcript)}
                                                className="px-4 py-2 border border-primary text-primary bg-white rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-all shadow-sm relative overflow-hidden group no-print"
                                            >
                                                <span className="relative z-10 group-hover:text-white">{t.experience.btnTranscript}</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <PdfModal
                isOpen={pdfModal.isOpen}
                onClose={closePdf}
                title={pdfModal.title}
                pdfUrl={pdfModal.url}
            />
        </section>
    );
};

export default ExperienceSec;