import { SessionConfig, defaultSessionConfig } from "./agent-state";
import { config, PresetGroup } from "../../config";

export interface Preset {
  id: string;
  name: string;
  description?: string;
  instructions: string;
  sessionConfig: SessionConfig;
  defaultGroup?: PresetGroup;
  icon?: React.ElementType;
}



export const defaultPresets: Preset[] = config.defaultPresets.map((preset: any) => {
  return {
    ...preset,
    sessionConfig: {
      ...preset.sessionConfig,
      ...defaultSessionConfig,
    },
  };
});

