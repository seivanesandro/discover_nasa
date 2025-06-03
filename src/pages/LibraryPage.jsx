import React, { useState, useEffect, useRef } from "react";
import { searchNasaMedia } from "../api/apiNasa";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import Loading from "../components/loading/Loading";
import ErrorComponent from "../components/error/ErrorComponent";
import MessageComponent from "../components/message/MessageComponent";

import { devices } from "../utils/constantes";
import bgimg from "../assets/2204A.jpg";
import bgimgmobile from "../assets/2204B.jpg"
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import CardLibrary from "../components/cards/CardLibrary";
import CardLibraryVideo from "../components/cards/CardLibraryVideo";

// TODO:: ajustar style em falta, fazer o style do input+btn, e o texto do header
// TODO:: adicionar elemento de ajuda para o utilizador ex para pesquisar 

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

const Scale2 = keyframes`
    0% {
    transform: scale(0);
    opacity: 0;
  }
  50%{
    opacity:0.5;
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const ContainerLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  animation: ${Scale} 2.1s ease-out;
`;

const ContainerError = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25rem auto !important;
  animation: ${Scale} 1.1s ease-out;
`;

const ContainerMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25rem auto !important;
  animation: ${Scale} 1.1s ease-out;
`;

const LibraryContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 5rem 0 3rem 0 !important; // FIXME: padding para incluir nas outras pages
  background-image: url(${bgimg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  animation: ${Show} 1.5s ease-out;

  @media only screen and (${devices.tablet}) {
    background-image: url(${bgimgmobile});
    padding: 2.5rem 0 1.5rem 0;
  }
`;

//styled-component page
const LibraryContainerHeader = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 13rem 25rem 5rem 25rem;
  text-align: left !important;
  animation: ${Scale} 1.1s ease-out;

  @media only screen and (${devices.vivusBook}) {
    margin: 10rem 8rem !important;
  }
  @media only screen and (${devices.portatilL}) {
    margin: 10rem 8rem !important;
  }

  @media only screen and (${devices.portatil}) {
    margin: 8rem 3rem !important;
  }
  @media only screen and (${devices.iphone14}) {
    margin: 8rem auto !important;
  }
  @media only screen and (${devices.mobileG}) {
    margin: 8rem auto !important;
  }
  @media only screen and (${devices.mobileP}) {
    margin: 8rem auto !important;
  }
`;

const LibraryContainerForm = styled.div``;

const LibraryFormStyle = styled.form`
  width: 100%;
  max-width: 32rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media only screen and (${devices.mobileP}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const LibraryContainerCards = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 6rem;
  max-width: 125rem;
  margin: 0 auto 10rem auto !important;
  min-height: 40vh;
  animation: ${Scale2} 1s ease-out;

  @media only screen and (${devices.portatilL}) {
    gap: 4rem;
  }
`;

function getLast7Days() {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  return { today, lastWeek };
}

const LibraryPage = (props) => {
  //useState for loading, error, data and ...
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const resultsRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [searchInput, setSearchInput] = useState(query);

  // useEffect to fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { today, lastWeek } = getLast7Days();
        const yearStart = lastWeek.getFullYear();
        const yearEnd = today.getFullYear();

        // Busca imagens e vídeos separadamente!
        const images = await searchNasaMedia(
          query,
          "image",
          yearStart,
          yearEnd,
        );
        const videos = await searchNasaMedia(
          query,
          "video",
          yearStart,
          yearEnd,
        );
        const result = [...images, ...videos];

        const unique = {};
        const deduped = result.filter((item) => {
          const id = item.data[0].nasa_id;
          if (unique[id]) return false;
          unique[id] = true;
          return true;
        });

        // ORDENAR por data (mais recente primeiro)
        deduped.sort((a, b) => {
          const dateA = new Date(a.data[0].date_created);
          const dateB = new Date(b.data[0].date_created);
          return dateB - dateA; // mais recente primeiro
        });

        // Filtro dos últimos 7 dias
        let filtered = deduped
          .filter((item) => {
            const date = new Date(item.data[0].date_created);
            return date >= lastWeek && date <= today;
          })
          .slice(0, 40);

        // Se não houver resultados filtrados, pega os primeiros 40 resultados
        if (filtered.length === 0) {
          filtered = result.slice(0, 40);
        }

        setData(filtered);
      } catch (err) {
        setError(new Error("Failed to fetch data from NASA."));
        setData([]);
      }
      setLoading(false);
    };

    fetchData();
  }, [query]);

  //array de slides só com imagens
  const imageSlides = data
    .filter(
      (item) =>
        item.data[0].media_type === "image" && item.links && item.links[0],
    )
    .map((item) => ({
      src: item.links[0].href,
      title: item.data[0].title,
    }));

  return (
    <LibraryContainer className="library-container">
      <LibraryContainerHeader className="library-container-header">
        <h2 className="library-title"> Your Portal to the Cosmos' Data</h2>
        <p className="library-description">
          Unleash the power of space exploration in your applications! The{" "}
          <strong>NASA APIs</strong> offer a vast and ever-growing collection of
          public data from humanity's leading space agency.
        </p>
        <p className="library-description">
          ccess everything from stunning{" "}
          <strong>Astronomy Pictures of the Day to Mars Rover imagery</strong>,
          real-time Earth observation data, and detailed information on
          near-Earth objects.{" "}
        </p>
        <p className="library-description">
          Whether you're building educational tools, space-themed games, or
          cutting-edge research applications, this library provides the
          authentic, high-quality data you need to bring your cosmic visions to
          life. Start building beyond Earth, one API call at a time!
        </p>
      </LibraryContainerHeader>
      <LibraryContainerForm className="library-container-form">
        <LibraryFormStyle
          action=""
          className="library-form-style"
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(searchInput);
            navigate(`?q=${encodeURIComponent(searchInput)}`);
            setTimeout(() => {
              resultsRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }, 100);
          }}>
          <input
            type="text"
            className="library-input-search form-control"
            name="search"
            placeholder="Search for videos or images of NASA..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <input type="submit" value="Search" className="btn btn-light" />
        </LibraryFormStyle>
      </LibraryContainerForm>
      <LibraryContainerCards
        className="library-container-cards"
        ref={resultsRef}>
        {loading ? (
          <ContainerLoading>
            <Loading speedborder="0.7" fonts="8" size="1" />
          </ContainerLoading>
        ) : error ? (
          <ContainerError>
            <ErrorComponent errmessage={error.message || error.toString()} />
          </ContainerError>
        ) : !data || data.length === 0 ? (
          <ContainerMessage>
            <MessageComponent
              messageFetch={`No data for: ${query}`}
              width="87%"
            />
          </ContainerMessage>
        ) : (
          data.map((item) => {
            const dataItem = item.data[0];
            const link = item.links && item.links[0];
            if (dataItem.media_type === "image" && link) {
              return (
                <CardLibrary
                  key={dataItem.nasa_id}
                  title={dataItem.title}
                  imgSrc={link.href}
                  description={dataItem.description}
                  date={dataItem.date_created}
                  onClick={() => {
                    const idx = imageSlides.findIndex(
                      (img) => img.src === link.href
                    );
                    setLightboxIndex(idx);
                    setLightboxOpen(true);
                  }}
                />
              );
            }
            if (dataItem.media_type === "video") {
              return (
                <CardLibraryVideo
                  key={dataItem.nasa_id}
                  title={dataItem.title}
                  nasa_id={dataItem.nasa_id}
                  poster={link?.href}
                  description={dataItem.description}
                  date={dataItem.date_created}
                />
              );
            }
            return null;
          })
        )}
        {lightboxOpen && (
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            slides={imageSlides}
            index={lightboxIndex}
            plugins={[Captions]}
          />
        )}
      </LibraryContainerCards>
    </LibraryContainer>
  );
};

LibraryPage.propTypes = {};

export default LibraryPage;
