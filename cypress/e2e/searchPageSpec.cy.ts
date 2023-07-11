/// <reference types="cypress" />
import { format } from 'date-fns'
import testValues from '../fixtures/testValues.json'

const fillInTheForm = () => {
  /** Fill in the first destination field */
  cy.get('input[id="destination-field-0"]').type('Paris')
  cy.wait(2000)
  cy.get('li[role="menuitem"]').contains('Paris').click()

  /** Fill in the second destination field */
  cy.get('input[id="destination-field-1"]').type('Lyon')
  cy.wait(2000)
  cy.get('li[role="menuitem"]').contains('Lyon').click()

  /** Fill in the passengers field */
  cy.get('svg[data-testid="AddCircleOutlinedIcon"]').click()

  /** Fill in the date field */
  cy.get('svg[data-testid="CalendarIcon"').click()
  cy.get('button[aria-current="date"]').click()
}

describe('Search Page', () => {
  it('should render the destination fields, an add button, a passenger count field, a date field and a submit button', () => {
    cy.visit('http://localhost:3000')

    /** Should render the origin destination field */
    cy.get('input[id="destination-field-0"]').should('be.visible')

    /** Should render the initial final destination field */
    cy.get('input[id="destination-field-1"]').should('be.visible')

    /** Should render the add destination button */
    cy.get('button').contains('Add destination').should('be.visible')

    /** Should render the passenger count field */
    cy.get('input[name="numberOfPassengers"]').should('be.visible')

    /** Should render the date field */
    cy.get('input[name="selectedDate"]').should('be.visible')

    /** Should render the submit button */
    cy.get('button').contains('Submit').should('be.visible')

    cy.wait(1000)
  })

  it('should open a suggestion popper and show the results when a destination field gets filled', () => {
    cy.visit('http://localhost:3000')

    /** Type 'x' into the first destination field and wait until suggestions pop up */
    cy.get('input[id="destination-field-0"]').type('x')
    cy.wait(2000)

    /** Should render both suggestions to the text 'x' */
    cy.get('li[role="menuitem"]').should('have.length', 2)

    cy.get('li[role="menuitem"]').contains('Bordeaux').should('be.visible')

    cy.get('li[role="menuitem"]')
      .contains('Aix-en-Provence')
      .should('be.visible')

    cy.wait(1000)
  })

  it('should fill in a destination field when an options gets clicked on', () => {
    cy.visit('http://localhost:3000')

    /** Type 'Paris' into the first destination field and wait until suggestions pop up */
    cy.get('input[id="destination-field-0"]').type('Paris')
    cy.wait(2000)

    /** Only Paris should pop up as an option */
    cy.get('li[role="menuitem"]').should('have.length', 1)

    const optionItem = cy.get('li[role="menuitem"]').contains('Paris')
    optionItem.should('be.visible')

    /** Click on the option */
    optionItem.click()
    cy.get('input[id="destination-field-0"]').should('have.value', 'Paris')

    cy.wait(1000)
  })

  it('should delete the destination field value when the clear button gets clicked on', () => {
    cy.visit('http://localhost:3000')

    /** Type 'Paris' into the first destination field and wait until suggestions pop up */
    cy.get('input[id="destination-field-0"]').type('Paris')
    cy.wait(2000)

    /** Check the existence of the clear icon and click on it */
    const clearIcon = cy.get('svg[data-testid="ClearIcon"]')

    clearIcon.should('be.visible')
    clearIcon.click()

    /** The destination field should be empty */
    cy.get('input[id="destination-field-0"]').should('have.value', '')

    cy.wait(1000)
  })

  it('should show an error when the first destination field was touched and there is no value selected', () => {
    cy.visit('http://localhost:3000')

    /** Type 'Paris' into the first destination field and wait until suggestions pop up */
    cy.get('input[id="destination-field-0"]').type('Paris')
    cy.wait(2000)

    /** Click on the clear icon */
    cy.get('svg[data-testid="ClearIcon"]').click()

    /** Should show an error that the city of origin is not filled in */
    cy.get('p[id="destination-field-0-helper-text"]').should(
      'contain.text',
      'You must choose the city of origin.'
    )

    cy.wait(1000)
  })

  it('should show an error when the second destination field was touched and there is no value selected', () => {
    cy.visit('http://localhost:3000')

    /** Type 'Paris' into the second destination field and wait until suggestions pop up */
    cy.get('input[id="destination-field-1"]').type('Paris')
    cy.wait(2000)

    /** Click on the clear icon */
    cy.get('svg[data-testid="ClearIcon"]').click()

    /** Should show an error that the city of origin is not filled in */
    cy.get('p[id="destination-field-1-helper-text"]').should(
      'contain.text',
      'You must choose the city of destination.'
    )

    cy.wait(1000)
  })

  it('should show an error when a destination field has no results for the given text', () => {
    cy.visit('http://localhost:3000')

    /** Type 'Paris' into the first destination field and wait until suggestions pop up */
    cy.get('input[id="destination-field-0"]').type('ThisTextDoesNotHaveResults')
    cy.wait(2000)

    /** Should show an error that the city of origin is not filled in */
    cy.get('p[id="destination-field-0-helper-text"]').should(
      'contain.text',
      'Oops! Nothing was found for the keyword.'
    )

    cy.wait(1000)
  })

  it("should show an error when a destination field gets filled with the text 'fail'", () => {
    cy.visit('http://localhost:3000')

    /** Type 'Paris' into the first destination field and wait until suggestions pop up */
    cy.get('input[id="destination-field-0"]').type('fail')
    cy.wait(2000)

    /** Should show an error that the city of origin is not filled in */
    cy.get('p[id="destination-field-0-helper-text"]').should(
      'contain.text',
      'Oops! Failed to search with the keyword.'
    )

    cy.wait(1000)
  })

  it('should be able to add a new destination', () => {
    cy.visit('http://localhost:3000')

    /** Click on the add destination button */
    cy.get('button').contains('Add destination').click()

    /** A new destination should be visible with no initial value */
    const newDestination = cy.get('input[id="destination-field-2"]')

    newDestination.should('be.visible')
    newDestination.should('have.value', '')

    cy.wait(1000)
  })

  it('should be able to delete a destination', () => {
    cy.visit('http://localhost:3000')

    /** Click on the add new destination button */
    cy.get('button').contains('Add destination').click()

    /** The destination with the id 2 should now exist */
    cy.get('input[id="destination-field-2"]').should('be.visible')

    /** Click on the delete button of the newly added destination */
    const deleteLastDestinationButton = cy
      .get('svg[data-testid="HighlightOffOutlinedIcon"]')
      .eq(1)

    deleteLastDestinationButton.should('be.visible')
    deleteLastDestinationButton.click()

    /** The destination with the id 2 should not exist anymore */
    cy.get('input[id="destination-field-2"]').should('not.exist')

    cy.wait(1000)
  })

  it('should be able to increment the number of passengers', () => {
    cy.visit('http://localhost:3000')

    /** The increment button should be visible */
    const incrementIcon = cy.get('svg[data-testid="AddCircleOutlinedIcon"]')
    incrementIcon.should('be.visible')

    /** Clicking on the increment button should increase the passenger count */
    incrementIcon.click()
    cy.get('input[name="numberOfPassengers"]').should('have.value', 1)

    cy.wait(1000)
  })

  it('should be able to decrement the number of passengers', () => {
    cy.visit('http://localhost:3000')

    /** The decrement button should be visible and be disabled initially */
    const decrementIcon = cy.get('svg[data-testid="RemoveCircleOutlinedIcon"]')

    decrementIcon.should('be.visible')
    decrementIcon.parent().should('have.attr', 'disabled')

    /** Increase and then decrease the passenger count */
    cy.get('svg[data-testid="AddCircleOutlinedIcon"]').click()

    cy.get('svg[data-testid="RemoveCircleOutlinedIcon"]')
      .parent()
      .should('not.have.attr', 'disabled')

    cy.get('svg[data-testid="RemoveCircleOutlinedIcon"]').click()

    /** The button should be disabled again and the value should be 0 */
    cy.get('svg[data-testid="RemoveCircleOutlinedIcon"]')
      .parent()
      .should('have.attr', 'disabled')

    cy.get('input[name="numberOfPassengers"]').should('have.value', 0)

    cy.wait(1000)
  })

  it('should shown an error when the passenger field has been touched and the value was reset to 0', () => {
    cy.visit('http://localhost:3000')

    /** Increase and then decrease the passenger count */
    cy.get('svg[data-testid="AddCircleOutlinedIcon"]').click()
    cy.get('svg[data-testid="RemoveCircleOutlinedIcon"]').click()

    /** Should show an error that the passenger count field is not filled in correctly */
    cy.get('p[id="numberOfPassengers-helper-text"]').should(
      'contain.text',
      'You must provide a number that is higher than 0.'
    )

    cy.wait(1000)
  })

  it('should fill in the date field when a date is selected in the date picker', () => {
    cy.visit('http://localhost:3000')

    /** Click on the calendar icon */
    const calendarIcon = cy.get('svg[data-testid="CalendarIcon"')

    calendarIcon.should('be.visible')
    calendarIcon.click()

    /** Click on today's date */
    cy.get('button[aria-current="date"]').click()

    const todayInDesiredFormat = format(new Date(), 'dd/MM/yyyy')

    /** The value should be today's date */
    cy.get('input[name="selectedDate"]').should(
      'have.value',
      todayInDesiredFormat
    )

    cy.wait(1000)
  })

  it('should show an error when a past date is selected', () => {
    cy.visit('http://localhost:3000')

    /** Click on the calendar icon */
    cy.get('svg[data-testid="CalendarIcon"').click()

    /** Click on yesterday's date */
    cy.get('button[aria-current="date"]').prev().click()

    /** Should show an error that the passenger count field is not filled in correctly */
    cy.get('p[id="selectedDate-helper-text"]').should(
      'contain.text',
      'You must provide a date in the future.'
    )

    cy.wait(1000)
  })

  it('should keep the submit button disabled until all fields are filled in', () => {
    cy.visit('http://localhost:3000')

    cy.get('button').contains('Submit').should('have.attr', 'disabled')

    /** Fill in the first destination field */
    cy.get('input[id="destination-field-0"]').type('Paris')
    cy.wait(2000)
    cy.get('li[role="menuitem"]').contains('Paris').click()

    cy.get('button').contains('Submit').should('have.attr', 'disabled')

    /** Fill in the second destination field */
    cy.get('input[id="destination-field-1"]').type('Lyon')
    cy.wait(2000)
    cy.get('li[role="menuitem"]').contains('Lyon').click()

    cy.get('button').contains('Submit').should('have.attr', 'disabled')

    /** Fill in the passengers field */
    cy.get('svg[data-testid="AddCircleOutlinedIcon"]').click()

    cy.get('button').contains('Submit').should('have.attr', 'disabled')

    /** Fill in the date field */
    cy.get('svg[data-testid="CalendarIcon"').click()
    cy.get('button[aria-current="date"]').click()

    cy.get('button').contains('Submit').should('not.have.attr', 'disabled')

    cy.wait(1000)
  })

  it('should keep the submit button disabled if all fields are filled in but there is an error somewhere', () => {
    cy.visit('http://localhost:3000')

    fillInTheForm()

    cy.get('button').contains('Submit').should('not.have.attr', 'disabled')

    /** Mess up the date field by choosing yesterday's date */
    cy.get('svg[data-testid="CalendarIcon"').click()
    cy.get('button[aria-current="date"]').prev().click()

    cy.get('button').contains('Submit').should('have.attr', 'disabled')

    cy.wait(1000)
  })

  it('should redirect the user to the results page on submit button click', () => {
    cy.visit('http://localhost:3000')

    fillInTheForm()

    /** Click on the submit button */
    cy.get('button').contains('Submit').click()

    /** The URL should start with /results?q=, but after that it is a changing encoded string */
    cy.url().then((url) => {
      expect(url).contains('http://localhost:3000/results?q=')
    })

    cy.wait(1000)
  })

  it('should prefill the fields from the query parameters', () => {
    cy.visit(`http://localhost:3000?q=${testValues.encodedQueryParameters}`)

    /** Every field should be prefilled with their correct value */
    cy.get('input[id="destination-field-0"]').should('have.value', 'Paris')
    cy.get('input[id="destination-field-1"]').should('have.value', 'Lyon')
    cy.get('input[name="numberOfPassengers"]').should('have.value', 1)
    cy.get('input[name="selectedDate"]').should('have.value', '01/01/2023')

    cy.wait(1000)
  })

  it('should navigate to the error page if the query parameters are given in the wrong format', () => {
    cy.visit('http://localhost:3000?q=thisIsDefinitelyNotAGoodFormat')

    /** Wait until the page redirects */
    cy.wait(500)

    cy.url().then((url) => {
      expect(url).eq('http://localhost:3000/error')
    })

    cy.wait(1000)
  })
})
