"use client";
import React from 'react';
import { Translate } from 'react-bootstrap-icons';
import { useLanguage } from '@/context/LanguageContext';

const LanguageSwitcher = () => {
    const { toggleLanguage, language } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-white border-2 border-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 overflow-hidden group no-print"
            aria-label="Toggle Language"
            title={`Switch to ${language === 'en' ? 'Indonesian' : 'English'}`}
        >
            <Translate className="text-primary text-2xl relative z-10 group-hover:text-white transition-colors duration-300" />
        </button>
    );
};

export default LanguageSwitcher;
