
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The third parameter '' ensures we load all variables, including those from Netlify's environment.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Maps process.env.GROQ_API_KEY to the environment variable.
      // Checks multiple sources: env object (loaded vars) and process.env (direct system vars).
      // This ensures keys set in Netlify UI (which appear in process.env) are captured.
      'process.env.GROQ_API_KEY': JSON.stringify(
        env.GROQ_API_KEY || 
        env.API_KEY || 
        process.env.GROQ_API_KEY || 
        process.env.API_KEY || 
        ''
      )
    }
  };
});
