"use client";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  StartAudio,
} from "@livekit/components-react";
import { Chat } from "@/components/chat";
import { useConnection } from "@/hooks/use-connection";
import { AgentProvider } from "@/hooks/use-agent";
import { useAgentState } from "@/hooks/use-agent-state";
import { useEffect } from "react";
export function RoomComponent({presetId,messages}: {presetId?: string, messages?: string}) {
  const { shouldConnect, wsUrl, token } = useConnection();

  console.log("presetId :", presetId);
  const { dispatch } = useAgentState();

  useEffect(() => {
    if(presetId){
      dispatch({
        type: "SET_SELECTED_PRESET_ID",
        payload: presetId
      });
    }
    
  },[presetId,dispatch])


  useEffect(() => {
    if(messages){
      dispatch({
        type: "SET_HISTORY_MESSAGE",
        payload: messages
      });
    }
  },[messages,dispatch])
  

  return (
    <LiveKitRoom
      serverUrl={wsUrl}
      token={token}
      connect={shouldConnect}
      audio={true}
      className="flex flex-col md:grid flex-grow overflow-hidden"
      style={{ "--lk-bg": "white" } as React.CSSProperties}
      options={{
        publishDefaults: {
          stopMicTrackOnMute: true,
        },
      }}
    >
      <AgentProvider>
        <div className="flex flex-col justify-center w-full mx-auto">
          <Chat />
        </div>
        <RoomAudioRenderer />
        <StartAudio label="Click to allow audio playback" />
      </AgentProvider>
    </LiveKitRoom>
  );
}
