import styled from "styled-components";

const GradientCir = () => {
	return (
		<GradientCirBox>
			<div className="circle"></div>
			<img src="/images/logo.png" />
		</GradientCirBox>
	);
};

const GradientCirBox = styled.div`
	position: relative;
	width: 5rem;
	height: 5rem;

	img {
		width: 100%;
		position: absolute;
	}

	.circle {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		filter: blur(1rem);
		background-image: linear-gradient(to right, #585f6d, #676d7e, #cff7ff);
		background-size: 110% 110%;
		-webkit-animation: gradient 3s ease infinite;
		-moz-animation: gradient 3s ease infinite;
		animation: gradient 3s ease infinite;

		@-webkit-keyframes gradient {
			0% {
				background-position: 0% 50%;
			}
			50% {
				background-position: 100% 50%;
			}
			100% {
				background-position: 0% 50%;
			}
		}
		@-moz-keyframes gradient {
			0% {
				background-position: 0% 50%;
			}
			50% {
				background-position: 100% 50%;
			}
			100% {
				background-position: 0% 50%;
			}
		}
		@keyframes gradient {
			0% {
				background-position: 0% 50%;
			}
			50% {
				background-position: 100% 50%;
			}
			100% {
				background-position: 0% 50%;
			}
		}
	}
`;

export default GradientCir;
