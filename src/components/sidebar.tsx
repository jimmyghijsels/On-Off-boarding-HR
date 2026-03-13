'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/language';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useLanguage();
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Overzicht', icon: '📊' },
    { href: '/templates', label: 'Sjablonen', icon: '📋' },
    { href: '/services', label: 'Diensten', icon: '🔧' },
    { href: '/people', label: 'Personen', icon: '👥' },
    { href: '/settings', label: 'Instellingen', icon: '⚙️' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed right-0 top-0 h-full w-80 bg-white dark:bg-[var(--neutral-800)]
        border-l border-[var(--neutral-200)] dark:border-[var(--neutral-700)]
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-[var(--neutral-900)] dark:text-[var(--neutral-100)]">
              Menu
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[var(--neutral-100)] dark:hover:bg-[var(--neutral-700)] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-[var(--primary-100)] dark:bg-[var(--primary-900)] text-[var(--primary-700)] dark:text-[var(--primary-300)]'
                    : 'text-[var(--neutral-700)] dark:text-[var(--neutral-300)] hover:bg-[var(--neutral-100)] dark:hover:bg-[var(--neutral-700)]'
                }`}
                onClick={onClose}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-[var(--neutral-200)] dark:border-[var(--neutral-700)]">
            <h3 className="text-sm font-semibold text-[var(--neutral-900)] dark:text-[var(--neutral-100)] mb-4">
              Snelle acties
            </h3>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-left rounded-lg text-[var(--neutral-700)] dark:text-[var(--neutral-300)] hover:bg-[var(--neutral-100)] dark:hover:bg-[var(--neutral-700)] transition-colors">
                <span>➕</span>
                <span>Nieuwe medewerker</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-left rounded-lg text-[var(--neutral-700)] dark:text-[var(--neutral-300)] hover:bg-[var(--neutral-100)] dark:hover:bg-[var(--neutral-700)] transition-colors">
                <span>📋</span>
                <span>Sjabloon maken</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}