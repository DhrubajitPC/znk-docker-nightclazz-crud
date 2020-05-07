import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "./Context";
import styles from "./quotelist.module.css";
import { Quote } from "./types";
import { baseUrl } from "../api";

const QuoteList: FC = () => {
  const { quotes } = useContext(Context);

  return (
    <div className={styles.list}>
      <Link to="/new">
        <button className={styles.btn}>Add new quote</button>
      </Link>
      {quotes.map((item: Quote) => (
        <QuoteItem quote={item} key={item._id} />
      ))}
    </div>
  );
};

const QuoteItem: FC<{ quote: Quote }> = ({ quote }) => {
  const { refreshState } = useContext(Context);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to={`/edit/${quote._id}`} style={{ textDecoration: "none" }}>
          <h3>{quote.body}</h3>
        </Link>
        <span className={styles.delete} onClick={handleDelete}>
          <svg width="100%" viewBox="0 0 20 20" version="1.1">
            <line
              x1="10%"
              x2="90%"
              y1="10%"
              y2="90%"
              stroke="black"
              strokeWidth="3"
            />
            <line
              x1="10%"
              x2="90%"
              y1="90%"
              y2="10%"
              stroke="black"
              strokeWidth="3"
            />
          </svg>
        </span>
      </div>
      <div className={styles.footer}>
        <ul>
          <li>
            Authored by <em>{quote.author}</em>
          </li>
        </ul>
      </div>
    </div>
  );

  async function handleDelete() {
    await fetch(`${baseUrl}/${quote._id}`, { method: "DELETE" });
    refreshState();
  }
};

export default QuoteList;
