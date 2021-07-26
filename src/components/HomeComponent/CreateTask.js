import { useState } from "react";
import db from "../../firebase";

function CreateTask(props) {
    const [inputData, setInputData] = useState("");
    const createTaskFunc = () => {
        db.collection('taskdata').add({
            taskname: inputData,
            status: "TO DO",
            createdby: localStorage.getItem("taskmanagerCredUser"),
            lastedit: new Date(),
            assignedto: "",
            createdat: new Date()
        }).then(props.close());
    }
    return (
        <>
            <div style={{ display: props.display, zIndex: 2 }} className="create-page-close-button" onClick={props.close}></div>
            <div className="login-body create-task-page" style={{ display: props.display, zIndex: 5 }}>
                <div className="login-container create-task-page-inner">
                    <div className="signin-body">
                        <div className="login-child">
                            <div className="label">
                                <h2>
                                    Task Name:
                                </h2>
                            </div>
                            <div className="input-box">
                                <input value={inputData} onChange={(e)=>setInputData(e.target.value)}/>
                            </div>
                        </div>
                        <div className="login-button-container">
                            <div className="login-button">
                                <button onClick={createTaskFunc}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateTask;
