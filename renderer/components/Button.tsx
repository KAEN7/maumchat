import styled from "styled-components";
import { color } from "../styles/theme";

interface IButton {
	children: string;
	onClick: (event: MouseEvent) => void;
	color: string;
}

const Button = ({ children, color, onClick }: IButton) => {
	return (
		<ButtonBox color={color} onClick={onClick}>
			{children}
		</ButtonBox>
	);
};

interface IButtonBox {
	color: string;
}

const ButtonBox = styled.button<IButtonBox>`
	width: 15rem;
	padding: 0.5rem 1rem;
	box-sizing: border-box;
	border-radius: 10px;
	background: ${(props) => props.color};
	color: ${color.black};
	font-weight: 800;
	transition: all 0.6s ease 0s;

	&:hover {
		transform: translateY(-4px);
		box-shadow: 0px 1px 12px ${(props) => props.color};
	}
`;

export default Button;
