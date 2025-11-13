const axios = require('axios');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';
const HABITS_URL = `${BASE_URL}/api/habits`;

const log = title => console.log(`\n🔹 ${title}`);
const pass = (msg, data) => {
  console.log(`     ${msg}`);
  if (data) {
    console.log(`       Response:`, JSON.stringify(data, null, 2));
  }
};
const fail = (msg, err) => {
  console.log(`     ${msg}`);
  if (err?.response) {
    console.log(`      status: ${err.response.status}`);
    console.log(`      response:`, JSON.stringify(err.response.data, null, 2));
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
  console.log(`\n${'='.repeat(60)}`);
  console.log(` Testing GET Habits API Operations`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Using API: ${BASE_URL}\n`);

  const testUserId = `user_${Date.now()}`;

  // ========================================
  // SETUP: Create test data
  // ========================================
  console.log(` SETUP: Creating test data...`);
  let habit1, habit2;
  try {
    habit1 = await createHabitForUser(testUserId);
    habit2 = await createHabitForUser(testUserId);
    console.log(`   ✓ Created habit 1: ${habit1._id}`);
    console.log(`   ✓ Created habit 2: ${habit2._id}`);
    console.log(`   ✓ Test user: ${testUserId}\n`);
  } catch (err) {
    return fail("Could not create test habits", err);
  }
  // ========================================
  // GET TESTS: Testing GET operations
  // ========================================
  
  // -------------------------
  // TEST GROUP 1: GET /api/habits/user/:userId
  // -------------------------
  log("GET /api/habits/user/:userId");

  // Test 1: Should return 200 and an array
  try {
    const res = await axios.get(`${HABITS_URL}/user/${testUserId}`);
    expect(res.status === 200, "Expected 200");
    expect(Array.isArray(res.data.data), "Expected data to be an array");
    pass("Returns list of habits for user", {
      status: res.status,
      count: res.data.count,
      habitsReturned: res.data.data.length,
      habits: res.data.data.map(h => ({ 
        id: h._id, 
        name: h.name, 
        userId: h.userId,
        frequency: h.frequency,
        category: h.category
      }))
    });
  } catch (err) {
    fail("Failed to fetch user habits", err);
  }

  // Test 2: Returned habits should belong to the correct user
  try {
    const res = await axios.get(`${HABITS_URL}/user/${testUserId}`);
    res.data.data.forEach(h => expect(h.userId === testUserId, "Habit userId mismatch"));
    pass("All habits belong to the correct user", {
      expectedUserId: testUserId,
      habitsChecked: res.data.data.length
    });
  } catch (err) {
    fail("Returned habits do not match user", err);
  }

  // Test 3: Non-existing user returns empty array (not error)
  try {
    const res = await axios.get(`${HABITS_URL}/user/no_such_user_123`);
    expect(Array.isArray(res.data.data), "Expected array");
    expect(res.data.data.length === 0, "Expected empty list");
    pass("Returns empty list for unknown user", {
      status: res.status,
      count: res.data.count,
      isEmpty: res.data.data.length === 0
    });
  } catch (err) {
    fail("Unexpected behavior for unknown user", err);
  }
  // -------------------------
  // TEST GROUP 2: GET /api/habits/:id
  // -------------------------
  log("GET /api/habits/:id");

  // Test 1: Valid ID returns correct record
  try {
    const res = await axios.get(`${HABITS_URL}/${habit1._id}`);
    expect(res.status === 200, "Expected 200");
    expect(res.data.data._id === habit1._id, "Mismatch habit ID");
    pass("Valid ID returns the correct habit", {
      status: res.status,
      habitId: res.data.data._id,
      habitName: res.data.data.name,
      userId: res.data.data.userId,
      frequency: res.data.data.frequency,
      category: res.data.data.category,
      reminder: res.data.data.reminder
    });
  } catch (err) {
    fail("Failed to fetch valid habit by ID", err);
  }

  // Test 2: Fetch second habit to verify different records
  try {
    const res = await axios.get(`${HABITS_URL}/${habit2._id}`);
    expect(res.status === 200, "Expected 200");
    expect(res.data.data._id === habit2._id, "Mismatch habit ID");
    pass("Second valid ID returns correct habit", {
      status: res.status,
      habitId: res.data.data._id,
      habitName: res.data.data.name
    });
  } catch (err) {
    fail("Failed to fetch second habit by ID", err);
  }

  // Test 3: Fake but well-formed ID → 404
  try {
    const fakeHabitId = fakeId();
    await axios.get(`${HABITS_URL}/${fakeHabitId}`);
    fail("Expected 404, but got success");
  } catch (err) {
    if (err.response?.status === 404) {
      pass("Non-existent ID correctly returns 404", {
        status: err.response.status,
        message: err.response.data.message,
        success: err.response.data.success
      });
    } else {
      fail("Incorrect status for non-existent ID", err);
    }
  }

  // Test 4: Invalid ID format → 500
  try {
    await axios.get(`${HABITS_URL}/bad-id-format`);
    fail("Expected error for invalid ID");
  } catch (err) {
    if (err.response?.status === 500) {
      pass("Invalid ID format correctly returns 500", {
        status: err.response.status,
        message: err.response.data.message,
        success: err.response.data.success
      });
    } else {
      fail("Unexpected behavior for invalid ID", err);
    }
  }
  // ========================================
  // CLEANUP: Remove test data
  // ========================================
  console.log(`\n CLEANUP: Removing test data...`);
  try {
    await axios.delete(`${HABITS_URL}/${habit1._id}`);
    await axios.delete(`${HABITS_URL}/${habit2._id}`);
    console.log(`   ✓ Deleted habit 1: ${habit1._id}`);
    console.log(`   ✓ Deleted habit 2: ${habit2._id}`);
  } catch (_) {
    console.log(`     Warning: Could not delete test habits`);
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(` All GET tests completed successfully!`);
  console.log(`${'='.repeat(60)}\n`);
})();