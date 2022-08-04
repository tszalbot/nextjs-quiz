const prompt_mock = {
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

function getPrompt() {
  return prompt_mock;
}

export default getPrompt;