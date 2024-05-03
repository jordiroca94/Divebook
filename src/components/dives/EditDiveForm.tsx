"use client";
import { RxCross2 } from "react-icons/rx";
import Modal from "../ui/Modal";
import { RiDeleteBinLine } from "react-icons/ri";
import Button from "../ui/Button";
import { useMemo, useRef, useState } from "react";
import { CountryType, DiveType } from "@/types/common";
import { useForm } from "react-hook-form";
import { useEdgeStore } from "../../../lib/edgestore";
import Select from "react-select";
import countryList from "react-select-country-list";
import { SingleImageDropzone } from "../ui/SingleImageDropzone";

type Props = {
  item: any;
  setOpenModal: (data: boolean) => void;
  setDeleteModal: (data: boolean) => void;
};

const EditDiveForm = ({ item, setOpenModal, setDeleteModal }: Props) => {
  const [loading, setLoading] = useState(false);
  const [countryValue, setCountryValue] = useState<CountryType>();
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();

  const { edgestore } = useEdgeStore();
  const form: any = useRef();
  const options: any = useMemo(() => countryList().getData(), []);
  const { handleSubmit, register } = useForm<DiveType>({
    defaultValues: {
      date: null,
      name: "",
      country: { value: "", label: "" },
      location: "",
      deepth: "",
      temperature: "",
      weights: "",
      instructor: "",
      suit: "",
      description: "",
      imageUrl: "",
    },
  });

  const changeCountryValue = (value: any) => {
    setCountryValue(value);
  };

  const uploadFile = async (file: File | undefined) => {
    try {
      if (file) {
        const res = await edgestore.myPublicImages.upload({ file });
        setImageUrl(res.url);
      }
    } catch {
      throw Error("An error ocurred while uploading a file. Please try again ");
    }
  };

  const editDive = async (values: DiveType) => {
    setLoading(true);
    try {
      if (file) {
        const res = await edgestore.myPublicImages.upload({ file });
        const imageUrl = res.url;
        const parsedValues = {
          date: values.date ? values.date : item?.date,
          name: values.name ? values.name : item?.name,
          country: countryValue ? countryValue : item?.country,
          location: values.location ? values.location : item?.location,
          deepth: values.deepth ? values.deepth : item?.deepth,
          temperature: values.temperature
            ? values.temperature
            : item?.temperature,
          weights: values.weights ? values.weights : item?.weights,
          instructor: values.instructor ? values.instructor : item?.instructor,
          suit: values.suit ? values.suit : item?.suit,
          description: values.description
            ? values.description
            : item?.description,
          imageUrl: imageUrl ? imageUrl : item.imageUrl,
        };
        await fetch("/api/updateDive", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            parsedValues,
            id: item._id,
          }),
        });
        window.location.reload();
      } else {
        const parsedValues = {
          date: values.date ? values.date : item?.date,
          name: values.name ? values.name : item?.name,
          country: countryValue ? countryValue : item?.country,
          location: values.location ? values.location : item?.location,
          deepth: values.deepth ? values.deepth : item?.deepth,
          temperature: values.temperature
            ? values.temperature
            : item?.temperature,
          weights: values.weights ? values.weights : item?.weights,
          instructor: values.instructor ? values.instructor : item?.instructor,
          suit: values.suit ? values.suit : item?.suit,
          description: values.description
            ? values.description
            : item?.description,
        };
        await fetch("/api/updateDive", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            parsedValues,
            id: item?._id,
          }),
        });
        window.location.reload();
      }
    } catch {
      throw Error("An error ocurred editing your dive");
    }
  };
  return (
    <Modal height="h-full md:h-auto md:max-h-[75vh]">
      <div className="flex justify-between items-center pt-4 lg:pt-0">
        <h5 className="text-2xl">Edit Dive</h5>
        <button
          className="rounded-full border-mediumGray border p-2 "
          onClick={() => setOpenModal(false)}
        >
          <RxCross2 className="size-5" />
        </button>
      </div>
      <form ref={form} onSubmit={handleSubmit(editDive)}>
        <div className="flex flex-col lg:flex-row lg:gap-6">
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <label htmlFor="date" className="font-medium pt-4">
              When was it?
            </label>
            <input
              {...register("date")}
              className="border border-mediumGray py-2 px-3 rounded-md"
              type="date"
            />
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <label htmlFor="name" className="font-medium pt-4">
              Name your dive
            </label>
            <input
              {...register("name")}
              className="border border-mediumGray py-2 px-3 rounded-md"
              placeholder="Dive's name"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-6">
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <label htmlFor="country" className="font-medium pt-4">
              Country
            </label>
            <Select
              options={options}
              value={countryValue}
              onChange={changeCountryValue}
            />
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <label htmlFor="location" className="font-medium pt-4">
              Where was it?
            </label>
            <input
              id="location"
              className="border border-mediumGray py-2 px-3 rounded-md"
              type="text"
              placeholder="Location"
              {...register("location")}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-6">
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <label htmlFor="deepth" className="font-medium pt-4">
              Deepth
            </label>
            <input
              id="deepth"
              className="border border-mediumGray py-2 px-3 rounded-md"
              type="number"
              placeholder="Deepth in meeters"
              {...register("deepth")}
            />
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <label htmlFor="temperature" className="font-medium pt-4">
              Water temperature
            </label>
            <input
              id="temperature"
              className="border border-mediumGray py-2 px-3 rounded-md w-full"
              type="number"
              placeholder="Temperature in celsius"
              {...register("temperature")}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-6">
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <label htmlFor="weights" className="font-medium pt-4">
              Weights
            </label>
            <input
              id="weight"
              className="border border-mediumGray py-2 px-3 rounded-md w-full"
              type="number"
              placeholder="Weights in kg"
              {...register("weights")}
            />
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <label htmlFor="instructor" className="font-medium pt-4">
              Who was your instructor?
            </label>
            <input
              id="instructor"
              className="border border-mediumGray py-2 px-3 rounded-md"
              type="text"
              placeholder="Instructor name"
              {...register("instructor")}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-6">
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <label htmlFor="file" className="font-medium pt-4">
              Add an Image
            </label>
            <SingleImageDropzone
              width={100}
              height={100}
              value={file}
              onChange={(file) => {
                setFile(file);
                uploadFile(file);
              }}
            />
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <label htmlFor="suit" className="font-medium pt-4">
              Which was your suit?
            </label>
            <select
              {...register("suit")}
              className="border border-mediumGray py-2 px-3 rounded-md"
            >
              <option value="" disabled selected>
                Select ...
              </option>
              <option value="Wet suit 3mm">Wet suit 3mm </option>
              <option value="Wet suit 5mm">Wet suit 5mm </option>
              <option value="Wet suit 7mm">Wet suit 7mm </option>
              <option value="Neoprene dry suit">Neoprene dry suit</option>
              <option value="Membrane dry suit">Membrane dry suit</option>
              <option value="Hybrid dry suits"> Hybrid dry suits</option>
              <option value="Semi-dry suits">Semi-dry suits </option>
              <option value="Exposure suits">Exposure suits </option>
            </select>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-6">
          <div className="flex flex-col gap-4 w-full">
            <label htmlFor="description" className="font-medium pt-4">
              Tell us about your experience
            </label>
            <textarea
              id="description"
              className="border border-mediumGray py-2 px-3 rounded-md"
              placeholder="Description"
              rows={3}
              {...register("description")}
            />
          </div>
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
      </form>
    </Modal>
  );
};

export default EditDiveForm;
