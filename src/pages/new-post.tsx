import { createPost } from '@/api';
import { PropsWithClassName } from '@/shared/utility-types';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';

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

const NewPost = styled(({ className }: PropsWithClassName) => {
    // As this page uses Server Side Rendering, the `session` will be already
    // populated on render without needing to go through a loading stage.
    // This is possible because of the shared context configured in `_app.js` that
    // is used by `useSession()`.
    const { data: session } = useSession();

    const formik = useFormik<PostFormValues>({
        initialValues,
        onSubmit: (values) => {
            if (session && session.user) {
                const newPost = { ...values, id: uuidv4(), author: session.user, created: new Date().toISOString() };
                createPost(newPost);
            }
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        // Redirect unauthenticated users to the login page or any other page
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: { user: session },
    };
};
