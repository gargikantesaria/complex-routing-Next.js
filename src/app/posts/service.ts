import { PostAPI } from '../services/api.config';
import { addPost, Post } from '../types/post';

class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export class PostService {
    static async getAllPosts(): Promise<Post[]> {
        try {
            const response = await fetch(PostAPI.getPosts());
            if (!response.ok) {
                throw new ApiError(`Failed to fetch posts: ${response.statusText}`, response.status);
            }
            const data = await response.json();
            return data.posts;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError(
                    error instanceof Error ? error.message : 'Failed to fetch posts',
                    500
                );
            }
        }
    }

    static async getPostById(id: number): Promise<Post> {
        try {
            const response = await fetch(PostAPI.getPostById(id));

            if (!response.ok) {
                throw new ApiError(`Failed to fetch post with ID ${id}: ${response.statusText}`, response.status);
            }

            try {
                const data = await response.json();
                return data;
            } catch (jsonError) {
                throw new ApiError(`Failed to parse response JSON for post ID ${id}`, 500);
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError(error instanceof Error ? error.message : `Failed to fetch post with ID ${id}`, 500);
            }
        }
    }

    static async addPost(post: addPost): Promise<{ message: string; data?: Post }> {
        try {
            const response = await fetch(PostAPI.addPost(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            });

            if (!response.ok) {
                throw new ApiError(`Failed to add post: ${response.statusText}`, response.status);
            }

            const data: Post = await response.json();
            return { message: 'Post created successfully', data };
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError(
                    error instanceof Error ? error.message : 'Failed to add post',
                    500
                );
            }
        }
    }


    static async deletePost(id: number): Promise<void> {
        try {
            const response = await fetch(PostAPI.deletePost(id), {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new ApiError(`Failed to delete post with ID ${id}: ${response.statusText}`, response.status);
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError(
                    error instanceof Error ? error.message : `Failed to delete post with ID ${id}`,
                    500
                );
            }
        }
    }
}
