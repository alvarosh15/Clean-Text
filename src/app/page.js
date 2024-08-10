"use client";
import Editor from "./_components/Editor";
import Title from "./_components/Title";
import Options from "./_components/Options";
import Docs from "./_components/Docs";
import { useState } from "react";

export default function Home() {
  const [selectedDoc, setSelectedDoc] = useState(
    localStorage.getItem("selectedDoc") || "Untitled"
  );

  const [docs, setDocs] = useState(
    JSON.parse(localStorage.getItem("docs")) || [
      {
        title: "Untitled",
        text: "",
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
        const title = file.name.replace(/\.md$|\.txt$/, "");
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
      className="flex flex-col h-dvh items-center bg-black p-4 md:p-12"
    >
      <Options
        docs={docs}
        setDocs={setDocs}
        selectedDoc={selectedDoc}
        setSelectedDoc={setSelectedDoc}
      />
      <Title
        docs={docs}
        setDocs={setDocs}
        selectedDoc={selectedDoc}
        setSelectedDoc={setSelectedDoc}
      />
      {!isDragging ? (
        <Editor docs={docs} setDocs={setDocs} selectedDoc={selectedDoc} />
      ) : (
        <div className="flex h-96 w-9/12 text-white grow items-center justify-center bg-black mb-8 p-2 text-2xl rounded-lg border-2 border-dashed border-teal-400">
          Drag and drop your .md or .txt file here
        </div>
      )}
      <Docs
        docs={docs}
        selectedDoc={selectedDoc}
        setSelectedDoc={setSelectedDoc}
      />
    </div>
  );
}
