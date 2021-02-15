import { Router } from 'express'
import { SignUpController } from '@/presentation/controllers/signup'
import { adaptRoute } from '../adapters/express-route-adapter'

const controller = new SignUpController()
export default (router: Router): void => {
  router.post('/signup', adaptRoute(controller))
}
