import React from "react";
import { Icon, Pagination } from "antd";

function QuizPagination({ questions, active, changeActive }) {
  return (
    <ul className="ant-pagination" unselectable="unselectable">
      <li
        title="Previous Page"
        tabIndex="0"
        className="ant-pagination-prev"
        disabled={active === 0 ? "true" : "false"}
        aria-disabled={active === 0 ? "true" : "false"}
        onClick={() => changeActive(active - 1)}
      >
        <a className="ant-pagination-item-link">
          <Icon type="left" />
        </a>
      </li>
      {questions.map((answered, index) => (
        <li
          title={index + 1}
          className={`ant-pagination-item ${
            index === active ? "ant-pagination-item-active" : ""
          } ${answered ? "question-answered" : ""}`}
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
        disabled={active === questions.length - 1 ? "true" : "false"}
        aria-disabled={active === questions.length - 1 ? "true" : "false"}
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
