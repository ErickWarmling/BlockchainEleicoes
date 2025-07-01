import * as Dialog from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { Candidate } from "../../../core/entities/candidate";
import axiosInstance from "../../../external/axios";
import { toast } from "react-toastify";
import ApiSuccess from "../../../core/types/successResponse";

type ApiResponse = {
  type: string;
  code: number;
  message: string;
};

type CandidateDeleteDialogProps = {
  onSave: () => void;
  candidate: Candidate;
};

const CandidateDeleteDialog: React.FC<CandidateDeleteDialogProps> = ({
  onSave,
  candidate,
}) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async (id: number) => {
    console.log("Deleting candidate with id:", id);

    const response = await axiosInstance.delete(`/api/candidates/${id}`);

    const data: ApiResponse = response.data;
    console.log(data);
    if (data.type === ApiSuccess.CANDIDATE_DELETED) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }

    onSave();
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-2  rounded shadow-lg">
          Remove
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/55" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-100 text-slate-900 p-8 shadow-lg rounded-sm min-w-[550px] max-w-[550px] ">
          <Dialog.Title className="text-2xl mb-4">
            Remove Candidate
          </Dialog.Title>
          <p className="mb-2">
            Are you sure you want to remove the candidate{" "}
            <span className="font-bold">{candidate.name}</span>?
          </p>
          <p className="font-semibold mb-8">This action can't be reversed</p>

          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => {
                handleDelete(candidate.idCandidate);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Remove
            </button>
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CandidateDeleteDialog;
