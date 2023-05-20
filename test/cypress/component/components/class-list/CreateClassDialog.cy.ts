import DialogWrapper from 'app/test/cypress/wrappers/DialogWrapper.vue'
import CreateClassDialog from 'components/class-list/CreateClassDialogV2.vue'

describe('CreateClassDialog', () => {
  it('should handle adding and removing of columns', () => {
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
        })

      cy.wrap(el)
        .dataCy('add-button')
        .click()
        .then(() => {
          cy.wrap(el).dataCy('column-item').should('have.length', 2)
        })

      cy.wrap(el)
        .dataCy('add-button')
        .click()
        .then(() => {
          cy.wrap(el).dataCy('column-item').should('have.length', 3)
        })

      cy.wrap(el)
        .dataCy('subract-button')
        .click()
        .then(() => {
          cy.wrap(el).dataCy('column-item').should('have.length', 2)
        })

      cy.wrap(el)
        .dataCy('subract-button')
        .click()
        .then(() => {
          cy.wrap(el).dataCy('column-item').should('have.length', 1)
        })

      cy.wrap(el).dataCy('cancel-button').click()
    })
  })
})
