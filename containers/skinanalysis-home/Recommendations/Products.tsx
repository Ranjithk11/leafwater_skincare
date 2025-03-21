import {
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import React, { Fragment, useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import BundleCard from "./BubdleCard";
import CategoryTabs from "./CategoryTabs";
import Sticky from "react-sticky-el";

const StyledProductsWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  paddingTop: 75,
  paddingBottom: 75,
  position: "relative",
  minHeight: 400,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "top center",
  "& .user_profile_image": {
    width: 300,
    height: 350,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 20,
    border: `5px solid ${theme.palette.common.white}`,
    boxShadow: `0px 0px 65px -28px rgba(0,0,0,0.75)`,
  },
  "& .MuiTypography-h5": {
    fontWeight: 800,
    textTransform: "uppercase",
    color: theme.palette.grey[900],
  },
  "& .MuiTypography-h6": {
    fontWeight: 800,
    fontSize: 30,
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: 25,
    },
  },
  "& .MuiTypography-h3": {
    fontWeight: 800,
  },
  "& .MuiTypography-subtitle1": {
    fontWeight: 400,
  },
  "& span": {
    color: theme.palette.primary.main,
  },
  "& .skin-analysis-result": {
    width: "100%",
    display: "flex",
    flexWrap: "warp",
    overflow: "auto",
    alignItems: "stretch",
    "& .skin-analysis-box": {
      minWidth: 250,
      marginRight: 10,
      minHeight: 170,
      backgroundColor: "rgb(185, 133, 107)",
      borderRadius: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    "& .percentage-view": {
      width: 75,
      height: 75,
      backgroundColor: `rgb(22, 32, 50)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.common.white,
      borderRadius: "100%",
    },
    "& .skin-percentage-status": {
      backgroundColor: `rgb(22, 32, 50)`,
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 2,
      paddingBottom: 2,
      color: theme.palette.common.white,
      fontSize: 12,
      borderRadius: 5,
    },
  },
  "& .sticky_nav": {
    position: "sticky",
    top: `64px !important`,
    zIndex: 1,
  },
}));

interface ProductsViewProps {
  data: any;
  isAdminView?: boolean;
}

const ProductsView = ({ data, isAdminView }: ProductsViewProps) => {
  const theme = useTheme();
  const [limit, setLimit] = useState<number>(3);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const containerRef: any = useRef(null);
  console.log("ProductsView", data);

  return (
    <StyledProductsWrapper
      ref={containerRef}
      style={{
        backgroundImage: `url(/images/homeBg_1.png)`,
      }}
    >
      <Container maxWidth="xl">
        <Grid container>
          <Grid
            item
            xs={12}
            container
            alignItems="center"
            justifyContent="center"
           
          >
            <img src="/images/giphy.gif"/>
          </Grid>
          <Grid item xs={12}>
            <Typography textAlign="center" variant="h6">
              Our recommendations to <span>get your glow on</span>
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg">
        <Box pt={5} component="div" className="scrollarea">
          {data?.data?.[0]?.recommendedProductBundles?.length > 0 && (
            <Fragment>
              <Grid container>
                <Grid item xs={12}>
                  <Box mb={3} mt={3}>
                    <Typography variant="h6">
                      Recommended Product Bundles
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box mb={5}>
                <Grid container spacing={2}>
                  {data?.data?.[0]?.recommendedProductBundles.map(
                    (bundle: any) => (
                      <Grid key={bundle?._id} item xs={6} md={4}>
                        <BundleCard {...bundle} />
                      </Grid>
                    )
                  )}
                </Grid>
              </Box>
            </Fragment>
          )}
          <Sticky
            boundaryElement=".scrollarea"
            hideOnBoundaryHit={false}
            stickyClassName="sticky_nav"
          >
            <Paper>
              <CategoryTabs
                data={data?.data?.[0]?.recommendedProducts?.highRecommendation}
                onChangeTab={(event, value) => {
                  setSelectedTab(value);
                }}
                activeTab={selectedTab}
              />
            </Paper>
          </Sticky>
          {[
            data?.data?.[0]?.recommendedProducts?.highRecommendation[
              selectedTab
            ],
          ]?.map((recommended: any) => (
            <Box mt={2}>
              <Grid container key={recommended?.productCategory?._id}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      overflowX: isMobile ? "auto" : "unset",
                      flexWrap: isMobile ? "nowrap" : "wrap",
                    }}
                  />
                </Grid>

                {isMobile && (
                  <>
                    <Grid item xs={12}>
                      <Box component="div" className="skin-analysis-result">
                        {recommended?.products
                          ?.slice(0, 3)
                          .map((product: any, index: number) => (
                            <ProductCard
                              category={
                                data?.data?.[0]?.recommendedProducts
                                  ?.highRecommendation[selectedTab]
                                  ?.productCategory?.title
                              }
                              key={index}
                              minWidth={300}
                              {...product}
                              enabledMask={
                                false
                                // isAdminView
                                //   ? false
                                //   : data?.data?.user?.isPremiumCustomer
                                //   ? false
                                //   : index > 0
                              }
                            />
                          ))}
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      container
                      alignItems="center"
                      justifyContent="center"
                      paddingTop={5}
                    >
                      <Grid item>
                        <Button
                          href="https://shop.leafwater.in/collections/skincare-products"
                          target="_blank"
                        >
                          View All
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                )}
                {!isMobile && (
                  <>
                    <Grid
                      container
                      spacing={2}
                      item
                      xs={12}
                      alignItems="stretch"
                    >
                      {recommended?.products
                        ?.slice(0, 3)
                        .map((product: any, index: number) => (
                          <Grid key={product?._id} item xs={6} md={4}>
                            <ProductCard
                              {...product}
                              category={
                                data?.data?.[0]?.recommendedProducts
                                  ?.highRecommendation[selectedTab]
                                  ?.productCategory?.title
                              }
                              enabledMask={
                                false
                                // isAdminView
                                //   ? false
                                //   : data?.data?.user?.isPremiumCustomer
                                //   ? false
                                //   : index > 0
                              }
                            />
                          </Grid>
                        ))}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      container
                      alignItems="center"
                      justifyContent="center"
                      paddingTop={5}
                    >
                      <Grid item>
                        <Button
                          href="https://shop.leafwater.in/collections/skincare-products"
                          target="_blank"
                        >
                          View All
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          ))}
        </Box>
      </Container>
    </StyledProductsWrapper>
  );
};

export default ProductsView;
