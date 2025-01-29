import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../../features/comment/commentSlice";
import styles from "./CommentForm.module.css";

const CommentForm = ({ parentId, entityId, entityType }) => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    dispatch(
      addComment({
        content,
        parentId,
        entityId,
        entityType,
      })
    );
    setContent("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className={styles.textarea}
      />
      <button type="submit" className={styles.submitButton}>
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;
