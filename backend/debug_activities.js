import { db } from "./config/db.js";

async function checkActivities() {
  try {
    console.log("Checking activities table...");

    const [activities] = await db.query(
      "SELECT id, title FROM activities WHERE title LIKE '%Animal%'"
    );
    console.log("Activities with Animal in title:", activities);

    console.log("\nChecking child_activities join...");
    const [childActivities] = await db.query(`
      SELECT 
        ca.id,
        ca.activity_id,
        a.title,
        c.name as child_name
      FROM child_activities ca
      JOIN activities a ON ca.activity_id = a.id
      JOIN children c ON ca.child_id = c.id
      WHERE a.title LIKE '%Animal%'
      ORDER BY ca.created_at DESC
      LIMIT 5
    `);
    console.log("Child activities with Animal Sounds:", childActivities);

    console.log("\nChecking recent child_activities...");
    const [recentActivities] = await db.query(`
      SELECT 
        ca.id,
        ca.activity_id,
        a.title,
        c.name as child_name
      FROM child_activities ca
      JOIN activities a ON ca.activity_id = a.id
      JOIN children c ON ca.child_id = c.id
      ORDER BY ca.created_at DESC
      LIMIT 10
    `);
    console.log("Recent child activities:", recentActivities);

    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

checkActivities();
