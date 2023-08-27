import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { taskAppContext } from "../App";
import { toast } from "react-toastify";

function ViewTask() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const { serverUrl, operators, userInfo } = useContext(taskAppContext);

  function getOperatorNameFromId(operatorId) {
    // console.log("op id", operatorId);
    const foundOperator = operators.find(
      (operator) => operator._id == operatorId
    );
    // console.log("foundOP", foundOperator);

    return foundOperator ? foundOperator.name : userInfo.shopName;
  }

  async function fetchTask(taskId) {
    try {
      const taskFetchResponse = await fetch(`${serverUrl}/task/${taskId}`);
      if (taskFetchResponse.status === 200) {
        const data = await taskFetchResponse.json();
        toast.success(data.message);
        setTask(data.payload.task);
      } else {
        const data = await taskFetchResponse.json();
        toast.error(data.message);
      }
    } catch (err) {
      console.log("error in task fetch", err);
    }
  }

  useEffect(() => {
    fetchTask(id);
  }, []);
  return (
    <div className="view-task-page">
      <div className="view-task-container">
        <h3 className="table-title">Task Info</h3>
        {task ? (
          <>
            {" "}
            <table>
              <thead>
                <tr>
                  <td>Task Description</td>
                  <td className="bold-content">{task.description}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Task Id</td>
                  <td>{id}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>{task.isCompleted === true ? "Completed" : "Pending"}</td>
                </tr>
                <tr>
                  <td>Created At</td>
                  <td>{new Date(task.createdAt).toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Customer Name</td>
                  <td className="bold-content">{task.customerName}</td>
                </tr>
                <tr>
                  <td>Customer Mobile</td>
                  <td>{task.customerMobile}</td>
                </tr>
              </tbody>
            </table>
            <h5 className="table-title">History</h5>
            <table>
              <thead>
                <tr className="column-title">
                  <td>Time</td>
                  <td>Updated By</td>
                  <td>Reason</td>
                </tr>
              </thead>
              <tbody>
                {task?.history?.length > 0
                  ? task.history.map((history) => (
                      <tr key={history.timeStamp}>
                        <td>{new Date(history.timeStamp).toLocaleString()}</td>
                        <td>{getOperatorNameFromId(history.updatedBy)}</td>
                        <td
                          className={
                            history.reason === "created"
                              ? "created"
                              : "completed"
                          }
                        >
                          {history.reason}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </>
        ) : null}
      </div>
    </div>
  );
}

export { ViewTask };
