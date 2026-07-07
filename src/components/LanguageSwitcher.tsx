import React from 'react';
import { Globe } from 'lucide-react';
import { languages } from '../data/translations';
import { useLanguage } from '../hooks/useLanguage';

interface LanguageSwitcherProps {
  textColorClass?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ textColorClass = 'text-gray-900' }) => {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <div className="relative group">
      <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors ${textColorClass}`}>
        <Globe size={18} />
        <span className="text-sm font-medium">
          {languages.find(lang => lang.code === currentLanguage)?.flag}
        </span>
      </button>
      
      <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2 min-w-[120px]">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-2 ${
                currentLanguage === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              <span>{language.flag}</span>
              <span className="text-sm">{language.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;