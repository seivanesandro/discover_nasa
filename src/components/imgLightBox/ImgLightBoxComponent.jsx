//import PropTypes from 'prop-types'
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import styled, { keyframes } from "styled-components";

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

const StyleImgLighBox = styled.img`
  width: 200px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s;
  animation: ${Show} 2.5s ease-out; 

  &:hover {
    transform: scale(1.03);
  }
`;

const ImgLightBoxComponent = ({ imageUrl, caption }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyleImgLighBox
        src={imageUrl}
        alt={caption}
        onClick={() => setOpen(true)}
      />
      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[{ src: imageUrl, title: caption }]}
          plugins={[Captions]}
        />
      )}
    </>
  );
};

ImgLightBoxComponent.propTypes = {};

export default ImgLightBoxComponent;
