// Import Next.js helper to send structured HTTP responses from the server
import { NextResponse } from "next/server";

// Handle POST requests sent to this API route (usually a form submission)
export async function POST(request) {
  console.log("API route hit - POST request received");

  try {
    // Parse the request body as JSON
    console.log("Attempting to parse request body...");
    const { name, email, message } = await request.json();

    console.log("Form submission received:", { name, email, message });

    // Validate that all required fields are present
    if (!name || !email || !message) {
      console.log("Validation failed - missing fields");
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check that necessary Airtable environment variables are configured
    if (
      !process.env.AIRTABLE_TOKEN ||
      !process.env.AIRTABLE_BASE_ID ||
      !process.env.AIRTABLE_TABLE_NAME
    ) {
      console.error("Missing Airtable environment variables");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    console.log("Sending to Airtable...");
    console.log("Base ID:", process.env.AIRTABLE_BASE_ID);
    console.log("Table Name:", process.env.AIRTABLE_TABLE_NAME);

    // Send the form data to Airtable using their REST API
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Name: name,
                Email: email,
                Message: message,
              },
            },
          ],
        }),
      }
    );

    console.log("Airtable response status:", airtableResponse.status);

    // If Airtable accepted the request successfully
    if (airtableResponse.ok) {
      const airtableData = await airtableResponse.json();
      console.log("Successfully submitted to Airtable:", airtableData);

      return NextResponse.json({
        success: true,
        message: "Form submitted successfully to Airtable",
        airtableData,
      });
    } else {
      // Airtable responded with an error
      const errorText = await airtableResponse.text();
      console.error("Airtable error response:", errorText);

      return NextResponse.json(
        {
          success: false,
          error: "Failed to submit to Airtable",
          details: errorText,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    // Catch any unexpected errors
    console.error("API route error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process form submission" },
      { status: 500 }
    );
  }
}
