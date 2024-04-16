import styles from "./SearchBar.module.css";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = ({ handleSearch }) => {
  return (
    <form className={styles.searchBar} onSubmit={handleSearch}>
      <input type="search" placeholder="請輸入關鍵字" />
      <button type="submit">
        <SearchOutlined />
      </button>
    </form>
  );
};

export default SearchBar;
