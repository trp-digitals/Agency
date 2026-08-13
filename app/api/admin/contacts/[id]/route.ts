import { NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { realtimeEmitter } from "@/lib/realtime";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticatedAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    const mapStatusToDb = (uiStatus: string) => {
      if (uiStatus === "New") return "NEW";
      if (uiStatus === "Read") return "READ";
      if (uiStatus === "In Progress") return "IN_PROGRESS";
      if (uiStatus === "Replied") return "REPLIED";
      if (uiStatus === "Closed") return "CLOSED";
      return null;
    };

    const dbStatus = mapStatusToDb(status);
    if (!dbStatus) {
      return NextResponse.json({ error: "Invalid contact status" }, { status: 400 });
    }

    const updatedContact = await db.contactSubmission.update({
      where: { id },
      data: { status: dbStatus as any },
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

    const mappedContact = {
      id: updatedContact.id,
      name: updatedContact.name,
      email: updatedContact.email,
      phone: updatedContact.phoneNumber || "Not provided",
      projectType: updatedContact.servicesNeeded.join(", ") || "General Inquiry",
      message: updatedContact.projectDetails,
      date: formatDate(updatedContact.createdAt),
      status: mapContactStatus(updatedContact.status),
    };

    // Emit event for realtime updates
    realtimeEmitter.emit("update", {
      type: "UPDATE_CONTACT_SUBMISSION_STATUS",
      data: mappedContact,
    });

    return NextResponse.json({
      success: true,
      message: "Contact status updated successfully",
      contact: mappedContact,
    });
  } catch (err: any) {
    console.error("Contacts PATCH error:", err);
    return NextResponse.json(
      { error: "Unable to update contact status." },
      { status: 500 }
    );
  }
}
