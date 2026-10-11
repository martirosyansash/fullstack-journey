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
import jwt from "jsonwebtoken";

import app from "../app.js";
import { connectDB } from "../config/db.js";
import Product from "../models/product.js";
import User from "../models/User.js";


async function createAdminToken() {
  const admin = await User.create({
    name: "Test Admin",
    email: `test-admin-${Date.now()}@example.com`,
    password: "hashed-password-for-test",
    role: "admin"
  });

  const token = jwt.sign(
    { userId: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
}


beforeAll(async () => {
  await connectDB();
});


afterAll(async () => {
  await mongoose.connection.close();
});


afterEach(async () => {
  await Product.deleteMany({
    name: { $regex: "^test-" }
  });

  await User.deleteMany({
    email: { $regex: "^test-" }
  });
});


describe("GET /products/:id", () => {
  it("should return 400 for invalid product id", async () => {
    const response = await request(app)
      .get("/products/abc");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid product ID");
  });
});


describe("Unknown routes", () => {
  it("should return 404 for unknown route", async () => {
    const response = await request(app)
      .get("/something-that-does-not-exist");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Route not found");
  });
});


describe("GET /products", () => {
  it("should return products and pagination", async () => {
    const response = await request(app)
      .get("/products?page=2&limit=3");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.products)).toBe(true);
    expect(response.body).toHaveProperty("pagination");
    expect(response.body.pagination.currentPage).toBe(2);
    expect(response.body.pagination.limit).toBe(3);
  });
});


describe("GET /products query validation", () => {
  it("should return 400 for invalid page", async () => {
    const response = await request(app)
      .get("/products?page=0");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Page must be a positive integer"
    );
  });


  it("should return 400 for invalid sort", async () => {
    const response = await request(app)
      .get("/products?sort=banana");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "sort must be low or high, newest or oldest"
    );
  });
});


describe("POST /products", () => {
  it("should create a new product", async () => {
    const token = await createAdminToken();

    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test-laptop",
        price: 1500,
        description: "Test laptop for automated API testing",
        category: "electronics",
        stock: 5
      });

    const productInDB = await Product.findOne({
      name: "test-laptop"
    });

    expect(productInDB).not.toBeNull();
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("test-laptop");
  });


  it("returns 401 when creating a product without token", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        name: "test-auth-product",
        price: 100,
        description: "Product created for authentication testing",
        category: "electronics",
        stock: 5
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "Not authorized, no token"
    );
  });


  it("returns 403 when regular user tries to create a product", async () => {
    const user = await User.create({
      name: "Test User",
      email: "test-user@example.com",
      password: "hashed-password-for-test",
      role: "user"
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test-user-product",
        price: 100,
        description: "Product created during authorization testing",
        category: "electronics",
        stock: 5
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe(
      "Admin access required"
    );
  });


  it("allows admin user to create a product", async () => {
    const token = await createAdminToken();

    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test-admin-product",
        price: 200,
        description: "Product created by an authenticated admin",
        category: "electronics",
        stock: 10
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("test-admin-product");
  });
});


describe("POST /products invalid product", () => {
  it("should return 400 for invalid product's stock", async () => {
    const token = await createAdminToken();

    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test-bad-stock",
        price: 100,
        description: "Product with invalid negative stock",
        category: "electronics",
        stock: -1
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain("stock");
  });
});


describe("POST /products duplicate", () => {
  it("should return 409 for duplicate product name", async () => {
    const token = await createAdminToken();

    const product = {
      name: "test-duplicate-phone",
      price: 900,
      description: "Test phone for duplicate product testing",
      category: "electronics",
      stock: 5
    };

    const firstResponse = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send(product);

    expect(firstResponse.status).toBe(201);

    const duplicateResponse = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send(product);

    expect(duplicateResponse.status).toBe(409);
    expect(duplicateResponse.body.message).toBe(
      "Product with this name already exists"
    );
  });
});


describe("PATCH /products/:id", () => {
  it("should update a product", async () => {
    const token = await createAdminToken();

    const createResponse = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test-patch-laptop",
        price: 1000,
        description: "Laptop created for PATCH testing",
        category: "electronics",
        stock: 5
      });

    const productId = createResponse.body._id;

    const updateResponse = await request(app)
      .patch(`/products/${productId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        price: 1200,
        stock: 8
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.price).toBe(1200);
    expect(updateResponse.body.stock).toBe(8);

    const productInDB = await Product.findById(productId);

    expect(productInDB.price).toBe(1200);
    expect(productInDB.stock).toBe(8);
  });


  it("should return 400 for invalid patch", async () => {
    const token = await createAdminToken();

    const createResponse = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test-patch-laptop",
        price: 1000,
        description: "Laptop created for PATCH testing",
        category: "electronics",
        stock: 5
      });

    const productId = createResponse.body._id;

    const updateResponse = await request(app)
      .patch(`/products/${productId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        stock: -1
      });

    expect(updateResponse.status).toBe(400);
    expect(updateResponse.body.message).toContain("stock");
  });


  it("should return 400 for invalid field", async () => {
    const token = await createAdminToken();

    const createResponse = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test-patch-laptop",
        price: 1000,
        description: "Laptop created for PATCH testing",
        category: "electronics",
        stock: 5
      });

    const productId = createResponse.body._id;

    const updateResponse = await request(app)
      .patch(`/products/${productId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        color: "black"
      });

    expect(updateResponse.status).toBe(400);
    expect(updateResponse.body.message).toBe(
      "One or more fields are not allowed"
    );
  });
});


describe("DELETE /products/:id", () => {
  it("should delete a product", async () => {
    const token = await createAdminToken();

    const createResponse = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test-delete",
        price: 1000,
        description: "Laptop created for DELETE testing",
        category: "electronics",
        stock: 5
      });

    const productId = createResponse.body._id;

    const deletedResponse = await request(app)
      .delete(`/products/${productId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deletedResponse.status).toBe(200);
    expect(deletedResponse.body.message).toBe(
      "Product deleted"
    );

    const productInDB = await Product.findById(productId);

    expect(productInDB).toBeNull();
  });


  it("should return 404 for delete with fake ID", async () => {
    const token = await createAdminToken();

    const fakeId = "507f1f77bcf86cd799439011";

    const response = await request(app)
      .delete(`/products/${fakeId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(
      "Product not found"
    );
  });


  it("should return 400 for invalid id for deleting", async () => {
    const token = await createAdminToken();

    const response = await request(app)
      .delete("/products/abc")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Invalid product ID"
    );
  });
});