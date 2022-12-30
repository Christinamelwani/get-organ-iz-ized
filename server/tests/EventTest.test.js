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

describe("Add a routine daily recurring event", () => {
  const data = {
    title: "Brush teeth",
    CategoryId: 3,
    startTime: "10:00:00",
    endTime: "10:05:00",
    isRecurring: true,
    RecurringId: 1,
  };
  test("Should create a recurring event", async () => {
    const response = await request(app).post("/events").send(data);
    expect(response.statusCode).toBe(201);
  });
});

describe("Add a routine weekly recurring event", () => {
  const data = {
    title: "Revise everything learned",
    CategoryId: 3,
    startTime: "20:00:00",
    endTime: "22:05:00",
    isRecurring: true,
    RecurringId: 2,
  };
  test("Should create a recurring event", async () => {
    const response = await request(app).post("/events").send(data);
    expect(response.statusCode).toBe(201);
  });
});

describe("Add a routine monthly recurring event", () => {
  const data = {
    title: "Revise everything learned this month",
    CategoryId: 3,
    startTime: "10:00:00",
    endTime: "12:05:00",
    isRecurring: true,
    RecurringId: 3,
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
});

describe("Post a one-time event that doesn't fit", () => {
  const data = {
    title: "study again again",
    CategoryId: 1,
    duration: "08:00:00",
    isRecurring: false,
  };
  test("Should reject", async () => {
    const response = await request(app).post("/events").send(data);
    expect(response.statusCode).toBe(400);
  });
});

describe("Post a one-time event that fits", () => {
  const data = {
    title: "study for the last time",
    CategoryId: 1,
    duration: "01:00:00",
    isRecurring: false,
  };
  test("Should accept", async () => {
    const response = await request(app).post("/events").send(data);
    expect(response.statusCode).toBe(201);
  });
});

test("Should get all of today's events", async () => {
  const response = await request(app).get("/events").query({
    date: "12-29-2022",
  });
  expect(response.statusCode).toBe(200);
});

describe("Reject an event with no title", () => {
  const data = {
    CategoryId: 1,
    duration: "08:00:00",
    isRecurring: false,
  };
  test("Should reject", async () => {
    const response = await request(app).post("/events").send(data);
    expect(response.statusCode).toBe(400);
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
