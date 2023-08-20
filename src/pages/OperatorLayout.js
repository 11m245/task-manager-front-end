import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
function OperatorLayout() {
  return (
    <div className="operator-layout">
      <Navbar shopName={""} role={""} name={""} />
      <Outlet />
    </div>
  );
}

export { OperatorLayout };
