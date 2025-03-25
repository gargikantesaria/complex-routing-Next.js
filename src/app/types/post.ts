export type Post = {
    id: number;
    title: string;
    body: string;
    userId: number;
    first_name: string;
    reactions: {
        likes: number;
        dislikes: number;
    } | null;
    tags: string[] | null;
    views: number;
};

export type addPost = {
    title: string;
    postContent: string;
    userId: number
}