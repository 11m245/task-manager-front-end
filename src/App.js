import "./App.css";
import { createContext, useEffect, useState } from "react";
import { HomePage } from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { NotFound } from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import { ActivateUser } from "./pages/ActivateUser";
import "react-toastify/dist/ReactToastify.css";
import { ShopLayout } from "./pages/ShopLayout";
import { OperatorLayout } from "./pages/OperatorLayout";
import { AddTask } from "./pages/AddTask";
import { AllTasks } from "./pages/AllTasks";
import { ViewTask } from "./pages/ViewTask";

export const taskAppContext = createContext();
function App() {
  const initialTasks = [
    {
      id: "01",
      description: "print Task",
      assignedUser: "userId1",
      createdAt: new Date(),
      isCompleted: false,
      history: [
        { timeStamp: new Date(), updatedBy: "userId1", reason: "created" },
      ],
    },
    {
      id: "02",
      description: "scan Task",
      assignedUser: "userId2",
      createdAt: new Date(),
      isCompleted: false,
      history: [
        { timeStamp: new Date(), updatedBy: "userId2", reason: "created" },
      ],
    },
  ];

  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 720 ? true : false
  );

  const [operators, setOperators] = useState([]);
  const [tasks, setTasks] = useState(initialTasks);
  const [fetchTasksState, setFetchTasksState] = useState(false);
  const [operatorTasks, setOperatorTasks] = useState([]);

  const [userInfo, setUserInfo] = useState(null);
  const contextObj = {
    serverUrl: process.env.REACT_APP_SERVER_URL,
    clientUrl: process.env.REACT_APP_CLIENT_URL,
    isMobile,
    operators,
    setOperators,
    tasks,
    setTasks,
    fetchTasksState,
    setFetchTasksState,
    userInfo,
    setUserInfo,
    operatorTasks,
    setOperatorTasks,
  };

  function handleResize() {
    window.innerWidth < 720 ? setIsMobile(true) : setIsMobile(false);
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <div className="App">
      <taskAppContext.Provider value={contextObj}>
        <ToastContainer theme="dark" autoClose={3000} />
        <div className="project-container page-container">
          <Routes>
            <Route index element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="shop" element={<ShopLayout />}>
              <Route index element={<AddTask />} />
              <Route path="newTask" element={<AddTask />} />
              <Route path="allTasks" element={<AllTasks tasks={tasks} />} />
              <Route path="task/:id" element={<ViewTask />} />
            </Route>
            <Route path="operator" element={<OperatorLayout />}>
              <Route index element={<AllTasks tasks={operatorTasks} />} />
              <Route
                path="allTasks"
                element={<AllTasks tasks={operatorTasks} />}
              />
              <Route path="task/:id" element={<ViewTask />} />
            </Route>

            <Route path="activate/:id" element={<ActivateUser />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </taskAppContext.Provider>
    </div>
  );
}

export default App;
