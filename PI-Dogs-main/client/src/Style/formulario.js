import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const colors = {
  borde: "#0075FF",
  error: "#bb2929",
  exito: "#1ed12d",
  black: "#000000",
};

const Form = styled.form`
  display: block;
  margin-top:5%;
  align-content: space-between;
  gap: 20px;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  font-family: "Righteous", cursive;
  font-size: large;
  display: block;
  font-weight: 800;
  padding: 10px;
  min-height: 40px;
  cursor: pointer;
  ${(props) =>
    props.validate === "false" &&
    css`
      color: ${colors.error};
    `}
`;

const GrupoInput = styled.div`
  position: relative;
  z-index: 90;
`;

const Input = styled.input`
  font-family: "Righteous", cursive;
  font-size: large;
  width: 80%;
  background: #fff;
  position:relative;
  border-radius: 10px;
  height: 35px;
  line-height: 45px;
  padding: 0 40px 0 10px;
  transition: 0.3s ease all;
  border: 3px solid transparent;
  &:focus {
    border: 3px solid ${colors.borde};
    outline: none;
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
  }
  ${(props) =>
    props.validate === "true" &&
    css`
      border: 3px solid transparent;
    `}
  ${(props) =>
    props.validate === "false" &&
    css`
      border: 3px solid ${colors.error} !important;
    `}
`;
const Select = styled.select`
  font-family: "Righteous", cursive;
  font-size: large;
  width: 280px;
  border-radius: 10px;
  height: 45px;
  line-height: 45px;
  padding: 0px 40px 0 10px;
  margin-bottom: 12%;
  border: 3px solid transparent;
  &:focus {
    border: 3px solid ${colors.borde};
    outline: none;
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
  }
  
`;

const LeyendaError = styled.p`
  font-size: 20px;
  margin-bottom: 0;
  max-width: 400px;
  color: ${colors.error};
  display: none;
  ${(props) =>
    props.validate === "true" &&
    css`
      display: none;
    `}
  ${(props) =>
    props.validate === "false" &&
    css`
      display: block;
    `}
`;
const LeyendaError1 = styled.p`
  font-size: 20px;
  max-width: 400px;
  margin-bottom: 0;
  color: ${colors.error};
  display: none;
  ${(props) =>
    props.validate === "true" &&
    css`
      display: none;
    `}
  ${(props) =>
    props.validate === "false1" &&
    css`
      display: block;
    `}
`;

const IconoValidation = styled(FontAwesomeIcon)`
  position: absolute;
  right: 70px;
  bottom: 14px;
  z-index: 100;
  font-size: 16px;
  opacity: 0;
  ${(props) =>
    props.validate === "false" &&
    css`
      opacity: 1;
      color: ${colors.error};
    `}
    ${(props) =>
      props.validate === "false1" &&
      css`
        opacity: 1;
        color: ${colors.error};
      `}
  ${(props) =>
    props.validate === "true" &&
    css`
      opacity: 1;
      color: ${colors.exito};
    `}
`;

const ContenedorBotonCentrado = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column: span 2;
  @media (max-width: 800px) {
    grid-column: span 1;
  }
`;

const Boton = styled.button`
  font-family: "Righteous", cursive;
  height: 50px;
  font-size: large;
  font-weight: lighter;
  line-height: 45px;
  width: 140px;
  background: #000;
  color: #EDDE5D;
  border: none;
  margin: 3% 3% 3% 3%;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.1s ease all;
  &:hover{
    font-family: "Righteous", cursive;
    font-size: large;
  font-weight: lighter;
  background:#EDDE5D;
  color: #000;
  }
  &:position {
    
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 1);
  }
`;

const MensajeExito = styled.p`
  font-size: 14px;
  color: ${colors.exito};
`;

const MensajeError = styled.div`
  height: 45px;
  line-height: 45px;
  background: #f66060;
  padding: 0px 15px;
  border-radius: 3px;
  grid-column: span 2;
  p {
    margin: 0;
  }
  b {
    margin-left: 10px;
  }
`;

export {
  Select,
  Form,
  Label,
  GrupoInput,
  Input,
  LeyendaError,
  LeyendaError1,
  IconoValidation,
  ContenedorBotonCentrado,
  Boton,
  MensajeExito,
  MensajeError,
};
