import styled from "styled-components";
import { color } from "../styles/theme";

interface IInput {
	type: string;
	placeholder: string;
	onChange: (value: string) => void;
}

const Input = ({ type, placeholder, onChange }: IInput) => {
	return <InputBox type={type} placeholder={placeholder} onChange={onChange} />;
};

const InputBox = styled.input`
	background: ${color.black};
	width: 15rem;
	padding: 0;
	margin: 0;
	text-align: left;
	font-size: 1rem;
	font-weight: bold;
	color: ${color.white};
	border: 3px solid ${color.gray};
	border-radius: 10px;
	padding-left: 1rem;
	box-sizing: border-box;
	padding: 0.5rem 1rem;
	transition: all 0.15s ease-out 0s;

	&:focus {
		outline: 3px solid ${color.point};
	}

	&::placeholder {
		font-size: 1rem;
		color: ${color.gray};
		text-align: left;
	}
`;

export default Input;
