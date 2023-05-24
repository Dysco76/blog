import { createPost } from '@/api';
import { PropsWithClassName } from '@/shared/utility-types';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

type PostFormValues = {
    title: string;
    subtitle?: string;
    cover?: string;
    body: string;
};

const initialValues: PostFormValues = {
    title: '',
    subtitle: '',
    cover: '',
    body: '',
};

const validate = (values: PostFormValues) => {
    const errors: Partial<PostFormValues> = {};

    if (!values.title) {
        errors.title = 'Title is required';
    }

    if (!values.body) {
        errors.body = 'Body is required';
    } else if (values.body.length < 10) {
        errors.body = 'Body must be at least 10 characters';
    }

    return errors;
};

const NewPost = styled(({ className }: PropsWithClassName) => {
    const { data: session } = useSession();
    const [creating, setCreating] = useState(false);

    const router = useRouter();

    const formik = useFormik<PostFormValues>({
        initialValues,
        validate,
        onSubmit: async (values) => {
            setCreating(true);
            if (session && session.user) {
                const newPost = { ...values, id: uuidv4(), author: session.user, created: new Date().toISOString() };

                try {
                    const response = await createPost(newPost);
                    if (response.status === 201) {
                        router.push('/');
                    }
                } catch (error) {
                    console.error('Error creating the post:', error);
                }
            }
        },
    });

    return (
        <form className={className} onSubmit={formik.handleSubmit}>
            <label htmlFor="title">Title</label>
            <input value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} id="title" />
            {formik.errors.title && formik.touched.title && <p style={{color: 'red'}}>{formik.errors.title}</p>}
            <label htmlFor="subtitle">Subtitle</label>
            <input
                value={formik.values.subtitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="subtitle"
                placeholder="If not provided, the first few words of post body will be used as the subtitle"
            />
            <label htmlFor="cover">Cover Image</label>
            <input value={formik.values.cover} onChange={formik.handleChange} onBlur={formik.handleBlur} id="cover" />
            <label htmlFor="body">Body</label>
            <textarea value={formik.values.body} onChange={formik.handleChange} onBlur={formik.handleBlur} id="body" />
            {formik.errors.body && formik.touched.body && <p style={{color: 'red'}}>{formik.errors.body}</p>}
            <button disabled={creating || !formik.isValid}>{creating ? 'Creating...' : 'Create post'}</button>
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
