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
    setIsDragging(true);
    e.preventDefault();
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;

    if (files.length) {
      const markdownFiles = Array.from(files).filter(
        (file) => file.name.endsWith(".md") || file.name.endsWith(".txt")
      );

      for (const file of markdownFiles) {
        const text = await file.text();
        const title = file.name.replace(".md", "");
        const newDoc = { title, text };
        setDocs((docs) => [...docs, newDoc]);
        setSelectedDoc(title);
      }
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="flex min-h-screen flex-col items-center justify-stretch bg-black p-16"
    >
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
      {!isDragging ? (
        <Editor
          docs={docs}
          setDocs={setDocs}
          selectedDoc={selectedDoc}
        ></Editor>
      ) : (
        <div className="flex h-96 w-9/12 grow items-center justify-center bg-black mb-8 text-2xl rounded-lg border-2 border-dashed border-teal-400">
          Drag and drop your .md or .txt file here
        </div>
      )}
      <Docs
        docs={docs}
        selectedDoc={selectedDoc}
        setSelectedDoc={setSelectedDoc}
      ></Docs>
    </div>
  );
}
