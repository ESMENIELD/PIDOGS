import styled, {css} from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const colors = {
	borde: "#0075FF",
	error: "#bb2929",
	exito: "#1ed12d",
	black: "#000000"
}

const Form = styled.form`
	display: block ;
	
    align-content: space-between;
	gap: 20px;
	@media (max-width: 800px){
		grid-template-columns: 1fr;
	}
`;

const Label = styled.label`
	display: block;
	font-weight: 700;
	padding: 10px;
	min-height: 40px;
	cursor: pointer;
	${props => props.validate === 'false' && css`
		color: ${colors.error};
	`}
`;

const GrupoInput = styled.div`
	position: relative;
	z-index: 90;
`;

const Input = styled.input`
	width: 65%;
	background: #fff;
	border-radius: 10px;
	height: 35px;
	line-height: 45px;
	padding: 0 40px 0 10px;
	transition: .3s ease all;
	border: 3px solid transparent;
	&:focus {
		border: 3px solid ${colors.borde};
		outline: none;
		box-shadow: 3px 0px 30px rgba(163,163,163, 0.4);
	}
	${props => props.validate === 'true' && css`
		border: 3px solid transparent;
	`}
	${props => props.validate === 'false' && css`
		border: 3px solid ${colors.error} !important;
	`}
`;
const Select = styled.select`

	
    width: 85%;
    border-radius: 10px;
	height: 35px;
	line-height: 45px;
	padding: 0px 40px 0 10px;
	margin-bottom: 12%;
	border: 3px solid transparent;
	&:focus {
		border: 3px solid ${colors.borde};
		outline: none;
		box-shadow: 3px 0px 30px rgba(163,163,163, 0.4);
	}
	${props => props.validate === 'true' && css`
		border: 3px solid transparent;
	`}
	${props => props.validate === 'false' && css`
		border: 3px solid ${colors.error} !important;
	`}
`;

const LeyendaError = styled.p`
	font-size: 12px;
	margin-bottom: 0;
	color: ${colors.error};
	display: none;
	${props => props.validate === 'true' && css`
		display: none;
	`}
	${props => props.validate === 'false' && css`
		display: block;
	`}
`;
const LeyendaError1 = styled.p`
	font-size: 12px;
	margin-bottom: 0;
	color: ${colors.error};
	display: none;
	${props => props.validate === 'true' && css`
		display: none;
	`}
	${props => props.validate === 'false' && css`
		display: block;
	`}
`;

const IconoValidation = styled(FontAwesomeIcon)`
	position: absolute;
	right: 10px;
	bottom: 14px;
	z-index: 100;
	font-size: 16px;
	opacity: 0;
	${props => props.validate === 'false' && css`
		opacity: 1;
		color: ${colors.error};
	`}
	${props => props.validate === 'true' && css`
		opacity: 1;
		color: ${colors.exito};
	`}
`;



const ContenedorBotonCentrado = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	grid-column: span 2;
	@media (max-width: 800px){
		grid-column: span 1;
	}
`;

const Boton = styled.button`
	height: 45px;
	line-height: 45px;
	width: 30%;
	background: #000;
	color: #fff;
	font-weight: bold;
	border: none;
	margin: 3% 3% 3% 3%;
	border-radius: 3px;
	cursor: pointer;
	transition: .1s ease all;
	&:hover, &:position {
		box-shadow: 3px 0px 30px rgba(163,163,163, 1) ;
	}
`;

const MensajeExito = styled.p`
	font-size: 14px;
	color: ${colors.exito};
`;

const MensajeError = styled.div`
	height: 45px;
	line-height: 45px;
	background: #F66060;
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
	MensajeError
};