"use client";
import { RxCross2 } from "react-icons/rx";
import Modal from "../ui/Modal";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../ui/Loader";

type Props = {
  id: string;
  setDeleteModal: (data: boolean) => void;
};

const DeleteDiveModal = ({ id, setDeleteModal }: Props) => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const deleteDive = async () => {
    setLoading(true);

    try {
      await fetch("/api/deleteDive", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      setLoading(false);
      push("/profile");
    } catch {
      throw Error("An error occurred while fetching data.");
    }
  };
  return (
    <Modal width="col-span-4 lg:col-span-4 lg:col-start-5">
      <div className="flex justify-between gap-3 items-start pt-4 lg:pt-0">
        <h5 className="text-2xl">Are you sure you want to delete your dive?</h5>
        <button
          className="rounded-full border-mediumGray border p-2 "
          onClick={() => setDeleteModal(false)}
        >
          <RxCross2 className="size-5" />
        </button>
      </div>
      <button
        onClick={deleteDive}
        type="button"
        className="group flex justify-center lg:items-center gap-4 text-white border rounded-md px-6 py-2.5 lg:py-3 cursor-pointer bg-red hover:bg-white mt-4 hover:border-red order-2 lg:order-1"
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="text-white group-hover:text-red">Delete dive</div>
        )}
      </button>
    </Modal>
  );
};

export default DeleteDiveModal;
