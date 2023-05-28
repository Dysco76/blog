import { useSession, signIn, signOut } from 'next-auth/react';
import styled from 'styled-components';
export const AuthButton = () => {
    const { data: session } = useSession();
    if (session) {
        return (
            <>
                Signed in as {session?.user?.email} 
                <AuthButtonStyled
                    onClick={(e) => {
                        e.preventDefault();
                        signOut();
                    }}
                >
                    Sign out
                </AuthButtonStyled>
            </>
        );
    }
    return (
        <>
            Not signed in 
            <AuthButtonStyled
                onClick={(e) => {
                    e.preventDefault();
                    signIn();
                }}
            >
                Sign in
            </AuthButtonStyled>
        </>
    );
};

const AuthButtonStyled = styled.button`
    margin-left: 10px;
`;
