import { useState } from "react";
import Prompt from "./Prompt";

const prompt = {
  text: 'Question?',
  options: [
    {
      index: 0,
      text: 'Option 1',
      color: 'red',
    },
    {
      index: 1,
      text: 'Option 2',
      color: 'green',
    },
    {
      index: 2,
      text: 'Option 3',
      color: 'blue',
    },
  ]
}

function PromptController() {
  const [ promptIn, setPromptIn ] = useState(true);

  return (
    <div className="h-100" onClick={() => setPromptIn(!promptIn)}>
      <Prompt promptIn={promptIn} prompt={prompt}/>
    </div>
  )
}

export default PromptController;