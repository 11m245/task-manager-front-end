import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

function ShopLayout() {
  return (
    <div className="shop-layout">
      <Navbar shopName={""} role={""} name={""} />
      <Outlet />
    </div>
  );
}

export { ShopLayout };
