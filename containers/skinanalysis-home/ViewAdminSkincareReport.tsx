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
} from "@mui/material";
import React, { Fragment, useEffect } from "react";
import LoadingComponent from "@/components/loaders/Loading";
import SalonServices from "./Recommendations/SalonServices";
import DietChart from "./Recommendations/DietChart";
import MeetTeam from "./Recommendations/MeetTeam";
import Routine from "./Recommendations/Routines";
import CoverPage from "./Recommendations/Cover";
import ProductsView from "./ViewUserRecommendations/Products";
import UserInfo from "./ViewUserRecommendations/UserInfo";
import PreventingView from "./ViewUserRecommendations/Preventing";
import _ from "lodash";
import CosmeticRecommdations from "./Recommendations/CosmeticRecommdations";
import { useRouter } from "next/navigation";

const StyledViewAdminSkincareReport = styled(Container)(({ theme }) => ({
  height: "100vh",
  position: "relative",
  overflowX: "hidden",
  backgroundColor: theme.palette.grey[100],
  overflowY: "auto",
  paddingTop: 0,
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
  const [fetchAdminRecommendationsById, { isLoading, isError, data }] =
    useLazyFetchAdminRecommendationsByIdQuery();

  const [
    getUploadImageInfo,
    { data: dataImageInfo, isLoading: isLoadingImageInfo },
  ] = useGetUploadImageInfoMutation();

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

  console.log(data);

  return (
    <StyledViewAdminSkincareReport disableGutters maxWidth={false}>
      {!isLoading && !isError && !isLoadingImageInfo && data && (
        <Fragment>
          <Box p={2} component="div" className="sectionHeader">
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography color="white">
                  Visit Count : {data?.data?.countTimeseries}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <CoverPage />
          <UserInfo useData={data?.data?.user} dataImageInfo={dataImageInfo} />
          <PreventingView
            useData={data}
            skinSummary={data?.data?.productRecommendation?.skinSummary}
            detectedAttributes={
              data?.data?.productRecommendation.detectedAttributes
            }
          />
          <ProductsView data={data} isAdminView={true} />
          <Routine />
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
          <DietChart />
          <MeetTeam />
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
    </StyledViewAdminSkincareReport>
  );
};

export default ViewAdminSkincareReport;