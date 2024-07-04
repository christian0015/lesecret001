import React, { useEffect } from 'react';
// import Spline from '@splinetool/react-spline/next';

import Hero from './router-transitions (1)/src/App';
import './AppSimple.css';

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY / window.innerHeight;
      const elements = document.querySelectorAll('.effetZoomGray');

      elements.forEach((el, index) => {
        const zoomRangeAttr = el.getAttribute('zoomrange');
        const grayscaleRangeAttr = el.getAttribute('grayscaleRange');
        const marginBottomRangeAttr = el.getAttribute('marginBsRange');
        const marginLeftRangeAttr = el.getAttribute('margeLtRange');

        // Appliquer les effets uniquement si les attributs existent
        if (zoomRangeAttr) {
          const zoomRange = zoomRangeAttr.split(',').map(eval);
          const scaleFactor = 1 + scrollPos * (zoomRange[1] - zoomRange[0]) + zoomRange[0];
          el.style.transform = `scale(${scaleFactor})`;
        }

        if (grayscaleRangeAttr && el.tagName.toLowerCase() === 'img') {
          const grayscaleRange = grayscaleRangeAttr.split(',').map(eval);
          const grayscaleFactor = 0 + Math.max(0, Math.min(1, (scrollPos - grayscaleRange[0]) / (grayscaleRange[1] - grayscaleRange[0])));
          el.style.filter = `grayscale(${grayscaleFactor})`;
        }

        if (marginBottomRangeAttr) {
          const marginBottomRange = marginBottomRangeAttr.split(',').map(eval);
          // const marginBottomFactor = (scrollPos * marginBottomRange[0]) / (marginBottomRange[1] - marginBottomRange[0]);
          const marginBottomFactor = (scrollPos * marginBottomRange[0]);
          el.style.marginBottom = `${marginBottomFactor * 1000}px`; // Ajustez le multiplicateur selon vos besoins
        }

        if (marginLeftRangeAttr) {
          const marginLeftRange = marginLeftRangeAttr.split(',').map(eval);
          const marginLeftFactor = (scrollPos * marginLeftRange[0]) ;
          el.style.marginLeft = `${marginLeftFactor * 1000}px`; // Ajustez le multiplicateur selon vos besoins
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className='nonePlaySpace'><h1>Le Secret Longe Bar à Kinshasa Bandalunwa, RDC</h1></div>
      <div className='headSection'>
        <div className='headerContainer'>
          <header>
            <img src='logo1.jpg' className="header_logo"/>
            <nav>
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </nav>
          </header>   
        </div>
        <div className='heroBlock'>
          <div className='heroTextContainer'>
            <div><h1>Le Secret</h1> <h2>Lounge Bar</h2></div>
            <p>Découvrez Le Secret de Kinshasa, un lieu où l'élégance rencontre la convivialité.
               <span> Situé dans la dynamique commune de Kasa-Vubu, notre lounge bar et 
               restaurant vous invite à vivre des soirées inoubliables.</span>
            </p>
          </div>
          <div className='heroImageContainer'>
            {/* <img src='logo.jpg'width={100} className="heroImage" alt="heroImage" /> */}
            <iframe src='https://my.spline.design/untitled-a529becdc0a8fe2540616079c6b31bd6/' frameborder='0' width='100%' height='100%'></iframe>
        
          </div>
        </div>
      </div>
    
        {/* <Hero className='Hero'/> */}
        {/* <Spline 
        scene="https://prod.spline.design/Wd3ZukmY4zR3Gzur/scene.splinecode"
        /> */}
        {/* <iframe src='https://my.spline.design/untitled-a529becdc0a8fe2540616079c6b31bd6/' frameborder='0' width='100%' height='100%'></iframe> */}
        <div className="container">
        <div 
        className="image-container effetZoomGray" 
        // marginBsRange="-100,10"
        // margeLtRange="-1,0"
        >
        <img
          src="/assets/vin1.jpeg"
          zoomrange="0,1/2,3"
          grayscaleRange="2,1/11"
          // marginBsRange="-100,10"
          className="effetZoomGray"
          alt="Sample 1"
        />
      </div>
      <h2>Cocktails d'Exception</h2>

      <div className="image-container">
        <img
          src="/assets/cocktail2.jpg"
          zoomrange=".1/3,1/3,2"
          grayscaleRange="4,1/3"
          className="effetZoomGray"
          alt="Sample 2"
        />
      </div>

      <h2>Cuisine Exquise</h2>

      <div className="image-container">
        <img
          src="/assets/CuisineExquise1.jpg"
          zoomrange="3.5/5,2/4,"
          grayscaleRange="5,1/3"
          className="effetZoomGray"
          alt="Sample 3"
        />
      </div>

      <h2>Ouvert 16h-3h 7h/7</h2>
      <div className="image-container effetZoomGray" >
        <img
          src="/img3.jpg"
          zoomrange="4.9/5,3/4,"
          grayscaleRange="11,1/3"
          className="effetZoomGray"
          alt="Sample 3"
        />
      </div>
      


      <div
        zoomrange="2.9/3,2.4/3,3"
        grayscaleRange="5/3,1/3"
        className="effetZoomGray"
      >
        <p>
          Kinshasa, C/Kasavubu   <br />
          Tel: +243 81 88 88 88 <br />
          Email: info@bar.com <br />
          Nous contactez pour toute réservation.
        </p>
      </div>
      {/* Ajouter d'autres images ici */}
    </div>
    </div>
  );
}

export default App;
