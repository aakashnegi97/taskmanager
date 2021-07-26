
function TaskTable() {
    const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
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
                    <th className="task-status">
                        Status
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    arr.map((x, i) => <tr key = {i}>
                        <td className="sr-no">
                            <div className="table-data">
                                <p>Sr No.</p>
                            </div>
                        </td>
                        <td className="task-name">
                            <div className="table-data">
                                <p>Task Name</p>
                            </div>
                        </td>
                        <td className="task-status">
                            <div className="table-data">
                                <p>Status</p>
                            </div>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    );
}

export default TaskTable;
