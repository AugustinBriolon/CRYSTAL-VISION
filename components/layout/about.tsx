import Section from '@/components/shared/sections';

export default function About() {
  return (
    <Section color="white" id="about" className='p-2'>
      <div className="flex h-full w-full flex-col items-center justify-center bg-black rounded-4xl">
        <h2>About</h2>
        <p>This is the about section</p>
      </div>
    </Section>
  );
}
