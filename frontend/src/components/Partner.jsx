import styles from "./Partner.module.css";

const Partner = ({ name, identity, contest, intro, link }) => {
  return (
    <div className={styles.partner}>
      <p className={styles.title}>{name}</p>
      <div className={styles.basicInfo}>
        <p>身分：{identity}</p>
        <p>興趣比賽類別：{contest}</p>
      </div>
      <div className={styles.intro}>
        <p>個人簡介：</p>
        <p>{intro}</p>
      </div>
      <a href={link} className={styles.readMore}>
        Read more →
      </a>
    </div>
  );
};

export default Partner;
