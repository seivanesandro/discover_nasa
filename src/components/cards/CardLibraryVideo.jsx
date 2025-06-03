import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import VideoPlayerComponent from "../videoPlayerComponent/VideoPlayerComponent";
import { devices } from "../../utils/constantes";

const Card = styled.div`
  width: 40%;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 10px;
  box-shadow: 0 2px 16px #0006;
  padding: 1.2rem 1rem 1.5rem 1rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 24px #000a;
  }
  @media only screen and (${devices.iphone14}) {
    width: 95vw !important;
    min-width: 10em !important;
    padding: 1rem 0.3rem 1rem 0.3rem !important;
  }
`;

const ContianerDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  gap: 0.5rem;
`;

const ContainerDescriptionExtra = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
`;

const CardLibraryVideo = ({title, nasa_id, poster, description, date}) => (
  <Card>
    <h4 style={{textAlign: "center"}}>{title}</h4>
    <VideoPlayerComponent nasa_id={nasa_id} poster={poster} />
    <ContianerDescription className="contianer-description">
      <p className="text-start p-description">
        <strong className="p-description">Description: </strong>
        {description?.slice(0, 120)}...
      </p>
      <ContainerDescriptionExtra className="container-description-extra">
        <p className="text-start">
          <strong className="p-description">Data:</strong> {date?.slice(0, 10)}
        </p>
        <p className="text-start">
          <strong className="p-description">Type:</strong> vídeo
        </p>
      </ContainerDescriptionExtra>
    </ContianerDescription>
  </Card>
);

CardLibraryVideo.propTypes = {
  title: PropTypes.string.isRequired,
  nasa_id: PropTypes.string.isRequired,
  poster: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
};

export default CardLibraryVideo;
