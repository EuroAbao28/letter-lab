import React from "react";
import DivParent from "../components/DivParent";
import DivCenter from "../components/DivCenter";
import ButtonMode from "../components/ButtonMode";
import { LuUserCircle, LuTrophy } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import logo from "../assets/myLogo.png";

function Home() {
  const navigate = useNavigate();

  return (
    <DivParent>
      <DivCenter width={"w-[30rem]"}>
        <div className="flex items-center">
          <img src={logo} alt="logo" className="p-1 bg-black rounded-md w-7" />
          <h1
            className="ml-1 text-2xl font-bold "
            style={{
              textShadow:
                "rgb(205, 205, 216) 0.2px 0.2px 0px, rgb(205, 205, 216) -0.5px 2px 0px, rgb(205, 205, 216) -0.5px 2px 0px",
            }}>
            Shambles
          </h1>

          <div className="flex items-center gap-1 ml-auto overflow-hidden rounded-full shadow-customShadow bg-customYellow outline outline-2 outline-black">
            <div
              onClick={() => navigate("/profile")}
              className="flex-1 py-2 pl-3 pr-1.5 text-2xl active:scale-95 transition-all cursor-pointer hover:bg-black/5">
              <LuUserCircle />
            </div>
            <div
              onClick={() => navigate("/leaderboard")}
              className="flex-1 py-2 pl-1.5 pr-3 text-2xl transition-all cursor-pointer hover:bg-black/5 active:scale-95">
              <LuTrophy />
            </div>
          </div>
        </div>

        <div className="relative p-4 mt-6 sm:p-6 outline outline-2 outline-black rounded-2xl bg-customDarkGray">
          <h3 className="font-semibold text-center text-slate-200">
            Game Modes
          </h3>

          <div className="flex gap-2 mt-4 text-sm font-semibold text-white sm:gap-6">
            <ButtonMode link={"easy"} bgColor={"bg-customGreen"}>
              Easy
            </ButtonMode>
            <ButtonMode link={"medium"} bgColor={"bg-customBlue"}>
              Medium
            </ButtonMode>
            <ButtonMode link={"hard"} bgColor={"bg-customRed"}>
              Hard
            </ButtonMode>
          </div>
        </div>

        <div className="mt-9">
          <p className="text-sm font-semibold tracking-wider text-center">
            Euro Abao
          </p>
          <p className="-mt-1 text-center text-2xs">Developed by</p>
        </div>
      </DivCenter>
    </DivParent>
  );
}

export default Home;
