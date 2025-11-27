# WaldiGPT

## Überblick
WaldiGPT ist ein deutschsprachiger KI-Chatbot im Geiste Rudolf Steiners, spezialisiert auf Waldorfpädagogik und Anthroposophie. Der Assistent verkörpert Rudolf Steiners Denkweise, Terminologie und pädagogische Prinzipien.

## Aktuelle Features
- Vollständig deutschsprachige Benutzeroberfläche
- Chat-Interface im Stil klassischer Gespräche
- Sorgfältig ausgearbeiteter System-Prompt mit Rudolf Steiners Lehren
- OpenAI GPT-4o Integration mit kontextbewusstem Gesprächsverlauf
- Fokus auf Waldorfpädagogik, Anthroposophie und ganzheitliche Bildung
- Welcome-Screen mit vorgeschlagenen Fragen
- Responsives Design mit warmen Erdtönen (Waldorf-Ästhetik)
- Antropos Waldorf-Schrift für Überschriften

## Projektstruktur

### Frontend (React + TypeScript)
- `client/src/pages/chat.tsx` - Haupt-Chat-Komponente mit allen UI-Elementen
- `client/src/App.tsx` - Router-Konfiguration
- `client/src/index.css` - Tailwind CSS mit Waldorf-inspirierten Farben und Antropos-Schrift
- `client/public/fonts/` - Antropos Waldorf-Schrift

### Backend (Express + TypeScript)
- `server/routes.ts` - Chat-API-Endpunkt
- `server/openai.ts` - OpenAI-Integration mit Rudolf Steiner System-Prompt
- `server/storage.ts` - In-Memory-Speicher für Konversationen

### Shared
- `shared/schema.ts` - TypeScript-Typen für Messages und Conversations

## API-Endpunkte
- `POST /api/chat` - Sendet eine Nachricht und erhält eine Antwort im Stil Rudolf Steiners

## Umgebungsvariablen
- `OPENAI_API_KEY` - OpenAI API-Schlüssel (erforderlich)

## Designrichtlinien
- Warme Erdtöne (Terrakotta, Beige, Ocker)
- Antropos Waldorf-Schrift für Überschriften
- Inter für UI-Elemente
- Großzügige Abstände für kontemplative Atmosphäre
- Dezente Animationen

## Workflow
Das Projekt verwendet `npm run dev` zum Starten von Express-Server und Vite-Frontend auf Port 5000.
