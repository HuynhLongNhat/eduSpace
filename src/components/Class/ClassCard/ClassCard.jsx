import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./ClassCard.module.css";

const ClassCard = ({
  id,
  title,
  instructor,
  description,
  studentCount,
  code,
  isInstructor = false,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{title}</h3>
        {isInstructor && <span className={styles.code}>Code: {code}</span>}
      </div>
      <div className={styles.body}>
        <p className={styles.instructor}>Instructor: {instructor}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.stats}>
          <span>{studentCount} students</span>
        </div>
      </div>
      <div className={styles.footer}>
        <Link to={`/class/${id}`} className={styles.viewButton}>
          View Class
        </Link>
      </div>
    </div>
  );
};

ClassCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  instructor: PropTypes.string.isRequired,
  description: PropTypes.string,
  studentCount: PropTypes.number,
  code: PropTypes.string,
  isInstructor: PropTypes.bool,
};

export default ClassCard;
