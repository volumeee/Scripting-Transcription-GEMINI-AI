# Next.js AI Project

This Next.js project integrates Google Generative AI for scripting and audio transcription functionalities. The project is built with TypeScript and leverages various components from the Chakra UI library.

## Features

### Scripting Page

- Allows content creators to generate scripts using Google Generative AI.
- Users can input a script idea and receive a generated script in return.

### Transcription Page

- Allows users to transcribe audio files to text using Google Generative AI.
- Users can upload audio files and receive transcriptions of the audio content.

### Thumbnail Page
    **coming soon**

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
   
### Configuration

1. Create a .env.local file in the root directory of the project and add your environment variables. For example:
   ```bash
   NEXT_PUBLIC_API_URL=https://your-api-url
   ```
2. Ensure you have the necessary API endpoints set up for /api/scripting and /api/transcription to handle the requests for script generation and audio transcription.

## To start the development server, run:
   ```bash
   npm run dev
   ```

### Acknowledgements
- Chakra UI - For the UI components.
- Google Generative AI - For AI scripting and transcription capabilities.


**Feel free to modify this template according to your project's specific details and requirements.**
