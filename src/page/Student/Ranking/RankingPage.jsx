import { useState } from "react";
import RankingList from "../../../components/ranking/RankingList/RankingList";
import styles from "./RankingPage.module.css";

const RankingPage = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [timeRange, setTimeRange] = useState("weekly"); // weekly, monthly, allTime

  return (
    <div className={styles.rankingPage}>
      <div className={styles.header}>
        <h1>Student Rankings</h1>
        <div className={styles.filters}>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={styles.timeRange}
          >
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="allTime">All Time</option>
          </select>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.topRankers}>
          {/* Top 3 students with special styling */}
          <div className={styles.secondPlace}>2nd Place</div>
          <div className={styles.firstPlace}>1st Place</div>
          <div className={styles.thirdPlace}>3rd Place</div>
        </div>

        <div className={styles.rankingList}>
          <RankingList classId={selectedClass} />
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
