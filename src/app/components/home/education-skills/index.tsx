"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import PdfModal from "@/app/components/ui/PdfModal";

const EducationSkills = () => {
  const { t, language } = useLanguage();
  const [educationData, setEductionData] = useState<any>(null);
  const [pdfModal, setPdfModal] = useState({ isOpen: false, title: "", url: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/page-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEductionData(data?.educationData);
      } catch (error) {
        console.error("Error fetching services:", error);
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
      <div className="border-t border-softGray overflow-hidden">
        <div className="container relative z-10">
          <Image
            src={getImgPath(
              "/images/home/education-skill/edu-skill-vector.svg"
            )}
            alt="vector"
            width={260}
            height={170}
            className="no-print absolute top-0 left-0 transform -translate-y-1/2"
          />
          <div className="relative z-10 py-16 md:py-32">
            <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 xl:mb-16">
              <h2>{t.education.title}</h2>
              <p className="text-xl text-orange-500">{t.education.subtitle}</p>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-10 xl:gap-20">
              <div className="w-full lg:max-w-md flex flex-col gap-0 xl:gap-8">
                {educationData?.education?.map((value: any, index: any) => {
                  return (
                    <div key={index} className="flex items-start gap-6">
                      <div className="no-print mt-2.5 w-3.5 h-3.5 rounded-full border-1 bg-white flex items-center justify-center border-black">
                        <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <h5>{value?.title}</h5>
                        <p className="font-normal">{value?.description?.[language]}</p>

                        <div className="flex flex-wrap gap-3 mt-3">
                          {value.degree && (
                            <button
                              onClick={() => openPdf(`${t.education.btnDegree} - ${value.title}`, value.degree)}
                              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all shadow-sm relative overflow-hidden no-print"
                            >
                              <span className="relative z-10">{t.education.btnDegree}</span>
                            </button>
                          )}
                          {value.transcript && (
                            <button
                              onClick={() => openPdf(`${t.education.btnTranscript} - ${value.title}`, value.transcript)}
                              className="px-4 py-2 border border-primary text-primary bg-white rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-all shadow-sm relative overflow-hidden group no-print"
                            >
                              <span className="relative z-10 group-hover:text-white">{t.education.btnTranscript}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-x-5 gap-y-16 xl:gap-x-7 xl:gap-y-20 w-full mt-10">
                {educationData?.skills?.map((value: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="relative pt-12 p-4 xl:p-6 border border-primary rounded-lg flex flex-col items-center gap-4 text-center group hover:shadow-lg transition-all duration-300"
                    >
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full">
                        <Image
                          src={getImgPath(value?.icon)}
                          alt="icon"
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>

                      <div className="flex flex-col gap-2 mt-4">
                        <p className="text-black font-bold text-lg">{value?.name}</p>
                        <p className="text-gray-600 text-sm">{value?.description?.[language]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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

export default EducationSkills;
