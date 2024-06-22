import styles from "./Post.module.css";

const Post = ({ sender, createdAt, content}) => {
  return (
      <div className={styles.post}>
        <div className={styles.persontime}>
            <p className={styles.poster}>{sender}</p>
            <p>{createdAt}</p>
        </div>
        <p>{content}</p>
      </div>
  );
};

export default Post;
