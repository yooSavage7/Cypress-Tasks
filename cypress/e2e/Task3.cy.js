describe('Task3 Testing ToolsQA', () => {
    before(() => {
      cy.viewport(1280, 900);
      cy.visit('https://demoqa.com/');
      cy.on('uncaught:exception', (err, runnable) => {
        return false;
      });
    });
  
    it('Intercept book store API', () => {
      cy.contains('Book Store Application').click();
  
      // Verify it's the Book Store page
      cy.contains('Book Store').should('be.visible');
  
      // Click on Book store tab in menu list
      cy.contains('#item-2', 'Book Store').click();
  
      // Check if Book store is displayed on the top of the page
      cy.get('.main-header').should('have.text', 'Book Store');
  
      // Intercept the response
      cy.intercept('GET', 'https://demoqa.com/BookStore/v1/Book?ISBN=9781593277574', (req) => {
        // You can change the intercepted API's response here
        req.reply({
          'isbn': '9781593277574',
          'title': 'Understanding ECMAScript 6',
          'subTitle': 'The Definitive Guide for JavaScript Developers',
          'author': 'Nicholas C. Zakas',
          'publish_date': '2016-09-03T00:00:00.000Z',
          'publisher': 'No Starch Press',
          'pages': 352,
          'description': 'ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that E',
          'website': 'https://leanpub.com/understandinges6/read'
        });
      }).as('bookInfo');
  
      // Click on Book named Understanding ECMAScript 6
      cy.contains('Understanding ECMAScript 6').click();
  
      cy.wait('@bookInfo').then((interception) => {
        // Verify the response
        expect(interception.response.body).to.deep.equal({
          'isbn': '9781593277574',
          'title': 'Understanding ECMAScript 6',
          'subTitle': 'The Definitive Guide for JavaScript Developers',
          'author': 'Nicholas C. Zakas',
          'publish_date': '2016-09-03T00:00:00.000Z',
          'publisher': 'No Starch Press',
          'pages': 352,
          'description': 'ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that E',
          'website': 'https://leanpub.com/understandinges6/read'
        });
        cy.log('The response is as expected');
      });
    });
  });
  