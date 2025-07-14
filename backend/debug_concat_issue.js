import { db } from "./config/db.js";

async function debugConcatIssue() {
  try {
    console.log("🔍 Debugging concatenation issue...\n");

    // Check direct activities table
    console.log("1. Direct activities table query:");
    const [directActivities] = await db.query(
      "SELECT id, title, isMilestone FROM activities WHERE title LIKE '%Animal%'"
    );
    console.log("Direct activities:", directActivities);

    if (directActivities.length > 0) {
      const activity = directActivities[0];
      console.log(`Title: "${activity.title}"`);
      console.log(
        `isMilestone: ${
          activity.isMilestone
        } (type: ${typeof activity.isMilestone})`
      );
      console.log(`Title length: ${activity.title.length}`);
      console.log(`Title char by char:`, Array.from(activity.title));
    }

    // Check if there are any triggers
    console.log("\n2. Checking for triggers:");
    const [triggers] = await db.query("SHOW TRIGGERS");
    console.log(
      "Database triggers:",
      triggers.length ? triggers : "No triggers found"
    );

    // Check the exact query from logActivityController
    console.log("\n3. Running exact logActivityController query:");
    const [controllerResult] = await db.query(`
      SELECT 
        ca.id,
        ca.activity_id,
        a.title,
        a.isMilestone
      FROM child_activities ca
      JOIN activities a ON ca.activity_id = a.id
      WHERE a.title LIKE '%Animal%'
      LIMIT 2
    `);

    console.log("Controller query result:");
    controllerResult.forEach((activity) => {
      console.log(
        `  ID: ${activity.id}, Title: "${activity.title}", isMilestone: ${activity.isMilestone}`
      );
      console.log(
        `  Title type: ${typeof activity.title}, Length: ${
          activity.title.length
        }`
      );
      console.log(`  Title raw:`, JSON.stringify(activity.title));
    });

    // Check for any views or stored procedures
    console.log("\n4. Checking for views:");
    const [views] = await db.query(
      "SHOW FULL TABLES WHERE Table_type = 'VIEW'"
    );
    console.log("Database views:", views.length ? views : "No views found");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await db.end();
  }
}

debugConcatIssue();
