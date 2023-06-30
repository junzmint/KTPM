"use client";
import Menu from "./menu";
const Menus = ({ data }) => {
  return (
    <div className="flex flex-col px-[10px] w-full h-full py-[10px] shadow-2 gap-y-[10px]">
      <Menu data={data} />
    </div>
  );
};

export default Menus;
