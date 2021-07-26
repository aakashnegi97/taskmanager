import CreateTask from "./CreateTask";
import TaskTable from "./TaskTable";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import db from "../../firebase";

function Homepage() {
    const [createState, setCreateState] = useState("none");
    const history = useHistory();
    const createTaskFunction = () => {
        if (createState === "none") {
            setCreateState("flex");
        }
        else {
            setCreateState("none");
        }
    }
    const logOutFunc = () => {
        localStorage.setItem("taskmanagerCredUser", "");
        localStorage.setItem("taskmanagerCredPassword", "");
        history.push("/sign-in");
    }
    useEffect(() => {
        document.getElementById('main-container').style.height = "auto";
        setCreateState("none");
        if (localStorage.getItem("taskmanagerCredUser")) {
            db.collection('users').where("username", "==", localStorage.getItem("taskmanagerCredUser")).get().then((snap) => {
                if (snap.docs[0]) {
                    if (snap.docs[0].data().password != localStorage.getItem("taskmanagerCredPassword")) {
                        history.push("/sign-in");
                    }
                    else {

                    }
                }
                else {
                    history.push("/sign-in");
                }
            });
        }
        else {
            history.push("/sign-in");
        }
    }, []);
    return (
        <>
            <CreateTask display={createState} close={createTaskFunction} />
            <div className="home-main-container">
                <div className="home-container">
                    <header>
                        <div className="header-container">
                            <div className="heading">
                                <h2>
                                    Nirmitee
                                </h2>
                            </div>
                            <div className="heading">
                                <h1>
                                    Task Manager
                                </h1>
                            </div>
                            <div className="user-heading">
                                <div>
                                    <h4>
                                        Hi, Aakash
                                    </h4>
                                </div>
                                <div className="logout-button">
                                    <button onClick={logOutFunc}>
                                        Log out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="task-type-container">
                        <ul className="task-nav">
                            <ul className="task-type">
                                <li>
                                    All Task
                                </li>
                                <li>
                                    My Task
                                </li>
                            </ul>
                            <li className="create-task-container">
                                <button onClick={createTaskFunction}>
                                    Create Task
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="task-list-head">
                        <TaskTable />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Homepage;
