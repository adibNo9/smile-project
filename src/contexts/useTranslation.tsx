import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface ITranslationContext {
  locale: string;
  setLocale: Dispatch<SetStateAction<string>>;
}

export const initialValue: ITranslationContext = {
  locale: "en",
  setLocale: () => {},
};

export const TranslationContext =
  createContext<ITranslationContext>(initialValue);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const dir = locale === "en" ? "ltr" : "rtl";
    document.documentElement.dir = dir;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
    }),
    [locale]
  );

  return (
    <TranslationContext.Provider value={value}>
      <div className={locale === "en" ? "english-class" : "persian-class"}>
        {children}
      </div>
    </TranslationContext.Provider>
  );
};

export const useTransition = () => {
  const { locale, setLocale } = useContext(TranslationContext);

  return {
    locale,
    setLocale,
  };
};
