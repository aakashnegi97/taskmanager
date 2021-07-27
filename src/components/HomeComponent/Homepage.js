import CreateTask from "./CreateTask";
import TaskTable from "./TaskTable";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import db from "../../firebase";
import UpdateTask from "./UpdateTask";

function Homepage() {
    const [createState, setCreateState] = useState("none");
    const [updateTask, setUpdateTask] = useState("none");
    const [updateId, setUpdateId] = useState("")
    const [task, setTask] = useState([]);
    const [inputData, setInputData] = useState({});

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
    const updateTaskFunc = (id) => {
        db.collection('taskdata').doc(id).get().then((snap) => {
            if (snap.data()) {
                let objectData = snap.data();
                setInputData({
                    id: id,
                    taskname: objectData.taskname,
                    status: objectData.status?objectData.status:"DO TO",
                    createdby: objectData.createdby,
                    assignedto: objectData.assignedto?objectData.assignedto:"",
                    createdat: objectData.createdat ? objectData.createdat.seconds : "",
                    lastedit: objectData.lastedit ? objectData.lastedit.seconds : "",
                    comment: objectData.comment?objectData.comment : [],
                    history: objectData.history?objectData.history : []
                });
            }

            if (updateTask == "none") {
                setUpdateTask("flex");
            }
            else {
                setUpdateTask("none");
            }
        })
    }
    const updateTaskCloseFunc = () => {
        if (updateTask == "none") {
            setUpdateTask("flex");
        }
        else {
            setUpdateTask("none");
        }
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
                        db.collection('taskdata').get().then(snap => {
                            setTask(snap.docs);

                        }
                        )
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
            <UpdateTask inputData={inputData} display={updateTask} close={updateTaskCloseFunc} />
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
                                <h1 onClick={history.push("/")}>
                                    Task Manager
                                </h1>
                            </div>
                            <div className="user-heading">
                                <div>
                                    <h4>
                                        Hi, {localStorage.getItem("taskmanagerCredUser")}
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
                                {/* <li>
                                    My Task
                                </li> */}
                            </ul>
                            <li className="create-task-container">
                                <button onClick={createTaskFunction}>
                                    Create Task
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="task-list-head">
                        <TaskTable data={task} updateTaskFunc={updateTaskFunc} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Homepage;
