"use client";
import React from "react";
import { useEffect, useRef } from "react";
import { parseMarkdown } from "minimarkdown";
import "./style.css";

export default function Editor({ docs, setDocs, selectedDoc }) {
  useEffect(() => {
    localStorage.setItem("docs", JSON.stringify(docs));
  }, [docs]);

  const doc = docs.find((doc) => doc.title === selectedDoc);
  const text = doc ? doc.text : "";
  const handleChange = (event) => {
    const newDocs = docs.map((doc) => {
      if (doc.title === selectedDoc) {
        return { ...doc, text: event.target.value };
      }
      return doc;
    });
    setDocs(newDocs);
  };

  const previewRef = useRef(null);

  const handleScroll = (e) => {
    const textareaScrollPercentage =
      e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight);
    if (previewRef.current) {
      const previewScrollPosition =
        textareaScrollPercentage *
        (previewRef.current.scrollHeight - previewRef.current.clientHeight);
      previewRef.current.scrollTop = previewScrollPosition;
    }
  };

  return (
    <>
      <div className="relative h-40 md:h-96 w-full grow">
        <textarea
          spellCheck="false"
          className="scrollbar-hide absolute z-10 min-h-full w-full md:text-xl grow resize-none break-words rounded-md bg-transparent pl-2 text-justify text-transparent caret-white focus:outline-none"
          onChange={handleChange}
          onScroll={handleScroll}
          value={text}
          placeholder="Start typing or drop a .md/.txt file..."
        />
        <div
          ref={previewRef}
          className="scrollbar-hide z-0 h-full w-full md:text-xl grow resize-none overflow-y-auto break-words rounded-md bg-black pl-2 text-justify text-white focus:outline-none"
          dangerouslySetInnerHTML={{
            __html: parseMarkdown(text, { preview: true }),
          }}
        />
      </div>
      <p className="py-2 md:text-xl text-white">
        {text ? text.split(/\r\n|\r|\n/).length : 1} lines{" "}
        {text ? text.trim().split(/\s+/).length : 0} words{" "}
        {text ? text.length : 0} characters
      </p>
    </>
  );
}
