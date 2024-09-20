"use client";

import { headersConfig } from "./configTable";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useState } from "react";

export const TableWrapper = () => {
  const [headers, setHeaders] = useState(headersConfig);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!active || !over) return;

    const activeIndex = headers.findIndex((header) => header.id === active.id);
    const overIndex = headers.findIndex((header) => header.id === over.id);

    setHeaders((prevHeaders) => {
      const newHeaders = [...prevHeaders];
      const [removed] = newHeaders.splice(activeIndex, 1);
      newHeaders.splice(overIndex, 0, removed);
      return newHeaders;
    });
  };

  const handleResize = (id: string, newWidth: number) => {
    setHeaders((prevHeaders) =>
      prevHeaders.map((header) =>
        header.id === id ? { ...header, width: newWidth } : header,
      ),
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <table className="w-full border-collapse text-sm text-gray-300">
        <thead className="shadow-customShadow sticky top-0">
          <tr className="border-b-2 border-blue-500">
            {headers.map((header) => (
              <DraggableHeader key={header.id} header={header} />
            ))}
          </tr>
        </thead>
        <tbody className="overflow-y-auto">
          {/* Example rows */}
          <tr>
            {headers.map((header) => (
              <ResizableCell
                key={header.id}
                header={header}
                content={`example ${header.id}`}
                onResize={handleResize}
              />
            ))}
          </tr>
          <tr>
            {headers.map((header) => (
              <ResizableCell
                key={header.id}
                header={header}
                content={`example ${header.id + 1}`}
                onResize={handleResize}
              />
            ))}
          </tr>
        </tbody>
      </table>
    </DndContext>
  );
};

const DraggableHeader = ({ header }: any) => {
  const { setNodeRef, listeners, transform } = useDraggable({
    id: header.id,
  });

  return (
    <th
      ref={setNodeRef}
      className="cursor-pointer bg-[#FAFBFB] p-3 text-left font-normal text-black"
      style={{
        width: header.width || "auto",
        transform: `translateX(${transform?.x ?? 0}px)`,
      }}
      {...listeners}
    >
      <span>{header.name}</span>
    </th>
  );
};

// ResizableCell is responsible for the resizing logic in each table cell
const ResizableCell = ({ header, content, onResize }: any) => {
  const handleResize = (e: any) => {
    const initialWidth = e.target.parentElement.offsetWidth;
    const initialX = e.clientX;

    const handleMouseMove = (e: any) => {
      const newWidth = initialWidth + (e.clientX - initialX);
      onResize(header.id, Math.max(newWidth, 50)); // Set min width to 50px
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };




  
  return (
    <td
      className="border-y border-r border-gray-400 p-3 pr-8"
      style={{ width: header.width || "auto" }}
    >
      <div className="flex items-center justify-between gap-[0.375rem]">
        <span>{content}</span>
        <div
          className="resize-handle"
          onMouseDown={handleResize}
          style={{
            cursor: "col-resize",
            padding: "0 4px",
            marginLeft: "auto",
            display: "inline-block",
          }}
        >
          ||
        </div>
      </div>
    </td>
  );
};
