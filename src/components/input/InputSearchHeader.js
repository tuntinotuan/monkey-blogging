import { IconSearch } from "components/icon";
import { debounce } from "lodash";
import React from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const InputSearchHeader = () => {
  const [params] = useSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordSearch = params.get("keyword");
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const SearchKeywordHandler = debounce((e) => {
    if (filter === "") return;
    if (e.type !== "click" && e.key !== "Enter") return;
    if (keywordSearch) {
      searchParams.set("keyword", filter);
      setSearchParams(searchParams);
    } else {
      navigate(`/search?keyword=${filter}`);
    }
  }, 500);
  return (
    <div className="search dark:bg-gray-800 dark:!border-none">
      <input
        type="text"
        className="search-input dark:bg-gray-800 dark:text-white dark:outline-gray-800"
        placeholder="Search posts..."
        defaultValue={keywordSearch}
        onChange={(e) => setFilter(e.target.value)}
        onKeyDown={SearchKeywordHandler}
      />
      <span
        className={`search-icon cursor-pointer ${
          filter ? "" : "cursor-wait"
        } p-2 -mr-2`}
        onClick={SearchKeywordHandler}
      >
        <IconSearch></IconSearch>
      </span>
    </div>
  );
};

export default InputSearchHeader;
