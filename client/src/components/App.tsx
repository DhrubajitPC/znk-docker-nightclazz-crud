import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ContextWrapper from "./Context";
import NewQuote from "./NewQuote";
import QuoteList from "./QuoteList";
function App() {
  return (
    <div className="App">
      <ContextWrapper>
        <Router>
          <h1 style={{ color: "gold" }}>Favorite Quotes</h1>
          <Switch>
            <Route path="/new">
              <NewQuote />
            </Route>
            <Route path="/edit/:_id">
              <NewQuote />
            </Route>
            <Route path="/">
              <QuoteList />
            </Route>
          </Switch>
        </Router>
      </ContextWrapper>
    </div>
  );
}

export default App;
