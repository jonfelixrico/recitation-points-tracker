import DialogWrapper from 'app/test/cypress/wrappers/DialogWrapper.vue'
import AddStudentsDialog from 'src/components/class-details/AddStudentsDialog.vue'

describe('AddStudentsDialog', () => {
  it('should handle adding', () => {
    cy.mount(DialogWrapper, {
      props: {
        component: AddStudentsDialog,
      },
    })

    cy.withinDialog({
      fn: (el) => {
        cy.wrap(el).dataCy('empty-message').should('exist')

        for (let i = 1; i <= 5; i++) {
          cy.wrap(el)
            .dataCy('form')
            .dataCy('input')
            .dataCy('first-name')
            .type(`FN ${i}`)

          cy.wrap(el)
            .dataCy('form')
            .dataCy('input')
            .dataCy('last-name')
            .type(`LN ${i}`)

          cy.wrap(el).dataCy('form').dataCy('input').dataCy('submit').click()
        }

        cy.wrap(el).dataCy('form').dataCy('item').should('have.length', 5)
        cy.wrap(el).dataCy('empty-message').should('not.exist')

        cy.wrap(el).dataCy('submit-button').click()
      },
    })
  })
})
