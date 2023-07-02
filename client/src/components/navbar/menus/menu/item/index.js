"use client";
import Link from "next/link";
import React from "react";
const Item = ({ data }) => {
  const { name, path } = data || {};
  const ITEM_HEIGHT = "40px";
  return (
    <Link href={`${path}`}>
      <div
        type="button"
        style={{
          height: "40px",
          minHeight: ITEM_HEIGHT,
          maxHeight: ITEM_HEIGHT,
        }}
        className=" w-full rounded-[3px] hover:bg-slate-300 flex items-center cursor-pointer mt-4 mb-4"
      >
        <div className="font-medium whitespace-nowrap select-none text-gray-50 text-xl text-center ml-3">{name}</div>
      </div>
    </Link>
  );
};

export default Item;
