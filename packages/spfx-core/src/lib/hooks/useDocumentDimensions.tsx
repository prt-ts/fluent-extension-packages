/* eslint-disable */
import { AppContext } from "@prt-ts/spfx-core";
import { useEffect, useState } from "react";

const currentContext = AppContext.getInstance();
function getWindowDimensions() {
  const { domElement = document.body } = currentContext;
  const domRect = domElement.getBoundingClientRect();
  return {
    width: domRect.width,
    height: domRect.height,
  };
}

export function useDocumentDimensions() {
  const { domRect } = currentContext;
  const [windowDimensions, setWindowDimensions] = useState({
    width: domRect.width,
    height: domRect.height,
  });

  useEffect(() => {
    let timeout = null;
    function handleResize() {
      timeout = setTimeout(() => {}, 500);
      setWindowDimensions(getWindowDimensions());
    }

    handleResize(); // <-- invoke this on component mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  return windowDimensions;
}
