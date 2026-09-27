'use client';

import { use } from 'react';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipContentProps,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartDataType } from '@/lib/dashboard/get-chart-data';
import { formatPrice } from '@/lib/utils';

interface SalesChartProps {
  data: ChartDataType;
}

export const SalesChart = (props: SalesChartProps) => {
  const { data } = props;

  const chartData = use(data);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="font-semibold">
          Monthly Sales {new Date().getFullYear() - 1}/
          {new Date().getFullYear()}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Number of cars sold per month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="month"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) =>
                formatPrice({ price: value, currency: 'EUR' })
              }
            />
            <Tooltip content={CustomTooltip} cursor={{ fill: 'transparent' }} />
            <Bar dataKey="sales" fill="var(--primary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const CustomTooltip = ({ active, payload, label }: TooltipContentProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-2 rounded">
        <p className="text-gray-100">
          {`${label}: ${formatPrice({ price: payload[0].value as number, currency: 'EUR' })}`}
        </p>
      </div>
    );
  }
};
