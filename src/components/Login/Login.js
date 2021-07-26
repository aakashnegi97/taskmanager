import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";

function Login(props) {
    const history = useHistory();
    const redirectHome = () => {
        history.push("/");
    }
    useEffect(() => {
        document.getElementById('main-container').style.height = "97vh";
    }, []);
    return (
        <div className="login-body">
            <div className="login-container">
                <Router>
                    <Switch>
                        <Route path="/sign-in">
                            <SignIn redirectHome={redirectHome}/>
                        </Route>
                        <Route path="/sign-up">
                            <SignUp />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default Login;
