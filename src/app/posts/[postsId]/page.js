import { db } from "@/utils/dbConnection";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function NewCommentPage({ params }) {
  const postId = params.postId;

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

  return (
    <>
      <h1>Add a Comment</h1>
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
    </>
  );
}
