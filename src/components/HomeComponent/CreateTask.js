
function CreateTask(props) {
    return (
        <>
            <div style={{ display: props.display,zIndex:2}} className="create-page-close-button" onClick={props.close}></div>
            <div className="login-body create-task-page" style={{ display: props.display,zIndex:5 }}>
                <div className="login-container create-task-page-inner">
                    <div className="signin-body">
                        <div className="login-child">
                            <div className="label">
                                <h2>
                                    Task Name:
                                </h2>
                            </div>
                            <div className="input-box">
                                <input />
                            </div>
                        </div>
                        <div className="login-button-container">
                            <div className="login-button">
                                <button>
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
