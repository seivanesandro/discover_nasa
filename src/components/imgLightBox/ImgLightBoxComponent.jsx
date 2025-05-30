//import PropTypes from 'prop-types'
import PropTypes from "prop-types";
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

const ImgLightBoxComponent = ({imageUrl, caption, onClick}) => {

  return (
    <>
      <StyleImgLighBox
        src={imageUrl}
        alt={caption}
        onClick={ onClick}
      />

    </>
  );
};

ImgLightBoxComponent.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImgLightBoxComponent;
