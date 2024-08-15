import React, { useEffect, useRef, useState } from "react";
import DivParent from "../components/DivParent";
import DivCenter from "../components/DivCenter";
import Header from "../components/Header";
import useGetEntries from "../hooks/useGetEntries";
import classNames from "classnames";
import { FaStar, FaArrowLeft, FaArrowRight, FaMedal } from "react-icons/fa";
import { CgBoy, CgGirl } from "react-icons/cg";

function Leaderboard() {
  const { addEntriesFunction, isLoading } = useGetEntries();
  const [leaderboard, setLeaderboard] = useState([]);
  const [mode, setMode] = useState("easy");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = leaderboard.slice(indexOfFirstEntry, indexOfLastEntry);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(leaderboard.length / entriesPerPage))
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    setCurrentPage(1);
    const getLeaderboard = async () => {
      try {
        const response = await addEntriesFunction(mode);
        // console.log(response);

        setLeaderboard(response);
      } catch (error) {
        console.log(error);
      }
    };

    getLeaderboard();
  }, [mode]);

  // for auto closing the menu
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DivParent>
      <DivCenter width={"w-[30rem]"}>
        <Header title={"Leaderboard"}>
          <div ref={menuRef} className="relative ml-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={classNames(
                "px-4 py-2 capitalize transition-all text-white font-semibold rounded-full outline outline-2 outline-black active:scale-95",
                {
                  "bg-customGreen": mode === "easy",
                  "bg-customBlue": mode === "medium",
                  "bg-customRed": mode === "hard",
                }
              )}>
              {mode}
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 rounded-lg outline-2 outline outline-black bg-customLightGray">
                <p
                  onClick={() => {
                    setMode("easy");
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-1 cursor-pointer text-nowrap hover:bg-customMidGray">
                  Easy Mode
                </p>
                <p
                  onClick={() => {
                    setMode("medium");
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-1 cursor-pointer text-nowrap hover:bg-customMidGray">
                  Medium Mode
                </p>
                <p
                  onClick={() => {
                    setMode("hard");
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-1 cursor-pointer text-nowrap hover:bg-customMidGray">
                  Hard Mode
                </p>
              </div>
            )}
          </div>
        </Header>
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 p-8 ">
            <span className="loading loading-spinner loading-sm"></span>
            <p>Loading</p>
          </div>
        ) : (
          <>
            <div className="p-4 mt-4 overflow-hidden rounded-lg outline outline-2 outline-black bg-customDarkGray">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/50">
                    <th></th>
                    <th></th>
                    <th className="w-full pb-2 text-base font-semibold text-white text-start">
                      Username
                    </th>
                    <th className="flex items-center justify-center gap-1 pb-2 text-base font-semibold text-center text-white">
                      <FaStar className="text-customYellow" />
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.map((user, index) => (
                    <tr
                      key={index + 1}
                      className="font-light hover:bg-white/5 hover:text-white ">
                      <td className="text-xs text-white/40">
                        <p className="flex items-center justify-center w-8 ">
                          {indexOfFirstEntry + index + 1 <= 3 ? (
                            <FaMedal
                              className={classNames("text-lg", {
                                "text-amber-500":
                                  indexOfFirstEntry + index + 1 === 1,
                                "text-slate-400":
                                  indexOfFirstEntry + index + 1 === 2,
                                "text-orange-700":
                                  indexOfFirstEntry + index + 1 === 3,
                              })}
                            />
                          ) : (
                            indexOfFirstEntry + index + 1
                          )}
                        </p>
                      </td>
                      <td>
                        <div className="flex justify-center pr-2">
                          {user.gender ? (
                            <div className="p-1 rounded-full bg-customBlue">
                              <CgBoy className="text-base text-white " />
                            </div>
                          ) : (
                            <div className="p-1 bg-pink-400 rounded-full">
                              <CgGirl className="text-base text-white " />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="text-white text-start">{user.user}</td>
                      <td className="text-center text-white">{user.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={handlePrevPage}
                className="p-3 transition-all rounded-full active:scale-95 shadow-customShadow active:shadow outline outline-2 outline-base-100">
                <FaArrowLeft />
              </button>

              <p className="w-12 text-base font-semibold text-center ">
                {currentPage}
              </p>

              <button
                onClick={handleNextPage}
                className="p-3 transition-all rounded-full shadow-customShadow active:shadow active:scale-95 outline outline-2 outline-base-100">
                <FaArrowRight />
              </button>
            </div>
          </>
        )}
      </DivCenter>
    </DivParent>
  );
}

export default Leaderboard;
