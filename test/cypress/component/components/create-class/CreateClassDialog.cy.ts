import DialogWrapper from 'app/test/cypress/wrappers/DialogWrapper.vue'
import CreateClassDialog from 'components/create-class/CreateClassDialog.vue'

describe('CreateClassDialog', () => {
  it('should handle adding and removing of columns, and input should stay in place', () => {
    cy.mount(DialogWrapper, {
      props: {
        component: CreateClassDialog,
      },
    })

    cy.withinDialog((el) => {
      cy.wrap(el).dataCy('column-item').should('have.length', 0)

      cy.wrap(el)
        .dataCy('add-button')
        .click()
        .then(() => {
          cy.wrap(el).dataCy('column-item').should('have.length', 1)
          cy.wrap(el).dataCy('column-item').eq(0).dataCy('input').type('5')
        })

      cy.wrap(el)
        .dataCy('add-button')
        .click()
        .then(() => {
          cy.wrap(el).dataCy('column-item').should('have.length', 2)
          cy.wrap(el).dataCy('column-item').eq(1).dataCy('input').type('6')
        })

      cy.wrap(el)
        .dataCy('add-button')
        .click()
        .then(() => {
          cy.wrap(el).dataCy('column-item').should('have.length', 3)
          cy.wrap(el).dataCy('column-item').eq(2).dataCy('input').type('7')
        })

      cy.wrap(el)
        .dataCy('subtract-button')
        .click()
        .then(() => {
          cy.wrap(el).dataCy('column-item').should('have.length', 2)
          cy.wrap(el).dataCy('column-item').eq(0).dataCy('input').type('5')
          cy.wrap(el).dataCy('column-item').eq(1).dataCy('input').type('6')
        })

      cy.wrap(el)
        .dataCy('subtract-button')
        .click()
        .then(() => {
          cy.wrap(el).dataCy('column-item').should('have.length', 1)
          cy.wrap(el).dataCy('column-item').eq(0).dataCy('input').type('5')
        })

      cy.wrap(el).dataCy('cancel-button').click()
    })
  })
})
