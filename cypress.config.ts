import registerCodeCoverageTasks from '@cypress/code-coverage/task'
import { injectQuasarDevServerConfig } from '@quasar/quasar-app-extension-testing-e2e-cypress/cct-dev-server'
import { defineConfig } from 'cypress'

export default defineConfig({
  fixturesFolder: 'test/cypress/fixtures',
  screenshotsFolder: 'test/cypress/screenshots',
  videosFolder: 'test/cypress/videos',
  /*
   * Disabled to prevent CI from generating videos.
   * This is to save up on resources on the server that we're running Cypress on.
   */
  video: false,

  env: {
    FIREBASE_AUTH_EMULATOR_HOST: 'http://localhost:9099',
    FIRESTORE_EMULATOR_HOST: 'http://localhost:9098',
  },

  e2e: {
    setupNodeEvents(on, config) {
      registerCodeCoverageTasks(on, config)
      return config
    },
    baseUrl: 'http://localhost:9000/',
    supportFile: 'test/cypress/support/e2e.ts',
    specPattern: 'test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
  component: {
    setupNodeEvents(on, config) {
      registerCodeCoverageTasks(on, config)
      return config
    },
    supportFile: 'test/cypress/support/component.ts',
    specPattern: 'test/cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    indexHtmlFile: 'test/cypress/support/component-index.html',
    devServer: injectQuasarDevServerConfig(),
  },
})
