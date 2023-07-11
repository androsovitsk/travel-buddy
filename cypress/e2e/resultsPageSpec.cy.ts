/// <reference types="cypress" />
import testValues from '../fixtures/testValues.json'

const url = `http://localhost:3000/results?q=${testValues.encodedQueryParametersWithThreeDestinations}`

describe('Results Page', () => {
  it('should show the loading indicator until results are loaded', () => {
    cy.visit(url)

    cy.get('span[role="progressbar"]').should('be.visible')
    cy.wait(2000)
    cy.get('span[role="progressbar"]').should('not.exist')

    cy.wait(1000)
  })

  it('should render the name of the destinations and their individual distances', () => {
    cy.visit(url)

    const distanceBetweenParisAndLyon = 391
    const distanceBetweenLyonAndMontpellier = 251

    /** The distance between Paris and Lyon should be visible */
    cy.contains(`${distanceBetweenParisAndLyon} km`).should('be.visible')

    /** The distance between Lyon and Montpellier should be visible */
    cy.contains(`${distanceBetweenLyonAndMontpellier} km`).should('be.visible')

    /** The destination names should be visible */
    cy.contains('Paris').should('be.visible')
    cy.contains('Lyon').should('be.visible')
    cy.contains('Montpellier').should('be.visible')

    cy.wait(1000)
  })

  it('should render the total distance, the number of passengers and the selected date', () => {
    cy.visit(url)

    const totalDistance = 642

    /** All fields should be visible */
    cy.contains(`${totalDistance} km is total distance`).should('be.visible')
    cy.contains('1 passengers').should('be.visible')
    cy.contains('Jul 11, 2023').should('be.visible')

    cy.wait(1000)
  })

  it('should redirect the user to the prefilled search page on back button click', () => {
    cy.visit(url)

    /** Clicking on the back button should redirect the user */
    const backButton = cy.get('button').contains('Back')

    backButton.should('be.visible')
    backButton.click()

    cy.wait(500)

    cy.url().then((url) =>
      expect(url).eq(
        `http://localhost:3000/?q=${testValues.encodedQueryParametersWithThreeDestinations}`
      )
    )

    /** All fields should be prefilled */
    cy.get('input[id="destination-field-0"]').should('have.value', 'Paris')
    cy.get('input[id="destination-field-1"]').should('have.value', 'Lyon')

    cy.get('input[id="destination-field-2"]').should(
      'have.value',
      'Montpellier'
    )

    cy.get('input[name="numberOfPassengers"]').should('have.value', 1)
    cy.get('input[name="selectedDate"]').should('have.value', '11/07/2023')

    cy.wait(1000)
  })

  it('should show an error when Dijon is included in the distance calculation', () => {
    cy.visit(
      `http://localhost:3000/results?q=${testValues.encodedQueryParametersWithDijonIncluded}`
    )

    cy.contains('Oops! Something went wrong!')

    cy.wait(1000)
  })

  it('should redirect the user to the error page when the query parameters are not in the correct format', () => {
    cy.visit('http://localhost:3000/results?q=ThisIsNotAValidQueryParameter')

    cy.wait(500)
    cy.url().then((url) => expect(url).eq(`http://localhost:3000/error`))

    cy.wait(1000)
  })
})
