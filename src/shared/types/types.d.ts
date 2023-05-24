declare namespace types {
    type Post = {
        author: types.User;
        id: string;
        title: string;
        subtitle?: string;
        body: string;
        cover?: string;
        created: string;
    };

    type User = {
        email?: string | null;
        image?: string | null;
        name?: string | null;
        id?: string;
    }
}
