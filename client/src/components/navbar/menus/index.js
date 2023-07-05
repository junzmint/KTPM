"use client";
import Menu from "./menu";
import LogoutButton from "@/components/auth/Logout";
const Menus = ({ data }) => {
  return (
    <div className="flex flex-col content-center w-full h-full shadow-2 gap-y-[10px] justify-between	">
      <Menu data={data} />
      <div className="">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Menus;
