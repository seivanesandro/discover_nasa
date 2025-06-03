import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { devices } from "../../utils/constantes";

const Card = styled.div`
  width: 20rem;
  min-height: 26rem;
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
  border-radius: 16px;
  box-shadow: 0 4px 24px #000a;
  padding: 1.5rem 1rem 1.5rem 1rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  transition:
    transform 0.18s,
    box-shadow 0.18s;
  position: relative;
  overflow: hidden;
  &:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 8px 32px #000c;
    background: linear-gradient(135deg, #232526 0%, #2b5876 100%);
  }
  @media only screen and (${devices.iphone14}) {
    width: 95vw;
    min-width: 0;
    padding: 1rem 0.3rem 1rem 0.3rem;
  }
  @media only screen and (${devices.mobileG}) {
    width: 95vw;
    min-width: 0;
    padding: 1rem 0.3rem 1rem 0.3rem;
  }
  @media only screen and (${devices.mobileM}) {
    width: 95vw;
    min-width: 0;
    padding: 1rem 0.3rem 1rem 0.3rem;
  }
  @media only screen and (${devices.mobileP}) {
    width: 95vw;
    min-width: 0;
    padding: 1rem 0.3rem 1rem 0.3rem;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 11rem;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1.1rem;
  cursor: pointer;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(1.08) saturate(1.2);
  }
`;

const CardTitle = styled.h4`
  text-align: center;
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
  min-height: 2.5rem;
`;

const CardDesc = styled.p`
  font-size: 0.97rem;
  color: #e0e0e0;
  margin-bottom: 0.7rem;
  text-align: start;
  min-height: 3.5rem;
`;

const CardFooter = styled.div`
  margin-top: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 0.92rem;
  color: #f6ba43;
  gap: 0.2rem;
`;

const CardLibrary = ({ title, imgSrc, description, date, onClick }) => (
  <Card>
    <CardTitle style={{ textAlign: "center" }}>{title}</CardTitle>
    <CardImage src={imgSrc} alt={title} onClick={onClick} />
    <CardDesc>{description?.slice(0, 120)}...</CardDesc>
    <CardFooter>
      <span>Data: {date?.slice(0, 10)}</span>
      <span>Tipo: imagem</span>
    </CardFooter>
  </Card>
);

CardLibrary.propTypes = {
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  description: PropTypes.string,
  date: PropTypes.string,
  onClick: PropTypes.func, // para abrir lightbox, por exemplo
};

export default CardLibrary;
