const sinon = require('sinon');
const bcrypt = require('bcrypt');
const AuthController = require('../Controllers/AuthController');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');

describe('AuthController', () => {
    let req, res
    let findOneStub;
    let userCreateStub;
    let createTokenStub;
    let bcryptCompareStub;

    describe('Signup', () => {
        beforeEach(() => {
            req = {
                body: {
                    email: 'test@example.com',
                    password: 'testpassword',
                    username: 'testuser',
                    createdAt: new Date(),
                },
            };

            res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
                cookie: sinon.stub(),
            };

            findOneStub = sinon.stub(User, 'findOne');
            userCreateStub = sinon.stub(User, 'create');
            createTokenStub = sinon.stub(jwt, 'sign');
        });
    
        afterEach(() => {
            findOneStub.restore();
            userCreateStub.restore();
            createTokenStub.restore();
        });

        it('should create a new user and return a token', async () => {
            // Mock the User model's methods
            findOneStub.resolves(null);
            userCreateStub.resolves({ _id: 'someUserId' });

            // Stub createSecretToken to return a token
            createTokenStub.returns('someToken');

            await AuthController.Signup(req, res, () => {});

            sinon.assert.calledWith(res.status, 201);
            sinon.assert.calledWith(res.json, { message: 'User signed in successfully', success: true, user: { _id: 'someUserId' } });
            sinon.assert.calledWith(res.cookie, 'token', 'someToken', { withCredentials: true, httpOnly: false });
        });

        it('should return an error message if user already exist', async () => {
            const existingUser = {
                _id: 'someUserId',
                password: 'hashedPassword', 
            };

            findOneStub.resolves(existingUser);
            await AuthController.Signup(req, res, () => {});

            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.json, { message: "User already exists" });
        });

        it('should return an error message if incomplete details entered', async () => {
            // Incomplete user details
            req = {
                body: {
                    email: 'test@example.com',
                },
            };

            await AuthController.Signup(req, res, () => {});
            
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.json, { error: 'Enter all required details.' });
        });
    });

    describe('Login', () => {
        beforeEach(() => {
            req = {
                body: {
                    email: 'test@example.com',
                    password: 'testpassword',
                },
            };

            res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
                cookie: sinon.stub(),
            };

            findOneStub = sinon.stub(User, 'findOne');
            createTokenStub = sinon.stub(jwt, 'sign');
            bcryptCompareStub = sinon.stub(bcrypt, 'compare');
        });
    
        afterEach(() => {
            findOneStub.restore();
            createTokenStub.restore();
            bcryptCompareStub.restore();
        })
        it('should log in an existing user and return a token', async () => {
            const user = {
                _id: 'someUserId',
                password: 'hashedPassword', 
            };

            // Mock the User model's methods
            findOneStub.resolves(user);
            bcryptCompareStub.resolves(true);

            // Stub createSecretToken to return a token
            createTokenStub.returns('someToken');

            await AuthController.Login(req, res, () => {});

            sinon.assert.calledWith(res.status, 201);
            sinon.assert.calledWith(res.json, { message: 'User logged in successfully', success: true });
            sinon.assert.calledWith(res.cookie, 'token', 'someToken', { withCredentials: true, httpOnly: false });
        });
        
        it('should return an error message if incomplete details entered', async () => {
            // Incomplete user details
            req = {
                body: {
                    email: 'test@example.com',
                },
            };

            await AuthController.Login(req, res, () => {});
            
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.json, { error: 'Enter all required details.' });
        });

        it('should return an error message if incorrect email or password entered', async () => {
            findOneStub.resolves(null);
            bcryptCompareStub.resolves(false);
            await AuthController.Login(req, res, () => {});

            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.json, { message:'Incorrect password or email' });
        });
    });
});
