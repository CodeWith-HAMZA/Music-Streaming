"use client";
import UploadSongForm from "@/components/forms/SongUploadForm";
import SongUploadForm from "@/components/forms/SongUploadForm";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import Songs from "./Songs";
import { MdMusicNote } from "react-icons/md";
import { revalidatePath } from "next/cache";

export default function SongsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let tabs = [
    {
      id: "photos",
      label: "Photos",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "music",
      label: "Music",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      id: "videos",
      label: "Videos",
      content:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];
  // return <SongUploadForm />;
  const songs = [
    {
      title: "Song 1",
      artist: "Artist 1",
      album: "Album 1",
      duration: "3:45",
    },
    {
      title: "Song 2",
      artist: "Artist 2",
      album: "Album 2",
      duration: "4:10",
    },
    { title: "Song 1", artist: "Artist 1", album: "Album 1", duration: "3:45" },
    { title: "Song 2", artist: "Artist 2", album: "Album 2", duration: "4:10" },
  ];
  return (
    <div className="">
      <Tabs
        disabledKeys={["published"]}
        color="success"
        variant="underlined"
        aria-label="Dynamic tabs"
      >
        <Tab title={"Draft Songs"}>
          <Card>
            <CardBody>
              <Songs songs={songs} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key={"published"} title={"Published Songs"}>
          <Card>
            <CardBody>
              <Songs />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
      <Modal
        className="h-[90vh] overflow-y-scroll mt-4"
        size="3xl"
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                  <MdMusicNote size={20} />
                  <span>Upload Songs And Do Much More</span>
                </div>
              </ModalHeader> */}
              <ModalBody className="">
                <UploadSongForm />
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
      <Button
        variant="shadow"
        className="mx-1 text-white"
        onClick={onOpen}
        color="success"
        size="lg"
      >
        Publish New Song <MdMusicNote />
      </Button>
    </div>
  );

  // <Songs songs={songs} />;
}
