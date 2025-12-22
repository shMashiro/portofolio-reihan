"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { dictionary } from "../data/locales";

type Language = "en" | "id";

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: typeof dictionary.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>("en");

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "en" ? "id" : "en"));
    };

    const t = dictionary[language];

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
