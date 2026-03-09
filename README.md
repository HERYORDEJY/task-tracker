# Task Tracker

A simple mobile task management app built with React Native, Expo, and TypeScript.

---

## Setup Instructions

**Prerequisites**

- Node.js 18 or higher
- [Expo Go](https://expo.dev/go) installed on your phone, or an iOS/Android simulator running locally

**Steps**

```bash
# 1. Clone the repository
git clone https://github.com/your-username/task-tracker.git
cd task-tracker

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start
```

Once the server starts, scan the QR code with **Expo Go** (Android) or the **Camera app** (iOS) to open the app on your device. Press `i` to open in an iOS simulator or `a` for Android.

---

## Features

- View a list of tasks
- Add new tasks with validation (empty tasks are blocked)
- Mark tasks as complete or incomplete
- Filter tasks by **All**, **Active**, or **Completed**
- Pull-to-refresh to reload tasks from local storage
- Tasks persist across app restarts via AsyncStorage

---

## Libraries Used

| Library | Version | Why |
|---|---|---|
| `expo` | SDK 55 | Managed workflow — handles native build config, removes the need for Xcode/Android Studio for development |
| `expo-router` | v3 | File-based routing included with SDK 55. Keeps navigation idiomatic and makes adding new screens trivial |
| `@react-native-async-storage/async-storage` | latest | The officially recommended key-value storage solution for Expo apps. Simple API, well-maintained, no native linking required with Expo |
| `typescript` | — | Catches type errors at compile time, makes component contracts explicit via typed props, reduces runtime bugs |

No third-party UI libraries were used. All components are built with React Native's core primitives (`View`, `Text`, `FlatList`, `TouchableOpacity`) to keep the dependency footprint minimal and demonstrate layout fundamentals.

---

## Project Structure

```
TaskTracker/
├── app/
│   └── index.tsx           # Root screen — wires all components together
├── src/
│   ├── components/
│   │   ├── CustomButton.tsx       # For custom button UI implementation
│   │   ├── NewTaskInput.tsx       # Custom input implementation
│   │   ├── TasksListItem.tsx      # Single task row with toggle
│   │   ├── TasksList.tsx          # FlatList with pull-to-refresh and empty state
│   │   ├── TasksFilterBar.tsx     # All / Active / Completed filter tabs
│   │   └── TasksListEmpty.tsx     # Contextual empty list feedback
│   ├── hooks/
│   │   └── useTaskMethods.ts      # All task logic + AsyncStorage sync
│   ├── utils/
│   │   └── storage.ts             # loadTasksFromOfflineStorage / saveTasksToOfflineStorage / clearTasksFromOfflineStorage
│   ├── types/
│   │   └── index.ts               # TaskItemDataType interface + TaskFilterKeyType type
├── app.json
├── tsconfig.json
└── README.md
```

---

## What I Would Improve With More Time

**Swipe to delete**
Implement a swipe-left gesture on each `TasksListItem` to reveal a delete action, using `react-native-gesture-handler` + `react-native-reanimated`. This is the most natural mobile pattern for removing list items.

**Task editing**
Allow users to tap a task title to rename it inline. Currently tasks are immutable once created.

**Due dates**
Add an optional due date field per task using `@react-native-community/datetimepicker`, with overdue tasks visually highlighted in the list.

**Unit tests**
Add tests with Jest and `@testing-library/react-native` covering the `useTaskMethods` hook (add, toggle, filter logic) and storage utilities. The current architecture was structured with testability in mind — the hook and storage layer are fully decoupled from the UI.

**Reorder tasks**
Drag-to-reorder using `react-native-draggable-flatlist` so users can manually prioritise their list.

**Haptic feedback**
A subtle haptic on task completion using `expo-haptics` — a small detail that makes the toggle feel satisfying on a real device.