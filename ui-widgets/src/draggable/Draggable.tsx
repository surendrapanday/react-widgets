import { useRef, useState } from "react";
import "./Draggable.css";
import { useDraggableElement } from "../hooks/EventHooks";

const Draggable = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false)


  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;


  const start = (event: any) => {
    const box = ref.current;
    if (box) {
      event = event || window.event;
      event.preventDefault();
      pos3 = event.offsetX;
      pos4 = event.offsetY;
      box.onmouseup = stop;
      box.onmousemove = drag;
    }
  };

  const stop = () => {
    const boundingBox = ref.current;
    if (boundingBox) {
      boundingBox.onmouseup = null;
      boundingBox.onmousemove = null;
    }
  };

  const drag = (event: any) => {
    const boundingBox = ref.current;

    const bondaryBox = document.getElementById('wrapper')

    const {
      left = 0,
      right = 0,
      top = 0,
      bottom = 0,
    } = boundingBox?.getBoundingClientRect() || {};

    if (boundingBox) {
      event = event || window.event;
      if (
        event.clientX > left &&
        event.clientX < right &&
        event.clientY > top &&
        event.clientY < bottom
      ) {
        event.preventDefault();
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;
        boundingBox.style.top = boundingBox.offsetTop - pos2 + "px";
        boundingBox.style.left = boundingBox.offsetLeft - pos1 + "px";
      }
    }
  };

  return (
    <div className="draggable" ref={ref} onMouseDown={start}>
      <p>Hello World</p>
    </div>
  );
};

export default Draggable;
