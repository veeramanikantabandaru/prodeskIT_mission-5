# Kanban Board

A simple Kanban board application built with React, TypeScript, and Vite.

## Features

### Level 1 (Core Logic)
- **Add Task**: Text input to add a card to the "To Do" column.
- **Delete Task**: "X" button on each card to remove it.
- **Move Task**: Buttons on each card to move between columns (To Do, In Progress, Done).

### Level 2 (Polish)
- **Editing**: Click on a task text to turn it into an input field for editing.
- **Priority System**: Dropdown when creating a task (High, Medium, Low) with colored borders:
  - High: Red border
  - Medium: Yellow border
  - Low: Green border
- **Persistence**: Tasks are saved to localStorage and persist on page refresh.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5174](http://localhost:5174) in your browser.

## Build

To build the project for production:

```bash
npm run build
```

## Technologies Used

- React
- TypeScript
- Vite
- CSS
