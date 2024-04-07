import React from "react";

type Props = {
  userInfo: any;
};

const ProfileInformation = ({ userInfo }: Props) => {
  const getBirthDate = (date: any) => {
    const birthdate: any = new Date(date);
    const today: any = new Date();
    const differenceInMilliseconds = today - birthdate;
    const age = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)
    );
    return age;
  };

  return (
    <>
      <div className="col-span-4 lg:col-start-3 text-lg lg:mb-6">
        {userInfo?.name && (
          <div>
            <p className="font-semibold">Name:</p>
            <span className="font-light">{userInfo.name} </span>
          </div>
        )}
        {userInfo?.email && (
          <div className="pt-6">
            <p className="font-semibold">Email:</p>
            <span className="font-light">{userInfo.email} </span>
          </div>
        )}
        {userInfo?.country?.label && (
          <div className="pt-6">
            <p className="font-semibold">Country:</p>
            <span className="font-light">{userInfo.country.label} </span>
          </div>
        )}
        {userInfo?.birthDate && (
          <div className="pt-6">
            <p className="font-semibold">Age:</p>
            <span className="font-light">
              {getBirthDate(userInfo.birthDate)}
            </span>
          </div>
        )}
        {userInfo?.certificate && (
          <div className="pt-6">
            <p className="font-semibold">Diving expertice:</p>
            <span className="font-light">{userInfo.certificate} </span>
          </div>
        )}
      </div>
      <div className="hidden lg:block lg:col-span-3 lg:col-start-8">
        <img
          className="aspect-square object-cover rounded-full border border-mediumGray"
          src={userInfo?.avatarUrl && userInfo?.avatarUrl}
          alt="alt"
        />
        {userInfo?.instructor && (
          <div className="flex justify-center pt-3">
            <div className="py-2 px-6 rounded-full font-light bg-green text-white">
              Instructor
            </div>
          </div>
        )}
      </div>
      {userInfo?.description && (
        <div className="lg:col-start-3 lg:col-span-8 col-span-4">
          <p className="font-semibold">About you:</p>
          <span className="font-light">{userInfo.description} </span>
        </div>
      )}
    </>
  );
};

export default ProfileInformation;