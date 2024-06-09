import { UserType } from "@/types/common";
import { getAge } from "@/utils/util";
import React from "react";

type Props = {
  userInfo: UserType | undefined;
};

const ProfileInformation = ({ userInfo }: Props) => {
  return (
    <>
      <div className="col-span-4 lg:col-start-2 text-lg lg:mb-6">
        {userInfo?.name ? (
          <div>
            <p className="font-semibold">Name:</p>
            <span className="font-light">{userInfo.name} </span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="w-1/5 h-5 bg-mediumGray"></div>
            <div className="w-2/5 h-5 bg-mediumGray"></div>
          </div>
        )}
        {userInfo?.email ? (
          <div className="pt-6 animate-pulse">
            <p className="font-semibold">Email:</p>
            <span className="font-light">{userInfo.email} </span>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-6 animate-pulse">
            <div className="w-1/5 h-5 bg-mediumGray"></div>
            <div className="w-2/5 h-5 bg-mediumGray"></div>
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
            <span className="font-light">{getAge(userInfo.birthDate)}</span>
          </div>
        )}
        {userInfo?.certificate && (
          <div className="pt-6">
            <p className="font-semibold">Diving expertice:</p>
            <span className="font-light">{userInfo.certificate} </span>
          </div>
        )}
      </div>
      <div className="hidden lg:block lg:col-span-4 lg:col-start-8">
        {userInfo ? (
          <img
            className="aspect-square object-cover rounded-full border border-primary"
            src={userInfo.avatarUrl}
            alt="alt"
          />
        ) : (
          <div className="aspect-square rounded-full bg-mediumGray animate-pulse" />
        )}
        {userInfo?.instructor && (
          <div className="flex justify-center pt-3">
            <div className="py-2 px-6 rounded-full font-light bg-green text-white">
              Instructor
            </div>
          </div>
        )}
      </div>
      {userInfo?.description && (
        <div className="lg:col-start-2 lg:col-span-10 col-span-4">
          <p className="font-semibold lg:mb-3">About you:</p>
          <span className="font-light">{userInfo.description} </span>
        </div>
      )}
    </>
  );
};

export default ProfileInformation;
