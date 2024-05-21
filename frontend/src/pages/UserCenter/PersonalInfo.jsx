import styles from "./PersonalInfo.module.css";

const PersonalInfo = () => {
  return (
    <div className={styles.page}>
      <form action="" className={styles.form}>
        <div className={styles.general}>
          <label>帳號</label>
          <input type="email"></input>
        </div>
        <div className={styles.general}>
          <label>姓名</label>
          <input type="text"></input>
        </div>
        <div className={styles.selectable}>
          <label>生日</label>
          <input type="date"></input>
        </div>
        <div className={styles.selectable}>
          <label>身分</label>
          <select name="identity" id="identity">
            <option value="identity0">社會人士</option>
            <option value="identity1">大專生</option>
            <option value="identity2">高中職</option>
            <option value="identity3">國中</option>
            <option value="identity4">小學</option>
          </select>
        </div>
        <div className={styles.textarea}>
          <label>比賽類型</label>
          <input type="textarea"></input>
        </div>
        <div className={styles.textarea}>
          <label>個人技能 (軟實力)</label>
          <input type="textarea"></input>
        </div>
        <div className={styles.textarea}>
          <label>個人技能 (硬實力)</label>
          <input type="textarea"></input>
        </div>
        <div className={styles.textarea}>
          <label>簡介</label>
          <input type="textarea"></input>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
