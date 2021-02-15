import { Controller } from '../interfaces/controller'
import { HttpRequest, HttpResponse } from '../interfaces/http'
import { MissingParamError } from '@/presentation/errors/missing-param-error'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }

    const httpResponse = {
      statusCode: 200,
      body: { ok: 'ok' }
    }
    return httpResponse
  }
}
