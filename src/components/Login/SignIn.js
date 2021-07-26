import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import db from '../../firebase';

function SignIn(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const usernameInput = (e) => {
        const pattern = /[a-z]{1,}\w{0,}/i;
        var string = e;
        var validString = string.match(pattern)
        if (string == "") {
            setUsername("")
        }
        else if (validString == string) {
            setUsername(validString[0].toLowerCase())
        }
    }
    const passwordInput = (e) => {
        const pattern = /[ ]/i;
        var string = e;
        var validString = string.match(pattern);
        if (validString == null) {
            setPassword(string);
        }
    }
    const updateDB = () => {
        db.collection('users').where('username', '==', username).get().then((snap) => {
            if (snap.docs[0]) {
                if (snap.docs[0].data().password == password) {
                    document.getElementById('invalid-sign-in').style.display = "none";
                    localStorage.setItem(
                        "taskmanagerCredUser", username
                    );
                    localStorage.setItem(
                        "taskmanagerCredPassword", password
                    );
                    props.redirectHome();
                }
                else {
                    document.getElementById('invalid-sign-in').style.display = "flex";
                }
            }
            else {
                document.getElementById('invalid-sign-in').style.display = "flex";
            }
        }
        );
    }
    useEffect(() => {
        document.getElementById('invalid-sign-in').style.display = "none";
    }, []);
    return (
        <div className="signin-body">
            <div className="login-child">
                <div className="label">
                    <h2>
                        User Name:
                    </h2>
                </div>
                <div className="input-box">
                    <input value={username} onChange={(e) => usernameInput(e.target.value)} />
                </div>
            </div>
            <div className="login-child">
                <div className="label">
                    <h2>
                        Password:
                    </h2>
                </div>
                <div className="input-box">
                    <input type="password" value={password} onChange={(e) => passwordInput(e.target.value)} />
                </div>
            </div>
            <div className="login-button-container">
                <div className="login-button">
                    <button onClick={updateDB}>
                        Log In
                    </button>
                </div>
            </div>
            <div className="login-button-container invalid-data" id="invalid-sign-in" style={{ display: "none" }}>
                <p>
                    *credentials are incorrect
                </p>
            </div>
            <div className="sign-up-label-container">
                <div className="sign-up-label">
                    <div>
                        <h3>Don't have account?</h3>
                    </div>
                    <div className="new-user">
                        <Link to="/sign-up">
                            <h3>
                                Sign Up
                            </h3>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
