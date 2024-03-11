import { FC, PropsWithChildren } from "react";
import { Calendar } from "../components/calendar";

const MainPageComponent: FC<PropsWithChildren> = () => {
  return (
    <main>
      <Calendar />
    </main>
  );
};
MainPageComponent.displayName = "MainPage";

export const MainPage = MainPageComponent;
