import "cypress-file-upload";

describe("My Test", () => {
  it("successfully loads", () => {
    cy.visit("/"); // change URL to match your dev URL
  });
  it("save", () => {
    cy.get("#btnAdd").click();
    cy.get("#name").clear();
    cy.get("#name").type("User");
    cy.get("#lastname").clear();
    cy.get("#lastname").type("Test");
    cy.get("#email").clear();
    cy.get("#email").type("user@email.com");
    cy.get("#phone").clear();
    cy.get("#phone").type("0123456789");
    cy.get("#gender").select("Male");
    cy.get("#date").clear();
    cy.get("#date").type("2007-01-01");

    cy.fixture("testPicture.png").then((fileContent) => {
      cy.get("#file").attachFile({
        fileContent: fileContent.toString(),
        fileName: "testPicture.png",
        mimeType: "image/png",
      });
    });
    cy.get("#range").invoke("val", 3).trigger("change");
    cy.get("#radio1").check();
    cy.get("#checkbox1").check();
    //cy.screenshot('nameScreenshot');
    cy.get("#btnSubmit").click();
  });

  it("edit", () => {
    /* ==== Generated with Cypress Studio ==== */
    // cy.visit('http://localhost:3000//');
    // cy.get('#\\36  > :nth-child(5) > .btn').click();
    // cy.get('#name').clear();
    // cy.get('#name').type('User Update');
    // cy.get('#name').click();
    // cy.get('#name').clear();
    // cy.get('#name').type('User Update');
    // cy.get('#lastname').clear();
    // cy.get('#lastname').type('Test Update');
    // cy.get('.form-froup > :nth-child(1)').click();
    // cy.get('#radio1').check();
    // cy.get('#checkbox1').check();
    // cy.get('#btnSubmit').click();
    /* ==== End Cypress Studio ==== */
  });

  it("delete", () => {

    let rowId;
    let userToDelete = 'User'
    cy.get(".contactList tr").then(x => {
        for (let i = 1; i <= x.length; i++) {
            cy.get(".contactList tr")
            .contains("tr", userToDelete+' '+i)
            .should("have.attr", "id")
            .then((id) => (rowId = id))
            .then(() => {
              const rowSelector = `tr#${rowId}`;
              // debugger;
              cy.get(rowSelector).find(".btnDelete").click({ multiple: true });
             
            }); 
        }
    })
 

    
 

  });
});
