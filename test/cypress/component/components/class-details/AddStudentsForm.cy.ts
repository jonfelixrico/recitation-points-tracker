import AddStudentsInput from 'src/components/class-details/AddStudentsInput.vue'

describe('AddStudentsInput', () => {
  it('should display data in the model', () => {
    cy.mount(AddStudentsInput, {
      props: {
        modelValue: [],
      },
    })
  })
})
