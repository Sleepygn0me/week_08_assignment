//TODO: render a list of posts
//TODO: set up a sorting filter (searchParams)

import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function PostsPage() {
  const query = await db.query(`SELECT id, title, content FROM posts `);

  const posts = query.rows;
  return (
    <div>
      {posts.map((post) => {
        return (
          // access the class names form teh style sheet
          <div key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </div>
        );
      })}
    </div>
  );
}
