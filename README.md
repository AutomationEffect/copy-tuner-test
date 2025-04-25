
# Copy Tuner Application

A web application for copywriters to learn and apply Jon Benson's Conversion Optimization System (COS).

## Features

- **Authentication System**
  - Email-based login with protected routes
  - Session management
  - Role-based access control

- **Certification Process**
  - Interactive rich text editor
  - Real-time copy analysis
  - Client-side validation
  - AI-powered review system
  - Pro Mode unlocking system

- **Editor Features**
  - Rich text formatting
  - Real-time feedback
  - Auto-saving
  - Copy score tracking
  - Edict compliance checking

## Tech Stack

- **Frontend**
  - React 18 with TypeScript
  - Vite build system
  - TipTap v2 rich text editor
  - Tailwind CSS for styling
  - Shadcn UI components

- **State Management**
  - React Context for app state
  - TanStack Query for data fetching
  - Custom hooks for business logic

## Project Structure

```
src/
├── components/
│   ├── certification/     # Certification-specific components
│   ├── editor/           # Rich text editor components
│   ├── ui/               # Shadcn UI components
│   └── NavBar.tsx
├── contexts/
│   ├── AuthContext.tsx   # Authentication state
│   ├── EditorContext.tsx # Editor state management
│   └── CertificationContext.tsx
├── hooks/
│   └── use-toast.ts      # Toast notifications
├── pages/
│   ├── AuthPage.tsx
│   ├── CertificationPage.tsx
│   ├── DashboardPage.tsx
│   ├── GlossaryPage.tsx
│   ├── LandingPage.tsx
│   ├── NotFound.tsx
│   └── ProPage.tsx
├── utils/
│   ├── errorLogger.ts    # Error tracking
│   └── clientSideValidators.ts
└── App.tsx
```

## Core Workflows

1. **Certification Process**
   - User logs in
   - Accesses certification editor
   - Edits sample copy
   - Receives real-time feedback
   - Submits for AI review
   - Unlocks Pro Mode upon passing

2. **Pro Mode**
   - Available after certification
   - Unrestricted copy analysis
   - Advanced features access

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Error Handling

The application uses a centralized error logging system:
- Client-side error tracking
- Toast notifications for user feedback
- Detailed error context logging
- Error boundary protection

