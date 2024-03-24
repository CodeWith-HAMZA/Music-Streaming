"use client";
import UploadSongForm from "@/components/forms/SongUploadForm";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import Songs from "../songs/Songs";
import {
  MdAlbum,
  MdMusicNote,
  MdOutlineAlbum,
  MdOutlineSwitchAccessShortcutAdd,
  MdPhotoAlbum,
} from "react-icons/md";
import { TbAlbumOff, TbFile, TbFiles, TbMusicDown } from "react-icons/tb";
import CreateAlbumForm from "@/components/forms/CreateAlbumForm";
import Albums from "./Albums";

export default function AlbumsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Tabs color="success" variant="underlined" aria-label="Dynamic tabs">
        <Tab key={"albums"} title={"Your Albums"}>
          <Card>
            <CardBody>
              <Albums />
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
                <CreateAlbumForm onCreateAlbum={() => {}} />
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
        Create An Album <TbFiles />
      </Button>
    </div>
  );
}
