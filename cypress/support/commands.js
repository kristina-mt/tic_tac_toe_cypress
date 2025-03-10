// ***********************************************
// Custom Cypress Commands
// ***********************************************

// Custom command for logging in
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password, { log: false });
    cy.get('button[type=submit]').click();
  });
  
  // Custom command to start a new game with a given mode
  Cypress.Commands.add('startGame', (mode) => {
    cy.visit('/');
    cy.contains(mode).click();
  });
  
  // Custom command to make a move
  Cypress.Commands.add('makeMove', (index) => {
    cy.get('.square').eq(index).click();
  });
  
  // Custom command to check the winner
  Cypress.Commands.add('checkWinner', (expectedWinner) => {
    cy.get('.winner-text').should('contain', `Winner: ${expectedWinner}`);
  });
  
  // Custom command to reset the game
  Cypress.Commands.add('resetGame', () => {
    cy.get('.reset').click();
    cy.get('.square').each(($el) => {
      cy.wrap($el).should('be.empty');
    });
  });
  