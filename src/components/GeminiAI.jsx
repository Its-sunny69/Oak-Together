import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { geminiApi } from "../features/geminiSlice";

function GeminiAI() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.gemini.loading);

  const handleSubmit = () => {
    const inputData =
      input +
      " ,Keep your response clear and only filled with actual names without unnecessary words, phrases and disclaimers and also without any formating, keep the response small of 2-3 lines";

    dispatch(geminiApi(inputData)).unwrap().then((response) => {
      console.log(response);
      setResponse(response.payload.candidates[0].content.parts[0].text);
    }).catch((error) => {
      console.log("Gemini Api error", error)
    })
  };

  return (
    <div>
      <div>
      <p>Ask AI</p>
      <p></p>
      </div>

      <input
        type="text"
        className="border border-black"
        name="gemini"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        className="p-3 border, border-black bg-slate-400"
        onClick={handleSubmit}
      >
        send
      </button>

      <div>
        Response:
        <p>{isLoading ? "Loading response...." : response}</p>
      </div>
    </div>
  );
}

export default GeminiAI;
