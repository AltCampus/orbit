import React from "react";
import { Icon, Pagination } from "antd";

function QuizPagination({ questions, active, changeActive }) {
  return (
    <ul className="ant-pagination" unselectable="unselectable">
      <li
        title="Previous Page"
        tabIndex="0"
        className="ant-pagination-prev"
        aria-disabled="false"
        onClick={() => changeActive(active - 1)}
      >
        <a className="ant-pagination-item-link">
          <Icon type="left" />
        </a>
      </li>
      {new Array(questions).fill(0).map((_, index) => (
        <li
          title={index + 1}
          className={`ant-pagination-item ${
            index === active ? "ant-pagination-item-active" : ""
          }`}
          tabIndex="0"
          onClick={() => changeActive(index)}
        >
          <a>{index + 1}</a>
        </li>
      ))}

      <li
        title="Next Page"
        tabIndex="0"
        className="ant-pagination-next"
        aria-disabled="false"
        onClick={() => changeActive(active + 1)}
      >
        <a className="ant-pagination-item-link">
          <Icon type="right" />
        </a>
      </li>
    </ul>
  );
}

export default QuizPagination;
