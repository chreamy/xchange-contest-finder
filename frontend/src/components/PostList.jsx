import Post from "./Post";
import styles from "./PostList.module.css";

export const PostList = ({ teamposts }) => {
  if (!teamposts) {
    return <div>postLoading...</div>;
}
  return (
    <>
      <div className={styles.list}>
        {teamposts.map((teampost) => {
          return (
            <Post
              sender={teampost.sender}
              createdAt={teampost.createdAt}
              content={teampost.content}
            />
          );
        })}
      </div>
    </>
  );
};