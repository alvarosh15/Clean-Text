"use client";
import React from "react";

export default function Options() {
  const handleClick = () => {
    const element = document.createElement("a");
    const file = new Blob([localStorage.getItem("text")], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = localStorage.getItem("title") + ".md";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="flex flex-row pb-6 text-white">
      <a href="https://github.com/alvarosh15/Clean-Text" className="px-4">
        Github
      </a>
      <p className="cursor-default"> | </p>
      <p onClick={handleClick} className="cursor-pointer px-4">
        Save on disk
      </p>
    </div>
  );
}
