import React, { useEffect, useState } from "react";
import DivParent from "../components/DivParent";
import DivCenter from "../components/DivCenter";
import Header from "../components/Header";
import { FaStar, FaHeart, FaHome, FaUser } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { LuPaintbrush, LuShuffle, LuPlay } from "react-icons/lu";
import axios from "axios";
import { word4, word5, word6 } from "../utils/wordGen";
import classNames from "classnames";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { IoShareSocialSharp } from "react-icons/io5";
import { useUserContext } from "../contexts/UserContextProvider";
import useAddEntry from "../hooks/useAddEntry";

function InGame() {
  const { user, gender } = useUserContext();
  const navigate = useNavigate();
  const mode = useLocation().pathname.replace(/^\//, "");

  const { addEntryFunction, isLoading } = useAddEntry();

  const [origWord, setOrigWord] = useState("");
  const [mixedLetters, setMixedLetters] = useState("");

  const [answer, setAnswer] = useState("");
  const [selectedIndex, setSelectedIndex] = useState([]);

  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);

  const [isResultModalOpen, setResultModalOpen] = useState(false);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);

  const [isALreadyShared, setIsAlreadyShared] = useState(false);
  const [notifShareMessage, setNotifShareMessage] = useState("");

  const handleShambleWord = (word) => {
    // mix it
    const arrayWord = word.split("");
    const arryLength = arrayWord.length;
    for (let index = arryLength - 1; index > 0; index--) {
      let ranNumb = Math.floor(Math.random() * (index + 1));
      let temp = arrayWord[index];
      arrayWord[index] = arrayWord[ranNumb];
      arrayWord[ranNumb] = temp;
    }

    const toString = arrayWord.join("");

    setMixedLetters(toString);
  };

  const generateWord = async () => {
    try {
      let link;
      if (mode === "easy") {
        link = word4;
      } else if (mode === "medium") {
        link = word5;
      } else if (mode === "hard") {
        link = word6;
      }

      const { data } = await axios.get(link);
      // const data = ["tanga"];
      setOrigWord(data[0]);

      handleShambleWord(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAnswer = (letter, index) => {
    // check if the letter is already clicked
    if (selectedIndex.includes(index)) return;

    // add the index
    setSelectedIndex((prev) => [...prev, index]);

    // make it array
    const toArray = [...answer];

    // push the new letter
    toArray.push(letter);

    // make it string
    const toString = toArray.join("");

    setAnswer(toString);
  };

  const handleClear = () => {
    setAnswer("");
    setSelectedIndex([]);
  };

  const handleReShamble = () => {
    handleClear();
    handleShambleWord(origWord);
  };

  const handleSubmit = () => {
    if (origWord.length !== answer.length) return;

    if (origWord === answer) {
      setScore((prev) => prev + 10);
      setResultModalOpen(true);
    } else {
      setLives((prev) => prev - 1);
      setResultModalOpen(true);
    }
  };

  const handleNextRound = () => {
    if (lives === 0) {
      // make a logic
      console.log("wala na buhay");

      setResultModalOpen(false);
      setIsGameOverModalOpen(true);
      return;
    }

    setResultModalOpen(false);
    handleClear();
    setOrigWord("");
    generateWord();
  };

  const handleRestart = () => {
    setOrigWord("");
    generateWord();
    handleClear();

    setScore(0);
    setLives(3);

    setIsAlreadyShared(false);
    setNotifShareMessage("");

    setIsGameOverModalOpen(false);
  };

  const handleShare = async () => {
    try {
      setIsAlreadyShared(true);
      const data = {
        user,
        gender,
        score,
        mode,
      };

      const response = await addEntryFunction(data);

      setNotifShareMessage(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    generateWord();
  }, []);

  return (
    <>
      {/* modal */}
      <div
        role="dialog"
        className={classNames("modal", {
          "modal-open": isResultModalOpen,
        })}>
        <div className="w-[22rem] mx-4 p-6 bg-customMidGray outline outline-2 outline-black text-slate-900 rounded-2xl shadow-customShadow">
          <h1
            className={classNames(
              "py-2 text-3xl font-bold text-center text-white rounded-full shadow-customShadow outline outline-2 outline-black",
              {
                "bg-customGreen": answer === origWord,
                "bg-customRed": answer !== origWord,
              }
            )}>
            {answer === origWord ? "Correct!" : "Wrong!"}
          </h1>

          <div className="p-4 mt-6 bg-customDarkGray outline outline-1 outline-black rounded-xl">
            <div className="flex">
              {origWord.split("").map((box, index) => (
                <p
                  key={index}
                  className={classNames(
                    "text-2xl flex-1 aspect-square flex items-center justify-center font-black uppercase transition-all shadow-customShadow  rounded-xl outline outline-black   text-white",
                    {
                      "bg-customBlue outline-2": index === 0 || index === 4,
                      "bg-customGreen outline-2": index === 1 || index === 5,
                      "bg-customRed outline-2": index === 2,
                      "bg-customYellow outline-2": index === 3,
                    }
                  )}>
                  {box}
                </p>
              ))}
            </div>
          </div>

          <p className="mt-4 text-center">
            Your answer is <span className="uppercase">{answer}</span>
          </p>

          <div className="flex items-center gap-4 mt-4 text-xl">
            <button className="flex items-center justify-center flex-1 p-3 transition-all rounded-full outline outline-2 outline-black bg-slate-200 shadow-customShadow active:shadow">
              <FaHome />
            </button>
            <button
              onClick={handleNextRound}
              className="flex items-center justify-center flex-1 p-3 text-white transition-all rounded-full outline outline-2 outline-black bg-customGreen shadow-customShadow active:shadow"
              style={{
                textShadow: "#0f172a .1px .1px 1px, #e2e8f0 .3px .3px 1px ",
              }}>
              <TbPlayerTrackNextFilled />
            </button>
          </div>
        </div>
      </div>

      {/* game over modal */}
      <div
        role="dialog"
        className={classNames("modal", {
          "modal-open": isGameOverModalOpen,
        })}>
        <div className="w-[22rem] mx-4 p-6 bg-customMidGray outline outline-2 outline-black text-slate-900 rounded-2xl shadow-customShadow">
          <h1 className="py-2 text-3xl font-bold text-center text-white rounded-full bg-customRed shadow-customShadow outline outline-2 outline-black">
            Game Over
          </h1>

          <div className="px-4 mt-3 text-sm text-center text-white transition-all rounded-lg">
            {notifShareMessage}
          </div>

          <div className="p-4 mt-5 rounded-xl bg-customDarkGray outline outline-2 outline-black">
            <div className="flex items-center gap-2 ">
              <FaStar className="text-lg text-customYellow" />
              <p className="font-bold text-white">Score</p>
              <p className="ml-auto text-lg font-bold text-white">{score}</p>
            </div>
            <div className="flex items-center gap-2 ">
              <FaUser className="text-lg text-customYellow" />
              <p className="font-bold text-white">User</p>
              <p className="ml-auto text-lg font-bold text-white">{user}</p>
            </div>
          </div>

          <div className="flex gap-4 mt-6 text-xl">
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center flex-1 p-3 transition-all rounded-full outline outline-2 outline-black bg-slate-200 shadow-customShadow active:shadow">
              <FaHome />
            </button>
            <button
              onClick={handleRestart}
              className="flex items-center justify-center flex-1 p-3 text-white transition-all rounded-full outline outline-2 outline-black bg-customBlue shadow-customShadow active:shadow">
              <FaArrowRotateLeft />
            </button>
            <button
              onClick={handleShare}
              disabled={isALreadyShared || score === 0 ? true : false}
              className="flex items-center justify-center flex-1 p-3 text-white transition-all rounded-full outline outline-2 outline-black bg-customGreen shadow-customShadow active:shadow">
              {isLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <IoShareSocialSharp />
              )}
            </button>
          </div>
        </div>
      </div>

      <DivParent>
        <DivCenter width={"w-[30rem]"}>
          <Header title={mode}>
            <div className="flex gap-4 ml-auto">
              <div className="flex items-center justify-center gap-2 px-4 py-1 font-semibold rounded shadow-customShadowInner outline outline-1 outline-black bg-customDarkGray">
                <FaStar className="text-customYellow" />
                <p className="text-slate-200">{score}</p>
              </div>
              <div className="flex items-center justify-center gap-2 px-4 py-1 font-semibold rounded shadow-customShadowInner outline outline-1 outline-black bg-customDarkGray">
                <FaHeart className="text-customRed" />
                <p className="text-slate-200">{lives}</p>
              </div>
            </div>
          </Header>

          {/* Shumbles */}
          {origWord ? (
            <div
              className={classNames("grid gap-4 mt-6 animate-customBounce", {
                "grid-cols-4": mode === "easy",
                "grid-cols-5": mode === "medium",
                "grid-cols-3": mode === "hard",
              })}>
              {mixedLetters.split("").map((box, index) => (
                <button
                  onClick={() => handleAnswer(box, index)}
                  key={index}
                  className={classNames(
                    "flex-1 text-2xl font-black uppercase animate-customShowing transition-all shadow-customShadow aspect-square  rounded-xl  outline outline-black outline-2  active:shadow text-white active:scale-95",
                    {
                      " bg-transparent shadow-customShadowInner scale-95":
                        selectedIndex.includes(index),
                      "bg-customBlue ": index === 0 || index === 4,
                      "bg-customGreen ": index === 1 || index === 5,
                      "bg-customRed ": index === 2,
                      "bg-customYellow ": index === 3,
                    }
                  )}>
                  {box}
                </button>
              ))}
            </div>
          ) : (
            <>
              {mode === "easy" && (
                <div
                  className={classNames(
                    "grid gap-4 mt-6 animate-customBounce",
                    {
                      "grid-cols-4": mode === "easy",
                      "grid-cols-5": mode === "medium",
                      "grid-cols-3": mode === "hard",
                    }
                  )}>
                  <div className="flex items-center justify-center flex-1 aspect-square rounded-xl animate-pulse shadow-customShadowInner bg-customMidGray">
                    <span className="loading loading-ring loading-lg text-customDarkGray"></span>
                  </div>
                  <div className="flex items-center justify-center flex-1 aspect-square rounded-xl animate-pulse shadow-customShadowInner bg-customMidGray">
                    <span className="loading loading-ring loading-lg text-customDarkGray"></span>
                  </div>
                  <div className="flex items-center justify-center flex-1 aspect-square rounded-xl animate-pulse shadow-customShadowInner bg-customMidGray">
                    <span className="loading loading-ring loading-lg text-customDarkGray"></span>
                  </div>
                  <div className="flex items-center justify-center flex-1 aspect-square rounded-xl animate-pulse shadow-customShadowInner bg-customMidGray">
                    <span className="loading loading-ring loading-lg text-customDarkGray"></span>
                  </div>
                </div>
              )}

              {mode === "medium" && (
                <div
                  className={classNames(
                    "grid gap-4 mt-6 animate-customBounce",
                    {
                      "grid-cols-4": mode === "easy",
                      "grid-cols-5": mode === "medium",
                      "grid-cols-3": mode === "hard",
                    }
                  )}>
                  <div className="flex items-center justify-center flex-1 aspect-square rounded-xl animate-pulse shadow-customShadowInner bg-customMidGray">
                    <span className="loading loading-ring loading-lg text-customDarkGray"></span>
                  </div>
                  <div className="flex items-center justify-center flex-1 aspect-square rounded-xl animate-pulse shadow-customShadowInner bg-customMidGray">
                    <span className="loading loading-ring loading-lg text-customDarkGray"></span>
                  </div>
                  <div className="flex items-center justify-center flex-1 aspect-square rounded-xl animate-pulse shadow-customShadowInner bg-customMidGray">
                    <span className="loading loading-ring loading-lg text-customDarkGray"></span>
                  </div>
                  <div className="flex items-center justify-center flex-1 aspect-square rounded-xl animate-pulse shadow-customShadowInner bg-customMidGray">
                    <span className="loading loading-ring loading-lg text-customDarkGray"></span>
                  </div>
                  <div className="flex items-center justify-center flex-1 aspect-square rounded-xl animate-pulse shadow-customShadowInner bg-customMidGray">
                    <span className="loading loading-ring loading-lg text-customDarkGray"></span>
                  </div>
                </div>
              )}

              {mode === "hard" && (
                <div
                  className={classNames(
                    "grid gap-4 mt-6 animate-customBounce",
                    {
                      "grid-cols-4": mode === "easy",
                      "grid-cols-5": mode === "medium",
                      "grid-cols-3": mode === "hard",
                    }
                  )}>
                  <div className="flex items-center justify-center flex-1 aspect-square rounded-xl animate-pulse shadow-customShadowInner bg-customMidGray">
                    <span className="loading loading-ring loading-lg text-customDarkGray"></span>
                  </div>
                  <div className="flex items-center justify-center flex-1 aspect-square rounded-xl animate-pulse shadow-customShadowInner bg-customMidGray">
                    <span className="loading loading-ring loading-lg text-customDarkGray"></span>
                  </div>
                  <div className="flex items-center justify-center flex-1 aspect-square rounded-xl animate-pulse shadow-customShadowInner bg-customMidGray">
                    <span className="loading loading-ring loading-lg text-customDarkGray"></span>
                  </div>
                  <div className="flex items-center justify-center flex-1 aspect-square rounded-xl animate-pulse shadow-customShadowInner bg-customMidGray">
                    <span className="loading loading-ring loading-lg text-customDarkGray"></span>
                  </div>
                  <div className="flex items-center justify-center flex-1 aspect-square rounded-xl animate-pulse shadow-customShadowInner bg-customMidGray">
                    <span className="loading loading-ring loading-lg text-customDarkGray"></span>
                  </div>
                  <div className="flex items-center justify-center flex-1 aspect-square rounded-xl animate-pulse shadow-customShadowInner bg-customMidGray">
                    <span className="loading loading-ring loading-lg text-customDarkGray"></span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Answer */}
          <div className="flex items-center justify-center gap-1 py-3 mt-8 text-2xl font-black tracking-widest text-center text-white uppercase rounded-xl bg-customDarkGray h-14 shadow-customShadowInner outline outline-1 outline-black">
            {answer.split("").map((letter, index) => (
              <p key={index}>{letter}</p>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <div className="flex flex-1 gap-4 text-xl">
              <button
                onClick={handleClear}
                className="flex items-center justify-center flex-1 p-3 transition-all rounded-full outline outline-2 outline-black bg-slate-200 shadow-customShadow active:shadow">
                <LuPaintbrush />
              </button>
              <button
                onClick={handleReShamble}
                className="flex items-center justify-center flex-1 p-3 transition-all rounded-full outline outline-2 outline-black bg-slate-200 active:shadow shadow-customShadow">
                <LuShuffle />
              </button>
            </div>
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center flex-1 p-2 font-semibold text-white transition-all rounded-full outline outline-2 outline-black bg-customGreen active:shadow shadow-customShadow"
              style={{
                textShadow: "#0f172a .1px .1px 1px, #e2e8f0 .3px .3px 1px ",
              }}>
              Submit
            </button>
          </div>
        </DivCenter>
      </DivParent>
    </>
  );
}

export default InGame;
