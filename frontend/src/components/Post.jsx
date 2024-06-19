import styles from "./Post.module.css";

const Post = ({ name, time, content}) => {
  return (
      <div className={styles.post}>
        <div className={styles.persontime}>
            <p className={styles.poster}>{name}</p>
            <p>{time}</p>
        </div>
        <p>{content}</p>
      </div>
  );
};

export default Post;
