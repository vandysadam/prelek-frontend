import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export enum ModalType {
  INFO = "info",
  SUCCESS = "success",
  DELETE = "delete",
  BLANK = "blank",
}

type ModalProps = {
  modalHeader?: React.ReactNode;
  modalContent?: React.ReactNode;
  modalFooter?: React.ReactNode;
  modalType?: ModalType;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultHeader = (
  <div className="flex items-center justify-center">
    <div className="flex-col items-center justify-center">
      <div className="text-center">
        <p className="text-xl font-medium leading-6 text-gray-900">
          Are you sure you want to delete this?
        </p>
      </div>
    </div>
  </div>
);

const defaultContent = (
  <div className="flex items-center justify-center">
    <div className="flex-col items-center justify-center">
      <div className="text-center">
        <p className="text-xl font-medium leading-6 text-gray-900">
          Are you sure you want to delete this?
        </p>
      </div>
    </div>
  </div>
);

// const defaultFooter = (
//   <div className="flex items-center justify-center">
//     <div className="flex-col items-center justify-center">
//       <div className="text-center">
//         <p className="text-xl font-medium leading-6 text-gray-900">
//           Are you sure you want to delete this?
//         </p>
//       </div>
//     </div>
//   </div>
// );

const infoIcon = (
  <>
    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-indigo-100">
      <svg
        className="w-4 h-4 shrink-0 fill-current text-indigo-500"
        viewBox="0 0 16 16"
      >
        <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
      </svg>
    </div>
  </>
);

const successIcon = (
  <>
    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-green-100">
      <svg
        className="w-4 h-4 shrink-0 fill-current text-green-500"
        viewBox="0 0 16 16"
      >
        <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z" />
      </svg>
    </div>
  </>
);

const deleteIcon = (
  <>
    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-red-100">
      <svg
        className="w-4 h-4 shrink-0 fill-current text-red-500"
        viewBox="0 0 16 16"
      >
        <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
      </svg>
    </div>
  </>
);

const ModalBase = ({
  modalHeader = defaultHeader,
  modalContent = defaultContent,
  modalFooter,
  modalType = ModalType.INFO,
  isOpen,
  setIsOpen,
}: ModalProps) => {
  return (
    <>
      <Transition
        className="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity"
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-out duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        aria-hidden="true"
        appear={undefined}
      />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          open={isOpen}
          onClose={setIsOpen}
          as="div"
          className={
            "fixed inset-0 z-60 flex items-center justify-center overflow-y-auto"
          }
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full p-4 overflow-x-hidden overflow-y-auto text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                {modalType !== ModalType.BLANK ? (
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <div className="mr-2">
                        {modalType === ModalType.DELETE && deleteIcon}
                        {modalType === ModalType.SUCCESS && successIcon}
                        {modalType === ModalType.INFO && infoIcon}
                      </div>
                      {modalHeader}
                    </div>
                    <div className="w-full">
                      {modalContent}
                      {modalFooter}
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    {modalHeader}
                    {modalContent}
                    {modalFooter}
                  </div>
                )}
              </div>
              {/* </div> */}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalBase;
