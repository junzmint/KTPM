"use client";
import LogoutButton from "@/components/auth/Logout";
import { InputField, RadioButton } from "@/components/form";
import React, { useState } from "react";
const SignUp = () => {
  const defaultValue = {
    phone: "",
    password: "",
    role: "",
  };
  const [user, setUser] = useState(defaultValue);
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name) {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    } else {
      setUser((prevUser) => ({ ...prevUser, role: value }));
    }
  };

  const phoneNum = {
    type: "text",
    id: "phone",
    value: `${user.phone}`,
    name: "phone",
    placeHolder: "Enter phone num",
    label: "Số điện thoại",
  };
  const password = {
    type: "password",
    id: "password",
    value: `${user.password}`,
    name: "password",
    placeHolder: "Enter password",
    label: "Mật khẩu",
  };

  const [role, setRole] = useState(["ACCOUNTANT", "ADMIN", "LEADER"]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <>
      <div className="flex flex-col align-center">
        <form onSubmit={handleSubmit}>
          <div>
            <InputField data={phoneNum} handleChange={handleChange} />
          </div>
          <div>
            <InputField data={password} handleChange={handleChange} />
          </div>
          <div>
            <label for="role">Role</label>
            {role.map((item) => (
              <RadioButton
                data={{
                  id: item,
                  name: "role",
                  value: item,
                  checkValue: item,
                }}
                handleChange={handleChange}
              />
            ))}
          </div>
          <button type="submit" className="p-5 bg-red-200 hover:bg-red-400">
            Register
          </button>
        </form>
      </div>
      <LogoutButton />
    </>
  );
};
export default SignUp;
