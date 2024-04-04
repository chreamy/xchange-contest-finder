import styles from "./SearchBar.module.css";

const SearchBar = ({ handleSearch }) => {
  return (
    <form className={styles.searchBar} onSubmit={handleSearch}>
      <input type="search" placeholder="請輸入關鍵字" />
      <button type="submit">搜尋</button>
    </form>
  );
};

export default SearchBar;
