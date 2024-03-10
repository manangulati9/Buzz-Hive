"use client"

import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export function Replyarea() {
  const [value, setvalue] = useState("");
  return <Textarea value={value} onChange={(e) => setvalue(e.target.value)} placeholder="Type your message here." className="text-white" />
}
