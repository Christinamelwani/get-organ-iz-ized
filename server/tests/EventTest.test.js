const request = require("supertest");
const app = require("../app");
const { Event, EventInstance, Category, RecurringType } = require("../models");

beforeAll(async () => {
  const categories = require("../data/categories.json");
  categories.forEach((category) => {
    category.createdAt = new Date();
    category.updatedAt = new Date();
  });
  await Category.bulkCreate(categories);

  const recurringTypes = require("../data/recurringTypes.json");
  recurringTypes.forEach((recurringType) => {
    recurringType.createdAt = new Date();
    recurringType.updatedAt = new Date();
  });
  await RecurringType.bulkCreate(recurringTypes);
});

describe("Post a recurring event", () => {
  const data = {
    title: "study regularly",
    CategoryId: 1,
    startTime: "12:20:00",
    endTime: "20:20:00",
    isRecurring: true,
    RecurringId: 1,
  };
  test("Should create a recurring event", async () => {
    const response = await request(app).post("/events").send(data);
    expect(response.statusCode).toBe(201);
  });
});

describe("Post a one-time event", () => {
  const data = {
    title: "study once",
    CategoryId: 1,
    duration: "03:00:00",
    isRecurring: false,
  };
  test("Should create a one-time event", async () => {
    const response = await request(app).post("/events").send(data);
    expect(response.statusCode).toBe(201);
  });
});

describe("Post a second one-time event", () => {
  const data = {
    title: "study again",
    CategoryId: 1,
    duration: "02:00:00",
    isRecurring: false,
  };
  test("Should create a one-time event", async () => {
    const response = await request(app).post("/events").send(data);
    expect(response.statusCode).toBe(201);
  });

  describe("Post a one-time event that doesn't fit", () => {
    const data = {
      title: "study again again",
      CategoryId: 1,
      duration: "08:00:00",
      isRecurring: false,
    };
    test("Should create a one-time event", async () => {
      const response = await request(app).post("/events").send(data);
      expect(response.statusCode).toBe(201);
    });
  });

  test("Should get all of today's events", async () => {
    const response = await request(app).get("/events").query({
      date: "12-28-2022",
    });
    expect(response.statusCode).toBe(200);
  });
});

afterAll(async () => {
  await RecurringType.destroy({
    where: {},
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  await Category.destroy({
    where: {},
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  await Event.destroy({
    where: {},
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  await EventInstance.destroy({
    where: {},
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
});
