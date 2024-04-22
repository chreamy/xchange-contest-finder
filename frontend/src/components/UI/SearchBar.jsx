import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = ({ handleSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(inputValue);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="請輸入關鍵字"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button type="submit">
        <SearchOutlined />
      </button>
    </form>
  );
};

export default SearchBar;
