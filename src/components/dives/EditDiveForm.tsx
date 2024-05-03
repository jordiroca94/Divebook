"use client";
import { RxCross2 } from "react-icons/rx";
import Modal from "../ui/Modal";
import { RiDeleteBinLine } from "react-icons/ri";
import Button from "../ui/Button";
import { useState } from "react";

type Props = {
  setOpenModal: (data: boolean) => void;
  setDeleteModal: (data: boolean) => void;
};

const EditDiveForm = ({ setOpenModal, setDeleteModal }: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <Modal>
      <div className="flex justify-between items-center pt-4 lg:pt-0">
        <h5 className="text-2xl">Edit Dive</h5>
        <button
          className="rounded-full border-mediumGray border p-2 "
          onClick={() => setOpenModal(false)}
        >
          <RxCross2 className="size-5" />
        </button>
      </div>
      <div className="flex lg:flex-row flex-col justify-between">
        <button
          onClick={() => setDeleteModal(true)}
          type="button"
          className="group flex justify-center lg:items-center gap-4 text-white border rounded-md px-6 py-2.5 lg:py-3 cursor-pointer bg-red hover:bg-white mt-4 hover:border-red order-2 lg:order-1"
        >
          <RiDeleteBinLine className="h-5 w-5 text-white group-hover:text-red" />
          <p className="text-white group-hover:text-red">Delete dive</p>
        </button>
        <Button
          className="order-1 lg:order-2 mt-4"
          loading={loading}
          submit
          label="Edit Profile"
        />
      </div>
    </Modal>
  );
};

export default EditDiveForm;
