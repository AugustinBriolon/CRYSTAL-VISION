import { animateContactAnimations, ContactRefs } from '@/services/layout/contact.service';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import Section from '../shared/sections';
import { Button } from '../ui/button';

export default function Contact() {


  const refs: ContactRefs = {
    sectionContainer: useRef<HTMLDivElement>(null),
    title: useRef<HTMLHeadingElement>(null),
    button: useRef<HTMLButtonElement>(null),
  };

  useGSAP(() => {
    animateContactAnimations(refs);
  }, []);

  return (
    <Section
      ref={refs.sectionContainer}
      className="py-y-double-default h-fit! min-h-fit!"
      color="black"
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 rounded-4xl">
        <h2 ref={refs.title} className="w-full text-center text-balance">
          SUBSCRIBE TO GET EARLY ACCESS TO NEW COLLECTIONS BEFORE THEY LAUNCH.
        </h2>
        <Button
          ref={refs.button}
          className="border border-white bg-transparent px-8 py-2 text-white"
        >
          Order Now
        </Button>
      </div>
    </Section>
  );
}
