const NodeEnvironment = require('jest-environment-node');
const fs = require('fs');
const path = require('path');
const app = require('../config/app');
const { getDB } = require('../config/db');

class CustomEnv extends NodeEnvironment {
  async setup() {
    await super.setup();

    const statePath = path.resolve(__dirname, './__test_state.json');
    if (fs.existsSync(statePath)) {
      const shared = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
      this.global.__TEST__ = shared;
      this.global.__TEST__.app = app;
      this.global.__TEST__.db = await getDB();
    }
  }

  async teardown() {
    await super.teardown();
  }
}

module.exports = CustomEnv;
