import { getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

const LoginPage = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
                </div>
            ))}
        </>
    );
};

export default LoginPage;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const providers = await getProviders();

    return {
        props: { providers: providers ?? [] },
    };
};
