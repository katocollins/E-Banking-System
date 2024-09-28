const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const Account = require("../models/accountModel");
const {
  createAccount,
  deleteAccount,
  getAccount,
  transfer,
  deposit,
  withdraw,
} = require("../controllers/accountController");
const app = express();

// Use the actual app setup here
app.use(express.json());

// Sample routes for testing
app.post("/api/account/create", createAccount);
app.get("/api/account/:id", getAccount);
app.delete("/api/account/:id", deleteAccount);
app.put("/api/account/transfer/:from_id/:to_id", transfer);
app.put("/api/account/deposit/:id", deposit);
app.put("/api/account/withdraw/:id", withdraw);

beforeAll(async () => {
  // Connect to a test database
  await mongoose.connect("mongodb://localhost/test_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Cleanup and close the database connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Account API", () => {
  let accountId;

  test("Create Account", async () => {
    const res = await request(app)
      .post("/api/account/create")
      .send({ id: "clientId1", balance: 100 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("client_id");
    accountId = res.body.client_id; // Store created account ID
  });

  test("Get Account", async () => {
    const res = await request(app).get(`/api/account/${accountId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("client_id", accountId);
  });

  test("Deposit Money", async () => {
    const res = await request(app)
      .put(`/api/account/deposit/${accountId}`)
      .send({ depositAmount: 50 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.balance).toEqual(150);
  });

  test("Withdraw Money", async () => {
    const res = await request(app)
      .put(`/api/account/withdraw/${accountId}`)
      .send({ withdrawAmount: 30 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.balance).toEqual(120);
  });

  test("Delete Account", async () => {
    const res = await request(app).delete(`/api/account/${accountId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", accountId);
  });
});
