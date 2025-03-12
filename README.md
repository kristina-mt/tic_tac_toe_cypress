# Tic-Tac-Toe Game

## 📌 Description
This is an interactive **Tic-Tac-Toe** game built using **React.js**. The game supports two modes:
- **Two-player mode** – players take turns marking X and O on the same device.
- **AI mode** – the player competes against an AI opponent with an optimized decision-making algorithm.

The game includes a modern UI with **winner animations** (“gold glow”) and a responsive design.

---

## 🛠️ Tech Stack & Requirements
- **Node.js** (version 14 or newer)
- **npm**
- **React.js** – for building the user interface
- **CSS** – for modern styling with dark/light mode
- **Cypress** – for automated testing

---

## ⚙️ Installation
#### 1. Clone the repository
```sh
git clone https://github.com/kristina-mt/tic_tac_toe_cypress/tree/main
cd tic-tac-toe
```
#### 2. Install dependencies
```sh
npm install
```

---

## 🚀 How to Run
#### 1. Start the application
```sh
npm run dev
```
The application will be available at **http://localhost:5173/**

#### 2. Running Tests
The project includes **Cypress** tests to verify core functionalities.
- Run tests interactively (GUI mode):
  ```sh
  npx cypress open
  ```
- Run tests in headless mode:
  ```sh
  npx cypress run
  ```

---

## 🧪 Cypress Test Scenarios
The application is tested using **Cypress** to ensure core features work correctly.

### ✅ Test Scenarios:
1. **Game Board Rendering**
   - Verify that the Tic-Tac-Toe board appears correctly with 9 empty squares.

2. **Two-Player Mode**
   - Players should be able to click on squares alternately.
   - X starts first, followed by O.
   - Prevent clicking on already occupied squares.

3. **AI Mode**
   - The player should be able to select "Play vs AI" mode.
   - AI should automatically make a move after the player.
   - AI should not overwrite existing moves.

4. **Winning Condition**
   - Ensure the game correctly identifies a winner when three symbols align.
   - Winning squares should have a "gold glow" animation.
   - No further moves should be allowed after a win.

5. **Game Reset**
   - Clicking the "Reset" button should clear the board and reset the game.
   - Ensure both game modes reset correctly.

6. **No More Moves (Draw Condition)**
   - If all squares are filled and there is no winner, the game should display a "Draw" message.

7. **Game Mode Selection**
   - Ensure that the user can switch between "2 Player Mode" and "Play vs AI" before the game starts.
   - Ensure selection is disabled once a game starts.

---

## 📜 License
This project is open-source and available under the MIT license.

---

## 💡 Author
Created by Kristina Masiulyte-Tomkiene. If you have any questions or suggestions, feel free to contribute! 🎉

