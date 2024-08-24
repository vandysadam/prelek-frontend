import { Dialog, Transition } from "@headlessui/react";
import React, { useState } from "react";

interface ModalDialogProps {
  children: React.ReactNode;
  id?: string;
  title?: string;
  onClose?: () => void;
  [key: string]: any;
}

const ModalDialog: React.FC<ModalDialogProps> = ({
  children,
  onClose,
  title,
  ...props
}) => {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog onClose={() => setIsOpen(false)}>
        <Dialog.Overlay />
        <Dialog.Title>Deactivate account</Dialog.Title>
        {/* ... */}
        asdasdasd
      </Dialog>
    </Transition>
  );
};

export default ModalDialog;
