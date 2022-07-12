import React from 'react';
import {Input, Label, GrupoInput, LeyendaError, LeyendaError1, IconoValidation} from '../Style/formulario';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ComponenteInput = ({max, min, state, setstate, tipo, label, placeholder, name, leyendaError, leyendaError1, expresionRegular, funcion}) => {
	const onChange = (e) => {
		setstate({...state, campo: e.target.value});
	}

	const validacion = () => {
		if(expresionRegular){
			if(expresionRegular.test(state.campo)){
				setstate({...state, validate: 'true'});
			} else {
				setstate({...state, validate: 'false'});
			}
		}

		if(funcion){
			funcion();
		}
	}

	return (
		<div>
			<Label htmlFor={name} validate={state.validate}>{label}</Label>
			<GrupoInput>
				<Input 
				min={min} 
				max={max}
					type={tipo}
					placeholder={placeholder} 
					id={name}
					value={state.campo}
					onChange={onChange}
					onKeyUp={validacion}
					onBlur={validacion}
					validate={state.validate}
				/>
				<IconoValidation 
					icon={state.validate === 'true' ? faCheckCircle : faTimesCircle}
					validate={state.validate}
				/>
			</GrupoInput>
			<LeyendaError validate={state.validate}>{leyendaError}</LeyendaError>
            <LeyendaError1 validate={state.validate}>{leyendaError1}</LeyendaError1>
		</div>
	);
}
 
export default ComponenteInput;

