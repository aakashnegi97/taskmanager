import Login from './components/Login/Login';
import './static/App.css';
import { useEffect, useState } from 'react';
import db from './firebase';
import Homepage from './components/HomeComponent/Homepage';
import SignUp from './components/Login/SignUp';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [name, setName] = useState([]);
  const [render, setRender] = useState(true);
  const renderFunc = () => {
    setRender(!render);
  }
  useEffect(() => {

  }, [render]);

  return (
    <div>
      <div className="container" id="main-container">
        <Router>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path={["/sign-in", "/sign-up"]}>
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
