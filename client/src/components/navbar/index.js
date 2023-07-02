"use client";
import Menus from "./menus";
const Navbar = ({ data }) => {
  return (
    <div className="flex flex-col h-screen  bg-primary">
      <Menus data={data}></Menus>
    </div>
  );
};
export default Navbar;
