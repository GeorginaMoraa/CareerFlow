import { Chip } from "@mui/material";
import { STATUS_COLORS } from "../../constants/application";

export default function StatusChip({ status, ...props }) {
  return (
    <Chip
      size="small"
      label={status}
      color={STATUS_COLORS[status] || "default"}
      sx={{ fontWeight: 600 }}
      {...props}
    />
  );
}
