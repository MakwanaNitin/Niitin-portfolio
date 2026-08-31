import React, { useState } from 'react';
import Boot from './components/Boot';
import Dock from './components/Dock';
import Hero from './components/Hero';
import ChoosePath from './components/ChoosePath';
import About from './components/About';
import Work from './components/Work';
import TechMap from './components/TechMap';
import Journey from './components/Journey';
import Stats from './components/Stats';
import CurrentlyBuilding from './components/CurrentlyBuilding';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <Boot onComplete={() => setBooted(true)} />}
      <Dock />
      <Hero />
      <ChoosePath />
      <About />
      <Work />
      <Stats />
      <TechMap />
      <Journey />
      <CurrentlyBuilding />
      <Certificates />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
