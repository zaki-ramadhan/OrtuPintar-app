import axios from "axios";

async function testAPICall() {
  try {
    console.log("Testing API call to get child log activities...");

    const response = await axios.get(
      "http://localhost:3000/api/log-activities/child/7"
    );

    console.log("Response status:", response.status);
    console.log("Response data:", JSON.stringify(response.data, null, 2));

    if (response.data.activities) {
      console.log("\nActivities titles:");
      response.data.activities.forEach((activity) => {
        console.log(
          `ID: ${activity.id}, Title: "${activity.title}", Length: ${activity.title?.length}`
        );

        if (activity.title?.includes("Animal")) {
          console.log(
            "Found Animal activity in API response:",
            JSON.stringify(activity, null, 2)
          );
        }
      });
    }
  } catch (err) {
    console.error("API Error:", err.message);
    if (err.response) {
      console.error("Response status:", err.response.status);
      console.error("Response data:", err.response.data);
    }
  }
}

testAPICall();
