import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toastMessage } from "../store";

import React, { useEffect, useState } from "react";
import { color } from "../styles/theme";

const Toast = () => {
	const [toggle, setToggle] = useState(false);
	const [message, setMessage] = useRecoilState(toastMessage);

	useEffect(() => {
		setToggle(message !== "");

		const timer = setTimeout(() => {
			setMessage("");
		}, 2000);

		return () => {
			clearTimeout(timer);
		};
	}, [message]);

	const onToggle = () => {
		setToggle(false);
	};

	return (
		<ToastSection>
			<ToastBox onClick={() => onToggle()} toggle={toggle}>
				{message}
			</ToastBox>
		</ToastSection>
	);
};

const ToastSection = styled.div`
	display: flex;
	position: fixed;
	z-index: 99;
	top: 2rem;
	right: 0;
	transition: all 0.6s ease 0s;
`;

interface IToastBox {
	toggle: boolean;
}

const ToastBox = styled.div<IToastBox>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 19rem;
	background: ${color.red};
	box-shadow: 0px 1px 12px ${color.red};
	box-sizing: border-box;
	margin: 1rem;
	padding: 1rem;
	border-radius: 2vh;
	color: ${color.white};
	cursor: pointer;
	transform: ${(props) =>
		props.toggle ? "translateX(0)" : "translateX(21rem)"};
	transition: all 0.1s ease-in-out 0s;
`;

export default React.memo(Toast);
