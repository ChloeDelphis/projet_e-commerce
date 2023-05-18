import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Carousel = ({ articles }) => {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  // => enleve une erreur sur le navigateur
  // "ResizeObserver loop limit exceeded"
  useEffect(() => {
    window.addEventListener("error", (e) => {
      if (e.message === "ResizeObserver loop limit exceeded") {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    });
  }, []);

  console.log(articles);

  return (
    <>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {articles &&
            articles
              .filter((val) => val.mea === 1)
              .map((val, index) => (
                <div key={index} className="embla__slide">
                  <Link to={`/productpage/${val.id}`}>
                    <img src={val.img} alt="image_carousel" />
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;
