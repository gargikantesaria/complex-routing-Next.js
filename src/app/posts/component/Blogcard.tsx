import { Post } from "@/app/types/post";
import Link from "next/link";
import dynamic from 'next/dynamic';
import styles from '../posts.module.css';

interface BlogCardProps {
    blogInfo: Post;
}

// Dynamic import of Deletebutton component
const DynamicDeleteButton = dynamic(() => import('./deleteButton'), {
    loading: () => <p>Loading...</p>,
});

export default function BlogCard({ blogInfo }: BlogCardProps) {
    return (
        <Link href={`/posts/${blogInfo.id}`} key={blogInfo.id} className={styles.card}>
            <div className={styles.cardHeader}>
                <h2>{blogInfo.title}</h2>
            </div>
            <div className={styles.cardBody}>
                <p>{blogInfo.body.substring(0, 150)}...</p>
            </div>
            <div className={styles.cardFooter}>
                <div className={styles.metadata}>
                    <span>Views: {blogInfo.views}</span>
                    <DynamicDeleteButton postId={blogInfo.id} />
                </div>
            </div>
        </Link>
    );
}
