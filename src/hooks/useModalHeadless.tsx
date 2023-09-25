import React, { useEffect, useRef } from "react";

import Modal from "@/components/Modal";
import Prompt from "../components/Prompt";
import { createRoot } from "react-dom/client";

const useModalHeadless = () => {
  const container = useRef();

  useEffect(() => {
    container.current = document.querySelector("#modal");
  }, []);

  return {
    createModal: ({ type, ...config }) => {
      const root = createRoot(container.current);

      root.render(
        <Prompt {...config} isShowing={true} hide={() => root.unmount()} />
      );
    },
  };
};

export default useModalHeadless;
