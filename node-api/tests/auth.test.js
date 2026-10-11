import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach
} from "vitest";

import request from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";


beforeAll(async () => {
  await connectDB();
});


afterEach(async () => {
  await User.deleteMany({
    email: { $regex: "^test-" }
  });
});


afterAll(async () => {
  await mongoose.connection.close();
});


describe("POST /auth/register", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({
        name: "Test User",
        email: "test-register@example.com",
        password: "secret123"
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Test User");
    expect(response.body.email).toBe(
      "test-register@example.com"
    );
    const userInDB = await User.findOne({
      email: "test-register@example.com"
    });
    const isPasswordCorrect = await bcrypt.compare(
      "secret123",
      userInDB.password
    );

    expect(isPasswordCorrect).toBe(true);

    expect(userInDB).not.toBeNull();
    expect(userInDB.password).not.toBe("secret123");
  });
    it("should return 409 when email already exists", async () => {
    const user = {
      name: "Test User",
      email: "test-duplicate@example.com",
      password: "secret123"
    };

    const firstResponse = await request(app)
      .post("/auth/register")
      .send(user);

    expect(firstResponse.status).toBe(201);

    const duplicateResponse = await request(app)
      .post("/auth/register")
      .send(user);

    expect(duplicateResponse.status).toBe(409);
    expect(duplicateResponse.body.message).toBe(
      "User with this email already exists"
    );
  });
});

describe("POST /auth/login", () => {
  it("should login user and return token", async () => {
    await request(app)
      .post("/auth/register")
      .send({
        name: "Test Login User",
        email: "test-login@example.com",
        password: "secret123"
      });

    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "test-login@example.com",
        password: "secret123"
      });

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(
      "test-login@example.com"
    );
    expect(response.body).toHaveProperty("token");
  });
  it("should return 401 for incorrect password", async () => {
    await request(app)
      .post("/auth/register")
      .send({
        name: "Test Wrong Password",
        email: "test-wrong-password@example.com",
        password: "secret123"
      });

    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "test-wrong-password@example.com",
        password: "wrongpassword"
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "Invalid email or password"
    );
  });
  it("should return 401 when user does not exist", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "test-does-not-exist@example.com",
        password: "secret123"
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "Invalid email or password"
    );
  });
  it("should return 400 when email or password is missing", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "test-login@example.com"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Email and password are required"
    );
  });
  it("should return 400 for short password", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({
        name: "Test User",
        email: "test-short-password@example.com",
        password: "123"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Password must be at least 8 characters"
    );
  });
});