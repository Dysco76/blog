import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthButton } from '../AuthButton';
import { HeaderStyled } from './HeaderStyled';

export const Header = () => {
    const { pathname } = useRouter();

    return (
        <HeaderStyled>
            <ul>
                <li>
                    <Link href="/" className={pathname === '/' ? 'disabledLink' : ''}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/posts" className={pathname === '/posts' ? 'disabledLink' : ''}>
                        All posts
                    </Link>
                </li>
                <li>
                    <Link href="/new-post" className={pathname === '/new-post' ? 'disabledLink' : ''}>
                        + Add new post
                    </Link>
                </li>
                <li>
                    <AuthButton />
                </li>
            </ul>
        </HeaderStyled>
    );
};


