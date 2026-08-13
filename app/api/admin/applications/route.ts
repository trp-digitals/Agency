import { NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticatedAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const appsRaw = await db.careerApplication.findMany({
      orderBy: { createdAt: "desc" },
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

    const applications = appsRaw.map((app) => ({
      id: app.id,
      name: app.fullName,
      email: app.email,
      phone: app.phoneNumber || "Not provided",
      portfolio: app.portfolioLink,
      domains: app.domainsOfInterest,
      why: app.whyTRPDigitals,
      date: formatDate(app.createdAt),
      status: mapApplicationStatus(app.status),
    }));

    return NextResponse.json(applications);
  } catch (err: any) {
    console.error("Applications GET error:", err);
    return NextResponse.json(
      { error: "Unable to retrieve career applications." },
      { status: 500 }
    );
  }
}
