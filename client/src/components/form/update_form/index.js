"use client";

const UpdateField = ({ data, handleChange }) => {
  const { type, id, value, name, label } = data;
  return (
    <div>
      <label for={id} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        name={name}
        onChange={handleChange}
        className=" block border border-grey-light w-full p-3 rounded mb-4"
        style={{ overflow: "visible" }}
      ></input>
    </div>
  );
};

export default UpdateField;
