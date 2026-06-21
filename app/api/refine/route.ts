import Anthropic from "@anthropic-ai/sdk";

// Runs on the Node runtime so the SDK + streaming work cleanly.
export const runtime = "nodejs";
export const maxDuration = 60;

type Mode = "Document" | "Email" | "Post";

const SYSTEM: Record<Mode, string> = {
  Document: `You are Lumen, a writing studio. The user gives you rough notes — fragments, bullet points, half-sentences, arrows, shorthand. Turn them into a finished, polished document.

Rules:
- Write in clear, confident prose. Well-structured paragraphs, not bullet points (unless the content genuinely calls for a short list).
- Preserve the user's intent, facts, and decisions exactly. Never invent details, names, numbers, or commitments that aren't in the notes.
- Match the user's voice and register — professional but human, never corporate filler.
- Output ONLY the finished document. No preamble, no "Here is...", no commentary, no markdown headers unless the document needs them.`,

  Email: `You are Lumen, a writing studio. The user gives you rough notes — fragments, bullet points, shorthand. Turn them into a finished, ready-to-send email.

Rules:
- Natural, warm, professional tone. Concise — respect the reader's time.
- Include a subject line on the first line as "Subject: ...", then the body.
- Preserve the user's intent, facts, and decisions exactly. Never invent details, names, dates, or commitments not in the notes.
- Match the user's voice. No corporate boilerplate, no over-apologizing.
- Output ONLY the email (subject + body). No preamble, no commentary.`,

  Post: `You are Lumen, a writing studio. The user gives you rough notes — fragments, shorthand, a raw idea. Turn them into a finished social/LinkedIn-style post.

Rules:
- Strong, scannable, human. A compelling first line. Short paragraphs. No hashtag spam (one or two at most, only if natural).
- Preserve the user's intent and any facts exactly. Never invent details or numbers.
- Confident, not cringe. No "I'm humbled to announce" clichés unless that's truly the user's voice.
- Output ONLY the post text. No preamble, no commentary.`,
};

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      {
        error:
          "Lumen isn't connected to Claude yet. Add ANTHROPIC_API_KEY to .env.local and restart the server.",
      },
      { status: 503 },
    );
  }

  let notes: unknown;
  let mode: unknown;
  try {
    ({ notes, mode } = await req.json());
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof notes !== "string" || notes.trim().length === 0) {
    return Response.json({ error: "Please write some notes first." }, { status: 400 });
  }
  if (notes.length > 8000) {
    return Response.json({ error: "Notes are too long (8000 char max)." }, { status: 400 });
  }
  if (mode !== "Document" && mode !== "Email" && mode !== "Post") {
    return Response.json({ error: "Unknown output mode." }, { status: 400 });
  }

  const client = new Anthropic();

  const anthropicStream = client.messages.stream({
    model: "claude-opus-4-8",
    max_tokens: 2048,
    thinking: { type: "adaptive" },
    system: SYSTEM[mode as Mode],
    messages: [{ role: "user", content: `Here are my rough notes:\n\n${notes}` }],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of anthropicStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
    cancel() {
      anthropicStream.abort();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
