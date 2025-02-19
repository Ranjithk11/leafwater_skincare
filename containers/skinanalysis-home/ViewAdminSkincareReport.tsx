"use client";
import {
  useGetUploadImageInfoMutation,
  useLazyFetchAdminRecommendationsByIdQuery,
  useLazyFetchRecommnedSkinAttributesByIdQuery,
} from "@/redux/api/analysisApi";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Container,
  styled,
  Typography,
  Grid,
  Button,
  Paper,
} from "@mui/material";
import React, { Fragment, useEffect } from "react";
import LoadingComponent from "@/components/loaders/Loading";
import SalonServices from "./Recommendations/SalonServices";
import DietChart from "./Recommendations/DietChart";
import MeetTeam from "./Recommendations/MeetTeam";
import Routine from "./Recommendations/Routines";
import CoverPage from "./Recommendations/Cover";
import ProductsView from "./Recommendations/Products";
import PreventingView from "./Recommendations/Preventing";
import _ from "lodash";
import CosmeticRecommdations from "./Recommendations/CosmeticRecommdations";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Payment from "./Recommendations/Payment";

const StyledViewAdminSkincareReport = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  position: "relative",
  overflowX: "hidden",
  backgroundColor: theme.palette.grey[100],
  overflowY: "auto",
  paddingTop: 0,
  "& .whatsapp-button": {
    position: "fixed",
    right: 30,
    bottom: 120, // Adjust this to position above the scroll-to-top button
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
      color: "#25D366", // WhatsApp green color
    },
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
  "& .sectionHeader": {
    width: "100%",
    backgroundColor: theme.palette.common.black,
  },
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
  "& a": {
    backgroundColor: theme.palette.primary.main,
    textDecoration: "none",
    color: theme.palette.common.white,
    padding: 8,
    minWidth: 200,
    textAlign: "center",
    fontSize: 14,
    borderRadius: 5,
  },
}));

const ViewAdminSkincareReport = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const whatsappNumber = "918977016605";
  const whatsappMessage = "Hello, I need help with my skin analysis!";
  const [fetchAdminRecommendationsById, { isLoading, isError, data }] =
    useLazyFetchAdminRecommendationsByIdQuery();

  const [
    getUploadImageInfo,
    { data: dataImageInfo, isLoading: isLoadingImageInfo },
  ] = useGetUploadImageInfoMutation();
  const handleWhatsAppClick = () => {
    window.open(
      `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
        whatsappMessage
      )}`,
      "_blank"
    );
  };
  const handleScrollToTop = () => {
    window.scrollTo({ top: 64, behavior: "smooth" });
  };

  useEffect(() => {
    if (searchParams) {
      fetchAdminRecommendationsById({
        userId: searchParams.get("userId") as string,
      });
    }
  }, [searchParams]);

  useEffect(() => {
    if (!_.isEmpty(data)) {
      getUploadImageInfo({
        userId: data?.data?.user?._id,
        fileName:
          data?.data?.productRecommendation?.capturedImages[0]?.fileName,
      });
    }
  }, [data]);


  return (
    <StyledViewAdminSkincareReport disableGutters maxWidth={false}>
      {!isLoading && !isError && !isLoadingImageInfo && data && (
        <Fragment>
          <CoverPage
             publicUserProfile={data?.data?.user}
             useData={dataImageInfo}
             dataFUQR={{
               age: data?.data?.user?.onBoardingQuestions?.[0]?.responses?.[0]
                 ?.value,
               gender:
                 data?.data?.user?.onBoardingQuestions?.[1]?.responses?.[0]
                   ?.value,
             }}
          />
         <PreventingView
           useData={dataImageInfo}
           data={{
             data: [
               {
                 analysedImages:data?.data?.productRecommendation?.analysedImages,
                 userId:data?.data?.user?._id, 
                 attributeCode:
                   data?.data?.productRecommendation?.attributeCode,
                 skinSummary: data?.data?.productRecommendation?.skinSummary,
                 analysisAiSummary:data?.data?.productRecommendation?.analysisAiSummary,
               },
             ],
           }}
          />
          <ProductsView
            isAdminView={true}
            data={{
              data: [
                {
                  recommendedProducts: {
                    lowRecommendation:
                      data?.data?.productRecommendation?.recommendedProducts
                        ?.lowRecommendation,
                    highRecommendation:
                      data?.data?.productRecommendation?.recommendedProducts
                        ?.highRecommendation,
                  },
                },
              ],
            }}
          />
          <Routine userData={dataImageInfo} />
          <SalonServices
            data={
              data?.data?.productRecommendation?.recommendedSalonServices || []
            }
          />
          <CosmeticRecommdations
            data={
              data?.data?.productRecommendation?.recommendedCosmeticServices ||
              []
            }
          />
          <Payment />
          {data?.data?.productRecommendation?.dietPlan && (
            <DietChart data={data?.data?.productRecommendation?.dietPlan} />
          )}
        </Fragment>
      )}
      {(isLoading || isLoadingImageInfo) &&
        !isError &&
        !data &&
        !dataImageInfo && (
          <Box component="div" className="section_loading_indicator">
            <LoadingComponent />
          </Box>
        )}

      {!isLoading && isError && !data && (
        <Box component="div" className="section_loading_indicator">
          <img src="/icons/no-content.png" />
          <Typography fontWeight={700} textAlign="center" variant="h6">
            No Recommendations Found!
          </Typography>
          <Typography textAlign="center">
            Sorry, we couldn't find any results
          </Typography>
          <Box mt={3}>
            <Button
              onClick={() => {
                router.replace("/");
              }}
            >
              Go to Skin Analysis
            </Button>
          </Box>
        </Box>
      )}
      <Paper
        onClick={handleWhatsAppClick}
        component="div"
        className="whatsapp-button"
      >
        <Icon icon="logos:whatsapp-icon" />
      </Paper>
      <Paper
        onClick={handleScrollToTop}
        component="div"
        className="scrool-to-top"
      >
        <Icon icon="solar:round-arrow-up-outline" />
      </Paper>
    </StyledViewAdminSkincareReport>
  );
};

export default ViewAdminSkincareReport;
