const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const PostAPI = {
    getPosts: () => `${BASE_URL}/posts`,
    getPostById: (id: number) => `${BASE_URL}/posts/${id}`,
    addPost: () => `${BASE_URL}/posts/add`,
    deletePost: (id: number) => `${BASE_URL}/posts/${id}`,
};
