import { db } from "./config/db.js";

async function testExactQuery() {
  try {
    console.log("Testing exact query from logActivityController...");

    // First check children table
    const [children] = await db.query("SELECT id, name FROM children");
    console.log("Available children:", children);

    // Find child with activities
    const [childWithActivities] = await db.query(`
      SELECT DISTINCT ca.child_id, c.name 
      FROM child_activities ca 
      JOIN children c ON ca.child_id = c.id 
      LIMIT 1
    `);

    if (childWithActivities.length === 0) {
      console.log("No child activities found");
      return;
    }

    const childId = 7; // Test with Akbar
    console.log(`\nTesting with child ID: ${childId} (Akbar)`);

    // Test the exact query used in getChildLogActivities
    const [activities] = await db.query(
      `SELECT 
                ca.id,
                ca.activity_id,
                ca.child_id,
                ca.status,
                ca.started_at,
                ca.completed_at,
                ca.cancelled_at,
                ca.progress_notes,
                ca.created_at,
                ca.updated_at,
                a.title,
                a.description,
                a.category,
                a.difficulty,
                a.duration,
                a.icon,
                a.isMilestone,
                a.age_group_min,
                a.age_group_max,
                c.name as child_name
            FROM child_activities ca
            JOIN activities a ON ca.activity_id = a.id
            JOIN children c ON ca.child_id = c.id
            WHERE ca.child_id = ? 
            ORDER BY ca.created_at DESC`,
      [childId]
    );

    console.log("\nExact query results:");
    activities.forEach((activity) => {
      console.log(
        `ID: ${activity.id}, Activity ID: ${activity.activity_id}, Title: "${
          activity.title
        }", Length: ${activity.title?.length}, Chars: ${JSON.stringify(
          activity.title
        )}`
      );
    });

    console.log("\nLooking for Animal Sounds specifically:");
    const animalSounds = activities.find((a) => a.title?.includes("Animal"));
    if (animalSounds) {
      console.log(
        "Found Animal activity:",
        JSON.stringify(animalSounds, null, 2)
      );
    } else {
      console.log("No Animal activity found in results");
    }

    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

testExactQuery();
