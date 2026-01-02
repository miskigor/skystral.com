import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en' as const, label: 'EN' },
    { code: 'de' as const, label: 'DE' },
    { code: 'hr' as const, label: 'HR' },
  ];

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-5 h-5 text-red-600" />
      <div className="flex space-x-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-1 font-bold transition-colors ${
              language === lang.code
                ? 'bg-red-600 text-white'
                : 'text-white hover:text-red-600 border border-white hover:border-red-600'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}
