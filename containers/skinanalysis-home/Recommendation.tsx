"use client";
import {
  useGetUploadImageInfoMutation,
  useLazyFetchRecommnedSkinAttributesQuery,
  useLazyFetchUserQuestionsResponseQuery,
} from "@/redux/api/analysisApi";
import {
  Document,
  Page,
  Text,
  View,
  Font,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

import { Box, Card, CardContent, Container, Grid, styled } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { Fragment, useEffect } from "react";
import { APP_COLORS } from "@/theme/colors/colors";
import LoadingComponent from "@/components/loaders/Loading";
import RoutineView from "./pdf/RoutineView";
import SalonServiceView from "./pdf/SalonServiceView";
import CosmeticsView from "./pdf/CosmeticsView";
import DietView from "./pdf/DietView";
import TeamView from "./pdf/TeamView";
import CoverView from "./pdf/CoverView";
import SalonServices from "./Recommendations/SalonServices";
import CosmeticRecommdations from "./Recommendations/cosmetics";
import DietChart from "./Recommendations/DietChart";
import MeetTeam from "./Recommendations/MeetTeam";
import Routine from "./Recommendations/Routines";
import CoverPage from "./Recommendations/Cover";
import UserInfo from "./Recommendations/UserInfo";
import PreventingView from "./Recommendations/Preventing";
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
  height: "100vh",
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
}));

const SkinAnalysisRecommendation = () => {
  const { data: session } = useSession();

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

  const styles = StyleSheet.create({
    page: {
      display: "flex",
      flexDirection: "column",
      padding: 20,
    },
    pageNumber: {
      fontSize: 20,
      fontWeight: 700,
      color: "#e0e0e0",
    },
    pageHeader: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    placeHolder: {},
    section: {
      margin: 10,
      padding: 10,
    },
    viewer: {
      width: "100%", //the pdf viewer will take up all of the width and height
      height: "100%",
    },
    image: {
      width: 200,
    },
    productCardWrapper: {
      width: "100%",
      display: "flex",
      position: "relative",
      flexDirection: "row",
      alignItems: "stretch",
      justifyContent: "center",
      borderBottom: `1px solid #ecf0f1`,
    },
    productCardImage: {
      width: 150,
      minHeight: 132,
      height: 132,
    },
    productCardContent: {
      padding: 15,
    },
    productCardTitle: {
      fontFamily: defaultFont,
      fontSize: 16,
      fontWeight: 600,
      marginBottom: 3,
    },
    productCardCategoryTitle: {
      fontSize: 16,
      fontFamily: defaultFont,
      fontWeight: 800,
    },
    productCardInfo: {
      fontFamily: defaultFont,
      fontSize: 12,
      fontWeight: 400,
      color: "#7f8c8d",
      marginBottom: 5,
    },
    productCardSubtitle: {
      fontFamily: defaultFont,
      fontSize: 14,
      fontWeight: 600,
    },
    productCardPrice: {
      fontFamily: defaultFont,
      fontSize: 18,
      fontWeight: 800,
      color: APP_COLORS.PRIMARY_COLOR,
    },
    productCardMatches: {
      fontFamily: defaultFont,
      fontSize: 12,
      fontWeight: 600,
    },
    subscriptionsWrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
    },
    subscriptionsBox: {},
    morningRoutneWrapper: {
      flex: 1,
      width: "100%",
      // backgroundColor: "#ffeaa7",
      padding: 20,
      display: "flex",
      flexDirection: "column",
    },
    nightRoutneWrapper: {
      flex: 1,
      width: "100%",
      backgroundColor: "#212121",
      padding: 20,
    },
  });
  return (
    <StyledSkinAnalysisRecommendation disableGutters maxWidth={false}>
      {!isLoading && data && !isLoadingImageInfo && (
        <Fragment>
          <CoverPage />
          <UserInfo useData={dataImageInfo} dataFUQR={dataFUQR} />
          <PreventingView useData={dataImageInfo} data={data} />
          <ProductsView data={data} />
          <Routine />
          <SalonServices />
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
    </StyledSkinAnalysisRecommendation>
  );
};

export default SkinAnalysisRecommendation;
