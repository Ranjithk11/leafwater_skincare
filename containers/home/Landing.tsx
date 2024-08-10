"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Container, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Marquee from "react-fast-marquee";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/utils/routes";

const StyledHomeLanding = styled(Container)(({ theme }) => ({
  height: `calc(100dvh)`,
  position: "relative",

  "& .marquee_sliding": {
    height: `calc(100dvh)`,
    width: "100vw",
    position: "relative",
    backgroundRepeat: "repeat",
    backgroundSize: "contain",
    backgroundPosition: "top",
  },
  "& .overly_layer": {
    position: "absolute",
    width: "100%",
    height: "100%",
    [theme.breakpoints.only("xs")]:{
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    backgroundColor: "rgba(0,0,0,0.2)",
    zIndex: 2,
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  "& .centered_box": {
    padding: 40,
    backgroundColor: theme.palette.common.white,
    width: 450,
    [theme.breakpoints.only("xs")]:{
      width: 320
    },
    "& .MuiTypography-h5": {
      fontSize: 31,
      textAlign: "center",
      marginTop: 20,
    },
    "& .MuiTypography-body2": {
      textAlign: "center",
      fontSize: 16,
      color: theme.palette.text.secondary,
    },
  },

  "& .__marquee_slider": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: `calc(100dvh - 65px)`,
    [theme.breakpoints.only("xs")]: {
      height: "calc(100vh - 64px)",
    },
    "& .__marquee_slide": {
      height: 500,
      [theme.breakpoints.down("xs")]: {
        height: "calc(100vh - 64px)",
      },
    },
  },
  "& .__content_section": {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 55,
    zIndex: 2,
  },
  "& .__span": {
    color: theme.palette.primary.main,
  },
}));

const HomeLanding = () => {
  const router = useRouter();
  const theme = useTheme();
  const isSmDevice = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <StyledHomeLanding maxWidth={false} disableGutters>
      <Marquee gradient={isSmDevice?true:false} gradientColor="black" style={{}}>
        <Box
          component="div"
          className="marquee_sliding"
          sx={{ backgroundImage: `url(/images/skincare_bg.png)` }}
        ></Box>
      </Marquee>
      <Box className="overly_layer">
        <Box component="div" className="centered_box">
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <img width={100} src="/logo/leafwater.png" alt="leaf-water" />
            </Grid>
            <Grid item>
              <Typography color="secondary" fontWeight={900} variant="h5">
                Personalized <span className="__span">Skincare</span>
              </Typography>
              <Typography variant="body2">
                Recommendations based on analysis results.
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={() => router.push(APP_ROUTES.SKIN_ANALYSIS)}
                endIcon={<KeyboardDoubleArrowRightIcon />}
                variant="contained"
                color="primary"
                size="large"
                sx={{ borderRadius: 100, marginTop: 2 }}
              >
                Start Analysis
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </StyledHomeLanding>
  );
};

export default HomeLanding;
