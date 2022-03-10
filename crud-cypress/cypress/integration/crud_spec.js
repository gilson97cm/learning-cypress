describe("My First Test", () => {
  let ip = "192.168.0.113:80";
  //let site = 'http://localhost:3000/'
  let url = `http://${ip}/api/contacts`;
  let deleteContactId = 52;
  let updateContactId = 131;

  it("successfully loads", () => {
    cy.visit("/"); // change URL to match your dev URL
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#btnAdd > .fa').click();
    cy.get(':nth-child(1) > .form-group > .form-control').clear();
    cy.get(':nth-child(1) > .form-group > .form-control').type('User');
    cy.get(':nth-child(2) > .form-group > .form-control').clear();
    cy.get(':nth-child(2) > .form-group > .form-control').type('Test');
    cy.get('#email').clear();
    cy.get('#email').type('test@email.com');
    cy.get('#btnSubmit').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#\\35  > :nth-child(6) > .btn').click();
    /* ==== End Cypress Studio ==== */
  });

  // // it('Find a value in page', () => {
  // //     cy.contains('Usuario')
  // //   })

  // // it('Set value in input by Id attribute', () => {
  // //   cy.visit(site)

  // //   cy.contains('Add').click()
  // //   cy.get('#email')
  // //   .type('example@email.com')
  // //   .should('have.value', 'example@email.com')
  // // })

  // it("Get Contacts", () => {
  //   cy.request({
  //     method: "GET",
  //     url: url,
  //   }).then(function (response) {
  //     expect(response.body).have.property("contacts");
  //   });
  // });

  // it('Post Contacts',()=>{

  //     cy.request({
  //         method: 'POST',
  //         url: url,
  //         body:{
  //             'name': 'Cypress',
  //             'lastname': 'Cypress',
  //             'email': 'example@email.com'
  //         },
  //         headers:{
  //             'content-type': 'application/json'
  //         }
  //     }).then(function(response) {
  //     //  expect(response.body).have.property('') only if exist!!!IMPORTANT
  //     //  expect(response.body).have.property('')
  // 	// have.property('')  tiene una propiedad si la respuesta es:
  // 	// statusCode : 00,
  // 	// response: {
  // 	// 	'messagge': 'success post'
  // 	// }

  // 	// Al final seria:
  //     //  expect(response.body).have.property('response')
  //       expect(response.body).to.deep.equal({
  //             "statusCode": 200,
  //             "code": "SUCCESS_STORE_USER",
  //             "message": "user saved successfully"
  //         })
  //     })

  // })

  // it('Update Request',() => {
  //     cy.request('PUT', `${url}/${updateContactId}`,{
  //         'name': 'Cypress Update',
  //         'lastname': 'Cypress Update',
  //         'email': 'update@email.com'
  //     }).then(response => {
  //         expect(response.body).to.deep.equal({
  //             "statusCode": 200,
  //             "code": "SUCCESS_UPDATE_USER",
  //             "message": "user updated successfully"
  //         })
  //     })
  // })

  // it('Delete Request',() => {
  //     cy.request('DELETE',  `${url}/${deleteContactId}`,{})
  //     .then(response => {
  //         expect(response.body).to.deep.equal({
  //             "statusCode": 200,
  //             "code": "SUCCESS_DELETE_USER",
  //             "message": "user deleted successfully"
  //         })
  //     })
  // })

  // it('Show Information By Id', () => {
  //     cy.request(`${url}/${updateContactId}`)
  //     .its('body').should('deep.eq', {
  //         "statusCode": 200,
  //         "code": "USER_FOUND",
  //         "message": "user found",
  //         "contact": {
  //             "id": 131,
  //             "name": "User",
  //             "lastname": "Test",
  //             "phone": null,
  //             "email": "test@email.com",
  //             "gender": "Male",
  //             "date": null,
  //             "created_at": "2022-03-07T17:29:34.000000Z",
  //             "updated_at": "2022-03-07T17:29:34.000000Z"
  //         }
  //     })
  // });

    // it('sets post contacts in via form submission', function () {
    //   // destructuring assignment of the this.currentUser object

    //   cy.get('#btnAdd').click()
    //   cy.get('input[name=name]').type('Us')
    //   cy.get('input[name=lastname]').type('Test')
    //   cy.get('input[name=email]').type(`test@email.com`)
    //   cy.get('select[name=gender]').select('Male')
    //   cy.get('#btnSubmit').should('not.be.disabled').click()

    // })

  // it("length items table", () => {
  //   cy.get(".contactList tr") // command !!!IMPORTANT -> tr
  //     .should("have.length", 2) // assertion
  //     .and(($li) => {
  //       // 2 more assertions
  //       expect($li.get(0).textContent, "first item").to.contains("User");
  //       expect($li.get(1).textContent, "second item").to.contains("User");
  //     });
  // })

  // it("length items list", () => {
  //   cy.get(".contactList li") // command !!!IMPORTANT -> li
  //     .should("have.length", 2) // assertion
  //     .and(($li) => {
  //       // 2 more assertions
  //       expect($li.get(0).textContent, "first item").to.equal("User");
  //       expect($li.get(1).textContent, "second item").to.equal("User");
  //     });
  // })

  // it("Alias & Debugger", () => {
  //   // const button = cy.get("#btnAdd");
  //   // button.click();

  //   // button.then(($btn) => {
  //   //   // inspect $btn <object>
  //   //   debugger;

  //   //   cy.get("#gender")
  //   //     .select("Male")
  //   //     .then(($select) => {
  //   //       // inspect $select <object>
  //   //       debugger;

  //   //       cy.url().should((url) => {
  //   //         // inspect the url <string>
  //   //         debugger;

  //   //         $btn; // is still available
  //   //         $select; // is still available too
  //   //       });
  //   //     });
  //   // });

  //   // cy.get('#num').then(($span) => {
  //   //   // capture what num is right now
  //   //   const num1 = parseFloat($span.text())

  //   //   cy.get('#btnIncrement')
  //   //     .click()
  //   //     .then(() => {
  //   //       // now capture it again
  //   //       const num2 = parseFloat($span.text())

  //   //       // make sure it's what we expected
  //   //       expect(num2).to.eq(num1 + 1)
  //   //     })
  //   // })

  //   // cy.get(".contactList tr")
  //   // .contains("tr","Usuario 5")
  //   // .find(".btnShow").click()

  //   let rowId;

  //   cy.get(".contactList tr")
  //     .contains("tr","Usuario 5")
  //     .should("have.attr", "id")
  //     .then((id) => (rowId = id))
  //     .then(() => {
  //       const rowSelector = `tr#${rowId}`;
  //       // debugger;
  //       cy.get(rowSelector).find(".btnShow").click();
  //     });
  // });

  it('Conditional Test', () => {
    cy.get('#btnIncrement').click()
    cy.get('body')
      .then(($body) => {
        // synchronously query from body
        // to find which element was created
        if ($body.find('input').length) {
         console.log($body.find('input').length)
          // input was found, do something else here
          return 'input'
        }
    
        // else assume it was textarea
        return 'textarea'
      })
      .then((selector) => {
        // selector is a string that represents
        // the selector we could use to find it
        cy.get(selector).type(`found the element by selector ${selector}`)
      })
  });

  it('test', () => {
      cy.get(`#\\39  > :nth-child(4) > .btn`).click()
  });
});
