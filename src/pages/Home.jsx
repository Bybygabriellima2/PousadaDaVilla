// ============================================
// 10. src/pages/Home.jsx - COMPLETO
// ============================================
import React, { useContext, useEffect } from 'react';
import { PagesContext } from '../contexts/PagesContext';
import Carousel from '../components/Carousel';
import InfoSection from '../components/InfoSection';

function Home() {
  const { isComponentActive, fetchPageComponents } = useContext(PagesContext);

  useEffect(() => {
    fetchPageComponents('home');
  }, []);

  return (
    <>
      {isComponentActive('home', 'carousel') && <Carousel />}
      {isComponentActive('home', 'info_section') && <InfoSection />}
    </>
  );
}

export default Home;