'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import styles from './page.module.css';
import { PostService } from '../service';

// Define the validation schema
const postSchema = z.object({
    title: z.string()
        .min(1, 'Title is required')
        .max(100, 'Title must be less than 100 characters')
        .trim(),
    postContent: z.string()
        .min(10, 'Content must be at least 10 characters')
        .max(5000, 'Content must be less than 5000 characters')
        .trim(),
    userId: z.number().int().positive(),
});

// Type for form data
type PostFormData = z.infer<typeof postSchema>;

export default function NewPost() {
    const router = useRouter();
    const [formData, setFormData] = useState<PostFormData>({
        title: '',
        postContent: '',
        userId: 5, // Default userId (if needed)
    });

    const [errors, setErrors] = useState<Partial<Record<keyof PostFormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            // Validate the form data
            const validatedData = postSchema.parse(formData);

            // Add the post using PostService
            const response = await PostService.addPost(validatedData);

            if (response.data) {
                router.push('/posts');
            } else {
                alert(response.message);
            }

        } catch (error) {
            if (error instanceof z.ZodError) {
                // Handle Zod validation errors
                const formattedErrors: Partial<Record<keyof PostFormData, string>> = {};
                error.errors.forEach((err) => {
                    const path = err.path[0] as keyof PostFormData;
                    formattedErrors[path] = err.message;
                });
                setErrors(formattedErrors);
            } else {
                console.error('Error creating post:', error);
                alert('Failed to create post. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* Logo */}
            <div className={styles.ownaiLogo}>
                <a href="https://ownai.net/" target="_blank">own<b>AI</b></a>
            </div>

            {/* Header */}
            <div className={styles.header}>
                <Link href="/posts" className={styles.homeButton}>
                    <span>← Back to Posts</span>
                </Link>
                <h1 className={styles.title}>Create New Post</h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className={styles.addPostForm}>
                {/* Title Input */}
                <div className={styles.formGroup}>
                    <label htmlFor="title">
                        Title <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.title ? styles.errorInput : ''}`}
                        aria-required="true"
                    />
                    {errors.title && (
                        <span className={styles.errorText}>{errors.title}</span>
                    )}
                </div>

                {/* Post Content Input */}
                <div className={styles.formGroup}>
                    <label htmlFor="postContent">
                        Content <span className={styles.required}>*</span>
                    </label>
                    <textarea
                        id="postContent"
                        value={formData.postContent}
                        onChange={handleChange}
                        className={`${styles.textarea} ${errors.postContent ? styles.errorInput : ''}`}
                        rows={10}
                        aria-required="true"
                    />
                    {errors.postContent && (
                        <span className={styles.errorText}>{errors.postContent}</span>
                    )}
                </div>

                {/* Submit Button */}
                <div className={styles.formActions}>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.submitButton}
                    >
                        {isSubmitting ? (
                            <div className={styles.loader}></div>
                        ) : (
                            'Create Post'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
