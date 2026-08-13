import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    if (!(await isAuthenticatedAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const timeframe = (searchParams.get("timeframe") || "daily") as "daily" | "weekly" | "monthly";

    const ALLOWED_PUBLIC_PATHS = [
      "/",
      "/about",
      "/services",
      "/careers",
      "/contact",
      "/privacy",
      "/terms",
    ];

    // Overall metrics for header cards
    const [totalVisitors, totalUniquePageViews, totalLeads] = await Promise.all([
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
      db.contactSubmission.count(),
    ]);

    // Popular pages breakdown grouped by path
    const pageViewGroups = await db.analyticsPageView.groupBy({
      by: ["path"],
      where: {
        path: { in: ALLOWED_PUBLIC_PATHS },
      },
      _count: {
        path: true,
      },
      orderBy: {
        _count: {
          path: "desc",
        },
      },
      take: 10,
    });

    const popularPages = pageViewGroups.map((group) => ({
      path: group.path,
      views: group._count.path,
      unique: group._count.path,
      ratio: 1.0,
    }));

    // Generate chart data based on selected timeframe
    const now = new Date();
    const viewsChart: Array<{ label: string; views: number; unique: number }> = [];

    if (timeframe === "daily") {
      // Last 7 days parallelized
      const dayRanges = Array.from({ length: 7 }, (_, idx) => {
        const i = 6 - idx;
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i, 0, 0, 0, 0);
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i, 23, 59, 59, 999);
        const dayLabel = startOfDay.toLocaleDateString("en-US", { weekday: "short" });
        return { startOfDay, endOfDay, dayLabel };
      });

      const dayResults = await Promise.all(
        dayRanges.map(async ({ startOfDay, endOfDay, dayLabel }) => {
          const [dayViews, dayVisitors] = await Promise.all([
            db.analyticsPageView.count({
              where: {
                path: { in: ALLOWED_PUBLIC_PATHS },
                firstSeenAt: {
                  gte: startOfDay,
                  lte: endOfDay,
                },
              },
            }),
            db.analyticsVisitor.count({
              where: {
                pageViews: {
                  some: {
                    path: { in: ALLOWED_PUBLIC_PATHS },
                  },
                },
                firstSeenAt: {
                  gte: startOfDay,
                  lte: endOfDay,
                },
              },
            }),
          ]);
          return { label: dayLabel, views: dayViews, unique: dayVisitors };
        })
      );
      viewsChart.push(...dayResults);
    } else if (timeframe === "weekly") {
      // Last 4 weeks parallelized
      const weekRanges = Array.from({ length: 4 }, (_, idx) => {
        const i = 3 - idx;
        const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (i * 7 + 6), 0, 0, 0, 0);
        const endOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i * 7, 23, 59, 59, 999);
        const weekLabel = `Week ${4 - i}`;
        return { startOfWeek, endOfWeek, weekLabel };
      });

      const weekResults = await Promise.all(
        weekRanges.map(async ({ startOfWeek, endOfWeek, weekLabel }) => {
          const [weekViews, weekVisitors] = await Promise.all([
            db.analyticsPageView.count({
              where: {
                path: { in: ALLOWED_PUBLIC_PATHS },
                firstSeenAt: {
                  gte: startOfWeek,
                  lte: endOfWeek,
                },
              },
            }),
            db.analyticsVisitor.count({
              where: {
                pageViews: {
                  some: {
                    path: { in: ALLOWED_PUBLIC_PATHS },
                  },
                },
                firstSeenAt: {
                  gte: startOfWeek,
                  lte: endOfWeek,
                },
              },
            }),
          ]);
          return { label: weekLabel, views: weekViews, unique: weekVisitors };
        })
      );
      viewsChart.push(...weekResults);
    } else if (timeframe === "monthly") {
      // Last 6 months parallelized
      const monthRanges = Array.from({ length: 6 }, (_, idx) => {
        const i = 5 - idx;
        const startOfMonth = new Date(now.getFullYear(), now.getMonth() - i, 1, 0, 0, 0, 0);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999);
        const monthLabel = startOfMonth.toLocaleDateString("en-US", { month: "short" });
        return { startOfMonth, endOfMonth, monthLabel };
      });

      const monthResults = await Promise.all(
        monthRanges.map(async ({ startOfMonth, endOfMonth, monthLabel }) => {
          const [monthViews, monthVisitors] = await Promise.all([
            db.analyticsPageView.count({
              where: {
                path: { in: ALLOWED_PUBLIC_PATHS },
                firstSeenAt: {
                  gte: startOfMonth,
                  lte: endOfMonth,
                },
              },
            }),
            db.analyticsVisitor.count({
              where: {
                pageViews: {
                  some: {
                    path: { in: ALLOWED_PUBLIC_PATHS },
                  },
                },
                firstSeenAt: {
                  gte: startOfMonth,
                  lte: endOfMonth,
                },
              },
            }),
          ]);
          return { label: monthLabel, views: monthViews, unique: monthVisitors };
        })
      );
      viewsChart.push(...monthResults);
    }

    return NextResponse.json({
      timeframe,
      totalViews: totalVisitors,
      uniqueViews: totalUniquePageViews,
      conversionLeads: totalLeads,
      views: viewsChart,
      popularPages,
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
