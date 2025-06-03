import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { devices } from "../../utils/constantes";

const ErrorStyle = styled.span`
  color: #f6ba43 !important;
  font-size: 1.5rem;
  text-align: center;
  width: ${({ width }) => (width ? width : "100%")};
  @media only screen and (${devices.portatilL}) {
    font-size: 1.2rem;
  }
  @media only screen and (${devices.portatil}) {
    font-size: 1.1rem;
    width: 68%;
  }
  @media only screen and (${devices.portatilS}) {
    font-size: 1.1rem;
    width: 68%;
  }
  @media only screen and (${devices.tablet}) {
    font-size: 1rem;
    width: 85%;
  }
  @media only screen and (${devices.iphone14}) {
    font-size: 1rem;
    width: 85% !important;
  }
  @media only screen and (${devices.mobileG}) {
    font-size: 1rem;
    width: 85% !important;
  }
  @media only screen and (${devices.mobileM}) {
  }
  @media only screen and (${devices.mobileP}) {
    font-size: 0.8rem;
    width: 85% !important;
  }
`;

const ErrorComponent = ({ errmessage }) => {
  return (
    <>
      <ErrorStyle>ERROR: {errmessage}</ErrorStyle>
    </>
  );
};

ErrorComponent.propTypes = {
  errmessage: PropTypes.string.isRequired,
};

export default ErrorComponent;
