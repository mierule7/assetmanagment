import { AssetDistribution } from "@/components/dashboard/AssetDistribution";
import { MaintenanceSchedule } from "@/components/dashboard/MaintenanceSchedule";
import { OverviewMetrics } from "@/components/dashboard/OverviewMetrics";
import { RecentAlerts } from "@/components/dashboard/RecentAlerts";
import { RecentAssets } from "@/components/dashboard/RecentAssets";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-4xl">
          Welcome to AssetTiger. View your asset metrics, check recent activity, and manage upcoming maintenance tasks.
        </p>

        <div className="space-y-6">
          <OverviewMetrics />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <AssetDistribution />
            <div className="space-y-6">
              <RecentAlerts />
              <MaintenanceSchedule />
            </div>
          </div>

          <RecentAssets />
        </div>
      </div>
    </DashboardLayout>
  );
}
