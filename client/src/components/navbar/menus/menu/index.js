"use client";
import Item from "./item";
const Menu = ({ data }) => {
  return (
    <div className="flex flex-col ">
      {data?.data?.map((item) => (
        <Item key={item.id} data={item} />
      ))}
    </div>
  );
};

export default Menu;
