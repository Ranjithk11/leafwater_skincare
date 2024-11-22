import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const timinings = [
  {
    name: "Breakfast",
    bgColor: "#00cec9",
    icon: "/icons/food.png",
  },
  {
    name: "Lunch",
    bgColor: "#E9F7EF",
    icon: "/icons/dinner.png",
  },
  {
    name: "Dinner",
    bgColor: "#fab1a0",
    icon: "/icons/almond.png",
  },
];

interface DietChartCardProps {
  data: any;
}

const DietChartCard = ({ data }: DietChartCardProps) => {
  const getIconAndCardBg = (timing: string) => {
    const findInfo = timinings.find((item: any) => item.name === timing);
    return findInfo;
  };

  return (
    <Box
      pt={4}
      pb={4}
      pl={2}
      pr={2}
      sx={{
        backgroundColor: getIconAndCardBg(data?.title)
          ? getIconAndCardBg(data?.title)?.bgColor
          : "InfoBackground",
        borderRadius: 5,
        height: "100%",
      }}
    >
      <Grid
        container
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <img src={getIconAndCardBg(data?.title)?.icon} />
        </Grid>
        <Grid item>
          <Typography variant="h6" textAlign="center">
            {data?.title}
          </Typography>
        </Grid>
        {data?.options?.map((itm: any) => (
          <Grid item>
            <Typography variant="body1" textAlign="center">
              <b>{itm.heading} :</b> {itm?.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DietChartCard;
