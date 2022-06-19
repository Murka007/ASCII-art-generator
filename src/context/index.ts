import { createContext } from "react";

export interface IAppContext {
    readonly loading: boolean;
    readonly setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<IAppContext | null>(null);