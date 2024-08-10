"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaTelegram } from "react-icons/fa";
import {
  AiOutlineMail,
  AiOutlineTwitter,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import { RiWhatsappFill } from "react-icons/ri";

import Typography from "@mui/material/Typography";
import { Divider, IconButton } from "@mui/material";
import { companyEmailId, companyMobileNumber } from "@/utils/constants";
const StyledFooterMainBox = styled(Box)(({ theme }) => ({
  height: "100%",
  backgroundColor: theme.palette.grey[900],
  paddingTop: 75,
  paddingBottom: 50,
  "& .logo__title": {
    color: theme.palette.common.white,
    marginBottom: 20,
    fontWeight: 700,
  },
  "& .address": {
    color: theme.palette.grey[700],
    marginTop: 10,
    width: "56%",
    margin: "0px auto",
  },
  "& .menu_heading": {
    color: theme.palette.common.white,
    marginBottom: 20,
  },
}));

const StyledList = styled(List)(({ theme }) => ({
  "& .MuiButtonBase-root": {
    padding: 0,
    color: theme.palette.grey[700],
  },
  "& .MuiListItemIcon-root": {
    minWidth: 25,
  },
  "& .MuiListItemText-primary": {
    color: `${theme.palette.grey[700]} !important`,
  },
}));

const StyledSectionDivider = styled(Divider)(({ theme }) => ({
  width: 400,
  borderColor: theme.palette.grey[800],
  marginTop: 20,
  marginBottom: 10,
}));

const FooterComponent = () => {
  return (
    <StyledFooterMainBox>
      <Container maxWidth="lg">
        <Grid
          container
          alignItems="center"
          direction="column"
          justifyContent="center"
        >
          <Grid item>
            <Typography
              className="logo__title"
              color=""
              textAlign="center"
              variant="h4"
            >
              Elite Groups
            </Typography>
            <Typography
              className="address"
              color=""
              textAlign="center"
              variant="body1"
            >
              Plot No. 67, Santosh Nagar Dattanagar Road, Opposite Balaji
              Garage, Katraj, Pune-411046, Maharashtra, India
            </Typography>
          </Grid>
          <Grid
            item
            spacing={2}
            alignItems="center"
            justifyContent="center"
            container
          >
            <Grid item>
              <StyledList>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <BiSolidPhoneCall />
                  </ListItemIcon>
                  <ListItemText
                    primary={companyMobileNumber}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />
                </ListItemButton>
              </StyledList>
            </Grid>
            <Grid item>
              <StyledList>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <AiOutlineMail />
                  </ListItemIcon>
                  <ListItemText
                    primary={companyEmailId}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />
                </ListItemButton>
              </StyledList>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <StyledSectionDivider />
          </Grid>
          <Grid item alignItems="center" justifyContent="center" container>
            <Grid item>
              <IconButton sx={(theme) => ({ color: theme.palette.grey[700] })}>
                <AiOutlineTwitter />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton sx={(theme) => ({ color: theme.palette.grey[700] })}>
                <AiFillInstagram />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton sx={(theme) => ({ color: theme.palette.grey[700] })}>
                <AiFillFacebook />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton sx={(theme) => ({ color: theme.palette.grey[700] })}>
                <RiWhatsappFill />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton sx={(theme) => ({ color: theme.palette.grey[700] })}>
                <FaTelegram />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </StyledFooterMainBox>
  );
};

export default FooterComponent;
