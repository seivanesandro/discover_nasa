import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { devices } from "../../utils/constantes";

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

const Card = styled.div`
  background: rgba(34, 34, 34, 0.97);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  width: 100%;
  max-width: 700px;
  min-width: 270px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${Scale} 1.5s ease-out;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.025);
  }
  @media only screen and (${devices.mobileP}) {
    max-width: 99vw;
    min-width: 0;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  background: #111;
  animation: ${Show} 1.5s ease-out;
  @media only screen and (${devices.mobileP}) {
    height: 220px;
  }
`;

const CardTitle = styled.h3`
  color: #f9cd74;
  font-size: 1.3rem;
  margin: 1.2rem 0 0.5rem 0;
  text-align: center;
`;

const CardDesc = styled.p`
  color: #f9f9f9;
  font-size: 1.08rem;
  margin: 0 1.5rem 1.5rem 1.5rem;
  text-align: center;
`;

const CardUniverse = ({ image, title, description, onClick }) => (
  <Card>
    <CardImage
      src={image}
      alt={title}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    />
    <CardTitle>{title}</CardTitle>
    <CardDesc>{description}</CardDesc>
  </Card>
);

CardUniverse.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func,
};

export default CardUniverse;
