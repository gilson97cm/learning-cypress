import { Json } from "@angular/core/src/facade/lang";
import "cypress-file-upload";
describe("My First Test", () => {
  let ip = "100.100.100.205:8080";
  let url = `http://${ip}/api/contacts`;
  let updateContactId = 18;
  let deleteContactId = 35;
  let options = 19;

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
          if (x > 400) {
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
          .should("have.length", x.length) 
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
      cy.reload(true)
    })
  }

  if (options == 8) {
    it('Network Request', () => {
      cy.intercept(
        {
          method: 'GET',
          url: url, 
        },
        []
      ).as('getContacts') 
    })
  }

  if (options == 9) {
    it('Wait Request', () => {
      cy.intercept('/index.php?id_product=1&controller=product').as('getProduct')
      cy.intercept('/index.php?id_product=6&controller=product').as('getCarShop')
      cy.visit('http://automationpractice.com')
      cy.wait(1000, ['@getProduct', '@getCarShop'])
      cy.get('h4').should('contain', 'Newsletter')
    })
  }

  if (options == 10) {
    it('Flake & Assertions Example', () => {
      cy.intercept('/api/contacts').as('getSearch')
      cy.wait('@getSearch').its('request.url').should('include', 'http://100.100.100.205:8080/api/contacts')
      cy.get('.contactList ').should('contain', 'User 1').and('contain', 'User 2')
    })
  }


  if (options == 11) {
    it('Querying', () => {
      cy.get('.query-list')
        .contains('bananas').should('have.class', 'third')
      cy.get('.query-list').contains(/^b\w+/).should('have.class', 'third')
      cy.get('#querying')
        .contains('ul', 'oranges')
        .should('have.class', 'query-list')
    })

    it('Within - Root', () => {
      cy.get('.query-list').within(() => {
        cy.get('#nameText').should('have.attr', 'placeholder', 'Name')
      })
      cy.root().should('match', 'html')

      cy.get('.query-list').within(() => {
        cy.root().should('have.class', 'query-list')
      })
    })
  }

  if (options == 12) {
    it("Click", () => {
      cy.get('.contactList td').first().should('contain', '1');
      cy.get('.contactList td').last().should('contain', 'Delete')
      cy.get('.query-list')
        .contains('oranges').next().should('contain', 'bananas')
      cy.get('.query-list')
        .contains('oranges')
        .nextAll().should('have.length', 2)
      cy.get('#second')
        .nextUntil('#fourth').should('contain', 'bananas')
      cy.get('#listFruts').find('.third')
        .prevAll().should('have.length', 2)
      cy.get('#listFruts').find('#fourth')
        .prevUntil('#second').should('have.length', 1)
      cy.get("#btnAdd").click();
    });

    it('Traversal', () => {
      cy.get('#tabs')
        .children('#tabChildren')
        .should('contain', 'Tab 1')
      cy.get('#tabs')
        .closest('ul')
        .should('have.class', 'nav')
      cy.get('#tabs>li')
        .eq(1).should('contain', 'Tab 2')
      cy.get('#tabs>li')
        .filter('.active').should('contain', 'Tab 1')
      cy.get('#tabs').find('li').find('a').should('contain', 'Tab 1')
      cy.get('.form-group .btn')
        .not('[disabled]').should('not.contain', 'Disabled')
      cy.get('#tabs').find('li').not('.active')
        .prev().should('contain', 'Tab 1')
      cy.get('#tabs>li')
        .filter('.active').siblings().should('have.length', 1)
    })
  }

  if (options == 13) {
    it('Utilities', () => {
      cy.request('http://100.100.100.205:8080/api/contacts')
        .then((response) => {
          let ids = Cypress._.chain(response.body.contacts).map('id').take(3).value()
          expect(ids).to.deep.eq([1, 2, 3])
        })

      cy.get('.utility-blob').then(($div) => {

        Cypress.Blob.imgSrcToDataURL('https://example.cypress.io/assets/img/javascript-logo.png', undefined, 'anonymous')
          .then((dataUrl) => {
            let img = Cypress.$('', { src: dataUrl })
            $div.append(img)
            cy.get('.utility-blob img').click()
              .should('have.attr', 'src', dataUrl)
          })
      })

      let waited = false

      function waitOneSecond() {
        return new Cypress.Promise((resolve, reject) => {
          setTimeout(() => {
            waited = true
            resolve('foo')
          }, 1000)
        })
      }

      cy.then(() => {
        waitOneSecond().then((str) => {
          expect(str).to.eq('foo')
          expect(waited).to.be.true
        })
      })
    })
  }

  if (options == 14) {
    describe('Nav Menus', () => {
      context('iphone-5 resolution', () => {
        it('displays mobile menu on click', () => {
          cy.get('#navbarSupportedContent').should('be.visible')
          cy.viewport('iphone-5')
          cy.get('#btnShowOptions').click()
          cy.get('.navbar-nav > li').should('contain', 'About')

        })
      })
    })
  }

  if (options == 15) {
    it('Cypress Window', () => {
      cy.visit('http://localhost:3000')
      cy.window().then((win) => {
        console.log(win)
      })
      cy.window().should('have.property', 'innerHeight', 660)
    })

    it('Window Events', (done) => {

      cy.window().then((win) => {
        cy.get('#btnAdd').click()
        cy.get('#lastname').then((jQueryElement) => {
          console.log(jQueryElement)
          let elemHtml = jQueryElement.get(0)
          elemHtml.addEventListener('keydown', (event) => {
            expect(event instanceof win['KeyboardEvent']).to.be.true
            done()
          })
        })
      })
      cy.get('#lastname').type('A')
    })

  }

  if (options == 16) {
    it('Stub Cypress', () => {
      const greeter = {
        /**
          * Greets a person
          * @param {string} name
        */
        greet(name) {
          return `Hello, ${name}!`
        },
      }
      cy.stub(greeter, 'greet')
        .callThrough()
        .withArgs(Cypress.sinon.match.string).returns('Hi')
        .withArgs(Cypress.sinon.match.number).throws(new Error('Invalid name'))

      expect(greeter.greet('World')).to.equal('Hi')
      expect(() => greeter.greet(42)).to.throw('Invalid name')
      expect(greeter.greet).to.have.been.calledTwice
      expect(greeter.greet()).to.equal('Hello, undefined!')
    })
    it('Spy Cypress', () => {
      const obj = {
        foo() { },
      }
      const spy = cy.spy(obj, 'foo').as('anyArgs')
      const withFoo = spy.withArgs('foo').as('withFoo')

      obj.foo()
      expect(spy).to.be.called
    })
    it('Clock Cypress', () => {
      cy.get('#btnAdd').click()
      cy.clock()
      cy.get('#name').type('Jane')
      cy.get('#lastname').type('Lane')

      cy.clock().then((clock) => {
        clock.tick(1000)
      })
      cy.clock().invoke('restore')
    })
  }

  if (options == 17) {
    it('Misc', () => {
      cy.get('.contactList').within(() => {
        cy.contains('User 1').click().end()
        cy.contains('User 2').click()
      })

      if (Cypress.platform === 'win32') {
        cy.exec('print cypress.json').its('stderr').should('be.empty')
      } else {
        cy.exec('cat cypress.json').its('stderr').should('be.empty')
      }

      cy.get('#btnAdd').click()
      cy.get('#form').find('#name').click()
      cy.focused().should('have.id', 'name')

      cy.get('#form').find('#lastname').click()
      cy.focused().should('have.id', 'lastname')
      cy.screenshot('my-image')
      cy.wrap({ foo: 'bar' })
        .should('have.property', 'foo')
        .and('include', 'bar')

      cy.exec('npm run lite')
        .its('stdout')
        .should('contain', 'Done running the script')

      cy.exec('npm run lite').then((result) => {
        console.log('Succesfully')

      })
    })
  }

  if (options == 18) {
    it('Cypress Platform', () => {
      Cypress.platform.should('Ccontain', 'win32')
    })
  }

  if (options == 19) {
    it('Cypress Env', () => {
      expect(Cypress.env('contacts_url')).to.eq('/api/contacts')
      expect(Cypress.env('server_url')).to.eq('http://localhost:3000/')
      expect(Cypress.env()).to.have.property('contacts_url', '/api/contacts')
      expect(Cypress.env()).to.have.property('server_url', 'http://localhost:3000/')
    })
  }

});
