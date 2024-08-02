import { Box, Textarea, Button, Center, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import Layout from "./Layout";
import MarkdownComponent from "./MarkdownComponent";
import PageCard from "./PageCard";

export default function ScriptingPage() {
  const [scriptInput, setScriptInput] = useState("");
  const [scriptResult, setScriptResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setScriptInput(e.target.value);
  };

  const handleGenerateScript = async () => {
    setIsLoading(true);
    const result = await fetchGeneratedScript(scriptInput);
    setScriptResult(result);
    setIsLoading(false);
  };

  const fetchGeneratedScript = async (input: string) => {
    try {
      const response = await fetch("/api/scripting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        throw new Error("Error generating script");
      }

      const data = await response.json();
      console.log("Data:", data);
      return data.text;
    } catch (error) {
      console.error("Error:", error);
      return "Failed to generate script. Please try again.";
    }
  };

  return (
    <Layout>
      <PageCard
        pageName="Scripting Page"
        pageDesc="This page allows content creators to generate scripts using Google Generative AI integration."
      />

      <Box mb={4}>
        <Textarea
          placeholder="Enter your script idea here..."
          value={scriptInput}
          onChange={handleInputChange}
          mb={2}
        />
      </Box>

      <Center mb={4}>
        <Button
          width="full"
          colorScheme="teal"
          variant="outline"
          onClick={handleGenerateScript}
          isDisabled={isLoading}
        >
          {isLoading ? <Spinner size="sm" /> : "Generate Script"}
        </Button>
      </Center>

      <Box borderWidth="1px" borderRadius="lg" p={4}>
        <MarkdownComponent content={scriptResult} />
      </Box>
    </Layout>
  );
}
