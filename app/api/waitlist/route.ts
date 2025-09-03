import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { addRowToSheet } from "@/lib/google-sheets";

// Validation schema
const waitlistSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

// Check if Google Sheets is configured
const isGoogleSheetsConfigured = () => {
  return !!(
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL &&
    process.env.GOOGLE_SHEETS_PRIVATE_KEY &&
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  );
};

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = waitlistSchema.parse(body);

    // If Google Sheets is not configured, log and return success
    // (This allows testing without Google Sheets setup)
    if (!isGoogleSheetsConfigured()) {
      console.log("Waitlist signup (Google Sheets not configured):", {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({ 
        success: true, 
        message: "Successfully joined waitlist (logged locally)" 
      });
    }

    // Add data to Google Sheets
    const result = await addRowToSheet({
      email: validatedData.email,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
    });

    console.log("Successfully added to Google Sheets:", {
      email: validatedData.email,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      spreadsheetId: result.spreadsheetId,
      tableRange: result.tableRange
    });

    return NextResponse.json({ 
      success: true, 
      message: "Successfully joined waitlist" 
    });

  } catch (error) {
    console.error("Waitlist API error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid form data",
          details: error.issues 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to join waitlist" 
      },
      { status: 500 }
    );
  }
}