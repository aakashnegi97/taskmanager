import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import db from '../../firebase';

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

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
                document.getElementById('invalid-sign-up').style.display = "flex";
            }
            else if (username.length >= 6 && password.length >= 6) {
                document.getElementById('invalid-sign-up').style.display = "none";
                db.collection('users').add({
                    username: username,
                    password: password
                }).then(() => {
                    setUsername("");
                    setPassword("");
                    history.push("/sign-in");
                })
            }
            else {
                alert("Username and Password must be of length 6 or greater!");
            }
        }
        );
    }
    useEffect(() => {
        document.getElementById('invalid-sign-up').style.display = "none";
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
                        Sign Up
                    </button>
                </div>
            </div>
            <div className="login-button-container invalid-data" id="invalid-sign-up" style={{ display: "none" }} >
                <p>
                    *user already exist
                </p>
            </div>
            <div className="sign-up-sign-in">
                <h5>
                    Already have account?
                </h5>
                <Link to="/sign-in">
                    <div className="sign-in-button-container">
                        <h5 className="sign-in-button">
                            Sign-in
                        </h5>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default SignUp;
