import { fetchPosts } from '@/api';
import { formatDate } from '@/shared/util/formatDate';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { dehydrate, QueryClient, useQuery } from 'react-query';

export default function Posts() {
    const { isSuccess, data: posts, isLoading, isError } = useQuery(['getPosts'], fetchPosts);

    if (isLoading) {
        return <>Loading...</>;
    }

    if (isError) {
        return <>Something went wrong</>;
    }

    if (!isSuccess || !posts) {
        return <>No posts found</>;
    }

    return (
        <>
            <h2>All posts</h2>
            {posts.map((post) => (
                <div key={post.id} style={{ borderBottom: '1px solid #aaa' }}>
                    <Link href={`/post/${post.id}`}>
                        <h4>{post.title}</h4>
                    </Link>
                    {post.author && post.author.name && <p>by {post.author.name}</p>}
                    <sub>{formatDate(post.created)}</sub>
                </div>
            ))}
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['getPosts'], fetchPosts);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
