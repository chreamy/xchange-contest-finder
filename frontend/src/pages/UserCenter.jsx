import { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";

import styles from "./UserCenter.module.css";
import PersonalInfo from "./UserCenter/PersonalInfo";
import MyCollection from "./UserCenter/MyCollection";
import MyTeam from "./UserCenter/MyTeam";

export const UserCenter = () => {
  const [nowPage, setNowPage] = useState("personalInfo");

  return (
    <div style={{ backgroundColor: "#f1f7ee", padding: "5%" }}>
      <Container>
        {/* <h1 style={{ fontSize: "32px" }}>會員中心</h1> */}
        <Row
          style={{
            boxShadow: "8px 10px 6px rgba(220, 220, 220, 0.3)",
            borderRadius: "0px 15px 15px 0px",
          }}
        >
          <Col sm={3} className={styles.navCol}>
            <Nav
              defaultActiveKey="personalInfo"
              className={`flex-column ${styles.subNav}`}
              onSelect={(selectedKey) => setNowPage(selectedKey)}
            >
              <Nav.Link
                eventKey="personalInfo"
                className={
                  nowPage === "personalInfo"
                    ? `${styles.link} ${styles.active}`
                    : styles.link
                }
              >
                個人資料
              </Nav.Link>
              <Nav.Link
                eventKey="myCollection"
                className={
                  nowPage === "myCollection"
                    ? `${styles.link} ${styles.active}`
                    : styles.link
                }
              >
                我的收藏
              </Nav.Link>
              <Nav.Link
                eventKey="myTeam"
                className={
                  nowPage === "myTeam"
                    ? `${styles.link} ${styles.active}`
                    : styles.link
                }
              >
                我的隊伍
              </Nav.Link>
            </Nav>
          </Col>
          <Col sm={9} className={styles.content}>
            {nowPage === "personalInfo" && <PersonalInfo />}
            {nowPage === "myCollection" && <MyCollection />}
            {nowPage === "myTeam" && <MyTeam />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
