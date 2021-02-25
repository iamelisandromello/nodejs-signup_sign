import {
  Controller,
  HttpRequest,
  HttpResponse,
  EmailValidator,
  AddAccount
} from './signup-dependencies'
import { MissingParamError, InvalidParamError } from '@/presentation/errors'
import { badRequest, serverError, success } from '@/presentation/helpers/http/http-helper'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({
        name: name,
        email: email,
        password: password
      })

      return success(account)
    } catch (error) {
      return {
        statusCode: 500,
        body: serverError(error)
      }
    }
  }
}
