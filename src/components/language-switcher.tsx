'use client';

import { useLanguage } from '@/lib/language';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={() => setLanguage('nl')}
        className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
          language === 'nl'
            ? 'bg-[var(--primary-100)] text-[var(--primary-700)]'
            : 'text-[var(--neutral-600)] hover:text-[var(--neutral-900)] hover:bg-[var(--neutral-100)]'
        }`}
      >
        NL
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
          language === 'en'
            ? 'bg-[var(--primary-100)] text-[var(--primary-700)]'
            : 'text-[var(--neutral-600)] hover:text-[var(--neutral-900)] hover:bg-[var(--neutral-100)]'
        }`}
      >
        EN
      </button>
    </div>
  );
}