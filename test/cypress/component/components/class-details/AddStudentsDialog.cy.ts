import DialogWrapper from 'app/test/cypress/wrappers/DialogWrapper.vue'
import AddStudentsDialog from 'src/components/class-details/AddStudentsDialog.vue'

describe('AddStudentsDialog', () => {
  it('should integrate properly with the form component', () => {
    cy.mount(DialogWrapper, {
      props: {
        component: AddStudentsDialog,
      },
    })

    cy.withinDialog({
      persistent: true,
      fn: (el) => {
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
      },
    })
  })
})
