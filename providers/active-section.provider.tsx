import { createContext, useContext, useState, ReactNode } from 'react';

interface ActiveSectionContextType {
  activeSection: string | null;
  setActiveSection: (section: string | null) => void;
}

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined);

export const ActiveSectionProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  console.log(activeSection);

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
};

export const useActiveSectionContext = () => {
  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error('useActiveSectionContext must be used within ActiveSectionProvider');
  }
  return context;
};
