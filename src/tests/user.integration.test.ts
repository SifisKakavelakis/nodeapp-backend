import { TestServer } from './testSetup'
import userRouter from '../routes/user.routes';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'test_secret';

const server = new TestServer();
server.app.use('/users', userRouter); 

describe('User API Tests', () => {
  let token: string;
  
  beforeAll(async() => {
    await server.start();
    const hash = await bcrypt.hash("123456", 10);
    let user = User.create({username: "testUser", password: hash, roles[]});
    const payload = { username: user.username, email:(await user).email, roles: user.roles };
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn:'1h'});
  });

  // afterAll(async() => {await server.stop()});

  test("GET /users -> returns all users", async() => {
    const res = await server.request.get('/users');
    console.log(res);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true)
  });

  test('POST /users -> creates a user', async() => {
    const res = await server.request.post('/users');
  })
  
});