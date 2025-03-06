import { ReactNode } from "react";

export type AppointmentData = {
    name: string;
    time: string;
    location: string;
    activity: string;
    avatar: ReactNode;
  };