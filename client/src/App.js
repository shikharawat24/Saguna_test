import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddAssociate from "./components/AddAssociate";
import Header from "./components/Header";
import ListAssociate from "./components/ListAssociate";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={ListAssociate}></Route>
            <Route path="/add-associate" component={AddAssociate}></Route>
            <Route path="/edit-associate/:id" component={AddAssociate}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
