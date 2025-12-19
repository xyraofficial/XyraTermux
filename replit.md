# XyraTermux

## Overview
XyraTermux is a React-based web application that provides a Termux-style toolbox interface with AI assistant capabilities. The application features a modern dark UI with system monitoring, module recommendations, and an AI-powered assistant using Groq API.

## Project Architecture
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via CDN)
- **AI Integration**: Groq SDK for AI assistant functionality

## Key Files
- `index.html` - Main HTML entry point with Tailwind config
- `App.tsx` - Main React application component
- `index.tsx` - React entry point
- `vite.config.ts` - Vite configuration with dev server settings
- `components/` - React components (AssistantScreen, ExploreScreen, Layout, SettingsScreen, ToolsScreen)
- `services/geminiService.ts` - AI service integration
- `types.ts` - TypeScript type definitions
- `constants.ts` - Application constants

## Development
- Run `npm run dev` to start the development server on port 5000
- The Vite dev server is configured to allow all hosts for Replit's proxy

## Environment Variables
- `GROQ_API_KEY` - API key for Groq AI service (optional, for AI assistant features)

## Recent Changes
- Configured Vite to run on port 5000 with host 0.0.0.0
- Added allowedHosts: true for Replit proxy compatibility
