import { AccessToken } from "livekit-server-sdk";
export const serverHome = function (req, res, next) {
  res.status(200).json({ result: "ok" });
};

export const webrtcToken = async function (req, res, next) {
  const {
    instructions,
    sessionConfig: {
      turnDetection,
      modalities,
      voice,
      temperature,
      maxOutputTokens,
      vadThreshold,
      vadSilenceDurationMs,
      vadPrefixPaddingMs,
    },
    historyMsg,
  } = req.body;

  console.log(req.body);

  const roomName = Math.random().toString(36).slice(7);

  
  const apiKey = process.env.WEBRTC_API_KEY;
  const apiSecret = process.env.WEBRTC_API_SECRET;
  if (!apiKey || !apiSecret) {
    throw new Error("apiKey and apiSecret must be set");
  }

  const at = new AccessToken(apiKey, apiSecret, {
    identity: "human",
    metadata: JSON.stringify({
      instructions: instructions,
      modalities: modalities,
      voice: voice,
      temperature: temperature,
      max_output_tokens: maxOutputTokens,
      // openai_api_key: process.env.OPEN_AI_API_KEY, //openaiAPIKey,
      historyMsg: historyMsg,
      turn_detection: JSON.stringify({
        type: turnDetection,
        threshold: vadThreshold,
        silence_duration_ms: vadSilenceDurationMs,
        prefix_padding_ms: vadPrefixPaddingMs,
      }),
    }),
  });
  at.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canPublishData: true,
    canSubscribe: true,
    canUpdateOwnMetadata: true,
  });

  res.status(200).json({
    accessToken: await at.toJwt(),
    url: process.env.WEBRTC_URL,
  });
};
