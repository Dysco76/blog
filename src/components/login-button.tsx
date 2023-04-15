import { useSession, signIn, signOut } from 'next-auth/react';
export const LoginButton = () => {
    const { data: session } = useSession();
    if (session) {
        return (
            <>
                Signed in as {session?.user?.email} <br />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        signOut();
                    }}
                >
                    Sign out
                </button>
            </>
        );
    }
    return (
        <>
            Not signed in <br />
            <button
                onClick={(e) => {
                    e.preventDefault();
                    signIn();
                }}
            >
                Sign in
            </button>
        </>
    );
};
