import { css } from "styled-components";

// 기기 사이즈
export const size = {
	mobileS: "320px",
	mobileM: "375px",
	mobileL: "425px",
	tablet: "768px",
	laptop: "1024px",
	laptopL: "1440px",
	desktop: "2560px",
};

// 미디어 스타일
const theme = {
	mobileS: `(max-width: ${size.mobileS})`,
	mobileM: `(max-width: ${size.mobileM})`,
	mobileL: `(max-width: ${size.mobileL})`,
	tablet: `(max-width: ${size.tablet})`,
	laptop: `(max-width: ${size.laptop})`,
	laptopL: `(max-width: ${size.laptopL})`,
	desktop: `(min-width: ${size.desktop})`,
	desktopL: `(min-width: ${size.desktop})`,
};

// color
export const color = {
	white: "#fefefe",
	black: "#181a1e",
	gray: "#2c2f36",
	point: "#CFF7FF",
	darkPoint: "#57a3b3",
	red: "#c24100",
};

export const page = css`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	padding: 1rem;
	box-sizing: border-box;
`;

export const overflowY = css`
	overflow-y: auto;
	::-webkit-scrollbar {
		display: none;
	}
`;

export const fadeIn = css`
	animation: fade-in 3s;

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;

export const FormStyle = css`
	display: flex;
	justify-content: center;
	align-items: center;
	letter-spacing: 0.2rem;

	.point {
		color: ${color.point};
		font-size: 3rem;
		margin: 0;
		padding: 0;
	}
`;

export default theme;
