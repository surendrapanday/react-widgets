import { RefObject, useEffect, useState } from "react";

export const useDragEvent = (ref: RefObject<HTMLDivElement>) => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ top: 350, left: 350 });

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mouseup", handleMouseUp);
      ref.current.addEventListener("mousedown", handleMouseDown);
      ref.current.addEventListener("mouseleave", handleMouseLeave);
      ref.current.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      ref?.current?.removeEventListener("mousedown", (event) =>
        handleMouseDown(event)
      );
      ref?.current?.removeEventListener("mouseup", (event) =>
        handleMouseUp(event)
      );
      ref?.current?.removeEventListener("mouseleave", (event) =>
        handleMouseMove(event)
      );
      ref?.current?.removeEventListener("mousemove", (event) =>
        handleMouseMove(event)
      );
    };
  }, [dragging, position.top, position.left]);

  const handleMouseUp = (event: MouseEvent) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    const rect = ref.current?.getBoundingClientRect();
    const maxPosition = {
      left: window.innerWidth - (rect ? rect.left : 0),
      top: window.innerHeight - (rect ? rect.top : 0),
    };
    if (dragging && rect) {
      let newPosition = { top: 350, left: 350 };
      newPosition = {
        left: rect.left + event.movementX,
        top: rect.top + event.movementY,
      };
      if (event.offsetX >= maxPosition.left) {
        newPosition = {
          left: maxPosition.left - rect.left + event.movementX,
          top: newPosition.top,
        };
      }
      if (event.offsetY >= maxPosition.top) {
        newPosition = {
          left: newPosition.left,
          top: maxPosition.top - rect.top + event.movementY,
        };
      }
      setPosition(newPosition);
    }
  };

  const handleMouseLeave = (event: MouseEvent) => {
    event.preventDefault();
    setDragging(false);
  };

  return position;
};

export const useDraggableElement = (ref: RefObject<HTMLDivElement>, active: boolean) => {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

useEffect(() => {
  if (active) {
    ref.current?.addEventListener('mousedown', start)
  }
})

  const start = (event: MouseEvent) => {
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

};
