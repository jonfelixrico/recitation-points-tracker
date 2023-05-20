import DialogWrapper from 'app/test/cypress/wrappers/DialogWrapper.vue'
import CreateClassDialog from 'components/class-list/CreateClassDialogV2.vue'

describe('CreateClassDialog', () => {
  it('todo add message', () => {
    cy.mount(DialogWrapper, {
      props: {
        component: CreateClassDialog,
      },
    })
  })
})
