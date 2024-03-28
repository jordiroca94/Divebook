import { UserType } from "@/types/common";

const DiverCard = ({ name, email, avatarUrl }: UserType) => {
  return (
    <div className="col-span-4 md:col-span-2 lg:col-span-4 xlg:col-span-3 shadow-lg rounded-md border-mediumGray border">
      <div className="flex flex-col ">
        {avatarUrl && (
          <img
            className="rounded-full aspect-square object-cover"
            src={avatarUrl}
            alt={name}
          />
        )}
        <p className="text-xl font-semibold">{name}</p>
      </div>
    </div>
  );
};

export default DiverCard;
