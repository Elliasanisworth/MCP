# MCP Project

This project is a simple Model Context Protocol (MCP) demo with a Node.js server and client. It demonstrates how to use MCP tools, integrate with Google Gemini AI, and interact with web resources like LinkedIn and other websites.

## Project Structure

```
readme.md
client/
  .env
  .gitignore
  index.js
  package.json
server/
  .gitignore
  index.js
  mcp.tool.js
  package.json
```

## Features

- **Server**:  
  - Provides MCP tools such as:
    - Add two numbers
    - Open LinkedIn and prepare a post
    - Open a website in the default browser
  - Uses Express and the `@modelcontextprotocol/sdk`
- **Client**:  
  - Connects to the MCP server
  - Uses Google Gemini AI to generate content and call tools
  - Command-line chat interface

## Notes

- The server runs on [http://localhost:3001](http://localhost:3001)
- The client uses Google Gemini AI for content generation.
- MCP tools are defined in [`server/index.js`](server/index.js) and [`server/mcp.tool.js`](server/mcp.tool.js).

## License

MIT
