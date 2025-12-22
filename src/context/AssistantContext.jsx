import { createContext, useEffect, useState } from "react";

export const AssistantContext = createContext()


export const AssistantContextProvider = ({ children }) => {

    const apiUrl = import.meta.env.VITE_GEMINI_URL
    const [userPrompt, setUserPrompt] = useState("")
    const [speaking, setSpeaking] = useState(false);

    // speak text

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;       // speed
        utterance.pitch = 1;      // voice pitch
        utterance.volume = 1;     // volume
        utterance.lang = 'en-US'
        window.speechSynthesis.cancel(); // old speech stop
        window.speechSynthesis.speak(utterance);

        utterance.onstart = () => setSpeaking(true); 

        utterance.onend = () => setSpeaking(false); 


    };

    // listen ai text

    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!speechRecognition) {
        alert("Browser does not support Speech Recognition");
        return;
    }
    const recognition = new speechRecognition();
    recognition.onresult = (e) => {
        setUserPrompt(e.results[0][0].transcript)
    }


    const payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": userPrompt
                    }
                ]
            }
        ]
    }

    const askQuestion = async () => {

        if (userPrompt) {
            const res = await fetch(apiUrl, {
                method: "POST",
                body: JSON.stringify(payload)
            })

            const data = await res.json()
            speak(data.candidates[0].content.parts[0].text)
        }


    }

    useEffect(() => {
        if (userPrompt) {
            askQuestion()
        }
    }, [userPrompt])

    return (
        <AssistantContext.Provider value={{ speak, recognition, askQuestion , speaking }} >
            {children}
        </AssistantContext.Provider>
    )
}