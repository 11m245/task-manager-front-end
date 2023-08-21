import { CircularProgress } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { taskAppContext } from "../App";

function ActivateUser() {
  const { id } = useParams();
  const { serverUrl, clientUrl } = useContext(taskAppContext);
  const navigate = useNavigate();

  const activateUser = async () => {
    const response = await fetch(`${serverUrl}/shop/activate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        activationtoken: id,
      },
    });

    if (response.status === 200) {
      // console.log("token activation resp", response);
      // console.log("client url", clientUrl);
      const data = await response.json();
      toast.success(data.message);
      // navigate(clientUrl);
      window.location.href = clientUrl;
    } else {
      const data = await response.json();
      toast.error(data.message);
      // navigate(clientUrl);
      window.location.href = clientUrl;
    }
  };

  useEffect(() => {
    activateUser();
  }, []);
  return (
    <>
      <h1 className="text-center"> Please wait Activating... </h1>
      <CircularProgress
        style={{
          margin: "0 auto",
          width: "50px",
          height: "50px",
          display: "block",
        }}
        color="success"
      />
    </>
  );
}

export { ActivateUser };
