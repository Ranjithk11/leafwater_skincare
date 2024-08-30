import { Box, Container, Grid, Typography, styled } from "@mui/material";
import React, { Fragment } from "react";
const instaGlow = "/images/insta_glow.jpg";
const goldenMask = "/images/goldenmask.jpg";
const faceNeck = "/images/face_neck.jpg";

interface CosmeticRecommdationsProps {
  data: any[];
}

const StyledCosmeticRecommdations = styled(Box)(({ theme }) => ({
  paddingBottom: 75,
  paddingTop: 75,
  "& .MuiTypography-h5": {
    fontWeight: 800,
    textTransform: "uppercase",
    color: theme.palette.grey[600],
  },
  "& .MuiTypography-h3": {
    fontWeight: 800,
  },
  "& span": {
    color: theme.palette.primary.main,
    marginRight: 10,
  },
  "& .salone_card_wrapper": {
    width: "100%",
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.common.white,
    padding: 20,
    borderRadius: 10,
    height: "100%",
    "& .card_image": {
      width: "100%",
      height: 300,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "top center",
      borderRadius: 10,
      marginBottom: 20,
    },
    "& .MuiTypography-body1": {
      color: theme.palette.text.secondary,
    },
  },
}));

const CosmeticRecommdations = ({ data }: CosmeticRecommdationsProps) => {
  console.log(data);  
  return (
    <StyledCosmeticRecommdations>
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} md={12}>
            <Box mb={4}>
              <Typography gutterBottom textAlign="center" variant="h5">
                Recommended
              </Typography>
              <Typography textAlign="center" variant="h4">
                <span>Cosmetics</span>Services
              </Typography>
            </Box>
          </Grid>
          {data?.map((item) => (
            <Grid xs={12} item md={4}>
              <Box component="div" className="salone_card_wrapper">
                <Grid container>
                  <Grid item xs={12}>
                    <Box
                      component="div"
                      style={{
                        backgroundImage: `url(${item?.images[0]?.url})`,
                      }}
                      className="card_image"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      gutterBottom
                      textAlign="center"
                      fontWeight={800}
                      variant="h6"
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                      {item?.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography fontWeight={600} textAlign="center">
                        Price : {item?.price}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}

          {/* <Grid xs={12} item md={4}>
            <Box component="div" className="salone_card_wrapper">
              <Grid container>
                <Grid item xs={12}>
                  <Box
                    component="div"
                    style={{
                      backgroundImage: `url(${goldenMask})`,
                    }}
                    className="card_image"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    gutterBottom
                    textAlign="center"
                    fontWeight={800}
                    variant="h6"
                  >
                    GOLDEN MASK
                  </Typography>
                  <Typography variant="body1" textAlign="center">
                    It helps treat sun damage by reducing, giving you a natural.
                    fairness and glow while keep- ing your skin toned and mois-
                    turized Once in two months Rs.2999/-
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid xs={12} item md={4}>
            <Box component="div" className="salone_card_wrapper">
              <Grid container>
                <Grid item xs={12}>
                  <Box
                    component="div"
                    style={{
                      backgroundImage: `url(${faceNeck})`,
                    }}
                    className="card_image"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    gutterBottom
                    textAlign="center"
                    fontWeight={800}
                    variant="h6"
                  >
                    FACE /NECK DE-TAN
                  </Typography>
                  <Typography variant="body1" textAlign="center">
                    It helps in reducing tan. bright- ens and evens skin tone.
                    Highly recommended for outdoor men and people with darkened
                    skin tone. Once in a month Rs.3499/-
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid> */}
        </Grid>
      </Container>
    </StyledCosmeticRecommdations>
  );
};

export default CosmeticRecommdations;
