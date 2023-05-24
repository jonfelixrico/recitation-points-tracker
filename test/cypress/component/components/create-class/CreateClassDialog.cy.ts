import DialogWrapper from 'app/test/cypress/wrappers/DialogWrapper.vue'
import CreateClassDialog from 'components/create-class/CreateClassDialog.vue'

describe('CreateClassDialog', () => {
  it('should emit the proper seat arrangement', () => {
    const okSpy = cy.spy()
    cy.mount(DialogWrapper, {
      props: {
        component: CreateClassDialog,
        onOk: okSpy,
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
        .dataCy('submit-button')
        .click()
        .then(() => {
          expect(okSpy).to.have.been.called.calledWith({
            seatArrangement: [5, 6, 7],
          })
        })
    })
  })

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

          // these value checks are to determine the values of "earlier" rows are not affected by "later" rows being subtracted
          cy.wrap(el)
            .dataCy('column-item')
            .eq(0)
            .dataCy('input')
            .should('have.value', 5)
          cy.wrap(el)
            .dataCy('column-item')
            .eq(1)
            .dataCy('input')
            .should('have.value', 6)
        })

      cy.wrap(el)
        .dataCy('subtract-button')
        .click()
        .then(() => {
          cy.wrap(el).dataCy('column-item').should('have.length', 1)

          // these value checks are to determine the values of "earlier" rows are not affected by "later" rows being subtracted
          cy.wrap(el)
            .dataCy('column-item')
            .eq(0)
            .dataCy('input')
            .should('have.value', 5)
        })

      cy.wrap(el).dataCy('cancel-button').click()
    })
  })
})
