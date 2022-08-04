import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";
import { Server as ServerIO, Socket } from "socket.io";
import { Server as NetServer } from "http";

import promptMocks from "./prompt_mocks.json";

const connections: Socket[] = [];

let currentPromptIndex = 0;
let currentPrompt = promptMocks[currentPromptIndex];

const SocketHandler = async (
  req: NextApiRequest,
  res: NextApiResponseServerIO
) => {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socket",
    });
    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;

    setInterval(() => newPrompt(io), 10000);

    io.on('connection', (socket: Socket) => {
      connections.push(socket);
      socket.emit('message', 'Thank you for connecting, currently connected: ' + connections.length);
      socket.emit('setPrompt', currentPrompt);

      socket.on('disconnect', reason => {
          for(let i = 0; i < connections.length; i++) {
            if(connections[i].id === socket.id) {
              connections.splice(i, 1)
  
              break;
          }
        }
      })
    })
  }

  res.end();
}

function newPrompt(io: ServerIO) {
  console.log('New prompt')

  currentPrompt = _getNewPrompt()
  currentPrompt = promptMocks[currentPromptIndex % 2];

  // TODO Send actual prompt
  io.emit('setPrompt', currentPrompt)
}

function _getNewPrompt() {
  currentPromptIndex++;

  return promptMocks[currentPromptIndex % 2];
}

export default SocketHandler;