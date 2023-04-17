import React from "react";
import Link from 'next/link';
import Dropdown from "./dropdown";

import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";

function SideNavbar() {
  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="p-6 w-1/2 h-screen bg-slate-300 z-20 fixed top-0 -left-96 lg:left-0 lg:w-60 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <Link a href='/' className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
              Dashboard
            </Link>
            <div className="my-4">
              <Dropdown />
            </div>
            <div className=" my-4 border-b border-gray-100 pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <Link href='/group' className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Group Summary
                </Link>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <Link href='/user' className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  User Summary
                </Link>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <Link href='filter' className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Filter by date
                </Link>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <Link href='breakeven' className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Break even
                </Link>
              </div>
              <div className="my-10">
                <div className=" flex  mb-2 justify-start items-center gap-4 pl-5 p-2 hover:bg-gray-900  rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <h3 className="text-base text-gray-800  group-hover:text-white font-semibold">
                    Logout
                  </h3>
                </div>

              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default SideNavbar;
