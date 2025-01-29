import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../../features/comment/commentSlice";
import CommentItem from "./CommentItem";
import styles from "./CommentList.module.css";

const CommentList = ({ entityId, entityType }) => {
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(fetchComments({ entityId, entityType }));
  }, [dispatch, entityId, entityType]);

  if (loading) return <div>Loading comments...</div>;

  return (
    <div className={styles.commentList}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
