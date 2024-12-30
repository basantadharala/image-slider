import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./styles.css";

export default function ImageSlider({ url, limit = 5, page = 1 }) {
  const [images, setImages] = useState([]);
  const [currentSlides, setCurrentSlides] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);

      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      setErrorMsg(e.message);
      setLoading(false);
    }
  }

  function handlePrevious() {
    setCurrentSlides(
      currentSlides === 0 ? images.length - 1 : currentSlides.length - 1
    );
  }
  function handleNext() {
    setCurrentSlides(
      currentSlides === images.length - 1 ? 0 : currentSlides + 1
    );
  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  console.log(images);

  if (loading) {
    return <div>Loading data ! please wait</div>;
  }
  if (errorMsg !== null) {
    return <div>Error ocurred ! {errorMsg}</div>;
  }
  return (
    <div className="box">
      <div className="container">
        <BsArrowLeftCircleFill
          onClick={handlePrevious}
          className="arrow arrow-left"
        />
        {images && images.length
          ? images.map((imageItems, index) => (
              <img
                key={imageItems.id}
                src={imageItems.download_url}
                alt={imageItems.download_url}
                className={
                  currentSlides === index
                    ? "current-image"
                    : "current-image hide-current-image"
                }
              />
            ))
          : null}
        <BsArrowRightCircleFill
          onClick={handleNext}
          className="arrow arrow-right"
        />
        <span className="circle-indicators">
          {images && images.length
            ? images.map((_, index) => (
                <button
                  key={index}
                  className={
                    currentSlides === index
                      ? "current-indicator"
                      : "current-indicator inactive-indicator"
                  }
                  onClick={() => setCurrentSlides(index)}
                ></button>
              ))
            : null}
        </span>
      </div>
    </div>
  );
}
