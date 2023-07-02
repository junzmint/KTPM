"use client";
import Menus from "./menus";
const Navbar = ({ data }) => {
  return (
    <div className=" flex flex-col h-screen bg-primary bg-slate-500 fixed">
      <div className=" box-border border-b-3 border-slate-500 h-1/7 p-4 bg-slate-500 items-center">
        <h1 className="text-black font-extrabold text-3xl text-center items-center align-middle h-10"> Management</h1>
        <h1 className="text-black font-extrabold text-3xl text-center items-center align-middle"> Application</h1>
      </div>
      <Menus data={data}></Menus>
    </div>
  );
};
export default Navbar;
