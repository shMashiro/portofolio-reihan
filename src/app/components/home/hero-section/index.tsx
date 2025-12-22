"use client";
import { getImgPath } from "@/utils/image";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const index = () => {
  const { t } = useLanguage();
  return (
    <section className="relative hero-section overflow-hidden pt-35 md:pt-40 pb-12 lg:pb-30 xl:pt-52">
      <div className="container">
        <div className="lg:flex grid grid-cols-1 sm:grid-cols-2 gap-7 md:gap-4 items-center">
          <div className="flex flex-col gap-4 md:gap-7 max-w-2xl">
            <div>
              <div className="flex items-center gap-4 sm:gap-6">
                <h1 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl">{t.hero.greeting}</h1>
                <div className="wave">
                  <Image
                    src={getImgPath("/images/home/banner/wave-icon.svg")}
                    alt="wave-icon"
                    width={45}
                    height={45}
                    className=""
                  />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl">{t.hero.title}</h1>
            </div>
            <p className="text-secondary font-normal max-w-md xl:max-w-xl">
              {t.hero.description}
            </p>
          </div>
          <Image
            src={getImgPath("/images/home/banner/banner-img.png")}
            alt="banner-img"
            width={685}
            height={650}
            className="block lg:hidden"
          />
        </div>
      </div>
      <div className="absolute right-0 top-0 hidden h-auto w-1/2 lg:block 2xl:h-171.5 2xl:w-187.5">
        <Image
          src={getImgPath("/images/home/banner/banner-img.png")}
          alt="banner-img"
          width={685}
          height={650}
          className=" absolute right-0 top-0 z-1"
        />
      </div>
    </section>
  );
};

export default index;
