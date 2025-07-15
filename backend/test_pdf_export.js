import axios from "axios";
import fs from "fs";

async function testPDFExport() {
  try {
    console.log("🧪 Testing PDF export endpoint...");

    // You'll need to get a valid admin token first
    // For now, this is just a test structure
    const token = "your-admin-token-here";

    const response = await axios.get(
      "http://localhost:3000/admin/users/export-pdf",
      {
        responseType: "stream",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Save PDF to file for testing
    const writer = fs.createWriteStream("test-users-export.pdf");
    response.data.pipe(writer);

    writer.on("finish", () => {
      console.log(
        "✅ PDF export test completed - file saved as test-users-export.pdf"
      );
    });

    writer.on("error", (err) => {
      console.error("❌ Error saving PDF:", err);
    });
  } catch (error) {
    console.error("❌ Error testing PDF export:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
  }
}

// Uncomment the line below to run the test
// testPDFExport();

console.log(
  "PDF export test file created. Update with valid admin token to test."
);
