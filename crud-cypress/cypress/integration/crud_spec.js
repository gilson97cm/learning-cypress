import { Json } from "@angular/core/src/facade/lang";
import "cypress-file-upload";
describe("My First Test", () => {
  let ip = "192.168.0.113:80";
  //let site = 'http://localhost:3000/'
  let url = `http://${ip}/api/contacts`;
  let updateContactId = 18;
  let deleteContactId = 35;
  let options = 0;

  it("Successfully Loads", () => {
    cy.visit("/");
  });

  if (options == 0) {
    // it("Test from type #1", () => {
    //   cy.get("#btnAdd").click();

    //   let array = [
    //     "Name*",
    //     "Lastname*",
    //     "Email*",
    //     "Phone",
    //     "Gender",
    //     "Date",
    //     "File",
    //     "Range",
    //     "Radio 1",
    //     "Radio 2",
    //     "Check 1",
    //   ];

    //   let count = 0;
    //   cy.get("#form")
    //     .find("label")
    //     .each((x) => {
    //       expect(x[0].textContent).equal(array[count]);
    //       count++;
    //     });

    //   cy.get("#form").find("input[type=text]").should("have.length", 4);
    //   cy.get("#form").find("input[type=date]").should("have.length", 1);
    //   cy.get("#form").find("select").should("have.length", 1);
    //   cy.get("#form").find("input[type=radio]").should("have.length", 2);
    //   cy.get("#form").find("input[type=checkbox]").should("have.length", 1);
    //   cy.get("#form").find("input[type=file]").should("have.length", 1);
    //   cy.get("#form").find("input[type=range]").should("have.length", 1);
    //   cy.get("#form")
    //     .find("button[type=submit]")
    //     .should("have.length", 1)
    //     .should("be.disabled")
    //     .contains("Save");
    //   cy.get("#form")
    //     .find("button[type=button]")
    //     .should("have.length", 1)
    //     .contains("Cancel");

    // });

    it("Click", () => {
      cy.get("#btnAdd").click();
    });

    it("Type", () => {
      cy.get("#email")
        .type("fake@email.com")
        .should("have.value", "fake@email.com");
    });

    it("Focus", () => {
      cy.get("#name").focus();
    });

    it("Blur", () => {
      cy.get("#name").blur();
    });

    it("Clear", () => {
      cy.get("#email").clear().should("have.value", "");
    });

    it("Check", () => {
      cy.get(".nav-tabs li").eq(1).click();
      cy.get('input[type="checkbox"]')
        .not("[disabled]")
        .check()
        .should("be.checked");

      cy.get('input[type="radio"]').check("option3");
    });

    it("Uncheck", () => {
      cy.get('input[type="checkbox"]')
        .not("[disabled]")
        .uncheck()
        .should("not.be.checked");
    });
    
    it('Trigger', () => {
      cy.get('#range')
      .invoke('val', 25)
      .trigger('change')
      .get('input[type=range]').siblings('p')
      .should('have.text', '25')
    });

    it("Select", () => {
      cy.get(".nav-tabs li").first().click();
      cy.get("#gender").select("Male");
    });

    it("Scroll", () => {
      cy.get("#btnCancel").click();
      // cy.get(".my-custom-scrollbar")

      cy.get("table")
        .invoke("height")
        .then(x => {
          if(x > 400){
            cy.get(".my-custom-scrollbar").scrollTo("bottom");
          }
        });
    });

    

    it("Screenshot", () => {
      //cy.wait(2000);
      // cy.get(".table").screenshot();
    });
  }

  if (options == 1) {
    it("Get Request", () => {
      cy.request({
        method: "GET",
        url: url,
      }).then(function (response) {
        expect(response.body).have.property("contacts");
      });
    });

    it("Post Request", () => {
      cy.request({
        method: "POST",
        url: url,
        body: {
          name: "User",
          lastname: "Test",
          email: "test@email.com",
        },
        headers: {
          "content-type": "application/json",
        },
      }).then(function (response) {
        expect(response.body).to.deep.equal({
          statusCode: 200,
          code: "SUCCESS_STORE_USER",
          message: "user saved successfully",
        });
      });
    });

    it("Update Request", () => {
      cy.request("PUT", `${url}/${updateContactId}`, {
        name: "Cypress Update",
        lastname: "Cypress Update",
        email: "update@email.com",
      }).then((response) => {
        expect(response.body).to.deep.equal({
          statusCode: 200,
          code: "SUCCESS_UPDATE_USER",
          message: "user updated successfully",
        });
      });
    });

    it("Delete Request", () => {
      cy.request("DELETE", `${url}/${deleteContactId}`, {}).then((response) => {
        expect(response.body).to.deep.equal({
          statusCode: 200,
          code: "SUCCESS_DELETE_USER",
          message: "user deleted successfully",
        });
      });
    });

    it("Get Contact By Id Request", () => {
      cy.request(`${url}/${updateContactId}`)
        .its("body")
        .should("deep.eq", {
          statusCode: 200,
          code: "USER_FOUND",
          message: "user found",
          contact: {
            id: updateContactId,
            name: "Cypress Update",
            lastname: "Cypress Update",
            email: "update@email.com",
          },
        });
    });
  }

  if (options == 2) {
    it("Post with Form using click()", function () {
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

      cy.get("#btnSubmit")
        .should("not.be.disabled")
        .click()
        .should(() => {
          expect(localStorage.getItem("contactData")).to.eq(
            Json.stringify({
              name: "User",
              lastname: "Test",
              email: "user@email.com",
              phone: "0123456789",
              gender: "Male",
              date: "2007-01-01",
            })
          );
        });
    });

    it("Post with Form using submit()", function () {
      cy.get("#btnAdd").click();

      cy.get("#name").clear();
      cy.get("#name").type("User");
      cy.get("#lastname").clear();
      cy.get("#lastname").type("Test");
      cy.get("#email").clear();
      cy.get("#email").type("user@email.com");
      cy.get("#phone").clear();
      cy.get("#phone").type("01234567890");
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
      cy.get("#form:valid").should("have.length", 1);
      cy.get("#form").submit();
    });

    it("Update with Form", function () {
      let rowSelector = `tr#${updateContactId}`;
      cy.get(rowSelector).find(".btnEdit").click();
      cy.wait(4000);
      cy.get("#name").clear();
      cy.get("#name").type("User Update");
      cy.get("#lastname").clear();
      cy.get("#lastname").type("Test Update");
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
      cy.get("#range").invoke("val", 60).trigger("change");
      cy.get("#radio2").check();
      cy.get("#checkbox1").check();

      cy.get("#btnSubmit").should("not.be.disabled").click();
    });

    it("Delete with Form", function () {
      let rowSelector = `tr#${deleteContactId}`;
      cy.get(rowSelector).find(".btnDelete").click();
    });

    it("Show with Form", function () {
      let rowSelector = `tr#${updateContactId}`;
      cy.get(rowSelector).find(".btnShow").click();
    });
  }

  if (options == 3) {
    it("Length items table", () => {
      cy.get(".contactList tr").then((x) => {
        cy.get(".contactList tr")
          .should("have.length", x.length) // assertion
          .and(($tr) => {
            expect($tr.get(0).textContent, "first item").to.contains(
              "Cypress Update"
            );
          });
      });
    });

    it("Conditional Test", () => {
      cy.get("#addInput").click();
      cy.get("#div-body")
        .then(($body) => {
          if ($body.find("#newInput").length) {
            console.log($body.find("#newInput").length);
            return "input";
          }
          return "textarea";
        })
        .then((selector) => {
          cy.get(selector).type(`found the element by selector ${selector}`);
        });
    });

    it("Variables & Debugger", () => {
      const button = cy.get("#btnAdd");
      button.click();

      button.then(($btn) => {
        debugger;
        cy.get("#gender")
          .select("Male")
          .then(($select) => {
            debugger;
            cy.url().should((url) => {
              debugger;
              $btn;
              $select;
            });
          });
      });
    });

    it("Element change status", () => {
      cy.get("#number").then(($span) => {
        const num1 = parseFloat($span.text());
        cy.get("#btnIncrement")
          .click()
          .then(() => {
            const num2 = parseFloat($span.text());
            expect(num2).to.eq(num1 + 1);
          });
      });
    });
  }

  if (options == 4) {
    const semver = require('semver')
    if (semver.gte(Cypress.version, '1.1.3')) {
      it('Cypress.version', () => {
        cy.log(Cypress.version)
        expect(Cypress.platform).to.be.a('string')
      })
    }
  }

  if (options == 5) {
    it('Cypress spec', () => {
      cy.log(Cypress.spec.name)
      expect(Cypress.spec.name).to.be.eq('crud_spec.js')
    })
  }

  if (options == 6) {
    it('Cypress location', () => {
      cy.location().should((loc) => {
        expect(loc.href).to.include('localhost:3000')
      })
    })
  }

  if (options == 7) {
    it('Navigation', () => {
      cy.reload()
      cy.wait(4000);
      // reload the page without using the cache
      cy.reload(true)
    })
  }

  if (options == 8) {
    it('Network Request', () => {
      cy.intercept(
        {
          method: 'GET', // Route all GET requests
          url: url, // that have a URL that matches '/users/*'
        },
        [] // and force the response to be: []
      ).as('getContacts') // and assign an alias
    })
  }

  if (options == 9) {
    it('Wait Request', () => {
      cy.intercept('/activities/*', { fixture: 'activities' }).as('getActivities')
      cy.intercept('/messages/*', { fixture: 'messages' }).as('getMessages')

      // visit the dashboard, which should make requests that match
      // the two routes above
      cy.visit('http://localhost:8888/dashboard')

      // pass an array of Route Aliases that forces Cypress to wait
      // until it sees a response for each request that matches
      // each of these aliases
      cy.wait(['@getActivities', '@getMessages'])

      // these commands will not run until the wait command resolves above
      cy.get('h1').should('contain', 'Dashboard')
    })
  }
});
