import { db } from "@/utils/dbConnection";
import Link from "next/link";
import postsStyles from "./posts.module.css";

export default async function PostsPage({ searchParams }) {
  const queryResult = await db.query(`SELECT id, title, content FROM posts `);
  const posts = queryResult.rows;

  const sort = searchParams?.sort;

  if (sort === "asc") {
    posts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "desc") {
    posts.sort((a, b) => b.title.localeCompare(a.title));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Posts</h1>

      {/* Sort */}
      <div className="mb-4 space-x-2">
        <Link href="/posts?sort=asc" className="text-blue-600 underline">
          Sort A → Z
        </Link>
        <Link href="/posts?sort=desc" className="text-blue-600 underline">
          Sort Z → A
        </Link>
      </div>

      {posts.map((post) => {
        return (
          // access the class names form teh style sheet
          <div className={postsStyles.postCard} key={post.id}>
            <Link href={`/posts/${post.id}`} className={postsStyles.postTitle}>
              {post.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
