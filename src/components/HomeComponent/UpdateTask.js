import { useEffect, useState } from "react";
import db from "../../firebase";

function UpdateTask(props) {
    const [statusState, setStatusState] = useState("");
    const [ownerState, setOwnerState] = useState("");
    const [createdState, setCreatedState] = useState("");
    const [editState, setEditState] = useState("");
    const [commentBox, setCommentBox] = useState("");

    const createTaskFunc = () => {

        db.collection('users').where("username", "==", ownerState).get().then((snap) => {
            if (snap.docs[0] || ownerState === "") {
                db.collection('taskdata').doc(props.inputData.id).update({
                    status: statusState,
                    lastedit: new Date(),
                    assignedto: ownerState,
                    comment: commentBox ? [...props.inputData.comment, commentBox] : [...props.inputData.comment]
                }).then(props.close());
            }
            else {
                alert("Owner doen't exist!");
            }
        });
    }

    useEffect(() => {
        setStatusState(props.inputData.status);
        setOwnerState(props.inputData.assignedto);
        let x = new Date(props.inputData.createdat * 1000);
        setCreatedState(`${x.getDate()}-${x.getMonth() + 1}-${x.getFullYear()} ${x.getHours() + 1}:${x.getMinutes() + 1}`);
        let y = new Date(props.inputData.lastedit * 1000);
        setEditState(`${y.getDate()}-${y.getMonth() + 1}-${y.getFullYear()} ${y.getHours() + 1}:${y.getMinutes() + 1}`);
    }, [props.inputData.status, props.inputData.assignedto, props.id]);

    // useEffect(() => {
    //     db.collection('taskdata').where("taskname","==","Advertisement").onSnapshot(snap => {
    //         let changes = snap.docChanges();
    //         console.log(changes)
    //     })
    // }, []);
    return (
        <>
            <div style={{ display: props.display, zIndex: 2 }} className="create-page-close-button" onClick={props.close}></div>
            <div className="login-body update-task-page" style={{ display: props.display, zIndex: 5 }}>
                <div className="update-container update-task-page-inner">
                    <div className="update-body">
                        <div className="login-child update-container-submit">
                            <div className="label">
                                <h3>
                                    Task Name :
                                </h3>
                            </div>
                            <div className="input-box">
                                <h3>
                                    {props.inputData.taskname}
                                </h3>
                            </div>
                        </div>
                        <div className="login-child update-container-submit">
                            <div className="label">
                                <h3>
                                    Created By :
                                </h3>
                            </div>
                            <div className="input-box">
                                <h3>
                                    {props.inputData.createdby}
                                </h3>
                            </div>
                        </div>
                        <div className="login-child update-container-submit">
                            <div className="label">
                                <h3>
                                    Status :
                                </h3>
                            </div>
                            <div className="input-box">
                                <h3>
                                    <select name="status" value={statusState} id="update-status" onChange={(e) => setStatusState(e.target.value)}>
                                        <option value="TO DO">TO DO</option>
                                        <option value="DOING">DOING</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </h3>
                            </div>
                        </div>
                        <div className="login-child update-container-submit">
                            <div className="label">
                                <h3>
                                    Owner :
                                </h3>
                            </div>
                            <div className="input-box">
                                <h3>
                                    <input value={ownerState} onChange={(e) => setOwnerState(e.target.value)} />
                                </h3>
                            </div>
                        </div>
                        <div className="login-child update-container-submit">
                            <div className="label">
                                <h3>
                                    Created on :
                                </h3>
                            </div>
                            <div className="input-box">
                                <h3>
                                    {createdState}
                                </h3>
                            </div>
                        </div>
                        <div className="login-child update-container-submit">
                            <div className="label">
                                <h3>
                                    Last Update :
                                </h3>
                            </div>
                            <div className="input-box">
                                <h3>
                                    {editState}
                                </h3>
                            </div>
                        </div>
                        <div className="login-child update-container-submit">
                            <div className="label">
                                <h3>
                                    Add Comment :
                                </h3>
                            </div>
                            <div className="input-box update-container-submit">
                                <h3>
                                    <input value={commentBox} onChange={(e) => setCommentBox(e.target.value)} />
                                </h3>
                            </div>
                        </div>
                        <div className="login-button-container update-container-submit">
                            <div className="login-button">
                                <button onClick={createTaskFunc}>
                                    Save
                                </button>
                            </div>
                        </div>
                        <div className="history">
                            <div className="history-container">
                                <div className="history-head">
                                    <h2>History</h2>
                                </div>
                                <div className="history-data">
                                    <div className="history-data-container">
                                        <ul>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateTask;
