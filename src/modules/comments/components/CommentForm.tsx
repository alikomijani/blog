"use client";

import { useActionState } from "react";
import { createComment } from "../actions/createComment";

type CommentFormProps = {
  postID: number;
};

export default function CommentForm({ postID }: CommentFormProps) {
  const [state, action, pending] = useActionState(createComment, { ok: false });

  return (
    <form
      action={action}
      className="w-full max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4 border border-gray-100"
    >
      {state.message && <div className="text-red-400">{state.message}</div>}
      <input name="postID" value={postID} hidden readOnly />

      <div className="flex flex-col space-y-2">
        <label htmlFor="content" className="text-sm font-medium text-gray-700">
          نظر شما
        </label>

        <textarea
          name="content"
          id="content"
          rows={4}
          placeholder="نظر خود را بنویسید..."
          className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500transition duration-200"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-blue-600 text-white py-3 text-sm font-semibold hover:bg-blue-700 active:scale-[0.98]transition duration-200"
      >
        ارسال نظر
      </button>
    </form>
  );
}
