# ToolLM Chatbot

## Overview

ToolLM Chatbot is a web-based conversational AI assistant that leverages advanced language models with tool-calling capabilities. The application integrates real-time web search functionality to provide accurate, up-to-date information, making it an intelligent personal assistant for various queries.

## Main Concept

The core concept revolves around enhancing traditional chatbot interactions by equipping the language model with external tools. Specifically, the chatbot can perform web searches using the Tavily API to fetch real-time, internet-dependent information when needed. This allows the assistant to go beyond static knowledge and provide contextually relevant responses based on current data.

## Features

- **Conversational AI**: Powered by Groq's language model for natural, articulate responses
- **Tool Calling**: Integrated web search capability for real-time information retrieval
- **Session Management**: Persistent conversation sessions with caching
- **Modern Web Interface**: Responsive React-based frontend with markdown rendering and syntax highlighting
- **Real-time Responses**: Asynchronous communication between frontend and backend

## Technologies Used

### Frontend

- **React**: Component-based UI framework
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Markdown**: For rendering markdown content in responses
- **Highlight.js**: Syntax highlighting for code blocks
- **UUID**: For generating unique session identifiers

### Backend

- **Node.js**: JavaScript runtime for the server
- **Express**: Web framework for API endpoints
- **Groq SDK**: Integration with Groq's language model API
- **Tavily API**: Web search tool for real-time information
- **Node Cache**: In-memory caching for session management
- **CORS**: Cross-origin resource sharing for frontend-backend communication

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- API keys for Groq and Tavily

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ToolLMChatbot
   ```

2. **Install frontend dependencies**

   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**

   ```bash
   cd ../server
   npm install
   ```

4. **Environment Configuration**
   Create a `.env` file in the `server` directory with:
   ```
   GROQ_API_KEY=your_groq_api_key
   TAVILY_API_KEY=your_tavily_api_key
   ```

## Usage

1. **Start the backend server**

   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend development server**

   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` (or the port shown by Vite)

4. Start chatting with ToolLM! The assistant will automatically use web search when needed for real-time information.

## API Endpoints

- `POST /generate`: Accepts user messages and returns AI responses with optional tool usage

## Project Structure

```
ToolLMChatbot/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── server/            # Node.js backend
│   ├── server.js      # Main server file
│   ├── toolCalling.js # LLM and tool integration
│   └── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
