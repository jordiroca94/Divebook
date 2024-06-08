"use client";
import React, { useState } from "react";
import Modal from "../ui/Modal";
import { RxCross2 } from "react-icons/rx";
import { useSession } from "next-auth/react";
import Loader from "../ui/Loader";
import { signOut } from "next-auth/react";
import { UserType } from "@/types/common";

type Props = {
  setDeleteModal: (value: boolean) => void;
  deleteValue: string;
  setDeleteValue: (value: string) => void;
  userInfo: UserType;
};

const DeleteAccountModal = ({
  setDeleteModal,
  deleteValue,
  setDeleteValue,
  userInfo,
}: Props) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await fetch("/api/deleteUserDives", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userEmail: session?.user?.email }),
      });
      await fetch("/api/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userId: userInfo._id }),
      });
      setLoading(false);
      signOut();
    } catch (err) {
      console.log("There was an error", err);
    }
  };

  return (
    <Modal width="col-span-4 lg:col-start-5">
      <div className="flex justify-between items-start pt-4 lg:pt-0">
        <h5 className="text-2xl pb-6">
          Are you sure you want to delete your account?
        </h5>
        <button
          className="rounded-full border-mediumGray border p-2 "
          onClick={() => {
            setDeleteModal(false), setDeleteValue("");
          }}
        >
          <RxCross2 className="size-5" />
        </button>
      </div>
      <p className="mb-6">
        This action is irreversible. To confirm type{" "}
        <span className="text-red">{session?.user?.email}</span> in the box
        below
      </p>

      <input
        value={deleteValue}
        onChange={(e) => setDeleteValue(e.target.value)}
        className={`border py-2 px-6 rounded-md ${
          deleteValue === session?.user?.email ? "border-black" : " border-red"
        }`}
        type="text"
      />
      <button
        onClick={handleDelete}
        type="button"
        disabled={deleteValue === session?.user?.email ? false : true}
        className={` text-white cursor-pointer px-6 py-2 rounded-md mt-10  w-full lg:w-auto ${
          deleteValue === session?.user?.email ? "bg-red" : "bg-gray"
        }`}
      >
        {loading ? <Loader /> : <div>Delete account</div>}
      </button>
    </Modal>
  );
};

export default DeleteAccountModal;
