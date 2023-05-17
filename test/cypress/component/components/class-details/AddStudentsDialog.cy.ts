import DialogWrapper from 'app/test/cypress/wrappers/DialogWrapper.vue'
import AddStudentsDialog from 'src/components/class-details/AddStudentsDialog.vue'

describe('AddStudentsDialog', () => {
  it('should integrate with the form', () => {
    cy.mount(DialogWrapper, {
      props: {
        component: AddStudentsDialog,
      },
    })

    cy.withinDialog((el) => {
      cy.wrap(el)
        .dataCy('form')
        .dataCy('input')
        .dataCy('first-name')
        .type('First name')

      cy.wrap(el)
        .dataCy('form')
        .dataCy('input')
        .dataCy('last-name')
        .type('Last name')

      cy.wrap(el).dataCy('form').dataCy('input').dataCy('submit').click()
    })
  })
})
