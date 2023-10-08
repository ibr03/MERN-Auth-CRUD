const chai = require('chai');
const sinon = require('sinon');
const Record = require('../Models/Record');
const recordController = require('../Controllers/RecordController');
const { expect } = chai;

describe('RecordController', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('createRecord', () => {
    it('should create a new record', async () => {
      const req = {
        body: {
          patientName: 'John Doe',
          age: 30,
          medicalHistory: 'Some history',
          lastVisit: '2023-10-08',
        },
      };
      const res = {
        status: function (statusCode) {
          this.statusCode = statusCode;
          return this;
        },
        json: function (data) {
          this.body = data;
        },
      };
      const next = sinon.spy();

      sinon.stub(Record.prototype, 'save').resolves({});

      await recordController.createRecord(req, res, next);

      expect(res.statusCode).to.equal(201);
      expect(res.body.message).to.equal('Record created successfully');
      expect(res.body.success).to.be.true;
      expect(next.calledOnce).to.be.true;
    });

    it('should handle errors during record creation', async () => {
      const req = {
        body: {
          // empty body object to trigger an error
        },
      };
      const res = {
        status: function (statusCode) {
          this.statusCode = statusCode;
          return this;
        },
        json: function (data) {
          this.body = data;
        },
      };
      const next = sinon.spy();

      sinon.stub(Record.prototype, 'save').rejects(new Error('Test error'));

      await recordController.createRecord(req, res, next);

      expect(res.statusCode).to.equal(500);
      expect(res.body.error).to.equal('An error occurred');
      expect(next.calledOnce).to.be.false;
    });
  });

  describe('updateRecord', () => {
    it('should update a record', async () => {
      const req = {
        params: {
          id: 'some-record-id',
        },
        body: {
            patientName: 'JJoe Dane',
            age: 30,
            medicalHistory: 'Some history',
            lastVisit: '2023-10-08',
        },
      };
      const res = {
        status: function (statusCode) {
          this.statusCode = statusCode;
          return this;
        },
        json: function (data) {
          this.body = data;
        },
      };
      const next = sinon.spy();

      sinon.stub(Record, 'findByIdAndUpdate').resolves({});

      await recordController.updateRecord(req, res, next);

      expect(res.statusCode).to.equal(204);
      expect(res.body.message).to.equal('User updated successfully');
      expect(res.body.success).to.be.true;
      expect(next.calledOnce).to.be.true;
    });

    it('should handle errors during record update', async () => {
      const req = {
        params: {
          id: 'some-record-id',
        },
        body: {
          patientName: "",
          age: "gr" // erroneous data
        },
      };
      const res = {
        status: function (statusCode) {
          this.statusCode = statusCode;
          return this;
        },
        json: function (data) {
          this.body = data;
        },
      };
      const next = sinon.spy();

      sinon.stub(Record, 'findByIdAndUpdate').rejects(new Error('Test error'));

      await recordController.updateRecord(req, res, next);

      expect(res.statusCode).to.equal(500);
      expect(res.body.error).to.equal('An error occurred');
      expect(next.calledOnce).to.be.false;
    });
  });

  describe('deleteRecord', () => {
    it('should delete a record', async () => {
      const req = {
        params: {
          id: 'some-record-id',
        },
      };
      const res = {
        status: function (statusCode) {
          this.statusCode = statusCode;
          return this;
        },
        json: function (data) {
          this.body = data;
        },
      };
      const next = sinon.spy();

      sinon.stub(Record, 'findByIdAndRemove').resolves({});

      await recordController.deleteRecord(req, res, next);

      expect(res.statusCode).to.equal(204);
      expect(res.body.message).to.equal('User deleted successfully');
      expect(res.body.success).to.be.true;
      expect(next.calledOnce).to.be.true;
    });

    it('should handle errors during record deletion', async () => {
      const req = {
        params: {
          id: 'some-record-id',
        },
      };
      const res = {
        status: function (statusCode) {
          this.statusCode = statusCode;
          return this;
        },
        json: function (data) {
          this.body = data;
        },
      };
      const next = sinon.spy();

      sinon.stub(Record, 'findByIdAndRemove').rejects(new Error('Test error'));

      await recordController.deleteRecord(req, res, next);

      expect(res.statusCode).to.equal(500);
      expect(res.body.error).to.equal('An error occurred');
      expect(next.calledOnce).to.be.false;
    });
  });
});
