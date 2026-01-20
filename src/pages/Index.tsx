import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/gov/Header';
import Hero from '@/components/gov/Hero';
import Welcome from '@/components/gov/Welcome';
import Articles from '@/components/gov/Articles';
import Stats from '@/components/gov/Stats';
import Projects from '@/components/gov/Projects';
import Contact from '@/components/gov/Contact';
import Footer from '@/components/gov/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content">
          <Hero />
          <Welcome />
          <Articles />
          <Stats />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
