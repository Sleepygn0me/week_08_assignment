import { db } from "@/utils/dbConnection";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function ContentPage({ params }) {
  const postId = params.postsId;

  const postQuery = await db.query(
    `SELECT id, title, content FROM posts WHERE id = $1`,
    [postId]
  );
  // Fetch comments for this post
  const commentsQuery = await db.query(
    `SELECT id, author, content FROM comments WHERE post_id = $1 ORDER BY id ASC`,
    [postId]
  );
  const comments = commentsQuery.rows;
  const post = postQuery.rows[0];

  async function handleSubmit(formData) {
    "use server";

    const author = formData.get("author");
    const content = formData.get("content");

    // Insert the comment into the comments table
    await db.query(
      `INSERT INTO comments (post_id, author, content) VALUES ($1, $2, $3)`,
      [postId, author, content]
    );

    // Revalidate the post page so comments appear immediately
    revalidatePath(`/posts/${postId}`);
    redirect(`/posts/${postId}`);
  }

  async function handleDeleteComment(formData) {
    "use server";

    const commentId = formData.get("comment_id");

    await db.query(`DELETE FROM comments WHERE id = $1`, [commentId]);

    revalidatePath(`/posts/${postId}`);
    redirect(`/posts/${postId}`);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="mb-6">{post.content}</p>

      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      {comments.length === 0 && <p>No comments yet.</p>}
      <ul className="mb-6">
        {comments.map((comment) => (
          <li key={comment.id} className="border-b py-2">
            <strong>{comment.author}:</strong> {comment.content}{" "}
            <small className="text-gray-500">
              ({new Date(comment.created_at).toLocaleString()})
            </small>
            {/* Delete button */}
            <form action={handleDeleteComment}>
              <input type="hidden" name="comment_id" value={comment.id} />
              <button type="submit" className="text-red-600 hover:underline">
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mb-2">Add a Comment</h3>
      <form action={handleSubmit} className="space-y-4">
        <input type="hidden" name="post_id" value={postId} />

        <label htmlFor="author">Your Name:</label>
        <input
          type="text"
          name="author"
          required
          className="border p-2 w-full"
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
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Comment
        </button>
      </form>
    </div>
  );
}
