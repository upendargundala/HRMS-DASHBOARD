import { NextResponse } from "next/server";

export async function GET() {
  try {
    
    const events = [
      {
        id: "1",
        summary: "Team Meeting",
        start: { dateTime: new Date().toISOString() },
      },
      {
        id: "2",
        summary: "Project Review",
        start: { dateTime: new Date(Date.now() + 3600000).toISOString() },
      },
    ];

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch calendar events" },
      { status: 500 }
    );
  }
}
