import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { color } from "../styles/theme";

const Nav = () => {
	return (
		<NavSection>
			{["userList", "chatList"].map((path) => (
				<LinkBtn key={path}>
					<Link href={`/${path}`}>
						<Image
							src={`/icons/${path}.png`}
							width={40}
							height={40}
							alt={path}
						/>
					</Link>
				</LinkBtn>
			))}
		</NavSection>
	);
};

const NavSection = styled.nav`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background: ${color.gray};
	width: 4rem;
	max-width: 4rem;
	min-width: 4rem;
	height: 100%;
	padding: 1.5rem 1rem;
	box-sizing: border-box;
	box-shadow: 1px 1px 3px ${color.gray};
`;

const LinkBtn = styled.button`
	margin-top: 1rem;
`;

export default Nav;
