import { fetchPosts } from '@/api';
import { formatDate } from '@/shared/util/formatDate';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { dehydrate, QueryClient, useQuery } from 'react-query';

const SHORTENED_BODY_LENGTH = 20;

export default function Home() {
    const { isSuccess, data: posts, isLoading, isError } = useQuery(['getPosts'], fetchPosts);
    const getShortenedPostBody = (postBody: types.Post['body']) => {
        const allBodyWords = postBody.split(' ');

        if (allBodyWords.length <= SHORTENED_BODY_LENGTH) {
            return postBody
        }

        return allBodyWords.slice(0, 20).join(' ') + '...'
    }

    if (isSuccess) {
        return (
            <>
                {posts.map((post) => (
                    <div key={post.id}>
                        <Link href={`/post/${post.id}`}>
                            <h3>{post.title}</h3>
                            {post.cover && (
                                <img src={post.cover} alt={`${post.title}: cover image`} width="200"/>
                            )}
                        </Link>
                        {post.author && post.author.name && <p>by {post.author.name}</p>}
                        <sub>{formatDate(post.created)}</sub>
                        <p>{getShortenedPostBody(post.body)}</p>
                    </div>
                ))}
            </>
        );
    }

    if (isLoading) {
        return <>Loading...</>;
    }

    if (isError) {
        return <>Something went wrong</>;
    }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['getPosts'], fetchPosts);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
