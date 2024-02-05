"use client";
import React from "react";
import { useEffect, useState } from "react";

export default function Title() {
  const [title, setTitle] = useState(localStorage.getItem("title") || "Title");

  useEffect(() => {
    localStorage.setItem("title", title);
  }, [title]);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <h1 className="items-center pb-6 text-3xl text-white">
      <input
        type="text"
        value={title}
        onChange={handleChange}
        className="bg-black text-center text-white outline-none"
      />
    </h1>
  );
}
