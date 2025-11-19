import About from '@/components/layout/about';
import Catalog from '@/components/layout/catalog';
import Contact from '@/components/layout/contact';
import Hero from '@/components/layout/hero';
import Influencer from '@/components/layout/influencer';
import LimitedEdition from '@/components/layout/limited-edition';

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Catalog />
      <Influencer />
      <LimitedEdition />
      <Contact />
    </>
  );
}
