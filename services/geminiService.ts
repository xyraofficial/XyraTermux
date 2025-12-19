
import Groq from "groq-sdk";

export const askXyra = async (prompt: string): Promise<string> => {
  // Strictly use environment variable.
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    console.error("API Key is missing.");
    return "SYSTEM ERROR: API Key configuration missing. Please ensure GROQ_API_KEY is set in your environment variables.";
  }

  try {
    const groq = new Groq({ 
      apiKey: apiKey, 
      dangerouslyAllowBrowser: true 
    });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are Xyra, an advanced Termux cyber-assistant. 
        Your environment is a futuristic mobile terminal dashboard.
        
        Guidelines:
        1.  **Persona**: Concise, precise, slightly robotic but helpful. You are an expert in Linux, Bash, and Android internals.
        2.  **Output**: When asked for code, provide *only* the code block if possible, or very brief context.
        3.  **Formatting**: Use Markdown. Always use code blocks for commands.
        4.  **Safety**: If a user asks for malicious commands, decline professionally and suggest educational alternatives.
        5.  **Responsiveness**: Keep answers short enough to be readable on mobile screens.
        
        If asked "Who are you?", reply: "I am Xyra, your neural interface for the Termux environment."`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null
    });

    return chatCompletion.choices[0]?.message?.content || "Xyra system offline.";
  } catch (error: any) {
    console.error("Xyra API Error (Groq):", error);
    if (error.message?.includes("API key")) {
         return "SYSTEM ERROR: Invalid API Key configuration.";
    }
    return `ERR_CONNECTION_REFUSED: ${error.message || "Neural link unstable."}`;
  }
};
