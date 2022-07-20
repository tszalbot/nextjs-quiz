import { useEffect, useState } from 'react';
import { animated, useSpring, useTrail } from 'react-spring';

function Prompt(props: {promptIn: boolean, prompt: any}) {
  // const [ promptIn, setPromptIn ] = useState(true);
  const { promptIn, prompt } = props;

  // const prompt = {
  //   text: 'Question?',
  //   options: [
  //     {
  //       index: 0,
  //       text: 'Option 1',
  //       color: 'red',
  //     },
  //     {
  //       index: 1,
  //       text: 'Option 2',
  //       color: 'green',
  //     },
  //     {
  //       index: 2,
  //       text: 'Option 3',
  //       color: 'blue',
  //     },
  //   ]
  // }

  const optionsTrail = useTrail(prompt.options.length, { translateY: promptIn ? '0vh' : '100vh' });
  const [ headingStyles, headingStylesApi ] = useSpring(() => ({ translateX: '-100%'}));

  useEffect(() => {
    if(promptIn) {
      headingStylesApi.start({
        from: { translateX: '-100%' },
        to: { translateX: '0%' },
      })
    } else {
      headingStylesApi.start({
        from: { translateX: '0%' },
        to: { translateX: '100%' },
      })
    }
  }, [promptIn, headingStylesApi])

  return (
    <div className="prompt container h-100 px-0 px-md-3">
      <div className="row">
        <animated.div className="col prompt-heading" style={headingStyles}>
          {prompt.text}
        </animated.div>
      </div>

      <div className="row flex-column h-100">
        {prompt.options.map((option, index) => {
          const trailIndex = promptIn ? index : prompt.options.length - index - 1;

          return (
            <div className='col h-100' key={option.index}>
              <animated.div className={`option option--${option.color}`} style={{ ...optionsTrail[trailIndex] }}>
                <div className="option-text">
                  {option.text}
                </div>
              </animated.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Prompt;