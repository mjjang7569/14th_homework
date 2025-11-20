"use client";

import styles from "./styles.module.css";
import _ from "lodash";

interface QueryVariables {
  search: string;
  page: number;
  endDate?: string;
  startDate?: string;
}

interface SearchBarProps {
  data?: unknown;
  setQueryVariables: (fn: (prev: QueryVariables) => QueryVariables) => void;
  setKeyword: (value: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
  // const [keyword, setKeyword] = useState("");
  const getDebounce = _.debounce((value) => {
    // refetch 대신 queryVariables 업데이트
    props.setQueryVariables((prev) => ({
      ...prev,
      search: value,
      page: 1,
    }));
    props.setKeyword(value);
  }, 500);
  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value);
  };
  return (
    <input
      className={styles.searchBar}
      type="text"
      placeholder="제목을 검색해 주세요"
      onChange={onChangeSearch}
    />
  );
}
