import axios from "axios";
import React, { Component } from "react";
import Pagination from "react-bootstrap/Pagination";
import Contest from "../components/Contest";
import Filter from "../components/Filter";
import SearchBar from "../components/UI/SearchBar";
import { HOST } from "../const";
import styles from "./contestList.module.css";

const options = ["最新", "熱門", "地區", "截止"];
class ContestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contests: [
        {
          name: "比賽名稱",
          date: "2024-01-31",
          address: "???",
          media: [""],
          title: "第三屆永豐金控校園商業競賽",
          link: "https://bhuntr.com/tw/competitions/2j7caw8wuyajnc5wl0",
        },
        {
          name: "比賽名稱",
          date: "2024-01-31",
          address: "???",
          media: [""],
          title: "2024 放視大賞",
          link: "https://bhuntr.com/tw/competitions/s5uzvd968dqz7bstq8",
        },
        {
          title: "G-Force 綠能創意設計賽",
          link: "https://bhuntr.com/tw/competitions/2gt0b6sm2gbo6a0hq6",
        },
        {
          title: "憂鬱主題原創歌曲/微電影徵稿活動",
          link: "https://bhuntr.com/tw/competitions/1cj5lwubdzchxg75fe",
        },
        {
          title: "2024年全國學生圖畫書創作獎",
          link: "https://bhuntr.com/tw/competitions/mtjjseznw2rp7eojam",
        },
        {
          title: "第2屆緋染天空插畫比賽",
          link: "https://bhuntr.com/tw/competitions/dzxgmygitmlruevsi3",
        },
        {
          title: "第29屆萬家香溫馨家園．童言童畫甄選比賽",
          link: "https://bhuntr.com/tw/competitions/ekl94t0gtlvd410bfq",
        },
        {
          title: "瓩設計獎kW Design Award─第24屆創意競賽",
          link: "https://bhuntr.com/tw/competitions/7e9r8q4aydg5vlyoum",
        },
      ],
    };
  }

  fetchData = async () => {
    let contests = [];

    await axios
      .post(`${HOST}/contest/list`, {})
      .then((res) => {
        contests = res.data;
        this.setState({ contests });
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    this.fetchData();
  }

  handleSearch = async (query) => {
    let res = await axios.post(`${HOST}/contest/search`, {
      query,
    });
    this.setState({ contests: res.data });
  };

  render() {
    return (
      <>
        <div className={styles.searchBlock}>
          <SearchBar handleSearch={this.handleSearch} />
          <Filter options={options} />
        </div>
        <div className={styles.list}>
          {this.state.contests &&
            this.state.contests.map((contest) => {
              console.log(contest);
              return (
                <Contest
                  title={contest.title}
                  link={contest._id}
                  coverImg={contest.coverImg}
                />
              );
            })}
          <Pagination style={{ position: "absolute", bottom: "1rem" }}>
            <Pagination.First linkClassName={styles.linkItem} />
            <Pagination.Prev linkClassName={styles.linkItem} />
            <Pagination.Item linkClassName={styles.linkItem}>
              {1}
            </Pagination.Item>
            <Pagination.Ellipsis linkClassName={styles.linkItem} />
            <Pagination.Item linkClassName={styles.linkItem}>
              {10}
            </Pagination.Item>
            <Pagination.Item linkClassName={styles.linkItem}>
              {11}
            </Pagination.Item>
            <Pagination.Item linkClassName={styles.linkItem}>
              {12}
            </Pagination.Item>
            <Pagination.Item linkClassName={styles.linkItem}>
              {13}
            </Pagination.Item>
            <Pagination.Item linkClassName={styles.linkItem}>
              {14}
            </Pagination.Item>
            <Pagination.Item linkClassName={styles.linkItem}>
              {15}
            </Pagination.Item>
            <Pagination.Next linkClassName={styles.linkItem} />
            <Pagination.Last linkClassName={styles.linkItem} />
          </Pagination>
        </div>
      </>
    );
  }
}

export default ContestList;
