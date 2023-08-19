import CircularProgress from "@mui/material/CircularProgress";

function CustomLoadingButton({ isLoading, buttonComponent }) {
  return (
    <>
      {isLoading ? (
        <div className="loading-conatiner d-flex justify-content-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        buttonComponent
      )}
    </>
  );
}

export { CustomLoadingButton };
