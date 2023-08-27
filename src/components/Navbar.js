import Button from "@mui/material/Button";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { taskAppContext } from "../App";
function Navbar({ tasks }) {
  const { userInfo } = useContext(taskAppContext);
  const navigate = useNavigate();
  // console.log("tasks in nav bar", tasks);
  return (
    <div className="nav-bar">
      <p>{userInfo ? userInfo.shopName : "Shop Name"}</p>
      <p>{userInfo ? userInfo.role : "N/A"}</p>
      {userInfo.role === "shop" ? (
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => navigate("newTask")}
        >
          <AddTaskIcon color="action" />
        </IconButton>
      ) : null}
      <IconButton
        aria-label="delete"
        size="large"
        onClick={() => navigate("allTasks")}
      >
        <Badge badgeContent={tasks?.length} color="secondary">
          <TaskAltIcon color="action" />
        </Badge>
      </IconButton>

      <Button
        variant="outlined"
        color="secondary"
        sx={{ color: "brown", fontWeight: "bold" }}
        endIcon={<ExitToAppIcon />}
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        {userInfo ? userInfo.name : "user"}
      </Button>
    </div>
  );
}

export { Navbar };
