import { fetchPosts } from '@/api';
import { FeaturedPost } from '@/components/FeaturedPost';
import { formatDate } from '@/shared/util/formatDate';
import { getShortenedPostBody } from '@/shared/util/getShortenedPostBody';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { dehydrate, QueryClient, useQuery } from 'react-query';

export default function Home() {
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

    const sortedPosts = posts.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
    const featuredPost = sortedPosts[0]; // considering the first post as the most recent
    const otherPosts = sortedPosts.slice(1);

    return (
        <>
            <FeaturedPost post={featuredPost} />

            {otherPosts.map((post) => (
                <div key={post.id} style={{ borderBottom: '1px solid #aaa' }}>
                    <Link href={`/post/${post.id}`}>
                        <h3>{post.title}</h3>
                        {post.cover && <img src={post.cover} alt={`${post.title}: cover image`} width="200" />}
                    </Link>
                    {post.author && post.author.name && <p>by {post.author.name}</p>}
                    <sub>{formatDate(post.created)}</sub>
                    <p>{post.subtitle || getShortenedPostBody(post.body)}</p>
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
