import Link from "next/link";
import styles from './posts.module.css';  // Import the styles
import { PostService } from './service';  // Import the PostService
import type { Post } from '../types/post';
import DeleteButton from './DeleteButton';  // Add this import at the top

// Use the PostService for fetching
const fetchPosts = async () => {
    try {
        const response = await PostService.getAllPosts();
        // Ensure we're returning an array, default to empty array if posts is undefined
        return response || [];
    } catch (error) {
        console.error('Error fetching posts:', error);
        return []; // Return empty array instead of throwing error
    }
};

export default async function PostsList() {
    const posts = await fetchPosts();

    // Add loading state handling
    if (posts === undefined) {
        return (
            <div className={styles.container}>
                <div className={styles.ownaiLogo}>
                    <a href="https://ownai.net/" target="_blank">own<b>AI</b></a>
                </div>
                <div className={styles.loading}>
                    Loading posts...
                </div>
            </div>
        );
    }

    if (!posts || posts.length === 0) {
        return <div className={styles.error}>No posts found</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.ownaiLogo}>
                <a href="https://ownai.net/" target="_blank">own<b>AI</b></a>
            </div>
            <div className={styles.header}>
                <Link href="/" className={styles.homeButton}>
                    <span>← Home</span>
                </Link>
                <h1 className={styles.title}>Blog Posts</h1>
                <div className={styles.newPostButtonContainer}>
                    <Link href="/posts/new" className={styles.newPostButton}>
                        <span>+ New Post</span>
                    </Link>
                </div>
            </div>
            <div className={styles.grid}>
                {posts.map((post: Post) => (
                    <Link href={`/posts/${post.id}`} key={post.id} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>{post.title}</h2>
                        </div>
                        <div className={styles.cardBody}>
                            <p>{post.body.substring(0, 150)}...</p>
                        </div>
                        <div className={styles.cardFooter}>
                            <div className={styles.metadata}>
                                <span>Views: {post.views}</span>
                                <DeleteButton postId={post.id} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
