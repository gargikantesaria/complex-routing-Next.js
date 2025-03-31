import Link from "next/link";
import styles from "./page.module.css";
import Header from "./header";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.heading}>Why Next.js?</h1>
      <p className={styles.description}>
        Next.js makes websites easier to build and faster to use. Here's how it improves navigation compared to traditional websites:
      </p>
      <div className={styles.demoSection}>
        <h2>See It In Action</h2>
        <p>
          Check out our demo page to experience these features yourself:
        </p>
        <div className={styles.align_center}>
          <Link href="/posts" className={styles.link}>
            View Posts →
          </Link>
        </div>
      </div>
      <div className={styles.features}>
        <div className={styles.featureCard}>
          <h3>📁 Simple Organization</h3>
          <p>
            Pages are organized just like folders on your computer - making it easy to find and manage different parts of your website.
          </p>
        </div>
        <div className={styles.featureCard}>
          <h3>⚡ Instant Loading</h3>
          <p>
            Pages load quickly and smoothly, giving visitors a better experience than traditional websites.
          </p>
        </div>
        <div className={styles.featureCard}>
          <h3>🎨 Better User Experience</h3>
          <p>
            Automatic loading indicators and error handling keep users informed about what's happening on the website.
          </p>
        </div>
        <div className={styles.featureCard}>
          <h3>🔄 Dynamic Routes</h3>
          <p>
            Create dynamic pages using [brackets] in folder names. Perfect for blog posts, product pages, and user profiles.
          </p>
        </div>
        <div className={styles.featureCard}>
          <h3>🖥️ Server vs Client</h3>
          <p>
            Use the 'use client' directive to mark components for client-side rendering when you need interactivity, browser APIs, or React hooks.
          </p>
        </div>
        <div className={styles.featureCard}>
          <h3>📦 Code Splitting & Dynamic Imports</h3>
          <p>
            Next.js automatically splits your JavaScript bundles to improve performance. Use <code>next/dynamic</code> to dynamically import components only when needed, reducing initial load time.
          </p>
        </div>
      </div>
    </div>
  );
}