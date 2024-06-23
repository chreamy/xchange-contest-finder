import axios from 'axios';
import { useEffect, useState } from 'react';

import { getPayload } from '../../components/Auth';
import { HOST } from '../../const';
import styles from "./PersonalInfo.module.css";

const PersonalInfo = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
    birthday: new Date(),
    identity: '',
    contestType: '',
    softSkills: '',
    hardSkills: '',
    bio: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const payload = await getPayload(token)
        const response = await axios.get(`${HOST}/user/profileById/${payload.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data) {
          const { user, form } = response.data;
          setUserInfo({
            email: user.email || '',
            name: user.name || '',
            birthday: form.birthday || new Date(),
            identity: form.identity || '',
            competitionType: form.competitionType || '',
            softSkills: form.softSkills || '',
            hardSkills: form.hardSkills || '',
            introduction: form.introduction || ''
          });
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // Handle errors, e.g., by showing an error message
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className={styles.page}>
      <form action="" className={styles.form}>
        <div className={styles.general}>
          <label>帳號</label>
          <input type="email" value={userInfo.email} readOnly />
        </div>
        <div className={styles.general}>
          <label>姓名</label>
          <input type="text" value={userInfo.name} readOnly />
        </div>
        <div className={styles.selectable}>
          <label>生日</label>
          <input type="text" value={new Date(userInfo.birthday).toLocaleDateString()} readOnly />
        </div>
        <div className={styles.selectable}>
          <label>身分</label>
          <select name="identity" id="identity" value={userInfo.identity}>
            <option value="社會人士">社會人士</option>
            <option value="大專生">大專生</option>
            <option value="高中職">高中職</option>
            <option value="國中">國中</option>
            <option value="小學">小學</option>
          </select>
        </div>
        <div className={styles.textarea}>
          <label>比賽類型</label>
          <textarea value={userInfo.competitionType}></textarea>
        </div>
        <div className={styles.textarea}>
          <label>個人技能 (軟實力)</label>
          <textarea value={userInfo.softSkills}></textarea>
        </div>
        <div className={styles.textarea}>
          <label>個人技能 (硬實力)</label>
          <textarea value={userInfo.hardSkills}></textarea>
        </div>
        <div className={styles.textarea}>
          <label>簡介</label>
          <textarea value={userInfo.introduction}></textarea>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
