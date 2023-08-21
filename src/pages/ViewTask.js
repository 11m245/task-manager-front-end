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

    return foundOperator ? foundOperator.name : userInfo.name;
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
    <div className="view-task-container">
      <h3>view task {id}</h3>
      {task ? (
        <>
          {" "}
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td>Task Description</td>
                <td>{task.description}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{task.isCompleted === true ? "Completed" : "Pending"}</td>
              </tr>
              <tr>
                <td>Created At</td>
                <td>{task.createdAt}</td>
              </tr>
              <tr>
                <td>Customer Name</td>
                <td>{task.customerName}</td>
              </tr>
              <tr>
                <td>Customer Mobile</td>
                <td>{task.customerMobile}</td>
              </tr>
            </tbody>
          </table>
          <h4>History</h4>
          <table>
            <thead>
              <tr>
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
                      <td>{history.reason}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
}

export { ViewTask };
