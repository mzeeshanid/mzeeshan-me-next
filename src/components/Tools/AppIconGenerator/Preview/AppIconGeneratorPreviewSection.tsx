import { useColorMode } from "@/components/ui/color-mode";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import { useMounted } from "@/hooks/useMounted";
import {
  Box,
  GridItem,
  HStack,
  NativeSelect,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaAndroid, FaApple } from "react-icons/fa6";

// ─── Types ───────────────────────────────────────────────────────────────────

type IosContext =
  | "home-screen"
  | "spotlight"
  | "settings"
  | "app-store"
  | "notification";
type AndroidContext = "home-screen" | "notification" | "google-play";

// ─── Data ─────────────────────────────────────────────────────────────────────

const IOS_OPTIONS: { value: IosContext; label: string; desc: string }[] = [
  {
    value: "home-screen",
    label: "Home Screen",
    desc: "How your icon appears in the iPhone home screen grid at 60 × 60 pt.",
  },
  {
    value: "spotlight",
    label: "Spotlight Search",
    desc: "How your app surfaces in Spotlight search at 40 × 40 pt.",
  },
  {
    value: "settings",
    label: "Settings",
    desc: "How your icon appears in the device Settings app at 29 × 29 pt.",
  },
  {
    value: "app-store",
    label: "App Store",
    desc: "How your icon looks on the App Store product page at 1024 × 1024 pt.",
  },
  {
    value: "notification",
    label: "Notification",
    desc: "How your icon appears in a notification banner at 20 × 20 pt.",
  },
];

const ANDROID_OPTIONS: {
  value: AndroidContext;
  label: string;
  desc: string;
}[] = [
  {
    value: "home-screen",
    label: "Home Screen",
    desc: "Your adaptive icon as it appears on the Android launcher at 48 dp.",
  },
  {
    value: "notification",
    label: "Notification",
    desc: "Your icon badge in the Android notification shade at 24 dp.",
  },
  {
    value: "google-play",
    label: "Google Play",
    desc: "How your icon looks on the Google Play Store product listing at 512 × 512 px.",
  },
];

const TILE_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FECA57",
  "#FF9FF3",
  "#54A0FF",
  "#5F27CD",
  "#00D2D3",
  "#FF9F43",
  "#10AC84",
  "#2ECC71",
  "#E74C3C",
  "#9B59B6",
  "#3498DB",
  "#F39C12",
  "#EE5A24",
  "#1ABC9C",
  "#6C5CE7",
  "#A29BFE",
  "#FD79A8",
  "#FDCB6E",
  "#00B894",
  "#D63031",
  "#74B9FF",
];

// ─── Device dimensions ────────────────────────────────────────────────────────
// Change IOS_SW / AND_SW and every derived value re-scales automatically.
// iOS reference device: iPhone 14 at 390 pt logical width, 844 pt logical height.
// Android reference device: Material Design baseline at 360 dp width, 800 dp height.
const IOS_SW = 260;
const AND_SW = 260;
const IOS_SH = Math.round(IOS_SW * (844 / 390));
const AND_SH = Math.round(AND_SW * (800 / 360));
const IOS_SCALE = IOS_SW / 390;
const AND_SCALE = AND_SW / 360;

/** Scale an iOS pt value to px (integer) */
const ip = (pt: number) => Math.round(pt * IOS_SCALE);
/** Scale an Android dp value to px (integer) */
const ap = (dp: number) => Math.round(dp * AND_SCALE);
/** iOS px string */
const ips = (pt: number) => `${ip(pt)}px`;
/** Android px string */
const aps = (dp: number) => `${ap(dp)}px`;
/** iOS font size — floor at 8 px for legibility */
const ipf = (pt: number) => `${Math.max(8, ip(pt))}px`;
/** Android font size — floor at 8 px for legibility */
const apf = (dp: number) => `${Math.max(8, ap(dp))}px`;

// ─── Shared sub-components ────────────────────────────────────────────────────

const UserIcon: React.FC<{ src?: string; size: number; radius?: string }> = ({
  src,
  size,
  radius = "22%",
}) => (
  <Box
    w={`${size}px`}
    h={`${size}px`}
    borderRadius={radius}
    overflow="hidden"
    flexShrink={0}
  >
    {src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt="app icon"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    ) : (
      <Box
        w="full"
        h="full"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      />
    )}
  </Box>
);

const Tile: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <Box
    w={`${size}px`}
    h={`${size}px`}
    borderRadius="22%"
    flexShrink={0}
    style={{ background: color }}
  />
);

// ─── iOS frame ────────────────────────────────────────────────────────────────

const IPhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    mx="auto"
    w={`${IOS_SW + ip(21)}px`}
    bg="#1a1a1c"
    borderRadius={ips(55)}
    pt={ips(14)}
    pb={ips(10)}
    px={ips(10)}
    border="1.5px solid #3a3a3c"
    boxShadow="0 32px 80px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.07) inset"
    position="relative"
  >
    {/* Dynamic Island */}
    <Box
      w={ips(126)}
      h={ips(34)}
      bg="#000"
      borderRadius="full"
      mx="auto"
      mb={ips(10)}
      boxShadow="inset 0 1px 4px rgba(0,0,0,0.9)"
    />
    {/* Screen */}
    <Box
      w={`${IOS_SW}px`}
      h={`${IOS_SH}px`}
      borderRadius={ips(46)}
      overflow="hidden"
      position="relative"
    >
      {children}
    </Box>
    {/* Home bar */}
    <Box
      w={ips(134)}
      h="4px"
      bg="rgba(255,255,255,0.22)"
      borderRadius="full"
      mx="auto"
      mt={ips(8)}
    />
  </Box>
);

// ─── Android frame ────────────────────────────────────────────────────────────

const AndroidFrame: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box
    mx="auto"
    w={`${AND_SW + ap(20)}px`}
    bg="#202124"
    borderRadius={aps(44)}
    pt={aps(12)}
    pb={aps(12)}
    px={aps(10)}
    border="1.5px solid #3c4043"
    boxShadow="0 32px 80px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.06) inset"
    position="relative"
  >
    {/* Punch-hole camera */}
    <Box
      w={aps(14)}
      h={aps(14)}
      bg="#111"
      borderRadius="full"
      mx="auto"
      mb={aps(8)}
      boxShadow="inset 0 1px 3px rgba(0,0,0,0.8)"
    />
    {/* Screen */}
    <Box
      w={`${AND_SW}px`}
      h={`${AND_SH}px`}
      borderRadius={aps(36)}
      overflow="hidden"
      position="relative"
    >
      {children}
    </Box>
    {/* Nav pill */}
    <Box
      w={aps(100)}
      h="3px"
      bg="rgba(255,255,255,0.2)"
      borderRadius="full"
      mx="auto"
      mt={aps(8)}
    />
  </Box>
);

// ─── iOS status bar ───────────────────────────────────────────────────────────

const IosStatusBar: React.FC<{ dark: boolean }> = ({ dark }) => {
  const fg = dark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)";
  return (
    <HStack
      px={ips(20)}
      pt={ips(14)}
      pb={ips(4)}
      justify="space-between"
      flexShrink={0}
    >
      <Text
        fontSize={ipf(15)}
        fontWeight="600"
        color={fg}
        fontFamily="sans-serif"
      >
        {"9:41"}
      </Text>
      <HStack gap={ips(5)}>
        {/* Signal bars */}
        <HStack gap="1.5px" align="flex-end" h={ipf(13)}>
          {[40, 55, 70, 85, 100].map((h, i) => (
            <Box
              key={i}
              w="2px"
              h={`${Math.round((ip(13) * h) / 100)}px`}
              borderRadius="1px"
              bg={fg}
            />
          ))}
        </HStack>
        {/* WiFi */}
        <Text fontSize={ipf(11)} color={fg} lineHeight="1">
          {"▲"}
        </Text>
        {/* Battery */}
        <Box
          display="inline-flex"
          alignItems="center"
          gap="1px"
          border={`1px solid ${fg}`}
          borderRadius="2px"
          px="2px"
          py="1px"
        >
          <Box w={ips(10)} h={ips(5)} bg={fg} borderRadius="1px" />
        </Box>
      </HStack>
    </HStack>
  );
};

// ─── Android status bar ───────────────────────────────────────────────────────

const AndroidStatusBar: React.FC<{ dark: boolean }> = ({ dark }) => {
  const fg = dark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.8)";
  return (
    <HStack
      px={aps(14)}
      pt={aps(10)}
      pb={aps(4)}
      justify="space-between"
      flexShrink={0}
    >
      <Text
        fontSize={apf(13)}
        fontWeight="500"
        color={fg}
        fontFamily="sans-serif"
      >
        {"9:41"}
      </Text>
      <HStack gap={aps(5)}>
        <Text fontSize={apf(11)} color={fg} lineHeight="1">
          {"▲"}
        </Text>
        <Text fontSize={apf(11)} color={fg} lineHeight="1">
          {"WiFi"}
        </Text>
        <Box
          display="inline-flex"
          alignItems="center"
          border={`1px solid ${fg}`}
          borderRadius="2px"
          px="1.5px"
          py="1px"
        >
          <Box w={aps(9)} h={aps(4)} bg={fg} borderRadius="1px" />
        </Box>
      </HStack>
    </HStack>
  );
};

// ─── iOS screens ─────────────────────────────────────────────────────────────

const IosHomeScreen: React.FC<{ src?: string; dark: boolean }> = ({
  src,
  dark,
}) => {
  const wallpaper = dark
    ? "linear-gradient(160deg,#1c1c3a 0%,#0d1f3c 50%,#0a1628 100%)"
    : "linear-gradient(160deg,#a8d8ea 0%,#c7ecee 50%,#dfe6e9 100%)";
  const dockBg = dark
    ? "rgba(255,255,255,0.12)"
    : "rgba(255,255,255,0.55)";
  const ICON = ip(60);
  const LABEL_COLOR = dark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)";
  const COLS = 4;
  const TOTAL = 20; // 5 rows × 4 cols

  return (
    <VStack
      h={`${IOS_SH}px`}
      gap={0}
      align="stretch"
      style={{ background: wallpaper }}
    >
      <IosStatusBar dark={dark} />
      {/* App grid */}
      <Box pt={ips(10)} px={ips(14)} flex={1} minH={0} overflow="hidden">
        <SimpleGrid columns={COLS} gap={ips(10)}>
          {Array.from({ length: TOTAL }).map((_, idx) => {
            const isUser = idx === 1; // row 1, col 2
            return (
              <VStack key={idx} gap={ips(4)} align="center">
                {isUser ? (
                  <UserIcon src={src} size={ICON} />
                ) : (
                  <Tile color={TILE_COLORS[idx % TILE_COLORS.length]} size={ICON} />
                )}
                <Text
                  fontSize={ipf(11)}
                  color={LABEL_COLOR}
                  lineClamp={1}
                  textAlign="center"
                  w={`${ICON}px`}
                >
                  {isUser ? "Your App" : `App ${idx + 1}`}
                </Text>
              </VStack>
            );
          })}
        </SimpleGrid>
      </Box>
      {/* Dock */}
      <Box px={ips(14)} pb={ips(14)} flexShrink={0}>
        <Box
          borderRadius={ips(28)}
          px={ips(14)}
          py={ips(12)}
          style={{
            background: dockBg,
            backdropFilter: "blur(24px)",
          }}
        >
          <HStack justify="space-around">
            {[16, 17, 18, 19].map((i) => (
              <Tile key={i} color={TILE_COLORS[i % TILE_COLORS.length]} size={ICON} />
            ))}
          </HStack>
        </Box>
      </Box>
    </VStack>
  );
};

const IosSpotlightScreen: React.FC<{ src?: string; dark: boolean }> = ({
  src,
  dark,
}) => {
  // Wallpaper peeking through a heavy scrim — matches actual iOS Spotlight behaviour
  const wallpaper = dark
    ? "linear-gradient(160deg,#1c1c3a 0%,#0d1f3c 50%,#0a1628 100%)"
    : "linear-gradient(160deg,#a8d8ea 0%,#c7ecee 50%,#dfe6e9 100%)";
  const scrim = dark ? "rgba(0,0,0,0.55)" : "rgba(240,240,248,0.72)";
  const searchBg = dark ? "rgba(118,118,128,0.36)" : "rgba(118,118,128,0.24)";
  const sectionLabel = dark ? "rgba(255,255,255,0.55)" : "rgba(60,60,67,0.6)";
  const textColor = dark ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.85)";
  const mutedColor = dark ? "rgba(255,255,255,0.45)" : "rgba(60,60,67,0.55)";
  const rowBg = dark ? "rgba(44,44,46,0.9)" : "rgba(255,255,255,0.88)";
  const divider = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const blue = "#007AFF";
  const SUGGESTION_ICON = ip(45);
  const RESULT_ICON = ip(29);

  const suggestions = [0,1,2,3,4,5,6,7];

  return (
    <Box h={`${IOS_SH}px`} position="relative" overflow="hidden">
      {/* Blurred wallpaper layer */}
      <Box position="absolute" inset={0} style={{ background: wallpaper }} />
      <Box position="absolute" inset={0} style={{ background: scrim, backdropFilter: "blur(28px)" }} />
      {/* Content */}
      <VStack h={`${IOS_SH}px`} gap={0} align="stretch" position="relative">
        <IosStatusBar dark={dark} />
        {/* Search bar + Cancel */}
        <HStack px={ips(14)} mt={ips(8)} gap={ips(8)} flexShrink={0}>
          <Box
            flex={1}
            borderRadius={ips(10)}
            px={ips(10)}
            py={ips(7)}
            style={{ background: searchBg }}
          >
            <HStack gap={ips(6)}>
              {/* Magnifier */}
              <svg width={ip(13)} height={ip(13)} viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke={mutedColor} strokeWidth="1.5"/>
                <line x1="9.5" y1="9.5" x2="12.5" y2="12.5" stroke={mutedColor} strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <Text fontSize={ipf(14)} color={mutedColor} lineHeight="1">{"Search"}</Text>
            </HStack>
          </Box>
          <Text fontSize={ipf(15)} color={blue} fontWeight="400">{"Cancel"}</Text>
        </HStack>
        {/* Siri Suggestions header */}
        <Box px={ips(14)} mt={ips(14)} mb={ips(8)} flexShrink={0}>
          <Text fontSize={ipf(12)} fontWeight="600" color={sectionLabel} letterSpacing="0.04em">
            {"SIRI SUGGESTIONS"}
          </Text>
        </Box>
        {/* 2 rows × 4 suggestion icons */}
        <Box px={ips(14)} flexShrink={0}>
          <SimpleGrid columns={4} gap={ips(10)}>
            {suggestions.map((idx) => {
              const isUser = idx === 0;
              return (
                <VStack key={idx} gap={ips(4)} align="center">
                  {isUser ? (
                    <UserIcon src={src} size={SUGGESTION_ICON} />
                  ) : (
                    <Box
                      w={`${SUGGESTION_ICON}px`}
                      h={`${SUGGESTION_ICON}px`}
                      borderRadius="22%"
                      bg={TILE_COLORS[(idx + 2) % TILE_COLORS.length]}
                      flexShrink={0}
                    />
                  )}
                  <Text fontSize={ipf(10)} color={textColor} lineClamp={1} textAlign="center">
                    {isUser ? "Your App" : `App ${idx + 1}`}
                  </Text>
                </VStack>
              );
            })}
          </SimpleGrid>
        </Box>
        {/* Top Hits header */}
        <Box px={ips(14)} mt={ips(14)} mb={ips(6)} flexShrink={0}>
          <Text fontSize={ipf(12)} fontWeight="600" color={sectionLabel} letterSpacing="0.04em">
            {"TOP HITS"}
          </Text>
        </Box>
        {/* Result rows */}
        <Box px={ips(14)} flexShrink={0}>
          <Box borderRadius={ips(12)} overflow="hidden">
            {[
              { label: "Your App", sub: "App · on this iPhone", isUser: true },
              { label: "App Store", sub: "App · Apple", colorIdx: 6 },
              { label: "Settings", sub: "App · Apple", colorIdx: 3 },
            ].map((row, i) => (
              <React.Fragment key={i}>
                {i > 0 && <Box h="1px" bg={divider} ml={`${RESULT_ICON + ip(22)}px`} />}
                <HStack px={ips(10)} py={ips(8)} gap={ips(10)} bg={rowBg} justify="space-between">
                  <HStack gap={ips(10)}>
                    {row.isUser ? (
                      <UserIcon src={src} size={RESULT_ICON} radius="22%" />
                    ) : (
                      <Box w={`${RESULT_ICON}px`} h={`${RESULT_ICON}px`} borderRadius="22%"
                        bg={TILE_COLORS[(row.colorIdx ?? i) % TILE_COLORS.length]} flexShrink={0} />
                    )}
                    <VStack align="start" gap={0}>
                      <Text fontSize={ipf(14)} fontWeight="500" color={textColor}>{row.label}</Text>
                      <Text fontSize={ipf(11)} color={mutedColor}>{row.sub}</Text>
                    </VStack>
                  </HStack>
                  <Text fontSize={ipf(16)} color={mutedColor} pr={ips(4)}>{"›"}</Text>
                </HStack>
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

const IosSettingsScreen: React.FC<{ src?: string; dark: boolean }> = ({
  src,
  dark,
}) => {
  const bg = dark ? "#000000" : "#f2f2f7";
  const rowBg = dark ? "#1c1c1e" : "#ffffff";
  const textColor = dark ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.88)";
  const mutedColor = dark ? "rgba(255,255,255,0.42)" : "rgba(60,60,67,0.6)";
  const divider = dark ? "rgba(255,255,255,0.07)" : "rgba(60,60,67,0.12)";
  const searchBg = dark ? "rgba(118,118,128,0.24)" : "rgba(118,118,128,0.2)";
  const blue = "#007AFF";
  const CELL_ICON = ip(29); // colored square icon size in rows
  const PROFILE_AVATAR = ip(50);

  // Colored rounded-square icons matching real iOS Settings colours
  const sysRows: { label: string; color: string; badge?: string }[] = [
    { label: "Wi-Fi",        color: "#007AFF", badge: "Home" },
    { label: "Bluetooth",    color: "#007AFF", badge: "On" },
    { label: "Mobile Data",  color: "#4CD964" },
    { label: "Notifications",color: "#FF3B30" },
    { label: "General",      color: "#8E8E93" },
  ];

  const SettingsRow = ({
    icon,
    label,
    badge,
    isLast = false,
  }: {
    icon: React.ReactNode;
    label: string;
    badge?: string;
    isLast?: boolean;
  }) => (
    <>
      <HStack px={ips(12)} py={ips(10)} gap={ips(10)} bg={rowBg} justify="space-between">
        <HStack gap={ips(10)}>
          {icon}
          <Text fontSize={ipf(15)} color={textColor}>{label}</Text>
        </HStack>
        <HStack gap={ips(5)}>
          {badge && <Text fontSize={ipf(14)} color={mutedColor}>{badge}</Text>}
          <Text fontSize={ipf(17)} color={mutedColor} lineHeight="1">{"›"}</Text>
        </HStack>
      </HStack>
      {!isLast && <Box h="1px" bg={divider} ml={`${CELL_ICON + ip(22)}px`} />}
    </>
  );

  return (
    <VStack h={`${IOS_SH}px`} gap={0} align="stretch" bg={bg}>
      <IosStatusBar dark={dark} />
      {/* Large title */}
      <Box px={ips(16)} pt={ips(6)} pb={ips(4)} flexShrink={0}>
        <Text fontSize={ipf(28)} fontWeight="700" color={textColor} lineHeight="1.15">
          {"Settings"}
        </Text>
      </Box>
      {/* Search bar */}
      <Box px={ips(16)} mb={ips(10)} flexShrink={0}>
        <Box borderRadius={ips(10)} px={ips(10)} py={ips(7)} style={{ background: searchBg }}>
          <HStack gap={ips(6)}>
            <svg width={ip(13)} height={ip(13)} viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke={mutedColor} strokeWidth="1.5"/>
              <line x1="9.5" y1="9.5" x2="12.5" y2="12.5" stroke={mutedColor} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <Text fontSize={ipf(14)} color={mutedColor}>{"Search"}</Text>
          </HStack>
        </Box>
      </Box>
      <Box px={ips(16)} flex={1} minH={0} overflow="hidden">
        {/* Profile row */}
        <Box borderRadius={ips(12)} overflow="hidden" mb={ips(8)}>
          <HStack px={ips(12)} py={ips(10)} gap={ips(12)} bg={rowBg} justify="space-between">
            <HStack gap={ips(12)}>
              <Box
                w={`${PROFILE_AVATAR}px`}
                h={`${PROFILE_AVATAR}px`}
                borderRadius="full"
                flexShrink={0}
                style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize={ipf(18)} fontWeight="600" color="white">{"M"}</Text>
              </Box>
              <VStack align="start" gap={0}>
                <Text fontSize={ipf(16)} fontWeight="500" color={textColor}>{"Muhammad"}</Text>
                <Text fontSize={ipf(12)} color={blue}>{"Apple ID, iCloud, Media & Purchases"}</Text>
              </VStack>
            </HStack>
            <Text fontSize={ipf(17)} color={mutedColor} lineHeight="1">{"›"}</Text>
          </HStack>
        </Box>
        {/* System rows section */}
        <Box borderRadius={ips(12)} overflow="hidden" mb={ips(8)}>
          {sysRows.map((row, idx) => (
            <SettingsRow
              key={idx}
              icon={
                <Box
                  w={`${CELL_ICON}px`}
                  h={`${CELL_ICON}px`}
                  borderRadius="22%"
                  bg={row.color}
                  flexShrink={0}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                />
              }
              label={row.label}
              badge={row.badge}
              isLast={idx === sysRows.length - 1}
            />
          ))}
        </Box>
        {/* Your App row */}
        <Box borderRadius={ips(12)} overflow="hidden">
          <SettingsRow
            icon={<UserIcon src={src} size={CELL_ICON} radius="22%" />}
            label={"Your App"}
            isLast
          />
        </Box>
      </Box>
    </VStack>
  );
};

const IosAppStoreScreen: React.FC<{ src?: string; dark: boolean }> = ({
  src,
  dark,
}) => {
  const bg = dark ? "#000000" : "#f2f2f7";
  const cardBg = dark ? "#1c1c1e" : "#ffffff";
  const textColor = dark ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.88)";
  const mutedColor = dark ? "rgba(255,255,255,0.42)" : "rgba(60,60,67,0.6)";
  const divider = dark ? "rgba(255,255,255,0.08)" : "rgba(60,60,67,0.12)";
  const blue = "#007AFF";
  const APP_ICON = ip(100);
  const SS_W = ip(140); // screenshot width
  const SS_H = ip(220); // screenshot height

  const starRow = (filled: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Text key={i} fontSize={ipf(10)} color={i < filled ? "#FF9500" : mutedColor} lineHeight="1">
        {i < filled ? "★" : "☆"}
      </Text>
    ));

  return (
    <VStack h={`${IOS_SH}px`} gap={0} align="stretch" bg={bg}>
      <IosStatusBar dark={dark} />
      {/* Nav bar */}
      <HStack px={ips(14)} pb={ips(6)} flexShrink={0}>
        <Text fontSize={ipf(16)} color={blue}>{"‹ Search"}</Text>
      </HStack>
      <Box flex={1} minH={0} overflow="hidden">
        {/* App header card */}
        <Box mx={ips(14)} borderRadius={ips(14)} bg={cardBg} overflow="hidden" mb={ips(10)}>
          <HStack px={ips(14)} pt={ips(14)} pb={ips(12)} gap={ips(14)} align="flex-start">
            <UserIcon src={src} size={APP_ICON} radius="22%" />
            <VStack align="start" gap={ips(3)} flex={1}>
              <Text fontSize={ipf(17)} fontWeight="700" color={textColor} lineClamp={2} lineHeight="1.2">
                {"Your App"}
              </Text>
              <Text fontSize={ipf(12)} color={blue} lineClamp={1}>
                {"Developer Name"}
              </Text>
              {/* GET button */}
              <Box bg={blue} borderRadius="full" px={ips(18)} py={ips(5)} mt={ips(4)}>
                <Text fontSize={ipf(14)} fontWeight="600" color="white">{"GET"}</Text>
              </Box>
              <Text fontSize={ipf(10)} color={mutedColor}>{"In-App Purchases"}</Text>
            </VStack>
          </HStack>
          {/* Ratings strip */}
          <Box h="1px" bg={divider} />
          <HStack px={ips(14)} py={ips(10)} justify="space-between">
            <VStack align="center" gap={ips(2)}>
              <Text fontSize={ipf(18)} fontWeight="700" color={mutedColor}>{"4.8"}</Text>
              <HStack gap="1px">{starRow(5)}</HStack>
              <Text fontSize={ipf(9)} color={mutedColor}>{"12.4K Ratings"}</Text>
            </VStack>
            <Box w="1px" h={ips(36)} bg={divider} />
            <VStack align="center" gap={ips(2)}>
              <Text fontSize={ipf(18)} fontWeight="700" color={mutedColor}>{"4+"}</Text>
              <Text fontSize={ipf(9)} color={mutedColor} textAlign="center">{"Age"}</Text>
            </VStack>
            <Box w="1px" h={ips(36)} bg={divider} />
            <VStack align="center" gap={ips(2)}>
              <Text fontSize={ipf(12)} fontWeight="700" color={mutedColor}>{"#5"}</Text>
              <Text fontSize={ipf(9)} color={mutedColor}>{"Productivity"}</Text>
            </VStack>
          </HStack>
        </Box>
        {/* Screenshots row */}
        <Box px={ips(14)} mb={ips(10)}>
          <Text fontSize={ipf(16)} fontWeight="600" color={textColor} mb={ips(8)}>
            {"Preview"}
          </Text>
          <HStack gap={ips(8)} overflow="hidden">
            {[
              "linear-gradient(160deg,#667eea,#764ba2)",
              "linear-gradient(160deg,#f093fb,#f5576c)",
              "linear-gradient(160deg,#4facfe,#00f2fe)",
            ].map((grad, i) => (
              <Box
                key={i}
                w={`${SS_W}px`}
                h={`${SS_H}px`}
                borderRadius={ips(12)}
                flexShrink={0}
                style={{ background: grad }}
              />
            ))}
          </HStack>
        </Box>
      </Box>
    </VStack>
  );
};

const IosNotificationScreen: React.FC<{ src?: string; dark: boolean }> = ({
  src,
  dark,
}) => {
  const wallpaper = dark
    ? "linear-gradient(160deg,#1c1c3a 0%,#0d1f3c 50%,#0a1628 100%)"
    : "linear-gradient(160deg,#a8d8ea 0%,#c7ecee 50%,#dfe6e9 100%)";
  // Frosted glass notification cards — match iOS live activity / lock screen style
  const cardBg = dark ? "rgba(36,36,40,0.78)" : "rgba(255,255,255,0.72)";
  const textColor = dark ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.88)";
  const mutedColor = dark ? "rgba(255,255,255,0.48)" : "rgba(60,60,67,0.6)";
  const timeColor = dark ? "white" : "rgba(0,0,0,0.88)";
  const dateColor = dark ? "rgba(255,255,255,0.72)" : "rgba(0,0,0,0.6)";
  const NOTIF_ICON = ip(18);

  const NotifCard = ({
    icon,
    appName,
    time,
    title,
    body,
  }: {
    icon: React.ReactNode;
    appName: string;
    time: string;
    title: string;
    body: string;
  }) => (
    <Box
      w="full"
      borderRadius={ips(18)}
      overflow="hidden"
      style={{ background: cardBg, backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)" }}
    >
      <HStack px={ips(12)} py={ips(10)} gap={ips(10)} align="center">
        {/* Icon — vertically centered against all text */}
        <Box flexShrink={0}>{icon}</Box>
        {/* All text to the right of the icon */}
        <VStack align="stretch" gap={0} flex={1} minW={0}>
          <HStack justify="space-between" gap={ips(6)}>
            <Text fontSize={ipf(12)} fontWeight="500" color={mutedColor} letterSpacing="0.01em" lineClamp={1}>
              {appName}
            </Text>
            <Text fontSize={ipf(12)} color={mutedColor} flexShrink={0}>{time}</Text>
          </HStack>
          <Text fontSize={ipf(14)} fontWeight="600" color={textColor} lineHeight="1.3">
            {title}
          </Text>
          <Text fontSize={ipf(13)} color={mutedColor} lineClamp={2} lineHeight="1.35">
            {body}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );

  return (
    <Box h={`${IOS_SH}px`} position="relative" overflow="hidden">
      {/* Wallpaper */}
      <Box position="absolute" inset={0} style={{ background: wallpaper }} />
      {/* Subtle blur on lock screen */}
      <Box position="absolute" inset={0} style={{ backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }} />
      <VStack h={`${IOS_SH}px`} gap={0} align="stretch" position="relative">
        <IosStatusBar dark={dark} />
        {/* Lock screen clock — large, centered */}
        <VStack gap={ips(2)} pt={ips(18)} pb={ips(24)} flexShrink={0} align="center">
          <Text
            fontSize={ipf(56)}
            fontWeight="300"
            color={timeColor}
            lineHeight="1"
            letterSpacing="-0.02em"
          >
            {"9:41"}
          </Text>
          <Text fontSize={ipf(16)} fontWeight="400" color={dateColor}>
            {"Monday, April 14"}
          </Text>
        </VStack>
        {/* Notification stack */}
        <VStack px={ips(14)} gap={ips(8)} flexShrink={0}>
          <NotifCard
            icon={<UserIcon src={src} size={NOTIF_ICON} radius="22%" />}
            appName="YOUR APP"
            time="now"
            title="New update available"
            body="Version 2.0 is ready with new features and performance improvements."
          />
          <NotifCard
            icon={
              <Box
                w={`${NOTIF_ICON}px`}
                h={`${NOTIF_ICON}px`}
                borderRadius="22%"
                bg={TILE_COLORS[5]}
                flexShrink={0}
              />
            }
            appName="MESSAGES"
            time="5m ago"
            title="Alex"
            body="Are you free this evening?"
          />
          <NotifCard
            icon={
              <Box
                w={`${NOTIF_ICON}px`}
                h={`${NOTIF_ICON}px`}
                borderRadius="22%"
                bg={TILE_COLORS[12]}
                flexShrink={0}
              />
            }
            appName="MAIL"
            time="12m ago"
            title="Your receipt from Apple"
            body="A payment of $0.99 was billed to your account."
          />
        </VStack>
        {/* Bottom controls row */}
        <Box flex={1} flexShrink={0} />
        <HStack px={ips(30)} pb={ips(20)} justify="space-between" flexShrink={0}>
          {/* Flashlight icon */}
          <Box
            w={ips(42)} h={ips(42)}
            borderRadius="full"
            style={{ background: dark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.14)", backdropFilter: "blur(20px)" }}
            display="flex" alignItems="center" justifyContent="center"
          >
            <Text fontSize={ipf(16)} color={timeColor}>{"⚡"}</Text>
          </Box>
          {/* Camera icon */}
          <Box
            w={ips(42)} h={ips(42)}
            borderRadius="full"
            style={{ background: dark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.14)", backdropFilter: "blur(20px)" }}
            display="flex" alignItems="center" justifyContent="center"
          >
            <Text fontSize={ipf(16)} color={timeColor}>{"⊙"}</Text>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

// ─── Android screens ──────────────────────────────────────────────────────────

const AndroidHomeScreen: React.FC<{ src?: string; dark: boolean }> = ({
  src,
  dark,
}) => {
  const wallpaper = dark
    ? "linear-gradient(160deg,#1a237e 0%,#283593 50%,#1565c0 100%)"
    : "linear-gradient(160deg,#e3f2fd 0%,#bbdefb 50%,#90caf9 100%)";
  const searchBg = dark ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.75)";
  const textColor = dark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)";
  const mutedColor = dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
  const ICON = ap(48);
  const COLS = 5;
  const TOTAL = 25; // 5 rows × 5 cols

  return (
    <VStack
      h={`${AND_SH}px`}
      gap={0}
      align="stretch"
      style={{ background: wallpaper }}
    >
      <AndroidStatusBar dark={dark} />
      {/* Search widget */}
      <Box
        mx={aps(14)}
        mt={aps(10)}
        mb={aps(12)}
        bg={searchBg}
        borderRadius="full"
        px={aps(16)}
        py={aps(10)}
        flexShrink={0}
        style={{ backdropFilter: "blur(12px)" }}
      >
        <HStack gap={aps(8)}>
          <Text fontSize={apf(13)} color={mutedColor}>{"🔍"}</Text>
          <Text fontSize={apf(13)} color={mutedColor}>{"Search…"}</Text>
        </HStack>
      </Box>
      {/* App grid — fills remaining space, no dock */}
      <Box px={aps(12)} flex={1} minH={0} overflow="hidden">
        <SimpleGrid columns={COLS} gap={aps(8)}>
          {Array.from({ length: TOTAL }).map((_, idx) => {
            const isUser = idx === 2; // row 1, col 3
            return (
              <VStack key={idx} gap={aps(4)} align="center">
                {isUser ? (
                  <UserIcon src={src} size={ICON} radius="22%" />
                ) : (
                  <Tile color={TILE_COLORS[idx % TILE_COLORS.length]} size={ICON} />
                )}
                <Text
                  fontSize={apf(10)}
                  color={textColor}
                  lineClamp={1}
                  textAlign="center"
                  w={`${ICON}px`}
                >
                  {isUser ? "Your App" : `App`}
                </Text>
              </VStack>
            );
          })}
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

const AndroidNotificationScreen: React.FC<{ src?: string; dark: boolean }> = ({
  src,
  dark,
}) => {
  const bg = dark ? "#121212" : "#f5f5f5";
  const cardBg = dark ? "#1e1e1e" : "#ffffff";
  const textColor = dark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)";
  const mutedColor = dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
  const ICON = ap(24);

  return (
    <VStack
      h={`${AND_SH}px`}
      gap={0}
      align="stretch"
      bg={bg}
    >
      <AndroidStatusBar dark={dark} />
      <Box px={aps(12)} mt={aps(16)} flexShrink={0}>
        <Text fontSize={apf(13)} color={mutedColor} mb={aps(8)}>
          {"Notifications"}
        </Text>
        <Box borderRadius={aps(16)} bg={cardBg} overflow="hidden">
          <HStack px={aps(12)} pt={aps(10)} pb={aps(6)} gap={aps(8)} justify="space-between">
            <HStack gap={aps(6)}>
              <UserIcon src={src} size={ICON} radius="22%" />
              <Text fontSize={apf(11)} fontWeight="500" color={mutedColor}>
                {"Your App"}
              </Text>
            </HStack>
            <Text fontSize={apf(11)} color={mutedColor}>{"now"}</Text>
          </HStack>
          <Box px={aps(12)} pb={aps(12)}>
            <Text fontSize={apf(13)} fontWeight="500" color={textColor}>
              {"New update available"}
            </Text>
            <Text fontSize={apf(12)} color={mutedColor} lineClamp={2}>
              {"Version 2.0 is ready with new features and fixes."}
            </Text>
          </Box>
        </Box>
        {/* Second notification */}
        <Box borderRadius={aps(16)} bg={cardBg} overflow="hidden" mt={aps(8)}>
          <HStack px={aps(12)} pt={aps(10)} pb={aps(6)} gap={aps(8)} justify="space-between">
            <HStack gap={aps(6)}>
              <Box
                w={`${ICON}px`}
                h={`${ICON}px`}
                borderRadius="22%"
                bg={TILE_COLORS[5]}
                flexShrink={0}
              />
              <Text fontSize={apf(11)} fontWeight="500" color={mutedColor}>
                {"Other App"}
              </Text>
            </HStack>
            <Text fontSize={apf(11)} color={mutedColor}>{"5m ago"}</Text>
          </HStack>
          <Box px={aps(12)} pb={aps(12)}>
            <Text fontSize={apf(13)} fontWeight="500" color={textColor}>
              {"You have a new message"}
            </Text>
          </Box>
        </Box>
      </Box>
    </VStack>
  );
};

const AndroidGooglePlayScreen: React.FC<{ src?: string; dark: boolean }> = ({
  src,
  dark,
}) => {
  const bg = dark ? "#202124" : "#ffffff";
  const textColor = dark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)";
  const mutedColor = dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
  const green = "#01875f";
  const ICON = ap(80);

  return (
    <VStack
      h={`${AND_SH}px`}
      gap={0}
      align="stretch"
      bg={bg}
    >
      <AndroidStatusBar dark={dark} />
      <Box px={aps(14)} flex={1} minH={0} overflow="hidden">
        {/* Banner */}
        <Box
          h={aps(140)}
          borderRadius={aps(12)}
          mt={aps(10)}
          style={{ background: "linear-gradient(135deg,#1a237e,#1565c0)" }}
        />
        {/* App info */}
        <HStack mt={aps(12)} gap={aps(14)} align="flex-start">
          <UserIcon src={src} size={ICON} radius="22%" />
          <VStack align="start" gap={aps(4)} flex={1}>
            <Text fontSize={apf(16)} fontWeight="700" color={textColor} lineClamp={2}>
              {"Your App"}
            </Text>
            <Text fontSize={apf(12)} color={green}>
              {"Developer Name"}
            </Text>
            <Text fontSize={apf(12)} color={mutedColor}>
              {"4.8 ★  1M+ downloads"}
            </Text>
            <Box
              bg={green}
              borderRadius={aps(6)}
              px={aps(18)}
              py={aps(8)}
              mt={aps(4)}
            >
              <Text fontSize={apf(13)} fontWeight="600" color="white">
                {"Install"}
              </Text>
            </Box>
          </VStack>
        </HStack>
      </Box>
    </VStack>
  );
};

// ─── Section header data ──────────────────────────────────────────────────────

const previewSectionData = {
  badge: "Preview",
  title: "See how your icon looks",
  description:
    "Preview your icon across iOS and Android contexts before downloading.",
};

// ─── Main component ───────────────────────────────────────────────────────────

type Props = {
  iosIconUrl?: string;
  androidIconUrl?: string;
};

const AppIconGeneratorPreviewSection: React.FC<Props> = ({ iosIconUrl, androidIconUrl }) => {
  const { palette } = useColorPalette();
  const { colorMode } = useColorMode();
  const mounted = useMounted();

  // Default to dark before hydration to avoid mismatch
  const siteDark = mounted ? colorMode === "dark" : true;

  const [iosContext, setIosContext] = React.useState<IosContext>("home-screen");
  const [androidContext, setAndroidContext] =
    React.useState<AndroidContext>("home-screen");
  const [iosDark, setIosDark] = React.useState<boolean>(siteDark);
  const [androidDark, setAndroidDark] = React.useState<boolean>(siteDark);

  // Sync with site theme when it first resolves
  React.useEffect(() => {
    if (mounted) {
      setIosDark(siteDark);
      setAndroidDark(siteDark);
    }
    // Only run on mount resolution
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const iosOption = IOS_OPTIONS.find((o) => o.value === iosContext)!;
  const androidOption = ANDROID_OPTIONS.find(
    (o) => o.value === androidContext,
  )!;

  const renderIosScreen = () => {
    switch (iosContext) {
      case "home-screen":
        return <IosHomeScreen src={iosIconUrl} dark={iosDark} />;
      case "spotlight":
        return <IosSpotlightScreen src={iosIconUrl} dark={iosDark} />;
      case "settings":
        return <IosSettingsScreen src={iosIconUrl} dark={iosDark} />;
      case "app-store":
        return <IosAppStoreScreen src={iosIconUrl} dark={iosDark} />;
      case "notification":
        return <IosNotificationScreen src={iosIconUrl} dark={iosDark} />;
    }
  };

  const renderAndroidScreen = () => {
    switch (androidContext) {
      case "home-screen":
        return <AndroidHomeScreen src={androidIconUrl} dark={androidDark} />;
      case "notification":
        return <AndroidNotificationScreen src={androidIconUrl} dark={androidDark} />;
      case "google-play":
        return <AndroidGooglePlayScreen src={androidIconUrl} dark={androidDark} />;
    }
  };

  const modeToggle = (isDark: boolean, onToggle: (v: boolean) => void) => (
    <HStack gap={1}>
      {(["light", "dark"] as const).map((mode) => (
        <Box
          key={mode}
          as="button"
          px={3}
          py={1}
          borderRadius="full"
          fontSize="xs"
          fontWeight="500"
          cursor="pointer"
          bg={
            (mode === "dark") === isDark
              ? `${palette}.500`
              : "transparent"
          }
          color={
            (mode === "dark") === isDark
              ? "white"
              : "fg.muted"
          }
          borderWidth="1px"
          borderColor={
            (mode === "dark") === isDark
              ? `${palette}.500`
              : "border.muted"
          }
          onClick={() => onToggle(mode === "dark")}
          transition="all 0.15s"
        >
          {mode === "dark" ? "Dark" : "Light"}
        </Box>
      ))}
    </HStack>
  );

  return (
    <Box as="section">
      <SectionHeader
        tagline={previewSectionData.badge}
        headline={previewSectionData.title}
        description={previewSectionData.description}
      />
      <Spacer p={4} />
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 12 }}>
        {/* iOS column */}
        <GridItem>
          <VStack align="stretch" gap={4}>
            {/* Controls */}
            <HStack flexWrap="wrap" gap={3} justify="space-between">
              <HStack gap={2}>
                <FaApple />
                <Text fontWeight="600" fontSize="sm">{"iOS"}</Text>
              </HStack>
              <HStack gap={3} flexWrap="wrap">
                {modeToggle(iosDark, setIosDark)}
                <NativeSelect.Root size="sm" w="auto" minW="140px">
                  <NativeSelect.Field
                    value={iosContext}
                    onChange={(e) =>
                      setIosContext(e.currentTarget.value as IosContext)
                    }
                  >
                    {IOS_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </HStack>
            </HStack>
            <Text fontSize="xs" color="fg.muted">
              {iosOption.desc}
            </Text>
            {/* Device */}
            <Box display="flex" justifyContent="center">
              <IPhoneFrame>{renderIosScreen()}</IPhoneFrame>
            </Box>
          </VStack>
        </GridItem>

        {/* Android column */}
        <GridItem>
          <VStack align="stretch" gap={4}>
            {/* Controls */}
            <HStack flexWrap="wrap" gap={3} justify="space-between">
              <HStack gap={2}>
                <FaAndroid />
                <Text fontWeight="600" fontSize="sm">{"Android"}</Text>
              </HStack>
              <HStack gap={3} flexWrap="wrap">
                {modeToggle(androidDark, setAndroidDark)}
                <NativeSelect.Root size="sm" w="auto" minW="140px">
                  <NativeSelect.Field
                    value={androidContext}
                    onChange={(e) =>
                      setAndroidContext(
                        e.currentTarget.value as AndroidContext,
                      )
                    }
                  >
                    {ANDROID_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </HStack>
            </HStack>
            <Text fontSize="xs" color="fg.muted">
              {androidOption.desc}
            </Text>
            {/* Device */}
            <Box display="flex" justifyContent="center">
              <AndroidFrame>{renderAndroidScreen()}</AndroidFrame>
            </Box>
          </VStack>
        </GridItem>
      </SimpleGrid>
      <Text fontSize="xs" color="fg.subtle" textAlign="center" mt={6}>
        {"These previews are for reference only. Actual appearance may vary across devices, OS versions, and system settings."}
      </Text>
    </Box>
  );
};

export default AppIconGeneratorPreviewSection;
