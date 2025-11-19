import { useActiveSectionContext } from '@/providers/active-section.provider';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Hook à utiliser dans les sections de la page pour définir la section active
 * @param sectionId - L'ID de la section (correspond au hash du lien, ex: 'about', 'catalog')
 */
export const useActiveSection = (sectionId: string) => {
  const { setActiveSection } = useActiveSectionContext();

  useGSAP(() => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => setActiveSection(sectionId),
      onEnterBack: () => setActiveSection(sectionId),
      onLeave: () => {
        // Ne pas désactiver si on scroll vers le haut
      },
      onLeaveBack: () => {
        // Ne pas désactiver si on scroll vers le bas
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [sectionId, setActiveSection]);
};
