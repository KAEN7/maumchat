import styled from "styled-components";

const Title = ({ children }) => {
	return <TitleBox>{children}</TitleBox>;
};

const TitleBox = styled.h2`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
`;

export default Title;
