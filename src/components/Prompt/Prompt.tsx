import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PromptProps = {
    isShowing: boolean;
    hide: () => void;
    title: string;
    content: string;
    btnText: string;
    onSubmit: (value: string) => void;
    label: string;
  };
  
  const Prompt = ({
    isShowing,
    hide,
    title,
    content,
    btnText,
    onSubmit,
    label,
  }: PromptProps) => {
    const [container, setContainer] = useState<Element | null>(null);
    const [txt, setTxt] = useState<string>(content);
  
    useEffect(() => {
      setContainer(document.body);
    }, []);
  
    return isShowing && container
      ? createPortal(
        <Fragment>
          <Transition appear show={isShowing} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={hide}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-40" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left transition-all transform bg-[#20212c] shadow-xl rounded-2xl">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-left text-white"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <label className="text-slate-100 text-sm">
                          {label}
                        </label>
                        <input
                          className="bg-[#414153] ring-0 focus-0 outline-0 text-white w-full px-4 py-2 rounded-lg mt-1 font-normal"
                          value={txt}
                          onChange={(e) => setTxt(e.target.value)}
                        />
                      </div>

                      <div className="mt-6">
                        <button
                          type="button"
                          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-lg bg-primary hover:bg-orange-400 focus:outline-none focus:ring-2 ring-primary ring-offset-2 ring-offset-[#20212c]"
                          onClick={() => {
                            onSubmit(txt);
                            hide();
                          }}
                        >
                          {btnText}
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </Fragment>,
        container
      )
    : null;
};

export default Prompt;
