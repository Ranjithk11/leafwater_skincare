import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { FaBoxOpen } from "react-icons/fa6";

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
  // {
  //   name: "Omega-3 Fatty Acids",
  //   bgColor: "#fab1a0",
  //   icon: "/icons/almond.png",
  // },
  // {
  //   name: "Antioxidant-Rich Foods",
  //   bgColor: "#fab1a0",
  //   icon: "/icons/almond.png",
  // },
  // {
  //   name: "Healthy Fats",
  //   bgColor: "#fab1a0",
  //   icon: "/icons/almond.png",
  // },
  // {
  //   name: "Zinc and Selenium",
  //   bgColor: "#fab1a0",
  //   icon: "/icons/almond.png",
  // },
  // {
  //   name: "Foods to Avoid",
  //   bgColor: "#E9F7EF",
  //   icon: "/icons/dinner.png",
  // },
  // {
  //   name: "Additional Tips",
  //   bgColor: "#E9F7EF",
  //   icon: "/icons/dinner.png",
  // },
  {
    name: "LunFoods to Avoid",
    bgColor: "#E9F7EF",
    icon: "/icons/dinner.png",
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
          : "#ecf0f1",
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
          <img
            width={100}
            src={getIconAndCardBg(data?.title)?.icon || "/icons/nutrition.png"}
          />
        </Grid>
        <Grid item>
          <Typography variant="h6" textAlign="left">
            {data?.title}
          </Typography>
        </Grid>
      </Grid>
      <Box pt={4} pl={3} pr={3} pb={3}>
        {data?.options?.map((itm: any) => (
          <>
            <Typography variant="body1" textAlign="left">
              <b>{itm.heading}</b>
            </Typography>
            <Typography variant="body1" textAlign="left">
              {itm?.description}
            </Typography>
          </>
        ))}
      </Box>
    </Box>
  );
};

export default DietChartCard;
