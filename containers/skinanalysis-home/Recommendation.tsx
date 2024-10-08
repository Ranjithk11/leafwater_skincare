"use client";
import {
  useGetUploadImageInfoMutation,
  useLazyFetchRecommnedSkinAttributesQuery,
  useLazyFetchUserQuestionsResponseQuery,
} from "@/redux/api/analysisApi";
import { Font, StyleSheet } from "@react-pdf/renderer";

import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  styled,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { Fragment, useEffect, useRef } from "react";
import { APP_COLORS } from "@/theme/colors/colors";
import LoadingComponent from "@/components/loaders/Loading";
import { Icon } from "@iconify/react";
import SalonServices from "./Recommendations/SalonServices";
import DietChart from "./Recommendations/DietChart";
import MeetTeam from "./Recommendations/MeetTeam";
import Routine from "./Recommendations/Routines";
import CoverPage from "./Recommendations/Cover";
import UserInfo from "./Recommendations/UserInfo";
import PreventingView from "./Recommendations/Preventing";
import CosmeticRecommdations from "./Recommendations/CosmeticRecommdations";
import ProductsView from "./Recommendations/Products";

const defaultFont = "Roboto";
const extraBold = `/fonts/OpenSans-ExtraBold.ttf`;
const medium = `/fonts/OpenSans-Medium.ttf`;
const regular = `/fonts/OpenSans-Regular.ttf`;
const semiBold = `/fonts/OpenSans-SemiBold.ttf`;

Font.register({
  family: defaultFont,
  fonts: [
    {
      src: extraBold,
      fontWeight: 900,
      fontStyle: "normal",
    },
    {
      src: medium,
      fontWeight: 500,
      fontStyle: "normal",
    },
    {
      src: regular,
      fontWeight: 400,
      fontStyle: "normal",
    },
    {
      src: semiBold,
      fontWeight: 600,
      fontStyle: "normal",
    },
  ],
});

const StyledSkinAnalysisRecommendation = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  position: "relative",
  overflowX: "hidden",
  backgroundColor: theme.palette.grey[100],
  overflowY: "auto",
  paddingTop: 64,
  "& .section_loading_indicator": {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  "& .MuiTypography-h4": {
    fontWeight: 700,
    fontSize: 26,
  },
  [theme.breakpoints.only("xs")]: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  "& .scrool-to-top": {
    position: "fixed",
    right: 30,
    bottom: 50,
    backgroundColor: theme.palette.common.white,
    width: 50,
    height: 50,
    borderRadius: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& :hover": {
      cursor: "pointer",
    },
    "& svg": {
      fontSize: 40,
      color: theme.palette.primary.main,
    },
  },
}));

const SkinAnalysisRecommendation = () => {
  const { data: session } = useSession();
  const containerRef: any = useRef(null);

  const [
    fetchUserQuestionsResponse,
    { isLoading: isLoadingFUQR, data: dataFUQR },
  ] = useLazyFetchUserQuestionsResponseQuery();

  const [fetchRecommnedSkinAttributes, { isLoading, isError, data }] =
    useLazyFetchRecommnedSkinAttributesQuery();
  const [
    getUploadImageInfo,
    { data: dataImageInfo, isLoading: isLoadingImageInfo },
  ] = useGetUploadImageInfoMutation();

  useEffect(() => {
    if (session?.user) {
      fetchRecommnedSkinAttributes({
        userId: session?.user?.id as string,
      });
      getUploadImageInfo({
        userId: session?.user?.id as string,
        fileName: session?.user?.selfyImage as string,
      });
      fetchUserQuestionsResponse({
        userId: session?.user?.id as string,
      });
    }
  }, [session]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 64, behavior: "smooth" });
  };

  return (
    <StyledSkinAnalysisRecommendation
      ref={containerRef}
      disableGutters
      maxWidth={false}
      className="block"
    >
      {!isLoading && data && !isLoadingImageInfo && (
        <Fragment>
          <CoverPage />
          <UserInfo useData={dataImageInfo} dataFUQR={dataFUQR} />
          <PreventingView useData={dataImageInfo} data={data} />
          <ProductsView data={data} />
          <Routine />
          <SalonServices
            data={data?.data?.[0]?.recommendedSalonServices || []}
          />
          <CosmeticRecommdations
            data={data?.data?.[0]?.recommendedCosmeticServices || []}
          />
          <DietChart />
          <MeetTeam />
        </Fragment>
      )}
      {(isLoadingImageInfo || (isLoading && !data)) && (
        <Box component="div" className="section_loading_indicator">
          <LoadingComponent />
        </Box>
      )}
      <Paper
        onClick={handleScrollToTop}
        component="div"
        className="scrool-to-top"
      >
        <Icon icon="solar:round-arrow-up-outline" />
      </Paper>
    </StyledSkinAnalysisRecommendation>
  );
};

export default SkinAnalysisRecommendation;
