import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { fetchUniverseThemes } from "../api/apiNasa";

import bgimg from "../assets/3-5000.jpg";
import Loading from "../components/loading/Loading";
import ErrorComponent from "../components/error/ErrorComponent";
import MessageComponent from "../components/message/MessageComponent";
import { devices } from "../utils/constantes";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import ButtonThemeUniverse from "../components/common/ButtonThemeUniverse";
import CardUniverse from "../components/cards/CardUniverse";

// global styled-components
const Show = keyframes`
    0%{
        opacity:0;
    }
    50%{
        opacity:0.5;
    }

    100%{
        opacity:1;
    }
`;

const Scale = keyframes`
    0% {
    transform: scale(0);
    opacity: 0;
  }
  50%{
    transform: scale(1.1);
    opacity: 1;
  }

  100% {
    transform: scale(1);
  }
`;

const ContainerLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10rem auto !important;
  animation: ${Scale} 2.1s ease-out;
  @media only screen and (${devices.tablet}) {
    margin: 3rem auto !important;
  }
`;

const ContainerError = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10rem auto !important;
  animation: ${Scale} 1.1s ease-out;
  @media only screen and (${devices.tablet}) {
    margin: 3rem auto !important;
  }
`;

const ContainerMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10rem auto !important;
  animation: ${Scale} 1.1s ease-out;
  @media only screen and (${devices.tablet}) {
    margin: 3rem auto !important;
  }
`;

const UniverseContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  background-image: url(${bgimg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  animation: ${Show} 1.5s ease-out;
  
  @media only screen and (${devices.tablet}) {
    background-position: center top;
    min-height: 100svh;
  }
`;

//styled-component page
const UniverseContainerHeader = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin: 18rem 35rem 1rem 35rem;
  align-items: center;
  animation: ${Scale} 1.1s ease-out;
  @media only screen and (${devices.vivusBook}) {
    margin: 18rem 16rem 1rem 16rem;
  }
  @media only screen and (${devices.portatilL}) {
    margin: 18rem 10rem 1rem 10rem;
  }
  @media only screen and (${devices.portatil}) {
    margin: 18rem 9rem 1rem 9rem;
  }

  @media only screen and (${devices.tablet}) {
    margin: 18rem 5rem 1rem 5rem;
  }
  @media only screen and (${devices.iphone14}),
    only screen and (${devices.mobileG}),
    only screen and (${devices.mobileP}) {
    margin: 13rem 0 1.5rem 0 !important;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0 3rem 0;
  @media only screen and (${devices.iphone14}),
    only screen and (${devices.mobileG}) {
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
  }
`;

const CardsGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;
  width: 100%;
  max-width: 80vw;
  margin: 10rem auto 20rem auto !important;
  @media only screen and (${devices.mobileP}) {
    max-width: 99vw;
    gap: 2rem;
  }
`;

const themeLabels = {
  universe: "Universe",
  cosmos: "Cosmos",
  galaxy: "Galaxy",
  stars: "Stars",
  jupiter: "Jupiter",
  saturn: "Saturn",
};

const UniversePage = () => {
  const [themeData, setThemeData] = useState({});
  const [selectedTheme, setSelectedTheme] = useState("universe");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUniverseThemes();
        setThemeData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Preparar slides para o lightbox
  const slides = (themeData[selectedTheme] || []).map((item) => ({
    src: item.links[0].href,
    title: item.data[0].title,
    description: item.data[0].description || "",
  }));

  return (
    <UniverseContainer className="universe-page-container container-fluid text-center">
      <UniverseContainerHeader className="universe-container-header">
        <h2 className="universe-title">Universe Discover</h2>
        <p className="universe-description">
          Welcome to Universe Discover! Here you can explore the wonders of the
          cosmos through NASA’s most stunning images. Dive into breathtaking
          galaxies, mysterious stars, and the beauty of planets like Jupiter and
          Saturn. Each theme below is a gateway to a visual journey—just click a
          button and let your curiosity guide you! Whether you’re a space
          enthusiast or just looking for inspiration, prepare to be amazed by
          the universe’s secrets, colors, and stories. Enjoy your cosmic
          adventure!
        </p>
      </UniverseContainerHeader>
      <ButtonsContainer className="universe-buttons-container">
        {Object.keys(themeLabels).map((theme) => (
          <ButtonThemeUniverse
            key={theme}
            active={selectedTheme === theme}
            onClick={() => setSelectedTheme(theme)}
          >
            {themeLabels[theme]}
          </ButtonThemeUniverse>
        ))}
      </ButtonsContainer>
      {loading ? (
        <ContainerLoading className="container-loading">
          <Loading speedborder="0.7" fonts="8" size="1" />
        </ContainerLoading>
      ) : error ? (
        <ContainerError className="container-error">
          <ErrorComponent
            errmessage={error.message || "Error fetching images."}
          />
        </ContainerError>
      ) : themeData[selectedTheme] && themeData[selectedTheme].length === 0 ? (
        <ContainerMessage className="container-message">
          <MessageComponent messageFetch="No images today found for this theme." />
        </ContainerMessage>
      ) : (
        <CardsGrid className="universe-cards-grid">
          {(themeData[selectedTheme] || []).map((item, idx) => (
            <CardUniverse
              key={item.data[0].nasa_id + idx}
              image={item.links[0].href}
              title={item.data[0].title}
              description={item.data[0].description?.slice(0, 180) || ""}
              onClick={() => {
                setLightboxIndex(idx);
                setLightboxOpen(true);
              }}
            />
          ))}
        </CardsGrid>
      )}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
        plugins={[Captions]}
      />
    </UniverseContainer>
  );
};

export default UniversePage;
