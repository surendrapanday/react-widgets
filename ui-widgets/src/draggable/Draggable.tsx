import { useEffect, useRef, useState } from "react";
import "./Draggable.css";

const Draggable = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousedown, setMouseDown] = useState(false);
  const [text, setText] = useState('Drag me');

  let pos1: number, pos2: number, pos3: number, pos4: number;
  pos1 = pos2 = pos3 = pos4 = 0;

  const start = (event : any) => {
    const box = ref.current;
    if (box) {
      event.preventDefault();
      pos3 = event.offsetX;
      pos4 = event.offsetY;
      box.addEventListener("mousemove", drag);
      box.addEventListener("mouseleave", drag);
    }
  };

  const drag = (event: any) => {
    const box = ref.current;
    const {
      left = 0,
      right = 0,
      top = 0,
      bottom = 0,
    } = box?.getBoundingClientRect() || {};

    if (box) {
      if (
        event.clientX > left &&
        event.clientX < right &&
        event.clientY > top &&
        event.clientY < bottom
      ) {
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;
        box.style.top = box.offsetTop - pos2 + "px";
        box.style.left = box.offsetLeft - pos1 + "px";
        setText('Dragging');
      }
      box.addEventListener("mouseup", stop);
      box.addEventListener("mouseleave", stop);
    }
  };

  const stop = () => {
    setText('Drag me')
    ref.current?.removeEventListener('mousedown', start);
    ref.current?.removeEventListener('mousemove', drag);
    ref.current?.removeEventListener('mouseleave', drag);
  }

  useEffect(() => {
    ref.current?.addEventListener('mousedown', start)
    ref.current?.addEventListener('mouseup', stop)
    ref.current?.addEventListener('mouseleave', stop)
    return () => {
      ref.current?.addEventListener('mousedown', start)
      ref.current?.addEventListener('mouseup', stop)
      ref.current?.addEventListener('mouseleave', stop)
    }
  }, [mousedown, pos1, pos2, pos3, pos4])

  return (
    <div className="draggable" ref={ref} onMouseDown={start}>
      <p>{text}</p>
    </div>
  );
};

export default Draggable;
