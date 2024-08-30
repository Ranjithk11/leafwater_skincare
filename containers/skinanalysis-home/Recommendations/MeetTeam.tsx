import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import React from "react";
const belina = "/images/belna.png";

const StyledMeetTeamWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  paddingTop: 75,
  paddingBottom: 75,
  backgroundColor: theme.palette.grey[100],
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
  "& .MuiTypography-h4": {
    fontWeight: 800,
    fontSize: 35,
    marginTop: 45,
  },
  "& .MuiTypography-subtitle1": {
    marginBottom: 30,
  },
  "& .MuiTypography-h3": {
    fontWeight: 800,
  },
  "& span": {
    color: theme.palette.primary.main,
    marginRight: 10,
  },
  "& .author_image": {
    width: "100%",
    height: 400,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "top center",
    borderRadius: 20,
    marginTop: 20,
  },
}));

const MeetTeam = () => {
  return (
    <StyledMeetTeamWrapper>
      <Container maxWidth="sm">
        <Grid container>
          <Grid item xs={12} md={12}>
            <Box mb={4}>
              <Typography textAlign="center" variant="h3">
                Meet The <span>Team</span>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              component="div"
              className="author_image"
              style={{
                backgroundImage: `url(${belina})`,
              }}
            ></Box>
          </Grid>
          <Grid item xs={12}>
            <Typography textAlign="center" variant="h4">
              Dr . Bilna <span>Eldhose</span>
            </Typography>
            <Typography textAlign="center" variant="subtitle1">
              Skin And Hair Cosmetologist
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography textAlign="justify" variant="body1">
              Dr. Bilna Eldhose is our Skin and Hair Cosmetologist, combined
              with medical expertise and a passion for beauty. She helps you to
              achieve radiant healthy skin and luscious looks. Your journey to
              confidence starts here. She is a core team member of Leaf
              Water,The Polished & Style club.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box mt={5}>
              <Typography textAlign="center" variant="subtitle2">
                SKIN | HAIR | DENTAL
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </StyledMeetTeamWrapper>
  );
};

export default MeetTeam;
