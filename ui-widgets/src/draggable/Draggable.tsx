import { useEffect, useRef, useState } from "react";
import "./Draggable.css";
import { useDragEvent } from "../hooks/EventHooks";

const Draggable = () => {
  const ref = useRef<HTMLDivElement>(null);
  
const position = useDragEvent(ref)

  return (
    <div
      className="draggable"
      ref={ref}
      style={{ top: position.top, left: position.left }}
    >
      <p>Hello World</p>
    </div>
  );
};

export default Draggable;
