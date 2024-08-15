import React, { useState } from "react";
import DivParent from "../components/DivParent";
import DivCenter from "../components/DivCenter";
import Header from "../components/Header";
import { LuPencil, LuX, LuCheck } from "react-icons/lu";
import { useUserContext } from "../contexts/UserContextProvider";
import { CgBoy, CgGirl } from "react-icons/cg";
import { ImInfo } from "react-icons/im";
import classNames from "classnames";

function Profile() {
  const { user, gender, updateUser, updateGender } = useUserContext();

  const [userCopy, setUserCopy] = useState(user);
  const [genderCopy, setGenderCopy] = useState(gender);

  const [isEditMode, setIsEditMode] = useState(false);

  const handleCancel = () => {
    // back to original
    setUserCopy(user);
    setGenderCopy(gender);

    setIsEditMode(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser(userCopy);
    updateGender(genderCopy);

    setIsEditMode(false);
  };

  return (
    <DivParent>
      <DivCenter width={"w-[25rem]"}>
        <Header title={"Profile"}>
          {isEditMode ? (
            <>
              <div
                onClick={handleCancel}
                className="p-2 ml-auto text-xl text-white transition-all rounded-full cursor-pointer outline outline-2 outline-black bg-customRed shadow-customShadow active:scale-95 active:shadow">
                <LuX />
              </div>
              <div
                onClick={handleSubmit}
                className="p-2 text-xl text-white transition-all rounded-full cursor-pointer outline outline-2 outline-black bg-customGreen shadow-customShadow active:scale-95 active:shadow">
                <LuCheck />
              </div>
            </>
          ) : (
            <div
              onClick={() => setIsEditMode(true)}
              className="p-2 ml-auto text-xl transition-all rounded-full cursor-pointer outline outline-2 outline-black bg-customYellow shadow-customShadow active:scale-95 active:shadow">
              <LuPencil />
            </div>
          )}
        </Header>

        <div className="flex gap-4 mt-6 mb-4">
          <button
            disabled={!isEditMode}
            onClick={() => setGenderCopy(!genderCopy)}
            className={classNames(
              "p-2 text-2xl text-white rounded-md transition-all  outline outline-2  outline-black aspect-square",
              {
                "shadow-customShadow active:shadow cursor-pointer": isEditMode,
                "shadow-customShadowInner": !isEditMode,
                "bg-customBlue": genderCopy,
                "bg-pink-400": !genderCopy,
              }
            )}>
            {genderCopy ? <CgBoy /> : <CgGirl />}
          </button>

          {isEditMode ? (
            <>
              <form onSubmit={handleSubmit} className="flex-1">
                <input
                  type="text"
                  placeholder="Username"
                  value={userCopy}
                  onChange={(e) => setUserCopy(e.target.value)}
                  className="flex-1 w-full h-full px-4 text-lg text-white rounded-md outline outline-2 shadow-customShadow outline-black bg-customDarkGray"
                />
              </form>
            </>
          ) : (
            <p className="flex items-center flex-1 px-4 text-lg text-white rounded-md cursor-default outline outline-2 shadow-customShadowInner outline-black bg-customDarkGray">
              {user}
            </p>
          )}
        </div>
      </DivCenter>
    </DivParent>
  );
}

export default Profile;
