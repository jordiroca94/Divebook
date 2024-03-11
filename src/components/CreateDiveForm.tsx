import { RxCross1 } from "react-icons/rx";

type Props = {
  setOpenModal: any;
};

const CreateDiveForm = ({ setOpenModal }: Props) => {
  return (
    <div className="fixed z-40 inset-0 lg:bg-black/50 grid grid-cols-4 lg:grid-cols-12 place-items-center pt-header px-0 lg:px-[6.25rem]">
      <div className="w-full bg-white h-full md:h-auto col-span-4 lg:col-span-8 lg:col-start-3 px-4 py-10 md:p-8 pb-12 md:pb-12 flex flex-col overflow-y-scroll">
        <button onClick={() => setOpenModal(false)}>
          <RxCross1 />
        </button>

        <div>This is the form to create dives</div>
      </div>
    </div>
  );
};

export default CreateDiveForm;
