import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRankings } from "../../../features/ranking/rankingSlice";
import RankingCard from "../RankingCard/RankingCard";
import styles from "./RankingList.module.css";

const RankingList = ({ classId }) => {
  const dispatch = useDispatch();
  const { rankings, loading } = useSelector((state) => state.ranking);

  useEffect(() => {
    dispatch(fetchRankings(classId));
  }, [dispatch, classId]);

  if (loading) return <div>Loading rankings...</div>;

  return (
    <div className={styles.rankingList}>
      {rankings.map((ranking, index) => (
        <RankingCard
          key={ranking.studentId}
          rank={index + 1}
          student={ranking.student}
          score={ranking.score}
          progress={ranking.progress}
        />
      ))}
    </div>
  );
};

export default RankingList;
