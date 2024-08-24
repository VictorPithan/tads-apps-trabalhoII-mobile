import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "@storage/StorageKeys";

export type UserProps = {
    id: string;
    email: string;
}

export async function saveUserInStorage(user: UserProps) {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function findUserInStorage() {
    const storage = await AsyncStorage.getItem(USER_STORAGE);

    const user: UserProps = storage ? JSON.parse(storage) : {};

    return user;
}

export async function removeUserInStorage() {
    await AsyncStorage.removeItem(USER_STORAGE);
}