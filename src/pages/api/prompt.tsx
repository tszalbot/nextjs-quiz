import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";

function getPrompt(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (req.method === "POST") {
    // get message
    const message = req.body;

    console.log(message)

    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("message", message);

    // return message
    res.status(201).json(message);
  }
};

export default getPrompt;