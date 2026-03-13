'use client';

import { Employee } from '@/types/employee';

interface ExportButtonProps {
  employees: Employee[];
  filename?: string;
}

export function ExportButton({ employees, filename = "medewerkers" }: ExportButtonProps) {
  const exportToCSV = () => {
    if (employees.length === 0) return;

    // Define CSV headers
    const headers = [
      'Naam',
      'E-mail',
      'Afdeling',
      'Functie',
      'Startdatum',
      'Status',
      'Aangemaakt op'
    ];

    // Convert employees to CSV rows
    const csvRows = employees.map(employee => [
      employee.name,
      employee.email,
      employee.department,
      employee.position,
      employee.startDate ? new Date(employee.startDate).toLocaleDateString('nl-NL') : '',
      employee.status === 'active' ? 'Actief' :
      employee.status === 'onboarding' ? 'Onboarding' : 'Offboarding',
      employee.createdAt ? new Date(employee.createdAt).toLocaleDateString('nl-NL') : ''
    ]);

    // Combine headers and rows
    const csvContent = [headers, ...csvRows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={exportToCSV}
      disabled={employees.length === 0}
      className="inline-flex items-center px-4 py-2 bg-[var(--neutral-100)] text-[var(--neutral-700)] border border-[var(--neutral-300)] rounded-lg hover:bg-[var(--neutral-200)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
    >
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Export CSV
    </button>
  );
}