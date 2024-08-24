# TRABALHO II APPS 2024

This is a simple React Native application built with Expo, designed to demonstrate basic user authentication (login, logout) and post management (create, view). The app uses SQLite3 for local data storage.

## Features

- **User Authentication:** Login and logout functionality.
- **Post Management:** Create and view posts stored locally using SQLite3.


## Technologies Used

- React Native
- Expo
- Sqlite3

## Prerequisites

Before running the application, you need to have Node.js installed on your development environment.

## Getting Started

To get a local copy up and running, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/VictorPithan/tads-apps-trabalhoII-mobile.git
cd tads-apps-trabalhoII-mobile
```

### 2. Install the project dependencies:

```bash
npm install
```

### 3. Start the application
Before starting the application, make sure to replace baseURL with the IPv4 address of your machine in the /service/Api.ts file. This ensures the app connects to your local development server correctly.

```bash
npm start
```

### 4. Running on Your Device/Emulator
For iOS: Press i to open in iOS Simulator.
For Android: Press a to open in Android Emulator.
Alternatively, you can scan the QR code provided by Expo to run the app on your physical device.
