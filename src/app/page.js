"use client";
import Editor from "./components/Editor";
import Title from "./components/Title";
import Options from "./components/Options";
import Docs from "./components/Docs";
import React, { useState } from "react";

export default function Home() {
  const [selectedDoc, setSelectedDoc] = useState(
    localStorage.getItem("selectedDoc") || "Untitled"
  );

  const [docs, setDocs] = useState(
    JSON.parse(localStorage.getItem("docs")) || [
      {
        title: "Untitled",
        text: "Start typing...",
      },
    ]
  );

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`min-h-screen w-full ${
        isDragging ? "bg-blue-100 border-blue-500 border-4" : "bg-white"
      }`}
    >
      <main className="flex min-h-screen flex-col items-center justify-stretch bg-black p-16">
        <Options
          docs={docs}
          setDocs={setDocs}
          selectedDoc={selectedDoc}
          setSelectedDoc={setSelectedDoc}
        ></Options>
        <Title
          docs={docs}
          setDocs={setDocs}
          selectedDoc={selectedDoc}
          setSelectedDoc={setSelectedDoc}
        ></Title>
        <Editor
          docs={docs}
          setDocs={setDocs}
          selectedDoc={selectedDoc}
        ></Editor>
        <Docs
          docs={docs}
          selectedDoc={selectedDoc}
          setSelectedDoc={setSelectedDoc}
        ></Docs>
      </main>
    </div>
  );
}
