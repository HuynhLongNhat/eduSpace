import PropTypes from "prop-types";
import styles from "./RankingCard.module.css";

const RankingCard = ({ rank, student, score, progress }) => {
  return (
    <div className={styles.rankingCard}>
      <div className={styles.rank}>#{rank}</div>
      <div className={styles.info}>
        <div className={styles.student}>
          <img
            src={student.avatar}
            alt={student.name}
            className={styles.avatar}
          />
          <h3>{student.name}</h3>
        </div>
        <div className={styles.stats}>
          <div className={styles.score}>
            <span>Score</span>
            <strong>{score}</strong>
          </div>
          <div className={styles.progress}>
            <span>Progress</span>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RankingCard.propTypes = {
  rank: PropTypes.number.isRequired,
  student: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
};

export default RankingCard;
