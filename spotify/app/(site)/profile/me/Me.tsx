"use client";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/app/context/AuthContext";
import { DATABASE_ID, USERS_ID, databases } from "@/appwrite";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import React, { use, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { Query } from "appwrite";
import EditProfileForm from "../edit/page";

export default function Me() {
  const { user, loading } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState<any[]>([]);

  const r = useRouter();

  React.useEffect(() => {
    if (user) {
      databases
        .listDocuments(DATABASE_ID, USERS_ID, [
          Query.equal("email", [user?.email ?? ""]),
        ])
        .then((res) => {
          setUsers(res.documents);
          console.log(res.documents);
        });
    }
  }, [user]);

  const handleOpen = () => {
    if (users.length) {
      r.push("/profile/edit");
      return;
    }
    onOpen();
  };
  // const onboarded = users.documents.find((_) => _.email === user?.email);

  //   console.log(user);
  return (
    <div>
      <div className="px-5 py-10">
        <div className="mb-6 flex items-center space-x-4">
          <div className="rounded-full bg-gray-700 w-40 h-40 p-10"></div>
          {loading ? (
            <div className="animate-pulse rounded-md h-8 bg-gray-600 w-1/3"></div>
          ) : (
            <h1 className="text-5xl font-bold">{user?.email}</h1>
          )}
          {/* <Button variant="faded" color="success">
            Complete Your Profile
          </Button> */}

          <>
            <div className="flex flex-wrap gap-3">
              <Button
                onPress={handleOpen}
                className="flex gap-2"
                variant="ghost"
                color="success"
              >
                <TbEdit size={20} className="hover:opacity-50 transition-all" />
                Edit
              </Button>
            </div>
            <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      You Must Complete Your Profile
                    </ModalHeader>
                    <ModalBody>
                      <Button
                        variant="bordered"
                        style={{ background: "green", color: "white" }}
                      >
                        Please Complete Your Profile <FaUserCircle size={20} />
                      </Button>
                    </ModalBody>
 
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        </div>
      </div>
    </div>
  );
}
