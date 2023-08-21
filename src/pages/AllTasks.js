import { useContext, useEffect } from "react";
import { taskAppContext } from "../App";
import { SimpleTable } from "../components/SimpleTable";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AllTasks({ tasks }) {
  const { operators, serverUrl, fetchTasksState, setFetchTasksState } =
    useContext(taskAppContext);
  const navigate = useNavigate();
  const columns = [
    { id: "task", label: "Task", minWidth: 170 },
    { id: "customerName", label: "CustomerName", minWidth: 170 },
    { id: "createdAt", label: "Created At", minWidth: 100 },
    {
      id: "assignedUser",
      label: "Assigned User",
      minWidth: 170,
      align: "right",
    },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
      align: "right",
    },

    {
      id: "options",
      label: "Options",
      minWidth: 50,
      align: "right",
      buttons: ["view"],
    },
  ];
  //   const allRows = [
  //     {
  //       task: "name1",
  //       createdAt: 123456789,
  //       assignedUser: "email1",
  //       status: "complete",
  //     },
  //     {
  //       task: "name1",
  //       createdAt: 123456789,
  //       assignedUser: "email1",
  //       status: "complete",
  //     },
  //   ];

  function getOperatorNameFromId(operatorId) {
    // console.log("operators", operators);
    const foundOperator = operators.find((operator) => {
      // console.log("comparing", operatorId, operator._id);
      return operator._id == operatorId;
    });
    // console.log("foundOP obj", foundOperator);
    return foundOperator ? foundOperator.name : "no name";
  }
  // console.log("op tasks in fend", tasks);
  async function completeTask(taskId) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        logintoken: localStorage.getItem("token"),
      },
    };

    const taskCompleteResponse = await fetch(
      `${serverUrl}/task/complete/${taskId}`,
      options
    );
    // console.log("task comp res", taskCompleteResponse);
    if (taskCompleteResponse.status === 200) {
      const data = await taskCompleteResponse.json();
      toast.success(data.message);
    } else {
      const data = await taskCompleteResponse.json();
      toast.error(data.message);
    }
  }
  const allRows = tasks?.map((task) => {
    return {
      task: task.description,
      createdAt: new Date(task.createdAt).toLocaleString(),
      assignedUser: getOperatorNameFromId(task.assignedUser),
      status: task.isCompleted === true ? "Completed" : "Pending",
      customerName: task.customerName,
      taskId: task._id,
      options: (
        <>
          <IconButton
            onClick={() => completeTask(task._id)}
            color={task.isCompleted === true ? "secondary" : "null"}
            aria-label="mark complete"
          >
            <CheckCircleOutlineIcon />
          </IconButton>
          <IconButton
            onClick={() => navigate(`/shop/task/${task._id}`)}
            color={task.isCompleted === true ? "secondary" : "null"}
            aria-label="view task"
          >
            <InfoIcon />
          </IconButton>
        </>
      ),
    };
  });
  useEffect(() => {
    setFetchTasksState(!fetchTasksState);
  }, []);
  return (
    <div className="all-tasks-container">
      <h3 className="text-center">All Tasks</h3>
      {tasks?.length > 0 ? (
        <SimpleTable columns={columns} allRows={allRows} />
      ) : (
        "loading"
      )}
    </div>
  );
}

export { AllTasks };
