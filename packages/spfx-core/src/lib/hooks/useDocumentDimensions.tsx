/* eslint-disable */
import { useEffect, useState } from "react";
import { AppContext } from "../app";

const currentContext = AppContext.getInstance();
function getWindowDimensions(): DOMRect {
  const { domElement = document.body } = currentContext;
  const domRect = domElement?.getBoundingClientRect();
  if (domRect) return domRect

  return {} as DOMRect;
}

export function useDocumentDimensions(): DOMRect {
  const { domRect } = currentContext;
  const [windowDimensions, setWindowDimensions] = useState<DOMRect | null>(domRect);

  useEffect(() => {
    let timeout;
    function handleResize() {
      timeout = setTimeout(() => { }, 500);
      setWindowDimensions(() => getWindowDimensions());
    }

    handleResize(); // <-- invoke this on component mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  if (!windowDimensions) {
    return {} as DOMRect;
  }

  return windowDimensions;
}
