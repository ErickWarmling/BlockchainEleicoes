import * as Dialog from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { Candidate } from "../../../core/entities/candidate";
import CandidateForm from "./candidate-form";

type FormDialogProps = {
  title: string;
  onSave: () => void;
  triggerLabel: string;
  candidate?: Candidate;
  variant?: "primary" | "secondary" | "danger";
};

const FormDialog: React.FC<FormDialogProps> = ({
  onSave,
  title,
  triggerLabel,
  candidate,
  variant = "primary",
}) => {
  const [open, setOpen] = useState(false);

  const styles: Record<typeof variant, string> = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-yellow-500 hover:bg-yellow-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className={`${styles[variant]} px-3 py-2  rounded shadow-lg`}>
          {triggerLabel}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/55" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-100 text-slate-900 p-8 shadow-lg rounded-sm min-w-96">
          <Dialog.Title className="text-2xl">{title}</Dialog.Title>

          <CandidateForm
            candidate={candidate}
            onSave={() => {
              onSave();
              setOpen(false);
            }}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FormDialog;
