import React from "react"
import ReactDOM from "react-dom"
import "./styles.css"
import "semantic-ui-css/semantic.min.css"
import App from "./components/App.jsx"
import Login from "./components/Auth/Login.jsx"
import Register from "./components/Auth/Register.jsx"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </Router>
)

ReactDOM.render(<Root />, document.getElementById("root"))
