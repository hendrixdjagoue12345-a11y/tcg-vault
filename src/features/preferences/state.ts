export type PreferenceActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialPreferenceState: PreferenceActionState = {
  status: "idle",
  message: "",
};
