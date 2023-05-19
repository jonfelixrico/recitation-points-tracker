import AddStudentsFormItem from 'src/components/class-details/AddStudentsFormItem.vue'
import { DraftStudent } from 'src/components/class-details/draft-student.inteface'

describe('AddStudentsFormItem', () => {
  it('should emit if delete button is clicked', () => {
    const spy = cy.spy()
    cy.mount(AddStudentsFormItem, {
      props: {
        student: {
          firstName: 'First name',
          lastName: 'Last name',
        } as DraftStudent,
        itemNo: 1,
        onDeleteClick: spy,
      },
    })

    cy.dataCy('delete-button')
      .click()
      .then(() => {
        expect(spy).to.have.been.called
      })
  })

  it('should display information', () => {
    cy.mount(AddStudentsFormItem, {
      props: {
        student: {
          firstName: 'First name',
          lastName: 'Last name',
        } as DraftStudent,
        itemNo: 1,
      },
    })

    cy.dataCy('item-no').should('contain', '1')
    cy.dataCy('first-name').should('contain', 'First name')
    cy.dataCy('last-name').should('contain', 'Last name')
  })
})
