import { createPost } from '@/api';
import { PropsWithClassName } from '@/shared/utility-types';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

type PostFormValues = {
    title: string;
    cover: string;
    body: string;
};

const initialValues = {
    title: '',
    cover: '',
    body: '',
};

const NewPost = styled(({className}: PropsWithClassName) => {
    const formik = useFormik<PostFormValues>({
        initialValues,
        onSubmit: (values) => {
            const newPost = {...values, id: uuidv4()};
            createPost(newPost);
        },
    });
    return (
        <form className={className} onSubmit={formik.handleSubmit}>
            <label htmlFor="title">Title</label>
            <input value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} id="title" />
            <label htmlFor="cover">Cover Image</label>
            <input value={formik.values.cover} onChange={formik.handleChange} onBlur={formik.handleBlur} id="cover" />
            <label htmlFor="body">Body</label>
            <textarea value={formik.values.body} onChange={formik.handleChange} onBlur={formik.handleBlur} id="body" />
            <button>Create post</button>
        </form>
    );
})`
    display: flex;
    flex-direction: column;
    max-width: 600px;
`;

export default NewPost;
