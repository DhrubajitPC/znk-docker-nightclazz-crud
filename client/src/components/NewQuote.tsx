import React, { FC, FormEvent, useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "./Context";
import styles from "./newquote.module.css";

const NewQuote: FC = () => {
  const history = useHistory();
  const { _id } = useParams();
  const { quotes, refreshState } = useContext(Context);
  const quote = quotes.find((quote) => quote._id === _id);
  const [mAuthor, setMAuthor] = useState(quote?.author || "");
  const [mBody, setMBody] = useState(quote?.body || "");
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="body">Quote:</label>
        <textarea
          id="body"
          rows={10}
          value={mBody}
          onChange={(e) => setMBody(e.target.value)}
        ></textarea>
        <label htmlFor="author">Author</label>
        <input
          id="author"
          value={mAuthor}
          onChange={(e) => setMAuthor(e.target.value)}
        ></input>
        <input type="submit" className={styles.btn}></input>
      </form>
    </div>
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!mAuthor) {
      alert("needs an author");
    } else if (!mBody) {
      alert("needs a body");
    } else {
      if (!_id) {
        await fetch("http://localhost:8080/new", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            author: mAuthor,
            body: mBody,
          }),
        });
      } else {
        await fetch(`http://localhost:8080/${_id}`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            author: mAuthor,
            body: mBody,
          }),
        });
      }
      refreshState();
      history.push("/");
    }
  }
};

export default NewQuote;
