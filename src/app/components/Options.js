"use client";
import React from "react";

export default function Options({
  docs,
  setDocs,
  selectedDoc,
  setSelectedDoc,
}) {
  const handleClickSave = () => {
    const currentDoc = docs.find((doc) => doc.title === selectedDoc);
    if (!currentDoc) return;

    const element = document.createElement("a");
    const file = new Blob([currentDoc.text], { type: "text/plain" });

    element.href = URL.createObjectURL(file);
    element.download = `${currentDoc.title}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleClickNew = () => {
    const untitledDocsNumbers = docs
      .map((doc) => {
        const match = doc.title.match(/^Untitled (\d+)$/);
        return match ? parseInt(match[1], 10) : null;
      })
      .filter((number) => number !== null);

    const nextDocNumber =
      untitledDocsNumbers.length > 0 ? Math.max(...untitledDocsNumbers) + 1 : 1;

    const doc = {
      title: `Untitled ${nextDocNumber}`,
      text: "Start typing...",
    };
    const newDocs = [...docs, doc];

    setDocs(newDocs);

    setSelectedDoc(doc.title);
  };

  const handleClickDelete = () => {
    const newDocs = docs.filter((doc) => doc.title !== selectedDoc);

    setDocs(newDocs);

    if (newDocs.length > 0) {
      setSelectedDoc(newDocs[0].title);
    } else {
      const newDoc = { title: "Untitled", text: "Start typing..." };
      setDocs([newDoc]);
      setSelectedDoc(newDoc.title);
    }
  };

  return (
    <div className="flex flex-row pb-6 text-white">
      <a
        href="https://github.com/alvarosh15/Cleantext"
        className="text-white px-4"
      >
        Github
      </a>
      <p className="cursor-default"> | </p>
      <p onClick={handleClickSave} className="cursor-pointer px-4">
        Save on disk
      </p>
      <p className="cursor-default"> | </p>
      <p onClick={handleClickNew} className="cursor-pointer px-4">
        New document
      </p>
      <p className="cursor-default"> | </p>
      <p onClick={handleClickDelete} className="cursor-pointer px-4">
        Delete document
      </p>
    </div>
  );
}
