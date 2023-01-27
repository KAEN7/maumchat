import styled from "styled-components";
import { color } from "../styles/theme";

const Button = ({ children }) => {
	return <ButtonBox>{children}</ButtonBox>;
};

const ButtonBox = styled.button`
	width: 15rem;
	padding: 0.5rem 1rem;
	box-sizing: border-box;
	border-radius: 10px;
	background: ${color.point};
	color: ${color.black};
	font-weight: 800;
	transition: all 0.6s ease 0s;

	&:hover {
		transform: translateY(-4px);
		box-shadow: 0px 1px 12px ${color.point};
	}
`;

export default Button;
