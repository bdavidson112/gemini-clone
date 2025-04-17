import { createContext, useState } from "react";
import sendMessage from "../config/gemini"; // Import the API function

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
        setResultData((prev) => prev + nextWord);
    }, 75*index);
  }

  const onSent = async (prompt) => {
    if (!input.trim()) {
      console.error("Input is empty. Please provide a valid message.");
      return;
    }

    try {
      setResultData(""); // Clear previous result
      setLoading(true); // Start loading
      setShowResult(true); // Show result section
      let response;
      if (prompt !== undefined) {
        response = await sendMessage(input); // Call the API with the input
        setRecentPrompt(prompt); // Update the recent prompt
      }
      else
        {
        setPrevPrompts((prev) => [...prev, input]); // Add input to previous prompts
        setRecentPrompt(input)
        response = await sendMessage(input); // Call the API with the input
        }

      console.log("Gemini API Response:", response); // Log the response to the console

      let responseArray = response.split("**")
      let newResponse="";
      for(let i = 0; i < responseArray.length; i++)
        {
        if (i === 0 || i%2 !== 1) {
            newResponse += responseArray[i]
        }
        else {
            newResponse += "<b>"+responseArray[i]+"</b>"
        }
      }

      let newResponse2 = newResponse.split("*").join("<br/>")
      let newResponseArray = newResponse2.split(" ");
      for(let i = 0; i < newResponseArray.length; i++){
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord+" ");
      }

      //setResultData(newResponseArray); // Set the response data
      
      setInput(""); // Clear the input field
    } catch (error) {
      console.error("Error sending message to Gemini API:", error); // Log any errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const newChat = () => {
    setLoading(false); // Stop loading
    setShowResult(false); // Hide result section
  }

  const contextValue = {
    onSent,
    prevPrompts,
    setPrevPrompts,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;