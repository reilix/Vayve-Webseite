"use client"

import { AgentChat, createAgentChat } from "@21st-sdk/nextjs"
import { useChat } from "@ai-sdk/react"
import theme from "../../theme.json"
import "@21st-sdk/react/styles.css"

const chat = createAgentChat({
  agent: "my-agent",
  tokenUrl: "/api/an-token",
})

export default function ChatPage() {
  const { messages, sendMessage, status, stop, error } =
    useChat({ chat })

  return (
    <div className="h-screen">
      <AgentChat
        messages={messages}
        onSend={(msg) => sendMessage({ text: msg.content })}
        status={status}
        onStop={stop}
        error={error ?? undefined}
        theme={theme}
      />
    </div>
  )
}
