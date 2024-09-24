import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import React from "react";
import ProductCard from "./ProductCard";

const StyledProductsWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  paddingTop: 75,
  paddingBottom: 75,
  minHeight: 400,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
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
    fontSize: 25,
  },
  "& .MuiTypography-h3": {
    fontWeight: 800,
  },
  "& .MuiTypography-subtitle1": {
    fontWeight: 400,
  },
  "& span": {
    color: theme.palette.primary.main,
    marginRight: 10,
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
}));

interface ProductsViewProps {
  data: any;
}

const ProductsView = ({ data }: ProductsViewProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <StyledProductsWrapper>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12}>
            <Box mb={8}>
              <Typography gutterBottom textAlign="center" variant="h5">
                Our Recommendations
              </Typography>
              <Typography textAlign="center" variant="h3">
                To<span> Get Your Glow</span>On
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box pt={5}>
          {data?.data?.[0]?.recommendedProducts?.highRecommendation?.map(
            (recommended: any) => (
              <Grid container key={recommended?.productCategory?._id}>
                <Grid item xs={6}>
                  <Box mb={3} mt={3}>
                    <Typography variant="h6">
                      {recommended?.productCategory?.title}
                    </Typography>
                  </Box>
                </Grid>
                <Grid>
                  <Box
                    sx={{
                      display: "flex",
                      overflowX: isMobile ? "auto" : "unset",
                      flexWrap: isMobile ? "nowrap" : "wrap",
                    }}
                  />
                </Grid>

                {isMobile && (
                  <Grid item xs={12}>
                    <Box component="div" className="skin-analysis-result">
                      {recommended?.products?.map(
                        (product: any, index: number) => (
                          <ProductCard
                             key={index}
                             minWidth={300}
                              {...product}
                              // enabledMask={
                              //   data?.data?.user?.isPremiumCustomer
                              //     ? false
                              //     : index > 0
                              // }
                            />
                        )
                      )}
                    </Box>
                  </Grid>
                )}
                {!isMobile && (
                  <Grid container spacing={2} item xs={12} alignItems="stretch">
                    {recommended?.products?.map(
                      (product: any, index: number) => (
                        <Grid key={product?._id} item xs={6} md={4}>
                          <ProductCard
                            {...product}
                            // enabledMask={
                            //   data?.data?.user?.isPremiumCustomer
                            //     ? false
                            //     : index > 0
                            // }
                          />
                        </Grid>
                      )
                    )}
                  </Grid>
                )}
              </Grid>
            )
          )}
        </Box>
      </Container>
    </StyledProductsWrapper>
  );
};

export default ProductsView;
