import { useEffect } from 'react';

export default function useImageEffects() {
  useEffect(() => {
    const images = document.querySelectorAll('img.effetZoomGray');

    const handleScroll = () => {
      const scrollY = window.scrollY;
      images.forEach((img) => {
        const zoomRange = img.getAttribute('zoomRange').split(',').map(Number);
        const grayRange = img.getAttribute('grayRange').split(',').map(Number);

        const zoomValue = 1 + (scrollY / (document.body.scrollHeight - window.innerHeight)) * (zoomRange[1] - zoomRange[0]) + zoomRange[0];
        const grayValue = 1 - (scrollY / (document.body.scrollHeight - window.innerHeight)) * (grayRange[1] - grayRange[0]) + grayRange[0];

        img.style.transform = `scale(${zoomValue})`;
        img.style.filter = `grayscale(${grayValue})`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
