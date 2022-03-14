import { SET_TAB } from "@features/tabSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TabSection() {
  const dispatch = useDispatch();
  const { selectedTab } = useSelector((state) => ({ ...state.tab }));

  return (
    <div className="flex text-[26px] justify-center mt-16">
      <ul className="flex">
        <li className="mr-2">
          <button
            onClick={() => {
              dispatch(SET_TAB(0));
            }}
            className={`customTab ${
              selectedTab == 0
                ? "text-white bg-blue-600"
                : "text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            } `}>
            Deposit
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => {
              dispatch(SET_TAB(1));
            }}
            className={`customTab ${
              selectedTab == 1
                ? "text-white bg-blue-600"
                : "text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            } `}>
            Withdraw
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => {
              dispatch(SET_TAB(2));
            }}
            className={`customTab ${
              selectedTab == 2
                ? "text-white bg-blue-600"
                : "text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            } `}>
            Holdings
          </button>
        </li>
      </ul>
    </div>
  );
}
