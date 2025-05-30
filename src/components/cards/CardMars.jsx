import React from "react";
import PropTypes from "prop-types";
import ImgLightBoxComponent from "../imgLightBox/ImgLightBoxComponent";
import styled from "styled-components";
import { devices } from "../../utils/constantes";

const CardMarsStyle = styled.div`
  margin-bottom: 20px;
  width: 16rem;
  border: 1px solid rgba(249, 205, 116, 28%) !important;
  border-radius: 6px;
  background: #222;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(249, 205, 116, 28%);
  }
`;

const MarsPhotosContainer = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: #000;
  border-radius: 6px;
  transition: transform 0.3s ease-in-out;
`;

const MarsPhotoInfo = styled.div`
  &.card-body {
    background-color: transparent !important;
    color: #fff;
    padding: 0.5rem;
  }
`;

const MarsCardapresentation = styled.p`
  text-align: start;
  padding-left: 1.2rem;

  @media only screen and (${devices.tablet}) {
    text-align: center;
    padding-left: 0;
  }
  @media only screen and (${devices.iphone14}) {
    text-align: center !important;
    padding-left: 0.3rem !important;
  }
  @media only screen and (${devices.mobileG}) {
    text-align: center !important;
    padding-left: 0.3rem !important;
  }
`;

const CardMars = ({
  imageUrl,
  caption,
  date,
  name,
  fullname,
  earthdate,
  onImageClick,
}) => {
  return (
    <>
      {" "}
      <CardMarsStyle className="mars-card card">
        <MarsPhotosContainer className="d-flex justify-content-center align-items-center mars-photos-container">
          <ImgLightBoxComponent
            imageUrl={imageUrl}
            caption={`${caption || "No legend!"} (${date})`}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
              display: "block",
              margin: "0 auto",
            }}
            onClick={onImageClick}
          />
        </MarsPhotosContainer>
        <MarsPhotoInfo className=" mars-photo-info text-center p-2">
          <MarsCardapresentation className="card-text my-1">
            <strong className="mb-0">Rover:</strong> {name}
          </MarsCardapresentation>
          <MarsCardapresentation className="card-text my-1">
            <strong className="mb-0">Camera:</strong> {fullname}
          </MarsCardapresentation>
          <MarsCardapresentation className="card-text my-1">
            <strong className="mb-0">Date:</strong> {earthdate}
          </MarsCardapresentation>
        </MarsPhotoInfo>
      </CardMarsStyle>
    </>
  );
};

CardMars.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  name: PropTypes.string,
  fullname: PropTypes.string,
  earthdate: PropTypes.string,
  onImageClick: PropTypes.func.isRequired,
};

export default CardMars;
