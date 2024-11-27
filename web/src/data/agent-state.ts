import { Preset } from "./presets";
import { config, ModelId,ModalitiesId,TurnDetectionTypeId, VoiceId, TranscriptionModelId } from "../../config";


export interface SessionConfig {
  model: ModelId;
  transcriptionModel: TranscriptionModelId;
  turnDetection: TurnDetectionTypeId;
  modalities: ModalitiesId;
  voice: VoiceId;
  temperature: number;
  maxOutputTokens: number | null;
  vadThreshold: number;
  vadSilenceDurationMs: number;
  vadPrefixPaddingMs: number;
}

export interface AgentState {
  sessionConfig: SessionConfig;
  userPresets: Preset[];
  selectedPresetId: string | null;
  openaiAPIKey: string | null | undefined;
  instructions: string;
  historyMsg: string | null | undefined;
}

export const defaultSessionConfig: SessionConfig = config.defaultConfig;

const defaultInstructions = config.defaultPresets.find((preset) => preset.id === config.selectedPresetId)?.instructions || "";


// Define the initial state
export const defaultAgentState: AgentState = {
  sessionConfig: { ...defaultSessionConfig },
  userPresets: [],
  selectedPresetId: config.selectedPresetId,
  openaiAPIKey: undefined,
  instructions:defaultInstructions,
  historyMsg: undefined,
};