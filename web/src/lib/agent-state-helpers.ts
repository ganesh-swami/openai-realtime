import {
  AgentState,
  SessionConfig,
  defaultSessionConfig,
} from "@/data/agent-state";
import { Preset, defaultPresets } from "@/data/presets";

export const agentStateHelpers = {
  getSelectedPreset: (state: AgentState) => {
    return [...defaultPresets, ...state.userPresets].find(
      (preset) => preset.id === state.selectedPresetId,
    );
  },
  getDefaultPresets: () => defaultPresets,
  getAllPresets: (state: AgentState) => [
    ...defaultPresets,
    ...state.userPresets,
  ],

  encodeToUrlParams: (state: AgentState): string => {
    const params = new URLSearchParams();

    let isDefaultPreset = false;
    const selectedPreset = agentStateHelpers.getSelectedPreset(state);
    if (selectedPreset) {
      params.set("preset", selectedPreset.id);
      isDefaultPreset = !!selectedPreset.defaultGroup;
    }

    if (!isDefaultPreset) {
      if (state.instructions) {
        params.set("instructions", state.instructions);
      }

      if (selectedPreset) {
        params.set("presetName", selectedPreset.name);
        if (selectedPreset.description) {
          params.set("presetDescription", selectedPreset.description);
        }
      }

      if (state.sessionConfig) {
        Object.entries(state.sessionConfig).forEach(([key, value]) => {
          if (value !== defaultSessionConfig[key as keyof SessionConfig]) {
            params.set(`sessionConfig.${key}`, String(value));
          }
        });
      }
    }
    return params.toString();
  },

  decodeFromURLParams: (
    urlParams: string,
  ): { state: Partial<AgentState>; preset?: Partial<Preset> } => {
    const params = new URLSearchParams(urlParams);
    const returnValue: {
      state: Partial<AgentState>;
      preset?: Partial<Preset>;
    } = { state: {} };

    const instructions = params.get("instructions");
    if (instructions) {
      returnValue.state.instructions = instructions;
    }

    const sessionConfig: Partial<AgentState["sessionConfig"]> = {};
    params.forEach((value, key) => {
      if (key.startsWith("sessionConfig.")) {
        const configKey = key.split(
          ".",
        )[1] as keyof AgentState["sessionConfig"];
        sessionConfig[configKey] = value as any;
      }
    });

    if (Object.keys(sessionConfig).length > 0) {
      returnValue.state.sessionConfig = sessionConfig as SessionConfig;
    }

    const presetId = params.get("preset");
    if (presetId) {
      returnValue.preset = {
        id: presetId,
        name: params.get("presetName") || undefined,
        description: params.get("presetDescription") || undefined,
      };
      returnValue.state.selectedPresetId = presetId;
    }

    return returnValue;
  },

  updateBrowserUrl: (state: AgentState) => {
    if (typeof window !== "undefined") {
      const params = agentStateHelpers.encodeToUrlParams(state);
      const newUrl = `${window.location.origin}${window.location.pathname}${params ? `?${params}` : ""}`;
      window.history.replaceState({}, "", newUrl);
    }
  },
};
