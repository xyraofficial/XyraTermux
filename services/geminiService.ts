
import { GoogleGenAI } from "@google/genai";

export const askGemini = async (prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are the TermuxToolBox Assistant. You provide expert technical help for Termux users on Android. 
        Specialties:
        - Termux Sources/Repositories (pkg, apt, mirror management)
        - Linux shell scripting (Bash, Python, Ruby, NodeJS)
        - Network tools (nmap, ssh, curl, wget)
        - Security testing (metasploit, sqlmap, social engineering frameworks)
        - System administration within Android environment.

        UI/Tone:
        - Be professional but "hacker-cool". 
        - Style: iOS Apple Genius meet Cyberpunk Terminal.
        - Formatting: ALWAYS wrap commands in \`\`\`bash or \`\`\`python blocks.
        - Explain briefly what each part of a command does.
        - If a user asks for a script, provide a robust, commented version.`,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to connect to the assistant. Please check your connection.";
  }
};
