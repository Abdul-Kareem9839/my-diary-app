import React, { useEffect, useRef, useState } from "react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import StopIcon from "@mui/icons-material/Stop";

export default function VoiceToText({ content, setContent }) {
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const originalContentRef = useRef(content);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          // append final transcript permanently
          originalContentRef.current += " " + result[0].transcript;
        } else {
          // build interim transcript for live update
          interimTranscript += result[0].transcript;
        }
      }

      // Merge finalized content + current interim transcript
      setContent(
        originalContentRef.current +
          (interimTranscript ? " " + interimTranscript : "")
      );
    };

    recognitionRef.current.onend = () => setIsListening(false);
  }, [setContent]);

  const startListening = () => {
    originalContentRef.current = content; // store current content before listening
    recognitionRef.current.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current.stop();
    setIsListening(false);
  };

  return (
    <span className="ml-2 text-white">
      {!isListening ? (
        <button
          type="button"
          onClick={startListening}
          className={`px-3 py-1 rounded-full text-sm focus:outline-none ${
            isListening ? "bg-red-500" : " animate-pulse"
          }`}
        >
          <KeyboardVoiceIcon
            className={`${isListening ? "" : "animate-bounce"}`}
          />
          {isListening ? "Listening..." : "Start"}
        </button>
      ) : (
        <button
          type="button"
          onClick={stopListening}
          className="px-3 py-1 text-white rounded-full text-sm flex items-center justify-center focus:outline-none"
        >
          <StopIcon />
          <span className="ml-2 w-3 h-3 bg-green-800 rounded-full animate-pulse"></span>
        </button>
      )}
    </span>
  );
}
