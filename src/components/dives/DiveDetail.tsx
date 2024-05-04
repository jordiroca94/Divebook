"use client";
import React, { useEffect, useState } from "react";
import Container from "../ui/Container";
import { DiveType } from "@/types/common";
import Title from "../ui/Title";
import Grid from "../ui/Grid";
import BackButton from "../ui/BackButton";
import { IoSettingsOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import DiveDetailSkeleton from "./DiveDetailSkeleton";
import EditDiveForm from "./EditDiveForm";
import DeleteDiveModal from "./DeleteDiveModal";

type Props = {
  id: string;
};

const DiveDetail = ({ id }: Props) => {
  const [item, setItem] = useState<DiveType>();
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
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

  const getUser = async () => {
    try {
      const userData = await fetch("/api/getUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: item?.user.email }),
      });
      const data = await userData.json();
      setUserId(data.user._id);
    } catch {
      throw Error("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    if (item) {
      getUser();
    }
  }, [item]);

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
                  {item.instructor && (
                    <div className="flex justify-between border-b border-mediumGray items-center gap-2 py-3">
                      <div className="text-lg font-semibold">Instructor:</div>
                      <p>{item.instructor}</p>
                    </div>
                  )}
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
                  <a className="hover:underline" href={`/divers/${userId}`}>
                    {item.user.name}
                  </a>
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
        <EditDiveForm
          item={item}
          setOpenModal={setOpenModal}
          setDeleteModal={setDeleteModal}
        />
      )}
      {deleteModal && (
        <DeleteDiveModal id={id} setDeleteModal={setDeleteModal} />
      )}
    </>
  );
};

export default DiveDetail;
