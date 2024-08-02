import { Box, Button, Center, Input, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import Layout from "./Layout";
import PageCard from "./PageCard";

export default function TranscriptionPage() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcriptionResult, setTranscriptionResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setAudioFile(file);
    }
  };

  const handleTranscribe = async () => {
    if (!audioFile) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      const response = await fetch("/api/transcription", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error transcribing audio");
      }

      const data = await response.json();
      setTranscriptionResult(data.text);
    } catch (error) {
      console.error("Error:", error);
      setTranscriptionResult("Failed to transcribe audio. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <PageCard
        pageName="Transcription Page"
        pageDesc="This page allows content creators to transcribe audio files to text."
      />
      <Box mb={4}>
        <Input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          mb={2}
        />
      </Box>
      <Center mb={4}>
        <Button
          width="full"
          colorScheme="teal"
          variant="outline"
          onClick={handleTranscribe}
          isDisabled={isLoading}
        >
          {isLoading ? <Spinner size="sm" /> : "Transcribe Audio"}
        </Button>
      </Center>
      {transcriptionResult && (
        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <Text>{transcriptionResult}</Text>
        </Box>
      )}
    </Layout>
  );
}
