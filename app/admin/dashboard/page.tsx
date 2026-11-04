import { KPICards } from '@/components/admin/dashboard/KPICards';
import { SalesChart } from '@/components/admin/dashboard/SalesChart';
import { getChartData } from '@/lib/dashboard/get-chart-data';
import { getDashboardData } from '@/lib/dashboard/get-dashboard-data';

export default async function AdminDashboardPage() {
  const dashboardData = getDashboardData();
  const chartData = getChartData();

  return (
    <>
      <KPICards data={dashboardData} />
      <SalesChart data={chartData} />
    </>
  );
}
