const axios = require('axios');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';
const HABITS_URL = `${BASE_URL}/api/habits`;

const log = title => console.log(`\n🔹 ${title}`);
const pass = msg => console.log(`    ${msg}`);
const fail = (msg, err) => {
  console.log(`    ${msg}`);
  if (err?.response) {
    console.log(`      status: ${err.response.status}`);
    console.log(`      response:`, err.response.data);
  } else {
    console.log(`      error:`, err.message);
  }
  process.exitCode = 1;
};

const expect = (condition, message) => { if (!condition) throw new Error(message); };

// Create a temporary habit for a given user
async function createHabitForUser(userId) {
  const habitData = {
    userId,
    name: `Habit_${Date.now()}`,
    description: "temp habit for testing",
    reminder: "morning",
    frequency: "daily",
    category: "other"
  };
  const res = await axios.post(HABITS_URL, habitData);
  return res.data.data;
}

// Generate a valid-looking but non-existing ObjectId
const fakeId = () => "ffffffffffffffffffffffff";

(async () => {
  console.log(`\n Running Tests`);
  console.log(`Using API: ${BASE_URL}`);

  const testUserId = `user_${Date.now()}`;

  // Create habits for this user
  let habit1, habit2;
  try {
    habit1 = await createHabitForUser(testUserId);
    habit2 = await createHabitForUser(testUserId);
    pass(`Created 2 habits for user ${testUserId}`);
  } catch (err) {
    return fail("Could not create test habits", err);
  }

  // -------------------------
  // TEST GROUP 1: GET /api/habits/user/:userId
  // -------------------------
  log("TEST: GET /api/habits/user/:userId");

  // Test 1: Should return 200 and an array
  try {
    const res = await axios.get(`${HABITS_URL}/user/${testUserId}`);
    expect(res.status === 200, "Expected 200");
    expect(Array.isArray(res.data.data), "Expected data to be an array");
    pass("Returns list of habits for user");
  } catch (err) {
    fail("Failed to fetch user habits", err);
  }

  // Test 2: Returned habits should belong to the correct user
  try {
    const res = await axios.get(`${HABITS_URL}/user/${testUserId}`);
    res.data.data.forEach(h => expect(h.userId === testUserId, "Habit userId mismatch"));
    pass("All habits belong to the correct user");
  } catch (err) {
    fail("Returned habits do not match user", err);
  }

  // Test 3: Non-existing user returns empty array (not error)
  try {
    const res = await axios.get(`${HABITS_URL}/user/no_such_user_123`);
    expect(Array.isArray(res.data.data), "Expected array");
    expect(res.data.data.length === 0, "Expected empty list");
    pass("Returns empty list for unknown user");
  } catch (err) {
    fail("Unexpected behavior for unknown user", err);
  }

  // -------------------------
  // TEST GROUP 2: GET /api/habits/:id
  // -------------------------
  log("TEST: GET /api/habits/:id");

  // Test 1: Valid ID returns correct record
  try {
    const res = await axios.get(`${HABITS_URL}/${habit1._id}`);
    expect(res.status === 200, "Expected 200");
    expect(res.data.data._id === habit1._id, "Mismatch habit ID");
    pass("Valid ID returns the correct habit");
  } catch (err) {
    fail("Failed to fetch valid habit by ID", err);
  }

  // Test 2: Fake but well-formed ID → 404
  try {
    await axios.get(`${HABITS_URL}/${fakeId()}`);
    fail("Expected 404, but got success");
  } catch (err) {
    if (err.response?.status === 404) pass("Non-existent ID correctly returns 404");
    else fail("Incorrect status for non-existent ID", err);
  }

  // Test 3: Invalid ID format → 500
  try {
    await axios.get(`${HABITS_URL}/bad-id-format`);
    fail("Expected error for invalid ID");
  } catch (err) {
    if (err.response?.status === 500) pass("Invalid ID format correctly returns 500");
    else fail("Unexpected behavior for invalid ID", err);
  }

  //  Cleanup
  try {
    await axios.delete(`${HABITS_URL}/${habit1._id}`);
    await axios.delete(`${HABITS_URL}/${habit2._id}`);
    pass("Removed temporary habits");
  } catch (_) {}

  console.log("\n All tests completed.\n");
})();