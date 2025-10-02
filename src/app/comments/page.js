import { db } from "@/utils/dbConnection";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import commentsStyles from "./comments.module.css";

export default async function CommentsPage() {
  const postsQuery = await db.query(`SELECT id, title FROM posts`);
  const posts = postsQuery.rows;

  async function handleSubmit(formData) {
    "use server";

    const postId = formData.get("post_id");
    const author = formData.get("author");
    const content = formData.get("content");

    await db.query(
      `INSERT INTO comments (post_id, author, content) VALUES ($1, $2, $3)`,
      [postId, author, content]
    );

    revalidatePath(`/posts/${postId}`);

    redirect(`/posts/${postId}`);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Being here before</h1>

      <h3 className="text-2xl font-semibold mt-8">Leave a Comment</h3>
      <form action={handleSubmit} className={commentsStyles.commentForm}>
        {/* Select which post to comment on */}
        <label htmlFor="post_id">Select Post:</label>
        <select name="post_id" required className="border p-2 w-full">
          <option value="">-- Choose a Post --</option>
          {posts.map((post) => (
            <option key={post.id} value={post.id}>
              {post.title}
            </option>
          ))}
        </select>

        <label htmlFor="author">Your Name:</label>
        <input
          type="text"
          name="author"
          required
          className="border p-2 w-full"
          placeholder="Enter your name"
        />

        <label htmlFor="content">Comment:</label>
        <textarea
          name="content"
          required
          className="border p-2 w-full"
          placeholder="Write your comment..."
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition cursor-pointer"
        >
          Submit Comment
        </button>
      </form>
    </div>
  );
}
