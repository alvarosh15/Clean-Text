"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { parseMarkdown } from "../../../../minimarkdown/Parser.js";
import "./style.css";

export default function Editor() {
  const [text, setText] = useState(
    localStorage.getItem("text") || "Start typing...",
  );
  useEffect(() => {
    localStorage.setItem("text", text);
  }, [text]);

  const handleChange = (event) => {
    setText(event.target.value);
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
      <div className="relative h-96 w-9/12 grow">
        <textarea
          spellCheck="false"
          className="absolute z-10 min-h-full w-full grow resize-none break-words rounded-md bg-transparent pl-2 text-justify text-transparent caret-white focus:outline-none"
          onChange={handleChange}
          onScroll={handleScroll}
          value={text}
        />
        <div
          ref={previewRef}
          className="z-0 h-full w-full grow resize-none overflow-y-auto break-words rounded-md bg-black pl-2 text-justify text-white focus:outline-none"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(text) }}
        />
      </div>
      <p className="text-white">
        {text ? text.split(/\r\n|\r|\n/).length : 1} lines{" "}
        {text ? text.trim().split(/\s+/).length : 0} words{" "}
        {text ? text.length : 0} characters
      </p>
    </>
  );
}
