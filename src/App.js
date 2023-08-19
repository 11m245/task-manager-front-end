import "./App.css";
import { createContext, useEffect, useState } from "react";
import { HomePage } from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { NotFound } from "./components/NotFound";
import { ToastContainer } from "react-toastify";
export const taskAppContext = createContext();
function App() {
  const tasks = [
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

  const users = [
    {
      id: "userId1",
      name: "name1",
      mobile: 9955664455,
      email: "aaa@gmail.com",
      managerId: "manager1",
      createdAt: new Date(),
      isOperator: true,
    },
    {
      id: "userId2",
      name: "name2",
      mobile: 9955664456,
      email: "bbb@gmail.com",
      managerId: "manager1",
      createdAt: new Date(),
      isOperator: true,
    },
  ];
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 720 ? true : false
  );
  const contextObj = {
    serverUrl: process.env.REACT_APP_SERVER_URL,
    clientUrl: process.env.REACT_APP_CLIENT_URL,
    isMobile,
    tasks,
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </taskAppContext.Provider>
    </div>
  );
}

export default App;
