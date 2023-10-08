const chai = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const { userVerification } = require('../Middlewares/AuthMiddleware');

const { expect } = chai;

describe('Auth Middleware', () => {
  let mockRequest;
  let mockResponse;
  let jwtVerifyStub;
  let findByIdStub;

  beforeEach(() => {
    mockRequest = {
      cookies: {
        token: 'valid-token',
      },
    };
    mockResponse = {
      json: sinon.stub(),
      status: sinon.stub().returnsThis(),
    };
    jwtVerifyStub = sinon.stub(jwt, 'verify');
    findByIdStub = sinon.stub(User, 'findById');
  });

  afterEach(() => {
    jwtVerifyStub.restore();
    findByIdStub.restore();
  });

  it('should return an error message if no token is provided', async () => {
    mockRequest.cookies.token = undefined;
    await userVerification(mockRequest, mockResponse, () => {});

    expect(mockRequest.user).to.be.undefined;
    sinon.assert.calledWith(mockResponse.json, { status: false, message: 'Unauthorized' });
  });

  it('should return an error message if token is invalid', async () => {
    mockRequest.cookies.token = 'invalid-token';
    jwtVerifyStub.throws(new Error('Invalid token'));

    await userVerification(mockRequest, mockResponse, () => {});

    expect(mockRequest.user).to.be.undefined;
    sinon.assert.calledWith(mockResponse.json, { status: false, message: 'Unauthorized' });
  });

  it('should return a 401 status and error message if a valid token is provided but the user is not found', async () => {
    const userData = { id: 'user-id' };
    jwt.verify.returns(userData);
    findByIdStub.onFirstCall().resolves(null);

    await userVerification(mockRequest, mockResponse, () => {});

    sinon.assert.calledWith(mockResponse.status, 401);
    sinon.assert.calledWith(mockResponse.json, { status: false, message: 'Unauthorized' });
  });

  it('should attach the user to the request object if token is valid', async () => {
    const userData = { id: 'user-id' };
    jwt.verify.returns(userData);
    const user = { _id: 'user-id', username: 'testUser' };
    findByIdStub.resolves(user);

    await userVerification(mockRequest, mockResponse, () => {});

    expect(mockRequest.user).to.equal(user.username);
    sinon.assert.notCalled(mockResponse.status);
    sinon.assert.notCalled(mockResponse.json)
  });
});
