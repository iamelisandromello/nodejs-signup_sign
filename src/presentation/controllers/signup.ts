import { Controller } from '../interfaces/controller'
import { HttpRequest, HttpResponse } from '../interfaces/http'
import { EmailValidator } from '@/presentation/interfaces/email-validator'
import { MissingParamError, InvalidParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { AddAccount } from '@/domain/usecases/account/add-account'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, name, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccount.add({
        name: name,
        email: email,
        password: password
      })
    } catch (error) {
      return {
        statusCode: 500,
        body: serverError(error)
      }
    }
  }
}
