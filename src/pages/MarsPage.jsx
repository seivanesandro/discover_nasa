import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { fetchLatestSol, fetchMarsPhotos } from "../api/apiNasa";
import ErrorComponent from "../components/error/ErrorComponent";
import MessageComponent from "../components/message/MessageComponent";
import Loading from "../components/loading/Loading";
import { devices } from "../utils/constantes";
import bgimg from "../assets/marsai.png";
import CardMars from "../components/cards/CardMars";
// import PropTypes from 'prop-types'

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

const MarsContainer = styled.div`
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
const MarsContainerHeader = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 20rem 35rem 10rem 35rem;
  text-align: left !important;
  animation: ${Scale} 1.1s ease-out;

  @media only screen and (${devices.portatilL}) {
    margin: 20rem 8rem;
  }
  @media only screen and (${devices.portatil}) {
    margin: 20rem 3rem !important;
  }
  @media only screen and (${devices.iphone14}) {
    margin: 20rem auto !important;
  }
  @media only screen and (${devices.mobileG}) {
    margin: 20rem auto !important;
  }
  @media only screen and (${devices.mobileP}) {
    margin: 20rem auto !important;
  }
`;

const MarsSelectedRover = styled.select`
  font-size: 1.2rem;
  text-align: center;
  width: 50%;
  margin: 5rem auto;

  outline: none !important;
  background: #222222 !important;
  color: #f9cd74 !important;
  border: 1px solid rgba(249, 205, 116, 28%) !important;
  border-radius: 4px !important;
  padding: 0.5rem !important;

  &:hover {
    border: 1px solid rgba(249, 205, 116, 28%) !important;
    outline: none !important;
  }
  &:active {
    border: 1px solid rgba(249, 205, 116, 28%) !important;
    outline: none !important;
    box-shadow: none !important;
  }
  &:focus {
    border: 1px solid rgba(249, 205, 116, 28%) !important;
    outline: none !important;
    box-shadow: none !important;
  }
`;

const MarsContainerCards = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 6rem;
  max-width: 125rem;
  margin: 0 auto 25rem auto !important;
  animation: ${Scale2} 1s ease-out;

  @media only screen and (${devices.portatilL}) {
    gap: 4rem;
  }
`;

const MarsPage = (props) => {
  const [selectedRover, setSelectRover] = useState("curiosity");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchMostRecentMarsPhotos(rover, maxTries = 10) {
    let latestSol = await fetchLatestSol(rover);
    for (let i = 0; i < maxTries; i++) {
      try {
        const data = await fetchMarsPhotos({ rover, sol: latestSol - i });
        if (data.photos && data.photos.length > 0) {
          return data.photos;
        }
      } catch (err) {
        continue;
      }
    }
    return [];
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const photos = await fetchMostRecentMarsPhotos(selectedRover, 10);
        setPhotos(photos || []);
      } catch (err) {
        console.error("ERRO REAL:", err);
        setError(new Error("Failed to fetch photos."));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedRover]);

  if (loading) {
    return (
      <ContainerLoading className="d-flex justify-content-center align-items-center my-5">
        <Loading speedborder="0.7" fonts="8" size="1" />
      </ContainerLoading>
    );
  }

  if (error) {
    return (
      <ContainerError>
        <ErrorComponent errmessage={error.message || error.toString()} />
      </ContainerError>
    );
  }

  if (!photos || photos.length === 0) {
    return (
      <ContainerMessage>
        <MessageComponent messageFetch="No image in this day" />
      </ContainerMessage>
    );
  }

  return (
    <MarsContainer className="mars-container container-fluid text-center">
      <MarsContainerHeader className="mars-container-header">
        <h2 className="mars-title">
          Exploring Mars: A Gallery of NASA Rover Photos
        </h2>
        <p className="mars-description">
          Welcome to our window to the Red Planet! Dive deep into the wonders of
          Martian exploration through an incredible collection of
          <em>photographs captured directly by NASA's rovers</em> traversing the
          surface of Mars.
        </p>
        <p className="mars-description">
          We use the official <strong>NASA Mars Rover Photos API</strong> to
          bring you fascinating images, from the dusty landscapes and enigmatic
          rock formations to authentic "selfies" of the rovers themselves. Each
          picture tells a part of the story in our quest to understand Mars'
          past and present.
        </p>
        <p className="mars-description">
          Explore the discoveries made by the{" "}
          <strong>
            Spirit, Opportunity, Curiosity, and Perseverance rovers
          </strong>
          , and witness firsthand the advancements in space science and
          engineering. Get ready for a visual journey that will take you
          millions of miles away, directly to the surface of a neighboring
          world.
        </p>
      </MarsContainerHeader>
      <MarsSelectedRover
        className="form-select mars-selected-rover"
        aria-label="Select a Mars Rover"
        id="select-rover"
        value={selectedRover}
        onChange={(e) => setSelectRover(e.target.value)}
      >
        <option value="curiosity">Curiosity</option>
        <option value="perseverance">Perseverance</option>
      </MarsSelectedRover>
      <MarsContainerCards className="mars-container-cards">
        {photos.slice(0, 20).map((photo) => (
          <CardMars
            key={photo.id}
            imageUrl={photo.img_src}
            caption={photo.camera.name}
            date={photo.earth_date}
            name={photo.rover.name}
            fullname={photo.camera.full_name}
            earthdate={photo.earth_date}
          />
        ))}
      </MarsContainerCards>
    </MarsContainer>
  );
};

MarsPage.propTypes = {};

export default MarsPage;
