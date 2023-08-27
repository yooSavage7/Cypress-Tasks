describe('Task1 Testing ToolsQA Practice Form', () => {
  before(() => {
    cy.visit('https://demoqa.com/');
    cy.viewport(1280, 900);
    cy.contains('Forms').click();
    cy.contains('Practice Form').click();
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  it('Enter Data in the Form and verify Modal Data', () => {
    // Close the ads and footer
    cy.get('#adplus-anchor').then(($adContainer) => {
      $adContainer[0].style.display = 'none';
    });
    cy.get('footer').then(($footer) => {
      $footer[0].style.display = 'none';
    });
    cy.get('#close-fixedban').then(($ad) => {
      $ad[0].style.display = 'none';
    });

    // Fill Data in the Form
    cy.get('#firstName').type('Cowlar');
    cy.get('#lastName').type('Developer');
    cy.get('#userEmail').type('qaengineer@cowlar.com');
    cy.contains('label', 'Male').click();
    cy.get('#userNumber').type('0123456789');
    cy.get('.subjects-auto-complete__input').type('Computer Science').type('{enter}');
    cy.contains('div', 'Music').click();
    cy.get('#currentAddress').type('Address 1');
    cy.get('#state').type('NCR');
    cy.get('body').type('{enter}');
    cy.get('#city')
      .type('Delhi');
    cy.get('body').type('{enter}');
    cy.contains('Submit').click();

    // Verify Modal Data
    cy.get('.modal-title').should('contain', 'Thanks for submitting the form');
    cy.get('.table-responsive tbody').contains('td', 'Student Name').next().should('contain', 'Cowlar Developer');
    cy.get('.table-responsive tbody').contains('td', 'Student Email').next().should('contain', 'qaengineer@cowlar.com');
    cy.get('.table-responsive tbody').contains('td', 'Gender').next().should('contain', 'Male');
    cy.get('.table-responsive tbody').contains('td', 'Mobile').next().should('contain', '0123456789');
    cy.get('.table-responsive tbody').contains('td', 'Subjects').next().should('contain', 'Computer Science');
    cy.get('.table-responsive tbody').contains('td', 'Hobbies').next().should('contain', 'Music');
    cy.get('.table-responsive tbody').contains('td', 'Address').next().should('contain', 'Address 1');
    cy.get('.table-responsive tbody').contains('td', 'State and City').next().should('contain', 'NCR Delhi');

    // Close The Modal
    cy.contains('Close').click();
  });
});
