export async function POST(req: Request) {
  try {
    const { json } = await req.json();
    if (!json) return Response.json({ error: 'No JSON provided' }, { status: 400 });

    let parsed;
    try {
      parsed = JSON.parse(json);
    } catch (e: unknown) {
      return Response.json({ explanation: `❌ Invalid JSON — ${(e as Error).message}` });
    }

    const OpenAI = (await import('openai')).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a JSON expert. Explain the given JSON data concisely in plain English.
Structure your explanation with:
1. What this data represents (overall purpose)
2. Key fields and what they mean
3. Notable patterns (arrays, nested objects, data types)
Use a friendly, clear tone for developers.`,
        },
        {
          role: 'user',
          content: `Explain this JSON:\n\`\`\`\n${JSON.stringify(parsed, null, 2)}\n\`\`\``,
        },
      ],
      max_tokens: 400,
    });

    return Response.json({ explanation: completion.choices[0].message.content });
  } catch (err: unknown) {
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}
