import Link from "next/link";
import styles from './posts.module.css';  // Import the styles
import { PostService } from './service';  // Import the PostService
import type { Post } from '../types/post';
import dynamic from 'next/dynamic';
import Header from '../header';

const DynamicBlogCard = dynamic(() => import('./component/blogPostCard'), {
    loading: () => <p>Loading....</p>,
    ssr: true
});

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
                <Header />
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
            <Header />
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
                    <DynamicBlogCard key={post.id} blogInfo={post} />
                ))}
            </div>
        </div>
    );
}
