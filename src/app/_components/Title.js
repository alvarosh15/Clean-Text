"use client";
import React from "react";
import { useEffect } from "react";

export default function Title({ docs, setDocs, selectedDoc, setSelectedDoc }) {
  useEffect(() => {
    localStorage.setItem("selectedDoc", selectedDoc);
    localStorage.setItem("docs", JSON.stringify(docs));
  }, [selectedDoc, docs]);

  const handleChange = (event) => {
    const isTitleRepeated = docs.filter(
      (doc) => doc.title === event.target.value
    );
    if (isTitleRepeated.length === 0) {
      const newDocs = docs.map((doc) => {
        if (doc.title === selectedDoc) {
          return { ...doc, title: event.target.value };
        }
        return doc;
      });

      setDocs(newDocs);

      setSelectedDoc(event.target.value);
    }
  };

  return (
    <input
      type="text"
      value={selectedDoc}
      onChange={handleChange}
      className="w-11/12 bg-black pb-4 md:pb-6 text-2xl md:text-4xl text-center text-white outline-none"
    />
  );
}
