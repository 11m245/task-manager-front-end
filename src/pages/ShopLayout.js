import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useContext, useEffect } from "react";
import { taskAppContext } from "../App";
import { toast } from "react-toastify";

function ShopLayout() {
  const { serverUrl, setOperators, setTasks, fetchTasksState, tasks } =
    useContext(taskAppContext);
  async function fetchShopOperators() {
    try {
      const options = {
        method: "GET",
        headers: {
          logintoken: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
      const fetchResponse = await fetch(
        `${serverUrl}/shop/myOperators`,
        options
      );

      if (fetchResponse.status === 200) {
        const fetchedData = await fetchResponse.json();
        toast.success(fetchedData.message);
        // console.log("operators,", fetchedData.payload.shopOperators);
        setOperators(fetchedData.payload.shopOperators);
      } else {
        const fetchedData = await fetchResponse.json();
        toast.error(fetchedData.message);
      }
    } catch (error) {
      console.log("error in fetching operators", error);
    }
  }

  async function fetchShopTasks() {
    try {
      const options = {
        method: "GET",
        headers: {
          logintoken: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
      const fetchResponse = await fetch(
        `${serverUrl}/task/myShopTasks`,
        options
      );

      if (fetchResponse.status === 200) {
        const fetchedData = await fetchResponse.json();
        toast.success(fetchedData.message);
        // console.log("tasks,", fetchedData.payload.tasks);
        setTasks(fetchedData.payload.tasks);
      } else {
        const fetchedData = await fetchResponse.json();
        toast.error(fetchedData.message);
      }
    } catch (error) {
      console.log("error in fetching tasks", error);
    }
  }

  useEffect(() => {
    fetchShopOperators();
  }, []);

  useEffect(() => {
    fetchShopTasks();
  }, [fetchTasksState]);
  return (
    <div className="shop-layout">
      <Navbar tasks={tasks} />
      <Outlet />
    </div>
  );
}

export { ShopLayout };
