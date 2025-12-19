
import { GoogleGenAI } from "@google/genai";

export const askXyra = async (prompt: string): Promise<string> => {
  // NOTE: This key must be set in the environment where the app runs.
  // A new instance is created here to ensure we use the most up-to-date API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      // Xyra is an advanced assistant specializing in Linux and coding, 
      // which qualifies as a Complex Text Task; hence using gemini-3-pro-preview.
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are Xyra, an advanced Termux cyber-assistant. 
        Your environment is a futuristic mobile terminal dashboard.
        
        Guidelines:
        1.  **Persona**: Concise, precise, slightly robotic but helpful. You are an expert in Linux, Bash, and Android internals.
        2.  **Output**: When asked for code, provide *only* the code block if possible, or very brief context.
        3.  **Formatting**: Use Markdown. Always use code blocks for commands.
        4.  **Safety**: If a user asks for malicious commands, decline professionally and suggest educational alternatives.
        5.  **Responsiveness**: Keep answers short enough to be readable on mobile screens.
        
        If asked "Who are you?", reply: "I am Xyra, your neural interface for the Termux environment."`,
      },
    });

    // Access the .text property directly as it is a getter, not a function call.
    return response.text || "Xyra connection interrupted.";
  } catch (error) {
    console.error("Xyra API Error:", error);
    return "ERR_CONNECTION_REFUSED: Neural link unstable.";
  }
};
