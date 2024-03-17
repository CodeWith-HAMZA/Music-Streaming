import Link from "next/link";
import React from "react";
import { TbEdit } from "react-icons/tb";

export default function page() {
  return (
    <div>
      <div className="px-5 py-10">
        <div className="mb-6 flex items-center space-x-4">
          <div className="rounded-full bg-gray-700 w-40 h-40 p-10"></div>
          <h1 className="text-5xl font-bold">Online_Source_Code</h1>
          <Link href={"/user/profile/edit/euhte"}>
            <TbEdit size={24} className="hover:opacity-50 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
