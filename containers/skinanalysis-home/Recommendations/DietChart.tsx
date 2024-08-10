import { Box, Container, Grid, Typography, styled } from "@mui/material";
import React from "react";
const StyledDietCharWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  paddingTop: 75,
  paddingBottom: 75,
  backgroundColor: theme.palette.common.white,
  "& .MuiTypography-h5": {
    fontWeight: 800,
    textTransform: "uppercase",
    color: theme.palette.grey[600],
  },
  "& .MuiTypography-h6": {
    fontWeight: 800,
    textTransform: "uppercase",
    marginTop: 15,
  },
  "& .MuiTypography-h3": {
    fontWeight: 800,
  },
  "& span": {
    color: theme.palette.primary.main,
    marginRight: 10,
  },
}));

const DietChart = () => {
  return (
    <StyledDietCharWrapper>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12}>
            <Box mb={8}>
              <Typography gutterBottom textAlign="center" variant="h5">
                Recommended
              </Typography>
              <Typography textAlign="center" variant="h3">
                <span>Diet</span>Chart
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <Box
              pt={4}
              pb={4}
              pl={2}
              pr={2}
              sx={{
                backgroundColor: "#ffeaa7",
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
                  <img src="/icons/breakfast.png" />
                </Grid>
                <Grid item>
                  <Typography variant="h6" textAlign="center">
                    BREAKFAST
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" textAlign="center">
                    <b>Option 1 :</b> Spinach and Mushroom. along with Omelette
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" textAlign="center">
                    <b>Option 2 :</b> Whole-grain toast along with
                    <br /> Orange slices <br />
                    Green tea
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              pt={4}
              pb={4}
              pl={2}
              pr={2}
              sx={{
                backgroundColor: "#00cec9",
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
                  <img src="/icons/food.png" />
                </Grid>
                <Grid item>
                  <Typography variant="h6" textAlign="center">
                    LUNCH
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" textAlign="center">
                    Quinoa/ brown rice
                    <br /> Fish <br />
                    Leafy greens and bell peppers
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              pt={4}
              pb={4}
              pl={2}
              pr={2}
              sx={{
                backgroundColor: "#E9F7EF",
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
                  <img src="/icons/dinner.png" />
                </Grid>
                <Grid item>
                  <Typography variant="h6" textAlign="center">
                    DINNER
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" textAlign="center">
                    Indian food of your choice.
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              pt={4}
              pb={4}
              pl={2}
              pr={2}
              sx={{
                backgroundColor: "#fab1a0",
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
                  <img src="/icons/almond.png" />
                </Grid>
                <Grid item>
                  <Typography
                    variant="h6"
                    textAlign="center"
                    sx={{ textTransform: "uppercase" }}
                  >
                    Additional Supplements
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" textAlign="center">
                    Almonds and walnuts.
                    <br />
                    Carrot sticks with cucumber.
                    <br />
                    Drink 3-4 litres of water a day.
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </StyledDietCharWrapper>
  );
};

export default DietChart;
