import React, { useState } from "react";
import axios from "axios";

import styles from "./partnerList.module.css";
import Filter from "../components/Filter";
import SearchBar from "../components/UI/SearchBar";
import Partner from "../components/Partner";

export const PartnerList = () => {
  const [partner, setPartner] = useState([
    {
      name: "姓名",
      identity: "大學生",
      contest: "比賽類型",
      intro: "過去經歷Blabla",
      link: "#",
    },
    {
      name: "姓名",
      identity: "大學生",
      contest: "比賽類型",
      intro: "過去經歷Blabla",
      link: "#",
    },
    {
      name: "姓名",
      identity: "大學生",
      contest: "比賽類型",
      intro: "過去經歷Blabla",
      link: "#",
    },
    {
      name: "姓名",
      identity: "大學生",
      contest: "比賽類型",
      intro: "過去經歷Blabla",
      link: "#",
    },
    {
      name: "姓名",
      identity: "大學生",
      contest: "比賽類型",
      intro: "過去經歷Blabla",
      link: "#",
    },
    {
      name: "姓名",
      identity: "大學生",
      contest: "比賽類型",
      intro: "過去經歷Blabla",
      link: "#",
    },
  ]);

  const options = ["收藏相同", "相似能力", "地區"];

  const handleSearch = async (query) => {
    let res = await axios.post("http://localhost:3001/contest/search", {
      query,
    });
    setPartner({ partner: res.data });
  };

  return (
    <>
      <div className={styles.searchBlock}>
        <SearchBar handleSearch={handleSearch} />
        <Filter options={options} />
      </div>
      <div className={styles.list}>
        {partner.map((p) => {
          return (
            <Partner
              name={p.name}
              identity={p.identity}
              contest={p.contest}
              intro={p.intro}
              link={p.link}
            />
          );
        })}
      </div>
    </>
  );
};
