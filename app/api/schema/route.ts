export async function POST(req: Request) {
  try {
    const { json } = await req.json();
    if (!json) return Response.json({ error: 'No JSON provided' }, { status: 400 });

    let parsed;
    try {
      parsed = JSON.parse(json);
    } catch (e: unknown) {
      return Response.json({ error: `Invalid JSON — ${(e as Error).message}` }, { status: 400 });
    }

    const OpenAI = (await import('openai')).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a JSON Schema expert. Derive a JSON Schema (Draft-07) from the input JSON.
Output ONLY the raw JSON schema object — no markdown, no code fences, no explanation.
Use type, properties, items, required, description where appropriate.`,
        },
        {
          role: 'user',
          content: `Derive JSON Schema for:\n\`\`\`\n${JSON.stringify(parsed, null, 2)}\n\`\`\``,
        },
      ],
      max_tokens: 800,
    });

    let schema;
    try {
      schema = JSON.parse(completion.choices[0].message.content || '{}');
    } catch {
      schema = { raw: completion.choices[0].message.content };
    }

    return Response.json({ schema });
  } catch (err: unknown) {
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}
