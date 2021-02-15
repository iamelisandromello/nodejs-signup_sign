import app from '@/main/config/app'
import request from 'supertest'

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Elisandro Mello',
        email: 'elisandromello@mail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
