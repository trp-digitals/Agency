import { NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  // Check authorization
  if (!(await isAuthenticatedAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const ALLOWED_PUBLIC_PATHS = [
      "/",
      "/about",
      "/services",
      "/careers",
      "/contact",
      "/privacy",
      "/terms",
    ];

    const [
      totalApplications,
      newApplications,
      totalContacts,
      newContacts,
      totalVisitors,
      totalUniquePageViews,
      recentApplicationsRaw,
      recentContactsRaw,
    ] = await Promise.all([
      db.careerApplication.count(),
      db.careerApplication.count({ where: { status: "NEW" } }),
      db.contactSubmission.count(),
      db.contactSubmission.count({ where: { status: "NEW" } }),
      db.analyticsVisitor.count({
        where: {
          pageViews: {
            some: {
              path: { in: ALLOWED_PUBLIC_PATHS },
            },
          },
        },
      }),
      db.analyticsPageView.count({
        where: {
          path: { in: ALLOWED_PUBLIC_PATHS },
        },
      }),
      db.careerApplication.findMany({
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
      db.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
    ]);

    const mapApplicationStatus = (status: string) => {
      if (status === "NEW") return "New";
      if (status === "REVIEWING") return "Reviewing";
      if (status === "SHORTLISTED") return "Shortlisted";
      if (status === "ACCEPTED") return "Accepted";
      if (status === "REJECTED") return "Rejected";
      return "New";
    };

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

    const recentApplications = recentApplicationsRaw.map((app) => ({
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

    const recentContacts = recentContactsRaw.map((con) => ({
      id: con.id,
      name: con.name,
      email: con.email,
      phone: con.phoneNumber || "Not provided",
      projectType: con.servicesNeeded.join(", ") || "General Inquiry",
      message: con.projectDetails,
      date: formatDate(con.createdAt),
      status: mapContactStatus(con.status),
    }));

    return NextResponse.json({
      totalApplications,
      newApplications,
      totalContacts,
      newContacts,
      totalViews: totalVisitors,
      uniqueViews: totalUniquePageViews,
      recentApplications,
      recentContacts,
    });
  } catch (err: any) {
    console.error("Overview API Error:", err);
    return NextResponse.json(
      { error: "Unable to retrieve dashboard overview metrics." },
      { status: 500 }
    );
  }
}
