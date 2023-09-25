import { useEffect } from "react";
import { useRef } from "react";

export function useState2Ref(state) {
  let newRef = useRef(state);
  useEffect(() => {
    newRef.current = state;
  }, [state]);
  return newRef;
}
