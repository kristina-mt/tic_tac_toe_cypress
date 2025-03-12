describe("Tic-Tac-Toe Game", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/");
    });
// UI Rendering Tests
    it("should render the game board with 9 empty squares", () => {
      cy.visit("http://localhost:5173/");
      
      // Ensure mode selection happens before checking for the board
      cy.get(".mode-button").first().click();  // Replace with actual selector for mode buttons
   
      // Wait for the board to appear
      cy.get(".board", { timeout: 10000 }).should("exist");
   
      // Verify board has 9 squares
      cy.get(".square").should("have.length", 9).each(($el) => {
          cy.wrap($el).should("be.empty");
      });
   });
   
  
    it("should display game title", () => {
      cy.get("h1.logo").should("contain", "Tic-Tac-Toe");
    });
  
    it("should have mode selection buttons", () => {
      cy.get(".mode-selection button").should("contain", "2 Player Mode");
      cy.get(".mode-selection button").should("contain", "Play vs AI");
    });
  
    // Player Moves & Turn Alternation Tests
    it("should allow two players to play alternately", () => {
      cy.get(".mode-selection button").contains("2 Player Mode").click();
      cy.get(".square").eq(0).click().should("contain", "X");
      cy.get(".square").eq(1).click().should("contain", "O");
      cy.get(".square").eq(2).click().should("contain", "X");
    });
  
    it("should not allow clicking on an already occupied square", () => {
      cy.get(".mode-selection button").contains("2 Player Mode").click();
      cy.get(".square").eq(0).click().should("contain", "X");
      cy.get(".square").eq(0).click().should("contain", "X");
    });
  
    // AI Gameplay Tests
    it("should allow playing against AI and make an AI move", () => {
      cy.get(".mode-selection button").contains("Play vs AI").click();
      cy.get(".square").eq(0).click().should("contain", "X");
      cy.wait(1000);
      cy.get(".square").contains("O").should("exist");
    });
  
    it("AI should block player's winning move", () => {
      cy.get(".mode-selection button").contains("Play vs AI").click();
      cy.get(".square").eq(0).click(); // X
      cy.get(".square").eq(1).click(); // AI (O)
      cy.get(".square").eq(3).click(); // X
      cy.wait(1000);
      cy.get(".square").eq(6).should("contain", "O"); // AI should block
    });
  
    it("AI should take the winning move if available", () => {
      cy.get(".mode-selection button").contains("Play vs AI").click();
      cy.get(".square").eq(0).click();
      cy.get(".square").eq(1).click();
      cy.get(".square").eq(3).click();
      cy.get(".square").eq(4).click();
      cy.get(".square").eq(6).click();
      cy.wait(1000);
      cy.get(".winner-text").should("contain", "Winner");
    });
  
    it("AI should take center if available", () => {
      cy.get(".mode-selection button").contains("Play vs AI").click();
      cy.get(".square").eq(0).click();
      cy.wait(1000);
      cy.get(".square").eq(4).should("contain", "O");
    });
  
    it("AI should take a corner if the center is occupied", () => {
      cy.get(".mode-selection button").contains("Play vs AI").click();
      cy.get(".square").eq(4).click();
      cy.wait(1000);
      cy.get(".square").eq(0).should("contain", "O");
    });
  
    it("AI should avoid bad moves if it can't win or block", () => {
      cy.get(".mode-selection button").contains("Play vs AI").click();
      cy.get(".square").eq(0).click();
      cy.wait(1000);
      cy.get(".square").eq(8).should("contain", "O");
    });
  
    // Winning & Draw Conditions
    it("should detect a winning condition and highlight winning squares", () => {
      cy.get(".mode-selection button").contains("2 Player Mode").click();
      cy.get(".square").eq(0).click();
      cy.get(".square").eq(1).click();
      cy.get(".square").eq(3).click();
      cy.get(".square").eq(4).click();
      cy.get(".square").eq(6).click();
      cy.get(".winner-text").should("contain", "Winner: X");
      cy.get(".square").eq(0).should("have.class", "winning-square");
      cy.get(".square").eq(3).should("have.class", "winning-square");
      cy.get(".square").eq(6).should("have.class", "winning-square");
    });
  
    it("should detect a draw when all squares are filled with no winner", () => {
      cy.get(".mode-selection button").contains("2 Player Mode").click();
      cy.get(".square").eq(0).click();
      cy.get(".square").eq(1).click();
      cy.get(".square").eq(2).click();
      cy.get(".square").eq(4).click();
      cy.get(".square").eq(3).click();
      cy.get(".square").eq(5).click();
      cy.get(".square").eq(7).click();
      cy.get(".square").eq(6).click();
      cy.get(".square").eq(8).click();
      cy.get(".winner-text").should("contain", "Draw");
    });
  
    it("should not allow mode change after the game starts", () => {
      cy.get(".mode-selection button").contains("2 Player Mode").click();
      cy.get(".square").eq(0).click();
      cy.get(".mode-selection button").should("not.exist");
    });
  
    it("should reset the game when clicking reset", () => {
      cy.get(".mode-selection button").contains("2 Player Mode").click();
      cy.get(".square").eq(0).click();
      cy.get(".reset").click();
      cy.get(".square").should("be.empty");
    });
  
    it("should not allow moves after the game is won", () => {
      cy.get(".mode-selection button").contains("2 Player Mode").click();
      cy.get(".square").eq(0).click();
      cy.get(".square").eq(1).click();
      cy.get(".square").eq(3).click();
      cy.get(".square").eq(4).click();
      cy.get(".square").eq(6).click();
      cy.get(".square").eq(8).click();
      cy.get(".square").eq(8).should("contain", "");
    });
  });
  