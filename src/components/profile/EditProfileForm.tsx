import { RxCross2 } from "react-icons/rx";
import Modal from "../ui/Modal";
import { CountryType } from "@/types/common";
import { useMemo, useRef, useState } from "react";
import { useEdgeStore } from "../../../lib/edgestore";
import countryList from "react-select-country-list";
import { useForm } from "react-hook-form";
import { SingleImageDropzone } from "../ui/SingleImageDropzone";
import Select from "react-select";
import { useSession } from "next-auth/react";
import { RiDeleteBinLine } from "react-icons/ri";
import Button from "../ui/Button";

type EditFormTypes = {
  avatarUrl: string;
  description: string;
  country: CountryType;
  birthDate: null | string;
  certificate: string;
  instructor: string;
};

type Props = {
  userInfo: any;
  openModal: any;
  setOpenModal: any;
};

const EditProfileForm = ({ userInfo, openModal, setOpenModal }: Props) => {
  const { data: session } = useSession();
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const form: any = useRef();
  const options: any = useMemo(() => countryList().getData(), []);
  const [countryValue, setCountryValue] = useState<CountryType>();

  const { handleSubmit, register } = useForm<EditFormTypes>({
    defaultValues: {
      avatarUrl: "",
      description: "",
      country: { value: "", label: "" },
      birthDate: null,
      certificate: "",
      instructor: "",
    },
  });

  const changeCountryValue = (value: any) => {
    setCountryValue(value);
  };

  const editProfile = async (values: EditFormTypes) => {
    try {
      if (file) {
        const res = await edgestore.myPublicImages.upload({ file });
        const avatarUrl = res.url;
        const parsedValues = {
          avatarUrl: avatarUrl ? avatarUrl : userInfo?.avatarUrl,
          description: values.description
            ? values.description
            : userInfo?.description,
          country: countryValue ? countryValue : userInfo?.country,
          birthDate: values.birthDate ? values.birthDate : userInfo?.birthDate,
          certificate: values.certificate
            ? values.certificate
            : userInfo?.certificate,
          instructor: values.instructor
            ? values.instructor
            : userInfo?.instructor,
        };
        const email = session?.user?.email;
        await fetch("api/updateUser", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            parsedValues,
            email,
          }),
        });
        window.location.reload();
      } else {
        const parsedValues = {
          description: values.description
            ? values.description
            : userInfo?.description,
          country: countryValue ? countryValue : userInfo?.country,
          birthDate: values.birthDate ? values.birthDate : userInfo?.birthDate,
          certificate: values.certificate
            ? values.certificate
            : userInfo?.certificate,
          instructor: values.instructor
            ? values.instructor
            : userInfo?.instructor,
        };
        const email = session?.user?.email;
        await fetch("api/updateUser", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            parsedValues,
            email,
          }),
        });
        window.location.reload();
      }
    } catch {
      throw Error("An error ocurred updating your profile");
    }
  };

  return (
    <Modal>
      <div className=" group flex lg:hidden justify-end items-center gap-4 mb-4">
        <RiDeleteBinLine className="h-5 w-5 text-red group-hover:text-red/50" />
        <div>
          <Button
            onClick={() => console.log("delete user")}
            secondary
            label="Delete account"
            className="text-red border-b-red group-hover:text-red/50 group-hover:border-b-red/50"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h5 className="text-2xl">Edit Profile</h5>
        <button
          className="rounded-full border-mediumGray border p-2 "
          onClick={() => setOpenModal(false)}
        >
          <RxCross2 className="size-5" />
        </button>
      </div>
      <form ref={form} onSubmit={handleSubmit(editProfile)}>
        <div className="flex flex-col lg:flex-row lg:gap-6">
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <label htmlFor="certificate" className="font-medium pt-4">
              What is you highest certificate?
            </label>
            <select
              {...register("certificate")}
              className="border border-mediumGray py-2 px-3 rounded-md "
            >
              <option value="" disabled selected>
                Select ...
              </option>
              <option value="Open water diver">Open water diver</option>
              <option value="Advanced Open Water Diver">
                Advanced Open Water Diver
              </option>
              <option value="Rescue Diver">Rescue Diver</option>
              <option value="Master Scuba Diver">Master Scuba Diver</option>
              <option value="Master Scuba Diver">Master Scuba Diver</option>
              <option value="Divemaster">Divemaster</option>
              <option value="Assistant Instructor">Assistant Instructor</option>
              <option value="Open Water Scuba Instructor">
                Open Water Scuba Instructor
              </option>
              <option value="Master Scuba Diver Trainer">
                Master Scuba Diver Trainer
              </option>
              <option value="Course Director">Course Director</option>
            </select>
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <label htmlFor="instructor" className="font-medium pt-4">
              Are you an instructor?
            </label>
            <select
              {...register("instructor")}
              className="border border-mediumGray py-2 px-3 rounded-md "
            >
              <option value="" disabled selected>
                Select ...
              </option>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-6">
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <label htmlFor="country" className="font-medium pt-4">
              Where are you from?
            </label>
            <Select
              options={options}
              value={countryValue}
              onChange={changeCountryValue}
            />
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <label htmlFor="birthDate" className="font-medium pt-4">
              When where you born?
            </label>
            <input
              {...register("birthDate")}
              className="border border-mediumGray py-2 px-3 rounded-md"
              type="date"
            />
          </div>
        </div>
        <div className="pt-6">
          <label htmlFor="image" className="font-medium">
            Add an image
          </label>
          <SingleImageDropzone
            className="my-4"
            width={100}
            height={80}
            value={file}
            onChange={(file) => {
              setFile(file);
            }}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="description" className="font-medium pb-4">
            Description
          </label>
          <textarea
            {...register("description")}
            className="border border-mediumGray py-2 px-3 rounded-md"
            placeholder="Description"
            rows={3}
          />
        </div>
        <div className="flex justify-between">
          <div className="hidden group lg:flex items-center gap-4 mt-4">
            <RiDeleteBinLine className="h-6 w-6 text-red group-hover:text-red/50" />
            <div>
              <Button
                onClick={() => console.log("delete user")}
                secondary
                label="Delete account"
                className="text-red border-b-red group-hover:text-red/50 group-hover:border-b-red/50"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary text-white cursor-pointer px-6 py-2 rounded-md mt-4  w-full lg:w-auto"
            value="Send"
          >
            Edit profile
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileForm;
