import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "@services/Api";
import { saveUserInStorage, findUserInStorage, removeUserInStorage } from "@storage/StorageUser";
import { saveTokenInStorage, findTokenInStorage, removeTokenInStorage } from "@storage/StorageAuthToken";
import { AppError } from "@shared/AppError";

export type UserProps = {
  id: string;
  email: string;
}

export type AuthContextProps = {
  user: UserProps;
  signIn: (email: string, password: string) => Promise<void>;
  isLoadingUserStorage: boolean;
  signOut: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  
  const [ user, setUser ] = useState<UserProps>({} as UserProps);
  const [ isLoadingUserStorage, setIsLoadingUserStorage ] = useState(true);

  async function signIn(email: string, password: string) {
    try {
      setIsLoadingUserStorage(true);
      const { data } = await api.post("/auth", { email, password });
      if (data.user && data.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        await saveUserInStorage(data.user);
        await saveTokenInStorage(data.token);
        setUser(data.user);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
    } finally {
        setIsLoadingUserStorage(false);
    }
  }

  async function signOut() {
    try {
        setIsLoadingUserStorage(true);
        setUser({} as UserProps);
        await removeUserInStorage();
        await removeTokenInStorage();
    } catch (error) {
        throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function loadUser() {
    try {
        setIsLoadingUserStorage(true)
        const userLogged = await findUserInStorage();
        const token = await findTokenInStorage();
        if (token && userLogged) {
            api.defaults.headers.common['authorization'] = `Bearer ${token}`;
            setUser(userLogged);
        }
    } catch (error) {
        throw error;
    } finally {
        setIsLoadingUserStorage(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, isLoadingUserStorage, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
