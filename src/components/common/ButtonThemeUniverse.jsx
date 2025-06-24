import React from "react";
import styled from "styled-components";
import { devices } from "../../utils/constantes";
import PropTypes from "prop-types";

const ThemeButton = styled.button`
  background: #222;
  color: #f9cd74;
  border: 2px solid #f9cd74;
  border-radius: 8px;
  font-size: 1.3rem;
  font-family: inherit;
  padding: 1rem 2.5rem;
  cursor: pointer;
  font-weight: 700;
  transition: background 0.2s, color 0.2s;
  width: auto;
  @media only screen and (${devices.iphone14}), only screen and (${devices.mobileG}) {
    width: 100%;
    min-width: 220px;
    max-width: 400px;
  }
  &:hover {
    background: #f9cd74;
    color: #222;
  }
`;

const ButtonThemeUniverse = ({ active, children, ...props }) => (
  <ThemeButton
    style={{
      background: active ? "#f9cd74" : undefined,
      color: active ? "#222" : undefined,
    }}
    {...props}
  >
    {children}
  </ThemeButton>
);

ButtonThemeUniverse.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default ButtonThemeUniverse;
