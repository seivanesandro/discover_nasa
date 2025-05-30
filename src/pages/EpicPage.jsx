import React, { useState, useEffect } from "react";
import Loading from "../components/loading/Loading";
import styled, { keyframes } from "styled-components";
import { fetchEpicImagesByDate } from "../api/apiNasa";
import { devices } from "../utils/constantes";
import bgimg from "../assets/artwork.png";
import ErrorComponent from "../components/error/ErrorComponent";
import MessageComponent from "../components/message/MessageComponent";
import CardEpic from "../components/cards/CardEpic";
//import PropTypes from "prop-types";

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
  margin: 25rem auto !important;
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

const EpicContainer = styled.div`
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
  
  animation: ${Show} 1.5s ease-out;
  @media only screen and (max-width: 768px) {
    background-position: center top;
    min-height: 100svh;
  }
`;

//styled-component page
const EpicContainerHeader = styled.div`
  &.epic-container-header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin: 20rem auto 0rem auto;
    animation: ${Scale} 1.1s ease-out;
  }
`;

const EpicDataTime = styled.div`
  &.epic-data-time {
    margin: 2rem auto 1rem auto;
    font-size: 1.2rem;
    text-align: center;
  }
  &strong {
    margin: 2rem auto;
  }
`;

const Epiccontainercard = styled.div`
  &.epic-container-card {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    max-width: 125rem;
    margin: 0 auto 25rem auto !important;
    animation: ${Scale2} 1s ease-out;
  }

  @media only screen and (${devices.fourk}) {
    &.container-card-epic {
      gap: 2rem;
    }
  }
  @media only screen and (${devices.portatilL}) {
    &.container-card-epic {
      gap: 1rem;
    }
  }
`;

const EpicPage = () => {
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  // Função para procurar o dia mais recente com imagens (até 7 dias atrás)
  async function fetchMostRecentEpicImages(maxDays = 7) {
    const today = new Date();
    for (let i = 0; i < maxDays; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      try {
        const response = await fetchEpicImagesByDate(dateStr);
        if (response && response.length > 0) {
          return { images: response, date: dateStr };
        }
      } catch (err) {
        // Se der erro, tenta o dia anterior
        continue;
      }
    }
    return { images: [], date: null };
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoad(true);
      setError(null);
      try {
        const { images, date } = await fetchMostRecentEpicImages(7);
        setData(images);
        setSelectedDate(date);
      } catch (err) {
        setError(
          new Error("Failed to fetch EPIC images. Please try again later."),
        );
      } finally {
        setLoad(false);
      }
    };

    fetchData();
  }, []);

  if (load) {
    return (
      <ContainerLoading className="d-flex justify-content-center align-items-center my-5">
        <Loading speedborder="0.7" fonts="8" size="1" />
      </ContainerLoading>
    );
  }

  if (error) {
    return (
      <ContainerError>
        <ErrorComponent errmessage={error.message} />
      </ContainerError>
    );
  }

  if (!data || data.length === 0) {
    return (
      <ContainerMessage>
        <MessageComponent messageFetch="No image in this day" />
      </ContainerMessage>
    );
  }

  return (
    <>
      <EpicContainer className="epicpage container-fluid text-center">
        <EpicContainerHeader className="epic-container-header">
          <h2 className="epic-title">
            EPIC - Earth Polychromatic Imaging Camera
          </h2>
          <p className="container-description-epic">
            The EPIC camera onboard the NOAA/NASA DSCOVR spacecraft takes images
            of the entire sunlit side of Earth every two hours.
            <br />
            <em>
              The images are used to monitor the Earth's atmosphere, weather,
              and climate.
            </em>
          </p>
          <EpicDataTime className="epic-data-time">
            {data && data.length > 0 && selectedDate && (
              <>
                <strong>Date of images:</strong> {selectedDate}
              </>
            )}
          </EpicDataTime>
        </EpicContainerHeader>

        <hr />
        <Epiccontainercard className="epic-container-card">
          {data &&
            data.slice(0, 40).map((item) => {
              const date = item.date.split(" ")[0];
              const [year, month, day] = date.split("-");
              const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${item.image}.png`;

              return (
                <CardEpic
                  key={item.identifier}
                  imageUrl={imageUrl}
                  caption={item.caption}
                  date={item.date}
                />
              );
            })}
        </Epiccontainercard>
      </EpicContainer>
    </>
  );
};

EpicPage.propTypes = {};

export default EpicPage;
