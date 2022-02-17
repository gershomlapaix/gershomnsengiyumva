
const request = require("supertest");
const chai = require("chai");
const http = require("chai-http");

const { expect } = chai;

const Transaction = require("../models/transactionsModel");
const app = require("../app");
const { mongoose } = require("mongoose");

chai.use(http);

describe("Transaction endpoint", () => {
    let data = [
        {
            "_id": "620e5b06290f270657188a10",
            "meterNumber": 453655,
            "transactionAmount": 3234,
            "__v": 0
        },
        {
            "_id": "620e5db9e98c2e3316cdf089",
            "meterNumber": 753534,
            "transactionAmount": 4356,
            "tokenExpires": "2022-02-17T14:42:15.686Z",
            "__v": 0
        },
        {
            "_id": "620e5e228756533a448b2bb5",
            "meterNumber": 753424,
            "transactionAmount": 456,
            "tokenExpires": "2022-02-17T14:44:00.591Z",
            "__v": 0
        },
        {
            "_id": "620e5e306d35009050c76595",
            "meterNumber": 384628,
            "transactionAmount": 12000,
            "tokenExpires": "2022-02-17T14:44:14.332Z",
            "__v": 0
        },
     
       
    ];

    let emptyArr = [];

    test("GET /api/v1/transaction --> should return 200 on sucess", async () => {
        jest.spyOn(Transaction, "find").mockReturnValue(Promise.resolve(data));
        const res = await chai.request(app).get("/api/v1/transaction");
        expect(res.status).to.equal(200);
        await mongoose.disconnect();
    });

    test("GET /api/v1/transaction --> should return 453655 as a meter number", async () => {
        jest.spyOn(Transaction, "find").mockReturnValue(Promise.resolve(data));
        const res = await chai.request(app).get("/api/v1/transaction");
        expect(res.body[0].meterNumber).to.equal(453655);
    });

    test("GET /api/v1/transaction --> should return 404 if there is no empty data", async () => {
        jest.spyOn(Transaction, "find").mockReturnValue(Promise.resolve(emptyArr));
        const res = await chai.request(app).get("/api/v1/transaction");
        expect(res.status).to.equal(404);
    });

    it("POST /api/v1/transaction--> should make new transaction successfully", async () => {
        jest.spyOn(Transaction, "create").mockReturnValue(Promise.resolve(true));

        const res = await request(app).post("/api/tutorials/").send(
            {
                transactionAmount:450,
                meterNumber:"58595"
            }
        );

        it("POST  /api/v1/transaction --> should create tutorial successfully", async () => {
            jest.spyOn(Tutorial, "create").mockReturnValue(Promise.resolve(true));
    
            const res = await request(app).post(" /api/v1/transaction").send( {
                transactionAmount:450,
                meterNumber:"58595"
            });
    
            expect(res.statusCode).to.equal(201);
        });
    });