import { Box, Container, Grid, Typography, styled } from "@mui/material";
import React, { Fragment } from "react";
const instaGlow = "/images/insta_glow.jpg";
const goldenMask = "/images/goldenmask.jpg";
const faceNeck = "/images/face_neck.jpg";

const StyledSalonServices = styled(Box)(({ theme }) => ({
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
interface SalonServicesProps {
  data: any[];
}

const SalonServices = ({ data }: SalonServicesProps) => {
  return (
    <StyledSalonServices>
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} md={12}>
            <Box mb={4}>
              <Typography gutterBottom textAlign="center" variant="h5">
                Recommended
              </Typography>
              <Typography textAlign="center" variant="h3">
                <span>Salon</span>Services
              </Typography>
            </Box>
          </Grid>
          {data?.map((itm: any) => (
            <Grid xs={12} key={itm?._id} item md={4}>
              <Box component="div" className="salone_card_wrapper">
                <Grid container>
                  <Grid item xs={12}>
                    <Box
                      component="div"
                      style={{
                        backgroundImage: `url(${itm?.images?.[0]?.url})`,
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
                      {itm?.name}
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                      {itm?.description}
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                      Rs {itm?.price}/-
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyledSalonServices>
  );
};

export default SalonServices;
