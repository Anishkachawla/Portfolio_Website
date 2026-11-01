import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Process from './components/Process.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ChatWidget from './components/ChatWidget.jsx';
import useReveal from './hooks/useReveal.js';

export default function App() {
  useReveal();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Process />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
