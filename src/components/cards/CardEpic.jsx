import React from 'react'
import PropTypes from 'prop-types'
import ImgLightBoxComponent from "../imgLightBox/ImgLightBoxComponent";
import styled from 'styled-components';
import { devices } from '../../utils/constantes';

const CardEpicStyle = styled.div`
  margin-bottom: 20px;
  width: 18rem;
`;

const EpicCardapresentation = styled.p`
  text-align: start;
  padding-left: 1.8rem;

  @media only screen and (${devices.tablet}) {
    text-align: center;
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


const CardEpic = ({imageUrl, caption, date}) => {
  return (
    <>
      {" "}
      <CardEpicStyle
        className="epic-card"
        >
        <ImgLightBoxComponent
          imageUrl={imageUrl}
          caption={`${caption || "No legend!"} (${date})`}
        />
        <div className="epic-card-body text-center">
          <EpicCardapresentation>
            <strong>Date:</strong> {date}
          </EpicCardapresentation>
          <EpicCardapresentation>
            <strong>Legend:</strong> {caption}
          </EpicCardapresentation>
        </div>
      </CardEpicStyle>
    </>
  );
};

CardEpic.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

export default CardEpic;