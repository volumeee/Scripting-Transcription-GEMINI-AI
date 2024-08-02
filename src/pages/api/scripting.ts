import type { NextApiRequest, NextApiResponse } from "next";
import model from "../../utils/geminiApiClient";

type Data = {
  text: string | null;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).json({ text: null, error: "Prompt is required" });
      return;
    }

    // Log the request body
    // console.log("Request Body:", req.body);

    try {
      const result = await model.generateContent(prompt);

      // Log the raw response
      // console.log("Raw Response:", result);

      const response = await result.response;

      // Log the parsed response
      // console.log("Parsed Response:", response);

      const text = await response.text();

      // Log the text content of the response
      // console.log("Response Text:", text);

      res.status(200).json({ text });
    } catch (error) {
      // Log the error
      console.error("Error generating content:", error);
      res.status(500).json({ text: null, error: "Error generating content" });
    }
  } else {
    res.status(405).json({ text: null, error: "Method not allowed" });
  }
}
