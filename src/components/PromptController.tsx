import { useState, useEffect } from "react";
import Prompt from "./Prompt";
import { io, Socket } from "socket.io-client";

interface SocketState {
  connected: boolean;
  Socket?: Socket;
}

function PromptController() {
  const [ socketState, setSocketState ] = useState<SocketState>({connected: false});
  const [ prompt, setPrompt ] = useState();

  useEffect(() => {
    const socket = io('localhost:3000', {
      path: "/api/socket",
    });

    socket.on('connect', () => {
      setSocketState({
        connected: true,
        Socket: socket as Socket
      })
    });

    socket.on('message', (message: any) => console.log(message));
    socket.on('setPrompt', (promptData: any) => {
      console.log(promptData);
      setPrompt(promptData)
    });
  }, [])

  const PromptComponent = <Prompt prompt={prompt}/>;

  return (
    <div className="h-100" onClick={() => {
      // setPromptState()
      sendAnswer(new Date());
    }}>
      {PromptComponent}
    </div>
  )
}

function sendAnswer(message: any) {
  fetch('/api/prompt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export default PromptController;