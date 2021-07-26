
function TaskTable(props) {
    return (
        <table>
            <thead>
                <tr>
                    <th className="sr-no">
                        Sr No.
                    </th>
                    <th className="task-name">
                        Task Name
                    </th>
                    <th className="task-name">
                        Comment
                    </th>
                    <th className="task-status">
                        Status
                    </th>
                    <th className="task-status">
                        Task Update
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map((x, i) => <tr key={i}>
                        <td className="sr-no">
                            <div className="table-data">
                                <p>{i + 1}</p>
                            </div>
                        </td>
                        <td className="task-name">
                            <div className="table-data">
                                <p>{x.data().taskname}</p>
                            </div>
                        </td>
                        <td className="task-name">
                            <div className="table-data">
                                <p>{x.data().comment?x.data().comment[x.data().comment.length-1]?x.data().comment[x.data().comment.length-1].replaceAll(" ","")===""?"------":x.data().comment[x.data().comment.length-1]:"------":"------"}</p>
                            </div>
                        </td>
                        <td className="task-status">
                            <div className="table-data">
                                <p style={{ color: x.data().status === "TO DO" ? "red" : x.data().status === "DOING" ? "orange" : "green" }}>{x.data().status}</p>
                            </div>
                        </td>
                        <td className="create-task-update">
                            <div className="table-data">
                                <button onClick={() => { props.updateTaskFunc(x.id) }}>
                                    Update
                                </button>
                            </div>
                        </td>
                    </tr>)
                }

            </tbody>
        </table>
    );
}

export default TaskTable;
