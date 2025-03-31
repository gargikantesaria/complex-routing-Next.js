import { Post } from "@/app/types/post";
import styles from '../[id]/page.module.css'

interface BlogDetailProps {
    postDetail: Post
}

export default function postDetail({ postDetail }: BlogDetailProps) {
    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>{postDetail.title}</h1>
                <div className={styles.metadata}>
                    <span className={styles.views}>👁 {postDetail.views || 0} views</span>
                    <div className={styles.reactions}>
                        <span className={styles.likes}>👍 {postDetail.reactions?.likes ?? 0}</span>
                        <span className={styles.dislikes}>👎 {postDetail.reactions?.dislikes ?? 0}</span>
                    </div>
                </div>
                <div className={styles.tags}>
                    {postDetail.tags?.map((tag: string) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                </div>
            </div>
            <div className={styles.content}>
                <p className={styles.postContent}>{postDetail.body}</p>
            </div>
            <div className={styles.footer}>
                <span className={styles.userId}>Post ID: {postDetail.id}</span>
            </div>
        </div>
    )
}