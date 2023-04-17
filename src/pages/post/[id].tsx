import { fetchPostById } from '@/api';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';

const Post = () => {
    const router = useRouter();
    const postId = typeof router.query?.id === 'string' ? router.query.id : '';

    const {
        isSuccess,
        isError,
        isLoading,
        data: post,
    } = useQuery(['getPostById', postId], () => fetchPostById(postId));

    return (
        <div>
            <Link href="/">← Back to Home</Link>

            {isSuccess && (
                <div>
                    {post.cover && <img src={post.cover} alt={`${post.title}: cover image`} width="500" />}
                    <h1>{post.title}</h1>
                    {post.author && <p>by {post.author.name}</p>}
                    <p>{post.body}</p>
                </div>
            )}

            {isError && <p>Something went wrong!</p>}

            {isLoading && <p>Loading...</p>}
        </div>
    );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const postId = params?.id as string;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['getPostById', postId], () => fetchPostById(postId));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
