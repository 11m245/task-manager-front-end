import Button from "@mui/material/Button";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
function Navbar(props) {
  const { shopName, role, name } = props;
  const navigate = useNavigate();
  return (
    <div className="nav-bar">
      <p>{shopName ? shopName : "Shop Name"}</p>
      <p>{role ? role : "N/A"}</p>

      <Button
        variant="outlined"
        endIcon={<ExitToAppIcon />}
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        {name ? name : "user"}
      </Button>
    </div>
  );
}

export { Navbar };
