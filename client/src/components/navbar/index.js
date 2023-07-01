"use client";
import LogoutButton from "@/components/auth/Logout";
import Menus from "./menus";
const Navbar = ({ data }) => {
  return (
    <div className="fixed top-0 z-20 flex flex-col h-screen bg-primary">
      <Menus data={data} />
      <LogoutButton />
    </div>
  );
};
export default Navbar;
