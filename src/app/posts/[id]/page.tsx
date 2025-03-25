import styles from './page.module.css';
import { PostService } from '../service';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { Post } from '@/app/types/post';

// export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const awaitedParams = await params;
    const id = Number(awaitedParams.id);

    if (isNaN(id)) {
        return { title: 'Post Not Found' };
    }

    try {
        const post = await PostService.getPostById(id);
        return {
            title: post?.title || 'Post Not Found',
            description: post?.body?.substring(0, 150) || 'No description available.',
        };
    } catch {
        return { title: 'Post Not Found' };
    }
}

// ✅ Fetch post inside a separate function
async function fetchPostById(id: number): Promise<Post> {
    try {
        const response = await PostService.getPostById(id);
        if (!response) {
            throw new Error('Post not found');
        }
        return response;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An error occurred while fetching the post.');
    }
}

// ✅ Correctly await params inside the component
// export default async function Post({ params }: { params: { id: string } }) {
export default async function Post({ params }: { params: Promise<{ id: string }> }) {
    const awaitedParams = await params;
    const id = Number(awaitedParams.id);

    if (isNaN(id)) {
        return (
            <div className={styles.errorContainer}>
                <div className={styles.ownaiLogo}>
                    <a href="https://ownai.net/" target="_blank" rel="noopener noreferrer">
                        own<b>AI</b>
                    </a>
                </div>
                <Link href="/posts" className={styles.backLink}>← Back to Posts</Link>
                <div className={styles.error}>Invalid Post ID.</div>
            </div>
        );
    }

    try {
        const post = await fetchPostById(id);

        return (
            <div className={styles.container}>
                <div className={styles.ownaiLogo}>
                    <a href="https://ownai.net/" target="_blank" rel="noopener noreferrer">
                        own<b>AI</b>
                    </a>
                </div>
                <div className={styles.header}>
                    <Link href="/posts" className={styles.backLink}>← Back to Posts</Link>
                    <h1 className={styles.title}>{post.title}</h1>
                    <div className={styles.metadata}>
                        <span className={styles.views}>👁 {post.views || 0} views</span>
                        <div className={styles.reactions}>
                            <span className={styles.likes}>👍 {post.reactions?.likes ?? 0}</span>
                            <span className={styles.dislikes}>👎 {post.reactions?.dislikes ?? 0}</span>
                        </div>
                    </div>
                    <div className={styles.tags}>
                        {post.tags?.map((tag: string) => (
                            <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                    </div>
                </div>
                <div className={styles.content}>
                    <p className={styles.postContent}>{post.body}</p>
                </div>
                <div className={styles.footer}>
                    <span className={styles.userId}>Post ID: {post.userId}</span>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className={styles.errorContainer}>
                <div className={styles.ownaiLogo}>
                    <a href="https://ownai.net/" target="_blank" rel="noopener noreferrer">
                        own<b>AI</b>
                    </a>
                </div>
                <Link href="/posts" className={styles.backLink}>← Back to Posts</Link>
                <div className={styles.error}>{(error as Error).message}</div>
            </div>
        );
    }
}