import AddStudentsForm from 'src/components/class-details/AddStudentsForm.vue'

describe('AddStudentsForm', () => {
  it('should display data in the model', () => {
    cy.mount(AddStudentsForm, {
      props: {
        modelValue: [],
      },
    })
  })
})
