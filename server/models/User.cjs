const BaseModel = require('./BaseModel.cjs');
const objectionUnique = require('objection-unique');
const encrypt = require('../lib/secure.cjs');

const unique = objectionUnique({
  fields: ['email'], 
});

module.exports = class User extends unique(BaseModel) {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password', 'firstName', 'lastName'],
      properties: {
        id: {
          type: 'integer', 
        },
        email: {
          type: 'string', format: 'email', 
        },
        password: {
          type: 'string', minLength: 3, 
        },
        firstName: {
          type: 'string', minLength: 1, 
        },
        lastName: {
          type: 'string', minLength: 1, 
        },
      },
    };
  }

  set password(value) {
    this.passwordDigest = encrypt(value);
  }

  verifyPassword(password) {
    return encrypt(password) === this.passwordDigest;
  }

  getUserId(value) {
    return value.id;
  }
};