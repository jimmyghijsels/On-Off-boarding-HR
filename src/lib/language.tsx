'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'nl' | 'en';

interface Translations {
  // Header
  appTitle: string;
  appSubtitle: string;
  newEmployee: string;
  backToOverview: string;

  // Dashboard
  overview: string;
  activeEmployees: string;
  inOnboarding: string;
  inOffboarding: string;
  allEmployees: string;
  noEmployees: string;
  noEmployeesDesc: string;
  addFirstEmployee: string;

  // Table headers
  employee: string;
  department: string;
  position: string;
  startDate: string;
  status: string;
  actions: string;
  viewDetails: string;

  // Status labels
  active: string;
  onboarding: string;
  offboarding: string;

  // New employee form
  addNewEmployee: string;
  enterDetails: string;
  fullName: string;
  email: string;
  startDateLabel: string;
  cancel: string;
  addEmployee: string;

  // Employee detail
  offboardEmployee: string;
  offboardDesc: string;
  startOffboarding: string;
  onboardingTasks: string;
  offboardingTasks: string;
  completed: string;
  completeOnboarding: string;
  noTasks: string;
}

const translations: Record<Language, Translations> = {
  nl: {
    appTitle: 'HR On/Offboarding',
    appSubtitle: 'Medewerkersbeheer Systeem',
    newEmployee: 'Nieuwe werknemer',
    backToOverview: 'Terug naar overzicht',
    overview: 'Overzicht',
    activeEmployees: 'Actieve werknemers',
    inOnboarding: 'In onboarding',
    inOffboarding: 'In offboarding',
    allEmployees: 'Alle werknemers',
    noEmployees: 'Geen werknemers gevonden',
    noEmployeesDesc: 'Voeg je eerste werknemer toe om te beginnen met het onboardingsproces.',
    addFirstEmployee: 'Eerste werknemer toevoegen',
    employee: 'Werknemer',
    department: 'Afdeling',
    position: 'Functie',
    startDate: 'Startdatum',
    status: 'Status',
    actions: 'Acties',
    viewDetails: 'Details bekijken →',
    active: 'Actief',
    onboarding: 'Onboarding',
    offboarding: 'Offboarding',
    addNewEmployee: 'Nieuwe werknemer toevoegen',
    enterDetails: 'Voer de gegevens in om een nieuwe werknemer te onboarden.',
    fullName: 'Volledige naam',
    email: 'E-mailadres',
    startDateLabel: 'Startdatum',
    cancel: 'Annuleren',
    addEmployee: 'Werknemer toevoegen',
    offboardEmployee: 'Werknemer offboarden',
    offboardDesc: 'Start het offboarding proces om alle benodigde taken te doorlopen wanneer een werknemer uit dienst gaat.',
    startOffboarding: 'Start offboarding',
    onboardingTasks: 'Onboarding taken',
    offboardingTasks: 'Offboarding taken',
    completed: 'voltooid',
    completeOnboarding: 'Onboarding voltooien',
    noTasks: 'Geen taken.',
  },
  en: {
    appTitle: 'HR On/Offboarding',
    appSubtitle: 'Employee Management System',
    newEmployee: 'New Employee',
    backToOverview: 'Back to Overview',
    overview: 'Overview',
    activeEmployees: 'Active Employees',
    inOnboarding: 'In Onboarding',
    inOffboarding: 'In Offboarding',
    allEmployees: 'All Employees',
    noEmployees: 'No employees found',
    noEmployeesDesc: 'Add your first employee to start the onboarding process.',
    addFirstEmployee: 'Add First Employee',
    employee: 'Employee',
    department: 'Department',
    position: 'Position',
    startDate: 'Start Date',
    status: 'Status',
    actions: 'Actions',
    viewDetails: 'View Details →',
    active: 'Active',
    onboarding: 'Onboarding',
    offboarding: 'Offboarding',
    addNewEmployee: 'Add New Employee',
    enterDetails: 'Enter the details to onboard a new employee.',
    fullName: 'Full Name',
    email: 'Email Address',
    startDateLabel: 'Start Date',
    cancel: 'Cancel',
    addEmployee: 'Add Employee',
    offboardEmployee: 'Offboard Employee',
    offboardDesc: 'Start the offboarding process to complete all necessary tasks when an employee leaves.',
    startOffboarding: 'Start Offboarding',
    onboardingTasks: 'Onboarding Tasks',
    offboardingTasks: 'Offboarding Tasks',
    completed: 'completed',
    completeOnboarding: 'Complete Onboarding',
    noTasks: 'No tasks.',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('nl');

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}