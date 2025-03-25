'use client';

import { useState } from 'react';
import { PostService } from './service';
import styles from './posts.module.css';

interface DeleteButtonProps {
    postId: number;
}

export default function DeleteButton({ postId }: DeleteButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const deletePost = async (e: React.MouseEvent) => {
        e.preventDefault();  // Prevent link navigation
        e.stopPropagation(); // Stop event bubbling

        // Ask for confirmation before deleting
        const isConfirmed = window.confirm('Are you sure you want to delete this post?');
        if (!isConfirmed) return;

        setIsDeleting(true);
        try {
            await PostService.deletePost(postId);
            // Refresh the page to show updated list
            window.location.reload();
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete the post. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            className={styles.deleteButton}
            onClick={deletePost}
            onMouseDown={(e) => e.stopPropagation()}
            disabled={isDeleting}
        >
            {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
    );
}
