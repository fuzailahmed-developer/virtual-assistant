import React, { useContext, useState } from 'react'
import assistantImg from './assets/ai.png'
import { CiMicrophoneOn } from 'react-icons/ci'
import { AssistantContext } from './context/AssistantContext'
import listeningSvg from "./assets/speak.gif"
import aiVoice from "./assets/aiVoice.gif"


const App = () => {


  const { recognition, speaking } = useContext(AssistantContext)
  const [listening, setListening] = useState(false);

  const handleClick = async () => {
    // speak("hello fuzail how are you");
    recognition.start()
    // askQuestion()
  }

  recognition.onstart = () => {
    setListening(true);   // start → TRUE
  };

  recognition.onend = () => {
    setListening(false);  // end → FALSE
  };


  return (
    <section className='w-full h-screen overflow-hidden px-4'>

      <div className='h-full flex justify-evenly items-center flex-col'>
        <div className=''>
          <img src={assistantImg} alt="assistant" className='w-full max-w-[280px]' />
        </div>
        <div className='flex flex-col items-center gap-y-1'>
          <p className='gradient-text text-2xl sm:text-3xl md:text-4xl font-semibold word-spacing text-center'>I'm Nora, Your Advanced Virtual Assistant</p>


          {
            speaking ? <div>
              <img src={aiVoice} alt="" className='h-[104px] w-[550px]' />
            </div> :
              listening ?
                <div className='flex flex-col items-center'>
                  <div>
                    <img src={listeningSvg} alt="" className='w-20 h-20' />
                  </div>
                  <p>listening</p>
                </div> :
                <div className='h-[104px] flex items-center'>
                  <button className='cyan-btn cyan-btn:hover flex gap-x-1.5 items-center' onClick={handleClick}>Click Here <div><CiMicrophoneOn className='w-5 h-5' /></div> </button>
                </div>
          }
        </div>
      </div>

    </section>
  )
}

export default App