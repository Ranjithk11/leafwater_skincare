import {
  Box,
  Button,
  Container,
  Dialog,
  Grid,
  Icon,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import BookOnline from "@mui/icons-material/BookOnline";


const StyledCtaDialogModel = styled(Box)(({ theme }) => ({
  width: 370,
  height: 250,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  "& .close-icon-wrapper": {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

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

const CosmeticRecommdations = ({ data }: { data: any[] }) => {
  const [openCTA, setOpenCTA] = useState<boolean>(false);

  return (
    <StyledCosmeticRecommdations>
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} md={12}>
            <Box mb={4}>
              <Typography gutterBottom textAlign="center" variant="h5">
                Recommended
              </Typography>
              <Typography
                textAlign="center"
                variant="h3"
                sx={{
                  fontSize: { xs: "2rem", sm: "3rem" },
                }}
              >
                <span>Cosmetics</span> Services
              </Typography>
            </Box>
          </Grid>
          {data?.map((item) => (
            <Grid xs={12} item md={4} key={item?._id}>
              <Box component="div" className="salone_card_wrapper">
                <Grid
                  container
                  direction="column"
                  justifyContent="space-between"
                  style={{ height: "100%" }}
                >
                  <Grid item xs>
                    <Box
                      component="div"
                      style={{
                        backgroundImage: `url(${
                          item?.images?.[0]?.url || "/default-image.jpg"
                        })`,
                      }}
                      className="card_image"
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      textAlign="center"
                      fontWeight={800}
                      variant="h6"
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                      {item?.description || "No description available."}
                    </Typography>
                    <Typography fontWeight={700} textAlign="center">
                      INR.{item?.price}/-
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Box textAlign="center" mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<BookOnline sx={{ color: 'white' }}/>}
                        onClick={() => setOpenCTA(true)}
                        sx={{
                          padding: "6px 12px",
                          typography: "body1",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Book Now
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Dialog open={openCTA} onClose={() => setOpenCTA(false)}>
          <StyledCtaDialogModel>
            <Box>
              <Typography color="primary" variant="h4" fontWeight={800}>
                089770 16605
              </Typography>
            </Box>
            <Box mt={3}>
              <Button href="tel:08977016605" color="secondary" size="medium">
                Call Now
              </Button>
            </Box>
            <Box component="div" className="close-icon-wrapper">
              <IconButton onClick={() => setOpenCTA(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </StyledCtaDialogModel>
        </Dialog>
      </Container>
    </StyledCosmeticRecommdations>
  );
};

export default CosmeticRecommdations;
