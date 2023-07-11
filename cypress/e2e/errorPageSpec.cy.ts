/// <reference types="cypress" />

// @ts-ignore
describe('Error Page', () => {
  it('should show the unexpected error text and the back button', () => {
    cy.visit('http://localhost:3000/error')

    cy.contains('Ooops! Something went wrong!')
    cy.get('button').contains('Back').should('be.visible')

    cy.wait(1000)
  })

  it('should redirect the user to the home page on back button click', () => {
    cy.visit('http://localhost:3000/error')

    cy.get('button').contains('Back').click()

    cy.wait(500)
    cy.url().then((url) => expect(url).eq('http://localhost:3000/'))

    cy.wait(1000)
  })
})
