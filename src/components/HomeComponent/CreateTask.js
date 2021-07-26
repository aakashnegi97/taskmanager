import { useEffect, useState } from "react";
import db from "../../firebase";
import { storage } from '../../firebase';

function CreateTask(props) {
    const [inputData, setInputData] = useState("");
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(0);

    const createTaskFunc = () => {
        if (inputData.length >= 6) {
            db.collection('taskdata').add({
                taskname: inputData,
                status: "TO DO",
                createdby: localStorage.getItem("taskmanagerCredUser"),
                lastedit: new Date(),
                assignedto: "",
                createdat: new Date(),
                media: url
            }).then(props.close());
        }
        else {
            alert("Task name must be of alteast 6 characters.");
        }
    }
    const upLoadToFireBase = (e) => {
        var file = e.target.files[0];
        const uploadMedia = storage.ref(`media/${file.name}`).put(file);
        uploadMedia.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            }
            ,
            error => {
                console.log(error);
            },
            () => {
                storage.ref("media").child(file.name).getDownloadURL().then(url => {
                    setUrl(url);
                })
            }
        )
    }
    useEffect(() => {
        console.log(url)
    },[url]);
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
                                <input value={inputData} onChange={(e) => setInputData(e.target.value)} />
                            </div>
                        </div>
                        <div className="login-child">
                            <div className="label">
                                <h2>
                                    Media:
                                </h2>
                            </div>
                            <div className="input-box">
                                <input type="file" onChange={upLoadToFireBase} style={{ color: "#eee" }} />
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
