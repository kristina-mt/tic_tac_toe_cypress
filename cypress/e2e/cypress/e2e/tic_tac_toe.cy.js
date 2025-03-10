describe('Tic-Tac-Toe Game', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173');
    });
  
    it('should display the game title', () => {
      cy.get('.logo').should('contain', 'Tic-Tac-Toe');
    });
  
    it('should allow two players to play alternately', () => {
      cy.get('.mode-selection button').contains('2 Player Mode').click();
      
      cy.get('.square').eq(0).click().should('contain', 'X');
      cy.get('.square').eq(1).click().should('contain', 'O');
      cy.get('.square').eq(2).click().should('contain', 'X');
      cy.get('.square').eq(3).click().should('contain', 'O');
    });
  
    it('should declare the winner and highlight winning squares', () => {
      cy.get('.mode-selection button').contains('2 Player Mode').click();
      
      cy.get('.square').eq(0).click(); // X
      cy.get('.square').eq(3).click(); // O
      cy.get('.square').eq(1).click(); // X
      cy.get('.square').eq(4).click(); // O
      cy.get('.square').eq(2).click(); // X wins
      
      cy.get('.winner-text').should('contain', 'Winner: X');
      cy.get('.winning-square').should('have.length', 3);
    });
  
    it('should reset the game when reset button is clicked', () => {
      cy.get('.mode-selection button').contains('2 Player Mode').click();
      
      cy.get('.square').eq(0).click();
      cy.get('.reset').click();
      
    });
  
    it('should allow playing against AI and make AI move automatically', () => {
      cy.get('.mode-selection button').contains('Play vs AI').click();
      
      cy.get('.square').eq(0).click().should('contain', 'X');
      cy.wait(1000);
      
      cy.get('.square').filter(':contains("O")').should('have.length', 1);
    });
  
    it('should not allow moves after the game is won', () => {
      cy.get('.mode-selection button').contains('2 Player Mode').click();
      
      cy.get('.square').eq(0).click(); // X
      cy.get('.square').eq(3).click(); // O
      cy.get('.square').eq(1).click(); // X
      cy.get('.square').eq(4).click(); // O
      cy.get('.square').eq(2).click(); // X wins
      
      cy.get('.square').eq(5).click();
      cy.get('.square').eq(5).should('be.empty');
    });
  });