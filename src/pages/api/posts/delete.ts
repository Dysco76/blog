import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { fetchPostById } from '@/api';

const deletePostById = async (postId: string) =>
    fetch(`http://localhost:5000/posts/${postId}`, {
        method: 'DELETE',
    });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    console.log('SESSION', session);

    // Check if the user is authenticated
    if (!session) {
        return res.status(401).json({ message: 'You must be logged in to delete a post' });
    }

    // Get the post ID from the request
    const postIdToDelete = req.body.postId;

    // Fetch the post from the database
    const postToDelete = await fetchPostById(postIdToDelete);

    // Check if the post exists
    if (!postToDelete) {
        return res.status(404).json({ message: 'Post not found, it may have been deleted already' });
    }

    // Check if the user is the owner of the post
    if (postToDelete.author.id !== session.user.id) {
        return res.status(403).json({ message: 'You are not the author of this post and cannot delete it' });
    }

    // The user is the owner of the post, proceed with the deletion
    await deletePostById(postIdToDelete);

    // Return a success status and message
    res.status(200).json({ message: 'Post deleted successfully' });
}
