// app/api/submit-form/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  console.log("API route hit - POST request received");

  try {
    console.log("Attempting to parse request body...");
    const { name, email, message } = await request.json();

    console.log("Form submission received:", { name, email, message });

    // Validate required fields
    if (!name || !email || !message) {
      console.log("Validation failed - missing fields");
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check environment variables
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

    // Send to Airtable
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
                // Add this field if you have a datetime column in Airtable
                // 'Created': new Date().toISOString(),
              },
            },
          ],
        }),
      }
    );

    console.log("Airtable response status:", airtableResponse.status);

    if (airtableResponse.ok) {
      const airtableData = await airtableResponse.json();
      console.log("Successfully submitted to Airtable:", airtableData);

      return NextResponse.json({
        success: true,
        message: "Form submitted successfully to Airtable",
        airtableData,
      });
    } else {
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
    console.error("API route error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process form submission" },
      { status: 500 }
    );
  }
}

// Add a GET handler for testing
export async function GET() {
  return NextResponse.json({
    message: "API route is working! Use POST to submit form data.",
    envCheck: {
      hasToken: !!process.env.AIRTABLE_TOKEN,
      hasBaseId: !!process.env.AIRTABLE_BASE_ID,
      hasTableName: !!process.env.AIRTABLE_TABLE_NAME,
      tableName: process.env.AIRTABLE_TABLE_NAME,
    },
  });
}
