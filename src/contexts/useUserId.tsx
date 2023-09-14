import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

export interface IUserIdContext {
  userId?: number;
  setUserId: Dispatch<SetStateAction<number | undefined>>;
}

export const initialValue: IUserIdContext = {
  userId: undefined,
  setUserId: () => {},
};

export const UserIdContext = createContext<IUserIdContext>(initialValue);

export const UserIdProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number>();

  const value = useMemo(
    () => ({
      userId,
      setUserId,
    }),
    [userId],
  );

  return (
    <UserIdContext.Provider value={value}>{children}</UserIdContext.Provider>
  );
};

export const useUserId = () => {
  const { userId, setUserId } = useContext(UserIdContext);

  return {
    userId,
    setUserId,
  };
};
