"use client";
import React from "react";
import { useEffect } from "react";

export default function Title({ docs, setDocs, selectedDoc, setSelectedDoc }) {
  useEffect(() => {
    localStorage.setItem("selectedDoc", selectedDoc);
    localStorage.setItem("docs", JSON.stringify(docs));
  }, [selectedDoc, docs]);

  const handleChange = (event) => {
    const newDocs = docs.map((doc) => {
      if (doc.title === selectedDoc) {
        return { ...doc, title: event.target.value };
      }
      return doc;
    });

    setDocs(newDocs);

    setSelectedDoc(event.target.value);
  };

  return (
    <h1 className="items-center pb-6 text-3xl text-white">
      <input
        type="text"
        value={selectedDoc}
        onChange={handleChange}
        className="bg-black text-center text-white outline-none"
      />
    </h1>
  );
}
