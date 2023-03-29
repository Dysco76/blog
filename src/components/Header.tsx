import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

export const Header = () => {
    const { pathname } = useRouter();

    return (
        <HeaderStyled>
            <nav>
                <ul>
                    <li>
                    <Link href="/" className={pathname === '/' ? 'disabledLink' : ''}>
                        Home
                    </Link>
                    </li>
                    <li>
                    <Link href="/new-post" className={pathname === '/new-post' ? 'disabledLink' : ''}>
                        + Add new post
                    </Link>
                    </li>
                </ul>
            </nav>
        </HeaderStyled>
    );
};

const HeaderStyled = styled.div`
    padding: 10px;

    .disabledLink {
        pointer-events: none;
        cursor: default;
        color: gray;
    }
`;
