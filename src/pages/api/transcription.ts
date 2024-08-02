import formidable, { File } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import model from "../../utils/geminiApiClient";

type Data = {
  text?: string;
  error?: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const uploadDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const form = formidable({
    uploadDir, // Temporary directory to store uploaded files
    keepExtensions: true,
  });

  try {
    const { fields, files } = await new Promise<{
      fields: formidable.Fields;
      files: formidable.Files;
    }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const file = files.file as File | File[];
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = Array.isArray(file) ? file[0].filepath : file.filepath;
    let mimeType = Array.isArray(file) ? file[0].mimetype : file.mimetype;

    if (!mimeType) {
      mimeType = "audio/wav"; // Fallback MIME type
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(400).json({ error: "API key not found" });
    }

    const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);
    const audioFile = await fileManager.uploadFile(filePath, { mimeType });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: audioFile.file.mimeType,
          fileUri: audioFile.file.uri,
        },
      },
      { text: "Generate a transcript of the audio." },
    ]);

    const response = await result.response;
    const text = await response.text();

    res.status(200).json({ text });
  } catch (error) {
    console.error("Error transcribing audio:", error);
    res
      .status(500)
      .json({ error: "Failed to transcribe audio. Please try again." });
  } finally {
    fs.rmSync(uploadDir, { recursive: true, force: true }); // Clean up the temporary directory
  }
}
