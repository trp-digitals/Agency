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
      if (uiStatus === "Reviewing") return "REVIEWING";
      if (uiStatus === "Shortlisted") return "SHORTLISTED";
      if (uiStatus === "Accepted") return "ACCEPTED";
      if (uiStatus === "Rejected") return "REJECTED";
      return null;
    };

    const dbStatus = mapStatusToDb(status);
    if (!dbStatus) {
      return NextResponse.json({ error: "Invalid application status" }, { status: 400 });
    }

    const updatedApp = await db.careerApplication.update({
      where: { id },
      data: { status: dbStatus as any },
    });

    const mapApplicationStatus = (status: string) => {
      if (status === "NEW") return "New";
      if (status === "REVIEWING") return "Reviewing";
      if (status === "SHORTLISTED") return "Shortlisted";
      if (status === "ACCEPTED") return "Accepted";
      if (status === "REJECTED") return "Rejected";
      return "New";
    };

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    };

    const mappedApp = {
      id: updatedApp.id,
      name: updatedApp.fullName,
      email: updatedApp.email,
      phone: updatedApp.phoneNumber || "Not provided",
      portfolio: updatedApp.portfolioLink,
      domains: updatedApp.domainsOfInterest,
      why: updatedApp.whyTRPDigitals,
      date: formatDate(updatedApp.createdAt),
      status: mapApplicationStatus(updatedApp.status),
    };

    // Emit event for realtime updates
    realtimeEmitter.emit("update", {
      type: "UPDATE_CAREER_APPLICATION_STATUS",
      data: mappedApp,
    });

    return NextResponse.json({
      success: true,
      message: "Application status updated successfully",
      application: mappedApp,
    });
  } catch (err: any) {
    console.error("Applications PATCH error:", err);
    return NextResponse.json(
      { error: "Unable to update application status." },
      { status: 500 }
    );
  }
}
