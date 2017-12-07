import '../env'
import { expect } from 'chai';
import { signUp } from '../../src/actions';

describe('function signUp ', () => {
  it('should create a new row in the users table', () => {
    return signUp({
      name: "Jane Doe",//will need to change info each time a test is ran
      email: "janedoe@test.com",
      password: "12345"
    })
    .then((results) => {
      expect(results).to.be.an('object')
    })
  })
  it('should equal the name of the new member', () => {
    return signUp({
      name: "Jane",//will need to change info each time a test is ran
      email: "jane@test.com",
      password: "12345"
    })
    .then((results) => {
      expect(results.name).to.equal('Jane')
    })
  })
})
