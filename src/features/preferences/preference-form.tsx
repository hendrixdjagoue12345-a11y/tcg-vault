"use client";

import { useActionState } from "react";
import { savePreferences } from "./actions";
import type { Preferences } from "./schemas";
import { initialPreferenceState } from "./state";
import styles from "./preference-form.module.css";

type PreferenceFormProps = {
  defaults: Preferences;
};

export function PreferenceForm({ defaults }: PreferenceFormProps) {
  const [state, formAction, pending] = useActionState(
    savePreferences,
    initialPreferenceState,
  );

  return (
    <form action={formAction} className={styles.form}>
      <fieldset>
        <legend>Densité d’affichage</legend>
        <label>
          <input
            type="radio"
            name="density"
            value="comfort"
            defaultChecked={defaults.density === "comfort"}
          />
          <span>
            <strong>Confortable</strong>
            <small>Des cartes aérées et davantage d’espace.</small>
          </span>
        </label>
        <label>
          <input
            type="radio"
            name="density"
            value="compact"
            defaultChecked={defaults.density === "compact"}
          />
          <span>
            <strong>Compacte</strong>
            <small>Plus de cartes visibles sur un grand écran.</small>
          </span>
        </label>
      </fieldset>

      <fieldset>
        <legend>Intensité des animations</legend>
        <label>
          <input
            type="radio"
            name="motion"
            value="full"
            defaultChecked={defaults.motion === "full"}
          />
          <span>
            <strong>Complète</strong>
            <small>Rotation, profondeur et reflet holographique.</small>
          </span>
        </label>
        <label>
          <input
            type="radio"
            name="motion"
            value="reduced"
            defaultChecked={defaults.motion === "reduced"}
          />
          <span>
            <strong>Réduite</strong>
            <small>Préférence mémorisée pour une évolution du projet.</small>
          </span>
        </label>
      </fieldset>

      <button
        className="button button--primary"
        type="submit"
        disabled={pending}
      >
        {pending ? "Enregistrement…" : "Enregistrer"}
      </button>

      {state.status !== "idle" ? (
        <p
          className={state.status === "error" ? styles.error : styles.success}
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
