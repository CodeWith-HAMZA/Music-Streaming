import { DATABASE_ID, USERS_ID, databases } from ".";
import { ID, Query } from "appwrite";
import { User } from "@/utils/types";

class Users {
  constructor() {}

  async getAllUsers(user: User) {
    const queries: string[] = Object.keys(user).map((key: string) =>
      Query.equal(key, user[key])
    );

    const users = await databases.listDocuments(DATABASE_ID, USERS_ID, queries);

    return users;
  }
  async createUser(userData: User) {
    const users = await databases.createDocument(
      DATABASE_ID,
      USERS_ID,
      ID.unique(),
      userData
    );
    return users;
  }
  async getSingleUserById(userId: string) {
    const users = await databases.getDocument(DATABASE_ID, USERS_ID, userId);
    return users;
  }

  async editUserById(userId: string, userData: User) {
    const users = await databases.updateDocument(
      DATABASE_ID,
      USERS_ID,
      userId,
      userData
    );
    return users;
  }
}

export const users = new Users();
