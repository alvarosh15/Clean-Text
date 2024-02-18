"use client";
import React, { useState } from "react";
import DocTab from "./DocTab";

export default function Docs({ docs, selectedDoc, setSelectedDoc }) {
  const handleClick = (title) => {
    setSelectedDoc(title);
    localStorage.setItem("selectedDoc", title);
  };

  return (
    <div className="flex flex-row text-white">
      {docs.map((doc, index) => (
        <DocTab
          key={index}
          title={doc.title}
          onClick={handleClick}
          selectedDoc={selectedDoc}
        />
      ))}
    </div>
  );
}
