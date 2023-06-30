"use client";
import LogoutButton from "@/components/Logout";
import React, { useState } from "react";
const SignUp = () => {
  const defaultValue = {
    phone: "",
    password: "",
    role: "",
  };
  const [user, setUser] = useState(defaultValue);

  return (
    <>
      <form>
        <label for="phone">Số điện thoại</label>
        <input
          type="text"
          id="phone"
          value={user.phone}
          name="phone"
          placeholder="Só điện thoại"
        ></input>
        <label for="password">Mật khẩu</label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          placeholder="Mật khẩu"
        ></input>
        <button type="submit"></button>
      </form>
      <LogoutButton />
    </>
  );
};
export default SignUp;
