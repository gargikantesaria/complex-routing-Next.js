import styles from './page.module.css';
import { PostService } from '../service';
import Link from 'next/link';
import type { Post } from '@/app/types/post';
import Header from '../../header'
import dynamic from 'next/dynamic';

// Dynamic import of PostDetail component
const PostDetail = dynamic(() => import('../component/postDetail'), {
    loading: () => <p>Loading...</p>,
    ssr: true
});

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

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
    const awaitedParams = await params;
    const id = Number(awaitedParams.id);

    if (isNaN(id)) {
        return (
            <div className={styles.errorContainer}>
                <Header />
                <Link href="/posts" className={styles.backLink}>← Back to Posts</Link>
                <div className={styles.error}>Invalid Post ID.</div>
            </div>
        );
    }

    try {
        const post = await fetchPostById(id);

        return (
            <div className={styles.container}>
                <Header />
                <Link href="/posts" className={styles.backLink}>← Back to Posts</Link>
                <PostDetail postDetail={post} />
            </div>
        );
    } catch (error) {
        return (
            <div className={styles.errorContainer}>
                <Header />
                <Link href="/posts" className={styles.backLink}>← Back to Posts</Link>
                <div className={styles.error}>{(error as Error).message}</div>
            </div>
        );
    }
}