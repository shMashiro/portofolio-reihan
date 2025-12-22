"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ProjectModal from "../../ui/ProjectModal";

const LatestWork = () => {
  const { t } = useLanguage();
  const [workData, setWorkData] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/work-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setWorkData(data?.workData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section>
      <div className="bg-softGray">
        <div className="container">
          <div className="py-16 xl:py-32 ">
            <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
              <h2>{t.latestWork.title}</h2>
              <p className="text-xl text-orange-500">{t.latestWork.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 xl:gap-y-12">
              {workData?.map((value: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="group flex flex-col gap-3 xl:gap-6 cursor-pointer"
                    onClick={() => handleProjectClick(value)}
                  >
                    <div className="relative">
                      <Image
                        src={getImgPath(value?.image)}
                        alt="image"
                        width={570}
                        height={414}
                        className="rounded-lg w-full h-[300px] xl:h-[400px] object-cover object-top"
                      />
                      <div
                        className="absolute top-0 left-0 backdrop-blur-xs bg-primary/15 w-full h-full hidden group-hover:flex rounded-lg"
                      >
                        <span className="flex justify-center items-center p-5 w-full">
                          <svg
                            width="65"
                            height="64"
                            viewBox="0 0 65 64"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="0.333374"
                              width="64"
                              height="64"
                              rx="32"
                              fill="#FE4300"
                            />
                            <path
                              d="M25.6667 25.3333H39M39 25.3333V38.6666M39 25.3333L25.6667 38.6666"
                              stroke="#FFFF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-0 xl:gap-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5>{value?.title}</h5>
                        </div>
                        <Image
                          src={getImgPath("/images/icon/right-arrow-icon.svg")}
                          alt="right-arrow-icon"
                          width={30}
                          height={30}
                        />
                      </div>
                      <p>{t.latestWork.client}: {value?.client}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </section>
  );
};

export default LatestWork;
