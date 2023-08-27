const Tesseract = require("tesseract.js");

describe('Task2 Testing ToolsQA', () => {
  beforeEach(() => {
    cy.viewport(1280, 900);
    cy.visit('https://demoqa.com/');
    cy.contains('Interactions').click();
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  /*it('Verify that ToolsQA is displayed', () => {
    // Capture a screenshot of the image using Cypress
    cy.screenshot('tools_qa_image');

    cy.readFile('cypress/screenshots/tools_qa_image.png', 'base64').then((imageData) => {
      return Tesseract.recognize(imageData, 'eng');
    }).then((result) => {
      const extractedText = result.data.text;
      // Check if the extracted text contains "TOOLS QA"
      expect(extractedText).to.include('TOOLS QA');
    });
  });*/

  it('Verify if Interactions page is displayed', () => {
    // Verify the Interactions page
    cy.contains('Interaction').should('be.visible');
  });

  it('Verify sidebar tabs', () => {
    cy.get('.element-group')
      .should('contain', 'Elements')
      .should('contain', 'Forms')
      .should('contain', 'Alerts, Frame & Windows')
      .should('contain', 'Widgets')
      .should('contain', 'Interactions')
      .should('contain', 'Book Store Application');
  });

  it('Click on Resizable Tab and verify if page is displayed', () => {
    cy.contains('Resizable').click();

    // Verify that the Resizable section is displayed on top
    cy.get('.main-header').should('have.text', 'Resizable');
  });

  it('Verify the current height and width of Box 1', () => {
    cy.contains('Resizable').click();
    cy.get('#resizableBoxWithRestriction').should('have.css', 'height', '200px');
    cy.get('#resizableBoxWithRestriction').should('have.css', 'width', '200px');
  });

  it("Check box 1 resizeability and verify it's dimensions", () => {
    cy.contains('Resizable').click();

    // Get the initial CSS values for width and height
    cy.get('#resizableBoxWithRestriction').then(($box) => {
      const initialWidth = $box.css('width');
      const initialHeight = $box.css('height');

      // Simulate resizing by dragging the bottom-right corner
      cy.get('.react-resizable-handle-se')
        .eq(0)
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { clientX: 0, clientY: 0 })
        .trigger('mouseup');
      cy.wait(2000);

      // Get the updated CSS values for width and height after resizing
      cy.get('#resizableBoxWithRestriction').then(($minDimensions) => {
        const minWidth = $minDimensions.css('width');
        const minHeight = $minDimensions.css('height');

        // Verify that width and height have changed after resizing
        expect(minWidth).to.not.equal(initialWidth);
        expect(minHeight).to.not.equal(initialHeight);

        // Simulate resizing to the maximum dimensions
        cy.get('.react-resizable-handle-se')
          .eq(0)
          .trigger('mousedown', { which: 1 })
          .trigger('mousemove', { clientX: 900, clientY: 500 }) // Resize to the maximum
          .trigger('mouseup');

        // Wait for a moment to ensure resizing is completed
        cy.wait(2000);

        // Get the updated CSS values for width and height after resizing
        cy.get('#resizableBoxWithRestriction').then(($maxDimensions) => {
          const maxWidth = $maxDimensions.css('width');
          const maxHeight = $maxDimensions.css('height');

          // Verify the minimum and maximum dimensions
          expect(minWidth).to.equal('150px'); // Adjust to the actual minimum width
          expect(minHeight).to.equal('150px'); // Adjust to the actual minimum height
          expect(maxWidth).to.equal('500px'); // Adjust to the actual maximum width
          expect(maxHeight).to.equal('300px'); // Adjust to the actual maximum height
        });
      });
    });
  });

  it('Check box 2 resizeability', () => {
    cy.contains('Resizable').click();

    // Get the initial CSS values for width and height
    cy.get('#resizable').then(($box) => {
      const initialWidth = $box.css('width');
      const initialHeight = $box.css('height');

      // Simulate resizing by dragging the bottom-right corner
      cy.get('.react-resizable-handle-se')
        .eq(1)
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { clientX: 500, clientY: 300 })
        .trigger('mouseup');
      cy.wait(2000);

      // Get the updated CSS values for width and height after resizing
      cy.get('#resizable').then(($resizedDimensions) => {
        const resizedWidth = $resizedDimensions.css('width');
        const resizedHeight = $resizedDimensions.css('height');

        // Verify that width and height have changed after resizing
        expect(resizedWidth).to.not.equal(initialWidth);
        expect(resizedHeight).to.not.equal(initialHeight);
      });
    });
  });
});
