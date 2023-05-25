import { axios } from '@/shared/lib/axios';

export const fetchPosts = () => axios.get<types.Post[]>('/posts?_sort=created&_order=desc').then(({ data }) => data);

export const fetchPostsByPage = (page: number) =>
    axios.get<types.Post[]>(`/posts?_page=${page}&_sort=created&_order=desc`).then(({ data }) => data);

export const fetchPostById = (id: string) => axios.get<types.Post>(`/posts/${id}`).then(({ data }) => data);

export const createPost = (payload: types.Post) => axios.post('/posts', payload);

export const deletePost = (postId: types.Post['id']) =>
    axios.delete('/api/posts/delete', { data: { postId }, baseURL: '' });
