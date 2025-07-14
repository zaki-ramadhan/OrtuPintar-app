import { db } from "./config/db.js";

async function debugIsMilestone() {
  try {
    console.log("Debugging isMilestone field...");

    // Test query for child 7 (Akbar)
    const childId = 7;

    const [activities] = await db.query(
      `SELECT 
                ca.id,
                ca.activity_id,
                a.title,
                a.isMilestone,
                CAST(a.isMilestone AS UNSIGNED) as isMilestone_cast,
                CAST(a.isMilestone AS CHAR) as isMilestone_string
            FROM child_activities ca
            JOIN activities a ON ca.activity_id = a.id
            WHERE ca.child_id = ?
            ORDER BY ca.created_at DESC
            LIMIT 5`,
      [childId]
    );

    console.log("\nActivities with isMilestone field analysis:");
    activities.forEach((activity) => {
      console.log(`\nActivity: "${activity.title}"`);
      console.log(
        `  isMilestone: ${
          activity.isMilestone
        } (type: ${typeof activity.isMilestone})`
      );
      console.log(
        `  isMilestone_cast: ${
          activity.isMilestone_cast
        } (type: ${typeof activity.isMilestone_cast})`
      );
      console.log(`  isMilestone_string: "${activity.isMilestone_string}"`);
      console.log(`  Boolean check: ${!!activity.isMilestone}`);
      console.log(
        `  Title + isMilestone: "${activity.title}${activity.isMilestone}"`
      );
    });

    // Test if there's any string concatenation issue
    console.log("\nTesting string concatenation:");
    activities.forEach((activity) => {
      console.log(
        `Title: "${activity.title}" + isMilestone: ${activity.isMilestone} = "${
          activity.title + activity.isMilestone
        }"`
      );
    });

    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

debugIsMilestone();
