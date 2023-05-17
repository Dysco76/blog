import React from 'react';
import Link from 'next/link';
import { formatDate } from '@/shared/util/formatDate';

type FeaturedPostProps = {
    post: types.Post;
};

export const FeaturedPost = ({ post } : FeaturedPostProps) => {
    return (
        <div style={{ marginBottom: '2em', border: '1px solid black', padding: '1em' }}>
            <h2>Featured Post</h2>
            <Link href={`/post/${post.id}`}>
                <h3>{post.title}</h3>
                {post.cover && <img src={post.cover} alt={`${post.title}: cover image`} width="200" />}
            </Link>
            {post.author && post.author.name && <p>by {post.author.name}</p>}
            <sub>{formatDate(post.created)}</sub>
            <p>{post.body}</p>
        </div>
    );
};
