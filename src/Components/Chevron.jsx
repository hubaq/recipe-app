/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

function Chevron({ heroRef, headerRef }) {
  const chevronRef = useRef();

  useEffect(() => {
    const currentHero = heroRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          chevronRef.current.style.display = "none"; 
        } else {
          chevronRef.current.style.display = "flex"; 
        }
      },
      {
        root: null, 
        threshold: 0, 
      }
    );

    if (currentHero) {
      observer.observe(currentHero);
    }

    return () => {
      if (currentHero) {
        observer.unobserve(currentHero);
      }
    };
  }, [heroRef]); 

  const scrollUp = () => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      onClick={scrollUp}
      ref={chevronRef}
      className="fixed bottom-10 right-10 bg-secondary z-50 w-20 h-20  rounded-full cursor-pointer transition-all duration-150 hover:bg-tertiary flex items-center justify-center"
    >
      <img src="down.svg" alt="Scroll up" width="30px" />
    </div>
  );
}

export default Chevron;
