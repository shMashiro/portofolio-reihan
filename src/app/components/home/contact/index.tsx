"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const [contactData, setContactData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/page-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContactData(data?.contactBar);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="no-print">
      <div className="container">
        <div className="pt-16 md:pt-32 pb-20">
          <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
            <h2>{t.contact.title}</h2>
            <p className="text-xl text-orange-500">{t.contact.subtitle}</p>
          </div>

          <div className="flex flex-col items-center gap-10">
            <h4 className="text-center font-bold text-3xl md:text-5xl">{t.contact.readyToWork}</h4>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {contactData?.socialItems?.map((value: any, index: any) => {
                return (
                  <div key={index} className="group">
                    <Link
                      href={value?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-4 hover:scale-110 transition-transform duration-300"
                    >
                      <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white shadow-lg rounded-full flex items-center justify-center p-4 border border-gray-100 group-hover:border-primary transition-colors">
                        <Image
                          src={getImgPath(value?.icon)}
                          alt={value?.platform}
                          width={40}
                          height={40}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-lg font-medium text-secondary group-hover:text-primary transition-colors">{value?.platform}</p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
