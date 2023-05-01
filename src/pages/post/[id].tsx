import { deletePost, fetchPostById } from '@/api';
import { formatDate } from '@/shared/util/formatDate';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';

const Post = () => {
    const router = useRouter();
    const postId = typeof router.query?.id === 'string' ? router.query.id : '';
    const { data: session } = useSession();

    const {
        isSuccess,
        isError,
        isLoading,
        data: post,
    } = useQuery(['getPostById', postId], () => fetchPostById(postId));

    const isUserAuthor = session?.user?.id === post?.author?.id;

    const deletePostAndRedirect = async () => {
        try {
            const response = await deletePost(postId);
            if (response.status === 200) {
                // Redirect to the home page
                router.push('/');
            }
        } catch (error) {
            console.error('Error deleting the post:', error);
        }
    };

    return (
        <div>
            <Link href="/">← Back to Home</Link>

            {isSuccess && (
                <div>
                    {post.cover && <img src={post.cover} alt={`${post.title}: cover image`} width="500" />}
                    <h1>{post.title}</h1>
                    {post.author && <p>by {post.author.name}</p>}
                    <sub>{formatDate(post.created)}</sub>
                    {isUserAuthor && (
                        <button
                            onClick={() => {
                                console.log('delete post');
                                deletePostAndRedirect();
                            }}
                        >
                            Delete post
                        </button>
                    )}
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
