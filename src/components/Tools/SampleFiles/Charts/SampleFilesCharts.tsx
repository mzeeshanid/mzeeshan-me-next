import { useColorModeValue } from "@/components/ui/color-mode";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { Box, GridItem, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type SampleFilesChartsData = {
  topExtensions: { name: string; downloads: number }[];
  byCategory: { name: string; value: number }[];
};

const CHART_HEIGHT = 280;

const CATEGORY_COLORS = [
  "#6366f1",
  "#10b981",
  "#f97316",
  "#ec4899",
  "#f59e0b",
  "#06b6d4",
];

const formatDownloads = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
};

// Measures its container via ResizeObserver and passes explicit px width to children,
// so recharts never receives -1 dimensions.
function ChartContainer({ children }: { children: (width: number) => React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const w = el.getBoundingClientRect().width;
    if (w > 0) setWidth(w);
    const observer = new ResizeObserver((entries) => {
      const cw = entries[0]?.contentRect.width ?? 0;
      if (cw > 0) setWidth(cw);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: "100%", height: `${CHART_HEIGHT}px` }}>
      {width > 0 ? children(width) : null}
    </div>
  );
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

const ChartTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  const bg = useColorModeValue("var(--chakra-colors-white)", "var(--chakra-colors-gray-800)");
  const borderColor = useColorModeValue("var(--chakra-colors-gray-200)", "var(--chakra-colors-gray-600)");
  const textColor = useColorModeValue("var(--chakra-colors-gray-800)", "var(--chakra-colors-gray-100)");
  const mutedColor = useColorModeValue("var(--chakra-colors-gray-500)", "var(--chakra-colors-gray-400)");

  if (!active || !payload?.length) return null;

  return (
    <div style={{
      background: bg,
      border: `1px solid ${borderColor}`,
      borderRadius: "8px",
      padding: "10px 14px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      minWidth: "160px",
    }}>
      {label && (
        <p style={{ color: mutedColor, fontSize: "11px", marginBottom: "6px", fontWeight: 600 }}>
          {label}
        </p>
      )}
      {payload.map((entry, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: i < payload.length - 1 ? "4px" : 0 }}>
          <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", background: entry.color, flexShrink: 0 }} />
          <span style={{ color: mutedColor, fontSize: "12px" }}>{entry.name}:</span>
          <span style={{ color: textColor, fontSize: "12px", fontWeight: 600 }}>
            {formatDownloads(Number(entry.value))}
          </span>
        </div>
      ))}
    </div>
  );
};

const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

type Props = { chartsData: SampleFilesChartsData };

const SampleFilesCharts: React.FC<Props> = ({ chartsData }) => {
  const axisTickColor = useColorModeValue("var(--chakra-colors-gray-600)", "var(--chakra-colors-gray-400)");
  const legendColor = useColorModeValue("var(--chakra-colors-gray-700)", "var(--chakra-colors-gray-300)");
  const gridColor = useColorModeValue("var(--chakra-colors-gray-200)", "var(--chakra-colors-gray-600)");

  const barData = chartsData.topExtensions.map((ext) => ({
    name: `.${ext.name}`,
    Downloads: ext.downloads,
  }));

  return (
    <Box as="section">
      <VStack align="stretch" gap={6}>
        <SectionHeader
          tagline="Insights"
          headline="Download Analytics"
          description="Visual breakdown of downloads across file categories and top formats."
        />
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
          <GridItem minW={0}>
            <VStack align="stretch" gap={4}>
              <VStack align="flex-start" gap={1}>
                <Heading as="h3" fontSize="lg" fontWeight="semibold">Extensions by Category</Heading>
                <Text color="fg.muted" fontSize="sm">Distribution of file formats across categories</Text>
              </VStack>
              <ChartContainer>
                {(width) => (
                  <PieChart width={width} height={CHART_HEIGHT}>
                    <Pie
                      data={chartsData.byCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={3}
                      dataKey="value"
                      nameKey="name"
                      label={renderPieLabel}
                      labelLine={false}
                    >
                      {chartsData.byCategory.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                    <Legend formatter={(value) => (
                      <span style={{ color: legendColor, fontSize: "13px" }}>{value}</span>
                    )} />
                  </PieChart>
                )}
              </ChartContainer>
            </VStack>
          </GridItem>

          <GridItem minW={0}>
            <VStack align="stretch" gap={4}>
              <VStack align="flex-start" gap={1}>
                <Heading as="h3" fontSize="lg" fontWeight="semibold">Top Extensions by Downloads</Heading>
                <Text color="fg.muted" fontSize="sm">Most downloaded individual file formats</Text>
              </VStack>
              <ChartContainer>
                {(width) => (
                  <BarChart width={width} height={CHART_HEIGHT} data={barData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: axisTickColor }} axisLine={{ stroke: gridColor }} tickLine={{ stroke: gridColor }} />
                    <YAxis tickFormatter={formatDownloads} tick={{ fontSize: 11, fill: axisTickColor }} axisLine={{ stroke: gridColor }} tickLine={{ stroke: gridColor }} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="Downloads" radius={[4, 4, 0, 0]}>
                      {barData.map((_, index) => (
                        <Cell key={`bar-cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                )}
              </ChartContainer>
            </VStack>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default SampleFilesCharts;
