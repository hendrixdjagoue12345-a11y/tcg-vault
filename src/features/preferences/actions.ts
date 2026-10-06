"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { preferencesSchema } from "./schemas";

export type PreferenceActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialPreferenceState: PreferenceActionState = {
  status: "idle",
  message: "",
};

export async function savePreferences(
  _previousState: PreferenceActionState,
  formData: FormData,
): Promise<PreferenceActionState> {
  const result = preferencesSchema.safeParse({
    density: formData.get("density"),
    motion: formData.get("motion"),
  });

  if (!result.success) {
    return {
      status: "error",
      message: "Les préférences envoyées ne sont pas valides.",
    };
  }

  const cookieStore = await cookies();
  const options = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  };

  cookieStore.set("tcg-vault-density", result.data.density, options);
  cookieStore.set("tcg-vault-motion", result.data.motion, options);
  revalidatePath("/preferences");

  return {
    status: "success",
    message: "Vos préférences ont été enregistrées côté serveur.",
  };
}
