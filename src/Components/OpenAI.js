import React, {useState} from "react";
import { Configuration, OpenAIApi } from "openai";

const Open = async () => {
    const [response, setResponse] = useState("");
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPEN_AI, 
      });
    const openai = new OpenAIApi(configuration);
    try{

        const resp = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Out on a happy hour with a friend eating sushi, what should I drink? #flocks Sapporo beer, vodka cranberry, wine",
            temperature: 0.5,
            max_tokens: 60,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            stop: ["You:"],
          });
          setResponse(resp);

    }catch(error){
      console.error("Open AI call error", error);
    }

    return (
        <>
        {response && (
            <div>{response}</div>
        )}
        </>
    )
}
export default Open;



