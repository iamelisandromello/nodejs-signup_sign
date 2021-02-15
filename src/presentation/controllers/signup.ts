import { Controller } from '../interfaces/controller'
import { HttpRequest, HttpResponse } from '../interfaces/http'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }

    const httpResponse = {
      statusCode: 200,
      body: { ok: 'ok' }
    }
    return httpResponse
  }
}
