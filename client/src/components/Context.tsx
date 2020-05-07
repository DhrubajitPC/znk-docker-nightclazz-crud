import React, { FC, useEffect, useState } from "react";
import { Quote } from "./types";

type Context = {
  refreshState: () => void;
  quotes: Quote[];
};

export const Context = React.createContext<Context>({} as Context);

const ContextWrapper: FC = ({ children }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  useEffect(() => {
    refreshState();
  }, []);

  const refreshState = () => {
    fetch("http://localhost:8080/")
      .then((data) => data.json())
      .then((data) => {
        setQuotes(data);
      });
  };

  return (
    <Context.Provider value={{ quotes, refreshState }}>
      {children}
    </Context.Provider>
  );
};

export default ContextWrapper;
