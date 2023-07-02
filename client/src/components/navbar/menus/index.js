"use client";
import Menu from "./menu";
import LogoutButton from "@/components/auth/Logout";
const Menus = ({ data }) => {
  return (
    <div className="flex flex-col align-middle content-center w-full h-4/5 py-[10px] shadow-2 gap-y-[10px]">
      <Menu data={data} />
      <div className="content-end">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Menus;
