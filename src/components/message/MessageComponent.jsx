import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { devices } from "../../utils/constantes";

const MessageStyle = styled.span`
  color: #f6ba43 !important;
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  width: ${({ width }) => (width ? width : "100%")};
  padding: 2rem 3rem 2rem 3rem;

  @media only screen and (${devices.portatilL}) {
    font-size: 1.2rem !important;
  }
`;

const MessageComponent = ({ messageFetch, width }) => {
  return (
    <>
      <MessageStyle width={width} className="message-fetch">
        {messageFetch}
      </MessageStyle>
    </>
  );
};

MessageComponent.propTypes = {
  messageFetch: PropTypes.string.isRequired,
  width: PropTypes.string,
};

export default MessageComponent;
