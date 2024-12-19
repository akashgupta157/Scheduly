"use client";

import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function QuillTextEditor({ value, onChange }) {
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current) {
      const quill = new Quill("#editor", {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
          ],
        },
      });

      quillRef.current = quill;
      quill.on("text-change", () => {
        if (onChange) {
          const content = quill.root.innerHTML;
          onChange(content);
        }
      });
    }
  }, [onChange]);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value || "";
    }
  }, [value]);
  return (
    <div
      id="editor"
      className="max-h-[30svh] border rounded-md p-2 overflow-hidden"
    ></div>
  );
}
