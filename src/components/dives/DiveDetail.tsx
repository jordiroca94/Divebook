"use client";
import React, { useEffect, useState } from "react";
import Container from "../ui/Container";
import { DiveType } from "@/types/common";
import Title from "../ui/Title";
import Grid from "../ui/Grid";
import formatteDate from "@/utils/util";
import BackButton from "../ui/BackButton";
import { IoSettingsOutline } from "react-icons/io5";
import Modal from "../ui/Modal";
import { RiDeleteBinLine } from "react-icons/ri";
import Loader from "../ui/Loader";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DiveDetailSkeleton from "./DiveDetailSkeleton";

type Props = {
  id: string;
};

const DiveDetail = ({ id }: Props) => {
  const [item, setItem] = useState<DiveType>();
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const { data: session } = useSession();
  const getDives = async () => {
    try {
      const data = await fetch("/api/getDiveById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const { dive } = await data.json();
      setItem(dive);
    } catch {
      throw Error("An error occurred while fetching data.");
    }
  };

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

  useEffect(() => {
    getDives();
  }, []);
  return (
    <>
      <Container>
        <div className="flex justify-between">
          <BackButton />
          {session?.user?.email === item?.user.email && (
            <button
              className="pt-6 lg:pt-0 flex gap-2 items-center"
              onClick={() => setOpenModal(true)}
            >
              <IoSettingsOutline className="h-7 w-7" />
              <p>Edit Dive</p>
            </button>
          )}
        </div>
        {item ? (
          <>
            <Grid>
              <Title
                className="col-span-4 lg:col-span-12 flex justify-center lg:pb-10"
                h="h1"
              >
                {item.name}
              </Title>
              <div className="col-span-4 lg:col-start-2 flex flex-col justify-between">
                <div className="flex items-center text-xl font-semibold gap-2 pb-6">
                  <p>{item.location}</p>
                  <p>-</p>
                  <p>{item.country.label}</p>
                </div>
                <div>
                  <div className="flex justify-between border-b border-mediumGray items-center gap-2 py-3">
                    <div className="text-lg font-semibold">Instructor:</div>
                    <p>{item.instructor}</p>
                  </div>
                  <div className="flex justify-between border-b border-mediumGray items-center gap-2 py-3">
                    <div className="text-lg font-semibold">Deepth:</div>
                    <p>{item.deepth}</p>
                  </div>
                  <div className="flex justify-between border-b border-mediumGray items-center gap-2 py-3">
                    <div className="text-lg font-semibold">
                      Water temperature:
                    </div>
                    <p>{item.temperature}</p>
                  </div>
                  <div className="flex justify-between border-b border-mediumGray items-center gap-2 py-3">
                    <div className="text-lg font-semibold">Belt weights:</div>
                    <p>{item.weights}</p>
                  </div>
                  <div className="flex justify-between border-b border-mediumGray items-center gap-2 py-3">
                    <div className="text-lg font-semibold">Suit:</div>
                    <p>{item.suit}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-5 lg:col-start-7">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="rounded-lg aspect-[3/2] object-cover"
                />
              </div>
            </Grid>
            <Grid>
              <p className="col-span-4 lg:col-span-7 lg:col-start-2 text-lg pt-2 lg:py-10">
                {item.description}
              </p>
              <div className="col-span-4 lg:col-span-3 lg:col-start-9 text-lg lg:py-10">
                <div className="flex lg:flex-col gap-2 justify-end lg:items-end">
                  <p>{item.user.name}</p>
                  <p>{formatteDate(item.updatedAt)}</p>
                </div>
              </div>
            </Grid>
          </>
        ) : (
          <DiveDetailSkeleton />
        )}
      </Container>
      {openModal && (
        <Modal>
          <div className="flex justify-between items-center">
            <h5 className="text-2xl">Edit Dive</h5>
            <button
              className="rounded-full border-mediumGray border p-2 "
              onClick={() => setOpenModal(false)}
            >
              <RxCross2 className="size-5" />
            </button>
          </div>
          <button
            onClick={() => setDeleteModal(true)}
            type="button"
            className="hidden group lg:flex items-center gap-4 mt-4"
          >
            <RiDeleteBinLine className="h-6 w-6 text-red group-hover:text-red/50" />
            <p className="text-red border-b-red group-hover:text-red/50 group-hover:border-b-red/50">
              Delete dive
            </p>
          </button>
        </Modal>
      )}
      {deleteModal && (
        <Modal>
          <div className="flex justify-between items-center">
            <h5 className="text-2xl">
              Are you sure you want to delete your dive?
            </h5>
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
            className="text-white cursor-pointer px-6 py-2 rounded-md mt-10  w-full  lg:w-1/2 bg-red "
          >
            {loading ? <Loader /> : <div>Delete dive</div>}
          </button>
        </Modal>
      )}
    </>
  );
};

export default DiveDetail;
