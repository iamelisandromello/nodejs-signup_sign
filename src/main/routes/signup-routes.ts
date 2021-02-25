import {
  EmailValidator,
  AddAccount,
  AddAccountParams,
  AccountModel
} from '@/presentation/controllers/signup/signup-dependencies'
import { Router } from 'express'
import { SignUpController } from '@/presentation/controllers/signup/signup'
import { adaptRoute } from '../adapters/express-route-adapter'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      }
      return Promise.resolve(fakeAccount)
    }
  }
  return new AddAccountStub()
}

const controller = new SignUpController(makeEmailValidator(), makeAddAccount())
export default (router: Router): void => {
  router.post('/signup', adaptRoute(controller))
}
