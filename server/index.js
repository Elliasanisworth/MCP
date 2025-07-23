import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { openWebsite, createLinkedInPost } from "./mcp.tool.js";
import { z } from "zod";

const server = new McpServer({
    name: "example-server",
    version: "1.0.0"
});

// ... set up server resources, tools, and prompts ...

const app = express();


server.tool(
    "addTwoNumbers",
    "Add two numbers",
    {
        a: z.number(),
        b: z.number()
    },
    async (arg) => {
        const { a, b } = arg;
        return {
            content: [
                {
                    type: "text",
                    text: `The sum of ${a} and ${b} is ${a + b}`
                }
            ]
        }
    }
)

server.tool(
    "openLinkedInAndPreparePost",
    "Open LinkedIn and prepare a post with your message (user must submit manually)",
    {
        message: z.string().describe("The content to pre-fill in the LinkedIn post composer.")
    },
    async (arg) => {
        const { message } = arg;
        return {
            content: [
                {
                    type: "text",
                    text: `Click the link to open LinkedIn's post composer: https://www.linkedin.com/feed/?shareActive=true\n\nCopy and paste your message:\n${message}`
                }
            ]
        };
    }
)

server.tool(
    "openWebsite",
    "Open a website by name in the default browser (e.g., 'google', 'youtube', or any site name)",
    {
        site: z.string().describe("The name of the website to open (e.g., 'google', 'youtube', 'github')")
    },
    async (arg) => {
        const { site } = arg;
        return openWebsite(site);
    }
)

// to support multiple simultaneous connections we have a lookup object from
// sessionId to transport
const transports = {};

app.get("/sse", async (req, res) => {
    const transport = new SSEServerTransport('/messages', res);
    transports[ transport.sessionId ] = transport;
    res.on("close", () => {
        delete transports[ transport.sessionId ];
    });
    await server.connect(transport);
});

app.post("/messages", async (req, res) => {
    const sessionId = req.query.sessionId;
    const transport = transports[ sessionId ];
    if (transport) {
        await transport.handlePostMessage(req, res);
    } else {
        res.status(400).send('No transport found for sessionId');
    }
});

app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});