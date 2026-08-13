import { NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticatedAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const contactsRaw = await db.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    const mapContactStatus = (status: string) => {
      if (status === "NEW") return "New";
      if (status === "READ") return "Read";
      if (status === "IN_PROGRESS") return "In Progress";
      if (status === "REPLIED") return "Replied";
      if (status === "CLOSED") return "Closed";
      return "New";
    };

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    };

    const contacts = contactsRaw.map((con) => ({
      id: con.id,
      name: con.name,
      email: con.email,
      phone: con.phoneNumber || "Not provided",
      projectType: con.servicesNeeded.join(", ") || "General Inquiry",
      message: con.projectDetails,
      date: formatDate(con.createdAt),
      status: mapContactStatus(con.status),
    }));

    return NextResponse.json(contacts);
  } catch (err: any) {
    console.error("Contacts GET error:", err);
    return NextResponse.json(
      { error: "Unable to retrieve contact submissions." },
      { status: 500 }
    );
  }
}
