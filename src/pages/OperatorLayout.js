import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useContext, useEffect } from "react";
import { taskAppContext } from "../App";
import { toast } from "react-toastify";
function OperatorLayout() {
  const { operatorTasks, setOperatorTasks, serverUrl } =
    useContext(taskAppContext);
  async function fetchOperatorTasks(logintoken) {
    // console.log("fetch token", logintoken);
    const options = {
      method: "GET",
      headers: { logintoken: logintoken, "Content-Type": "application/json" },
    };

    const operatorTasksResponse = await fetch(
      `${serverUrl}/task/operatorTasks`,
      options
    );
    // console.log("fetch Resp", operatorTasksResponse);
    if (operatorTasksResponse.status === 200) {
      const data = await operatorTasksResponse.json();
      console.log("op tasks after fetch", data);
      toast.success(data.message);
      setOperatorTasks(data.payload.tasks);
    } else {
      const data = await operatorTasksResponse.json();
      toast.error(data.message);
    }
  }
  useEffect(() => {
    fetchOperatorTasks(localStorage.getItem("token"));
  }, []);
  return (
    <div className="operator-layout">
      <Navbar tasks={operatorTasks} />
      <Outlet />
    </div>
  );
}

export { OperatorLayout };
