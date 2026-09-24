import Scene from './components/3d/Scene';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import TechStack from './sections/TechStack';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Services from './sections/Services';
import Process from './sections/Process';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import './styles/global.css';

export default function App() {
  return (
    <>
      <Scene />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <TechStack />
        <Projects />
        <Experience />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
