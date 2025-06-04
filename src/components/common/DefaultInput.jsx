import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { devices } from "../../utils/constantes";

const StyledInput = styled.input`
  border: 2px solid rgba(249, 205, 116, 0.78);
  border-radius: 8px;
  font-size: 1.1rem;
  color: #222;
  background: #fff;
  transition:
    border-color 0.3s,
    box-shadow 0.3s,
    background 0.3s,
    color 0.3s;

  ${(props) =>
    props.type === "text" &&
    css`
      width: 65%;
      max-width: 50%;
      padding: 0.7rem 2.5rem 0.7rem 1.2rem;
      margin: 0;

      &:focus,
      &:hover {
        width: 100%;
        border-color: #f7ab12;
        box-shadow: 0 0 0 2px rgba(249, 205, 116, 0.78);
        outline: none;
        background: #fffbe7;
        color: #111;
      }
    `}
  ${(props) =>
    props.type === "submit" &&
    css`
      width: auto;
      min-width: 4rem;
      max-width: 12rem;
      padding: 0.8rem 2rem;
      background: rgba(249, 205, 116, 0.78);
      color: #222;
      font-weight: 600;
      border: none;
      box-shadow: 0 2px 8px #0002;
      cursor: pointer;
      transition:
        border-color 0.3s,
        box-shadow 0.3s,
        background 0.3s;

      &:hover,
      &:focus {
        background: #f7ab12;
        color: #111;
        box-shadow: 0 4px 16px #0003;
      }
      &:active {
        background: #e6b84a;
        color: #111;
      }
    `}
    @media only screen and (${devices.tablet}) {
    width: 95% !important;
    max-width: 100% !important;
    margin: 0 4rem 0.7rem 4rem !important;
    text-align: center;
  }
`;

const DefaultInput = ({
  inputType,
  inputCLassName,
  inputName,
  inputPlaceholder,
  inputValue,
  inputOnChange,
}) => {
  return (
    <>
      <StyledInput
        type={inputType}
        className={inputCLassName}
        name={inputName}
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={inputOnChange}
        autoComplete="off"
      />
    </>
  );
};

DefaultInput.propTypes = {
  inputType: PropTypes.string.isRequired,
  inputCLassName: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  inputOnChange: PropTypes.func.isRequired,
};

export default DefaultInput;
