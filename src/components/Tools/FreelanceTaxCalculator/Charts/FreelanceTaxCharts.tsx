import React from "react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { FreelanceTaxResult, formatPKR } from "@/services/freelanceTaxService";
import { Box, GridItem, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface FreelanceTaxChartsProps {
  result: FreelanceTaxResult;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

const ChartTooltip: React.FC<ChartTooltipProps> = ({ active, payload, label }) => {
  const bg = useColorModeValue("var(--chakra-colors-white)", "var(--chakra-colors-gray-800)");
  const borderColor = useColorModeValue(
    "var(--chakra-colors-gray-200)",
    "var(--chakra-colors-gray-600)"
  );
  const textColor = useColorModeValue(
    "var(--chakra-colors-gray-800)",
    "var(--chakra-colors-gray-100)"
  );
  const mutedColor = useColorModeValue(
    "var(--chakra-colors-gray-500)",
    "var(--chakra-colors-gray-400)"
  );

  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${borderColor}`,
        borderRadius: "8px",
        padding: "10px 14px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        minWidth: "160px",
      }}
    >
      {label && (
        <p style={{ color: mutedColor, fontSize: "11px", marginBottom: "6px", fontWeight: 600 }}>
          {label}
        </p>
      )}
      {payload.map((entry, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: i < payload.length - 1 ? "4px" : 0,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: entry.color as string,
              flexShrink: 0,
            }}
          />
          <span style={{ color: mutedColor, fontSize: "12px" }}>{entry.name}:</span>
          <span style={{ color: textColor, fontSize: "12px", fontWeight: 600 }}>
            {formatPKR(Number(entry.value))}
          </span>
        </div>
      ))}
    </div>
  );
};

const TAKE_HOME_COLOR = "#10b981";
const TAX_COLOR = "#f97316";
const COLORS = [TAKE_HOME_COLOR, TAX_COLOR];

const FreelanceTaxCharts: React.FC<FreelanceTaxChartsProps> = ({ result }) => {
  const axisTickColor = useColorModeValue(
    "var(--chakra-colors-gray-600)",
    "var(--chakra-colors-gray-400)"
  );
  const labelColor = useColorModeValue(
    "var(--chakra-colors-gray-700)",
    "var(--chakra-colors-gray-300)"
  );
  const gridColor = useColorModeValue(
    "var(--chakra-colors-gray-200)",
    "var(--chakra-colors-gray-600)"
  );

  const pieData = [
    { name: "Take-Home", value: Math.round(result.monthlyTakeHome) },
    { name: "Tax", value: Math.round(result.monthlyTax) },
  ];

  const barData = MONTHS.map((month) => ({
    month,
    "Take-Home": Math.round(result.monthlyTakeHome),
    Tax: Math.round(result.monthlyTax),
  }));

  return (
    <Box as="section">
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
        <GridItem>
          <VStack align="stretch" gap={4}>
            <VStack align="flex-start" gap={1}>
              <Heading as="h3" fontSize="lg" fontWeight="semibold">
                Monthly Income Distribution
              </Heading>
              <Text color="fg.muted" fontSize="sm">
                Take-home vs tax on your monthly income of {formatPKR(result.monthlyIncome)}
              </Text>
            </VStack>
            <Box h="280px">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(1)}%`
                    }
                    labelLine={{ stroke: labelColor }}
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                  <Legend
                    formatter={(value) => (
                      <span style={{ color: labelColor, fontSize: "13px" }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </VStack>
        </GridItem>

        <GridItem>
          <VStack align="stretch" gap={4}>
            <VStack align="flex-start" gap={1}>
              <Heading as="h3" fontSize="lg" fontWeight="semibold">
                Monthly Income Breakdown
              </Heading>
              <Text color="fg.muted" fontSize="sm">
                Take-home vs tax across 12 months
              </Text>
            </VStack>
            <Box h="280px">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: axisTickColor }}
                    axisLine={{ stroke: gridColor }}
                    tickLine={{ stroke: gridColor }}
                  />
                  <YAxis
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    tick={{ fontSize: 11, fill: axisTickColor }}
                    axisLine={{ stroke: gridColor }}
                    tickLine={{ stroke: gridColor }}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend
                    formatter={(value) => (
                      <span style={{ color: labelColor, fontSize: "13px" }}>{value}</span>
                    )}
                  />
                  <Bar dataKey="Take-Home" fill={TAKE_HOME_COLOR} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Tax" fill={TAX_COLOR} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </VStack>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default FreelanceTaxCharts;
