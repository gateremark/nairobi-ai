"use client";

import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [responses, setResponses] = useState("");
  const getResponse = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const prompt = formData.get("text");
    console.log("prompt ", prompt);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "You are a healthcare chatbot that gives more details about a disease.",
            },
            {
              role: "user",
              content: `Given disease ${prompt} give more details about it including the symptoms and the age it affects most.`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
        }
      );
      console.log(response.data.choices[0].message.content);
      setResponses(response.data.choices[0].message.content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="  flex justify-center flex-col items-center gap-10">
      <div className=" text-xl underline ">Open AI Chat</div>

      {responses && <div>{responses}</div>}

      <form
        onSubmit={getResponse}
        className="flex justify-center items-center gap-2"
      >
        <input
          type="text"
          name="text"
          id="text"
          placeholder="Write your text here"
          className=" p-2 border left-1/2"
        />
        <button
          type="submit"
          className=" py-1.5 px-2 border text-white bg-blue-700 rounded-md "
        >
          Submit
        </button>
      </form>
    </main>
  );
}
