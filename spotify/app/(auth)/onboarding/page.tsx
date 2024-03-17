import { DATABASE_ID, USERS_ID, databases, getUser } from "@/appwrite";
import OnboardingForm from "@/components/forms/OnboardingForm";
import React from "react";

const OnboardingPage = async () => {
  const users = await databases.listDocuments(DATABASE_ID, USERS_ID);
  users;

  return (
    <OnboardingForm emails={users.documents.map((_) => _.email) as string[]} />
  );
};

export default OnboardingPage;
