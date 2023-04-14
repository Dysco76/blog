import { Layout } from '@/components/Layout';
import '../../node_modules/normalize.css/normalize.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Hydrate>
            </QueryClientProvider>
        </SessionProvider>
    );
}
