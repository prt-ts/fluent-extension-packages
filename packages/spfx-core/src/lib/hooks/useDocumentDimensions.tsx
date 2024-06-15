/* eslint-disable */
import { useEffect, useState } from 'react';
import { AppContext } from '../app';

const currentContext = AppContext.getInstance();
function getWindowDimensions(): DOMRect {
  const { domElement = document.body } = currentContext;
  const domRect = domElement?.getBoundingClientRect();
  if (domRect) return domRect;

  return {} as DOMRect;
}

export function useDocumentDimensions(): DOMRect {
  const { domRect } = currentContext;
  const [windowDimensions, setWindowDimensions] = useState<DOMRect | null>(
    domRect
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(() => getWindowDimensions());
    }

    handleResize(); // <-- invoke this on component mount
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!windowDimensions) {
    return {} as DOMRect;
  }

  return windowDimensions;
}

export function useGetElementDimensions(element: HTMLElement | null): DOMRect {
  const [elementDimensions, setElementDimensions] = useState<DOMRect | null>(
    element
      ? element.getBoundingClientRect()
      : ({
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          bottom: 0,
          left: 0,
          right: 0,
        } as DOMRect)
  );

  useEffect(() => {
    function handleResize() {
      setElementDimensions(() =>
        element ? element.getBoundingClientRect() : ({} as DOMRect)
      );
    }

    handleResize(); // <-- invoke this on component mount
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!elementDimensions) {
    return {} as DOMRect;
  }

  return elementDimensions;
}
