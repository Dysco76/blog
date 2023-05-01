import axios from 'axios';

export const fetchPosts = () => axios.get<types.Post[]>('http://localhost:5000/posts').then(({ data }) => data);

export const fetchPostById = (id: string) =>
    axios.get<types.Post>(`http://localhost:5000/posts/${id}`).then(({ data }) => data);

export const createPost = (payload: types.Post) => axios.post('http://localhost:5000/posts', payload);

export const deletePost = (postId: types.Post['id']) => axios.delete('/api/posts/delete', { data: { postId } });
