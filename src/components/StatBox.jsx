import { Box, Typography } from "@mui/material";
import React from "react";

const StatBox = ({ title, value, increase, icon, description }) => {
  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor="#21295c"
      borderRadius="0.55rem"
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: "#fff6e0" }}>
          {title}
        </Typography>
        {icon}
      </Box>

      <Typography variant="h3" fontWeight="600" sx={{ color: "#ffedc2" }}>
        {value}
      </Typography>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        gap="1rem"
      >
        <Typography variant="h5" fontStyle="italic" sx={{ color: "#997d3d" }}>
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
