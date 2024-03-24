"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  RadioGroup,
  Radio,
  User,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillHome, AiFillRightSquare, AiOutlineSearch } from "react-icons/ai";
import { logoutUser } from "@/appwrite";
import { FaUserCircle } from "react-icons/fa";
import { MdMusicNote } from "react-icons/md";
import { TbArrowRightBar, TbMusic, TbMusicCode } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { users } from "@/appwrite/user.service";

export default function AuthProfile() {
  const [selectedColor, setSelectedColor] = React.useState("default");
  const r = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { error, loading, user, onboardedUser } = useAuth();
  const [Busy, setBusy] = useState(false);
  const variants = ["solid", "bordered", "light", "flat", "faded", "shadow"];

  if (loading || user) {
    const dropDownContent = (
      <Dropdown>
        <DropdownTrigger>
          {!loading ? (
            <User
              className="cursor-pointer"
              avatarProps={{
                src: "https://avatars.githubusercontent.com/u/30373425?v=4",
              }}
              name={user?.name}
            />
          ) : (
            <div className="bg-gray-200/60 animate-pulse w-11 h-11 rounded-full" />
          )}
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dropdown Variants"
          color={"success"}
          variant={"faded"}
        >
          <DropdownItem key="new">
            <Link href={"/profile/me"}>Your Profile</Link>
          </DropdownItem>

          {true && (
            <DropdownItem
              onClick={() => {
                console.log("open dialog");
                onOpen();
              }}
              key="copy"
            >
              Be An Artist
            </DropdownItem>
          )}
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem
            onClick={async () => await logoutUser()}
            key="delete"
            className="text-danger"
            color="danger"
          >
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );

    return (
      <div className="flex flex-wrap gap-4">
        {dropDownContent}
        <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <MdMusicNote size={20} />
                    <span>Upload Songs And Do Much More</span>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <Button
                    disabled={Busy}
                    onClick={async () => {
                      setBusy(true);
                      const res = await users.editUserById(onboardedUser?.$id, {
                        isArtist: true,
                      });
                      setBusy(false);
                      console.log(onboardedUser);
                    }}
                    variant="faded"
                    style={{ background: "green", color: "white" }}
                  >
                    <span>Be An Artist</span>
                    {Busy ? (
                      <Spinner color="white" size="sm" />
                    ) : (
                      <TbMusicCode className="rounded-full" size={18} />
                    )}
                  </Button>
                </ModalBody>

                <ModalFooter>
                  {/* <Button
                        color="default"
                        variant="bordered"
                        onPress={onClose}
                      >
                        Close
                      </Button> */}
                  {/* <Button color="primary" onPress={onClose}>
                        Action
                      </Button> */}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }

  return (
    <>
      {/* Sign-up/in  */}
      <div className="flex items-center gap-5">
        <button className="text-sm text-neutral-300 hover:text-neutral-100 transition-all">
          <Link href={"/signup"}>Sign Up</Link>
        </button>
        <button className="px-4 py-2 font-bold hover:opacity-75 transition-all text-sm bg-white rounded-full text-black">
          <Link href={"/login"}>Login</Link>
        </button>
      </div>
    </>
  );
}
