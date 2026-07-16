import { Card, CardContent, Typography, Box } from "@mui/material";

import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

export default function StatCard({
  title,
  value,
  icon,
  color,
  trend,
  featured = false,
}) {
  return (
    <Card
      sx={{
        height: "100%",

        minHeight: featured ? 200 : 150,

        borderRadius: 4,

        background: featured
          ? `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`
          : "rgba(255, 255, 255, 0.7)",

        backdropFilter: "blur(10px)",

        border: featured
          ? "1px solid rgba(255, 255, 255, 0.2)"
          : "1px solid rgba(255, 255, 255, 0.4)",

        boxShadow: featured
          ? `0 8px 24px ${color}40, inset 0 1px 1px rgba(255, 255, 255, 0.2)`
          : "0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.5)",

        transition: "all .3s ease",

        "&:hover": {
          transform: "translateY(-4px)",

          background: featured
            ? `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`
            : "rgba(255, 255, 255, 0.8)",

          boxShadow: featured
            ? `0 12px 32px ${color}55, inset 0 1px 1px rgba(255, 255, 255, 0.2)`
            : "0 8px 24px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.5)",
        },
      }}
    >
      <CardContent
        sx={{
          p: 3,

          height: "100%",

          display: "flex",

          flexDirection: "column",

          justifyContent: "space-between",

          "&:last-child": {
            pb: 3,
          },
        }}
      >
        <Box
          display="flex"

          justifyContent="space-between"

          alignItems="flex-start"
        >
          <Typography
            variant="body2"

            fontWeight={600}

            sx={{
              color: featured ? "rgba(255, 255, 255, 0.85)" : "text.secondary",
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              width: 44,

              height: 44,

              borderRadius: 3,

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              color: featured ? color : "#fff",

              background: featured
                ? "rgba(255, 255, 255, 0.9)"
                : `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,

              boxShadow: featured
                ? "0 4px 12px rgba(0, 0, 0, 0.15)"
                : `0 4px 12px ${color}40`,
            }}
          >
            {icon}
          </Box>
        </Box>

        <Box>
          <Typography
            variant={featured ? "h2" : "h3"}

            fontWeight={700}

            sx={{
              color: featured ? "#fff" : "#111827",
              lineHeight: 1.1,
              mb: trend ? 1 : 0,
            }}
          >
            {value}
          </Typography>

          {trend && (
            <Box display="flex" alignItems="center" gap={0.5}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.3,
                  px: 1,
                  py: 0.3,
                  borderRadius: 2,
                  background: featured
                    ? "rgba(255, 255, 255, 0.2)"
                    : trend.direction === "up"
                      ? "rgba(16, 185, 129, 0.1)"
                      : "rgba(239, 68, 68, 0.1)",
                }}
              >
                {trend.direction === "up" ? (
                  <ArrowUpward
                    sx={{ fontSize: 14, color: featured ? "#fff" : "#10B981" }}
                  />
                ) : (
                  <ArrowDownward
                    sx={{ fontSize: 14, color: featured ? "#fff" : "#EF4444" }}
                  />
                )}

                <Typography
                  variant="caption"
                  fontWeight={700}
                  sx={{
                    color: featured
                      ? "#fff"
                      : trend.direction === "up"
                        ? "#059669"
                        : "#DC2626",
                  }}
                >
                  {trend.value}
                </Typography>
              </Box>

              <Typography
                variant="caption"
                sx={{
                  color: featured
                    ? "rgba(255, 255, 255, 0.75)"
                    : "text.secondary",
                }}
              >
                {trend.label}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
