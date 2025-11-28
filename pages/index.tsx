import About from '@/components/layout/about';
import Catalog from '@/components/layout/catalog';
import Contact from '@/components/layout/contact';
import Hero from '@/components/layout/hero';
import LimitedEdition from '@/components/layout/limited-edition';
import Influencer from '@/components/layout/influencer';

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Catalog />
      <LimitedEdition />
      <Influencer />
      <Contact />
    </>
  );
}
