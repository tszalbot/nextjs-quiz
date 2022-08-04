import { useEffect, useState } from 'react';
import { animated, useSpring, useTrail } from 'react-spring';


function Prompt(props: {prompt: any}) {
  const { prompt } = props;
  const [ promptOptions, setPromptOptions ] = useState([]);
  const [ promptQuestion, setPromptQuestion ] = useState('');
  const [ promptLoaded, setPromptLoaded ] = useState(false);
  const [ promptState, setPromptState ] = useState({ in: true });
  const [ animationCallback, setAnimationCallback ] = useState(() => () => {});
  const promptIn = true;

  useEffect(() => {
    if(prompt) {
      // console.log('reinit')
      // setPromptState({ in: false });
      // setAnimationCallback(() => () => {
      //   console.log('callback')
        setPromptState({ in: true });
        setPromptQuestion(prompt.text);
        setPromptOptions(prompt.options);
      //   setAnimationCallback(() => {});
      // })
    }
  }, [prompt, promptLoaded])

  const optionsTrail = useTrail(promptOptions.length, { translateY: promptState.in ? '0vh' : '100vh' });
  const [ headingStyles, headingStylesApi ] = useSpring(() => ({ translateX: '-100%', onRest: animationCallback}));

  useEffect(() => {
    if(promptState.in) {
      headingStylesApi.start({
        from: { translateX: '-100%' },
        to: { translateX: '0%' }
      })
    } else {
      headingStylesApi.start({
        from: { translateX: '0%' },
        to: { translateX: '100%' }
      })
    }
  }, [promptState, headingStylesApi])

  if(!prompt) return <>Loading</>

  return (
    <div className="prompt container h-100 px-0 px-md-3">
      <div className="row">
        <animated.div className="col prompt-heading" style={headingStyles}>
          {promptQuestion}
        </animated.div>
      </div>

      <div className="row flex-column h-100">
        {promptOptions.map((option: any, index) => {
          const trailIndex = promptOptions.length - index - 1;

          return (
            <div className='col h-100' key={option.id}>
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