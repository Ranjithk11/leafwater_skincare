"use client";
import React, { Fragment, useState } from "react";
import {
  Box,
  Drawer,
  Grid,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { Icon } from "@iconify/react";
import FooterComponent from "../footer";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import LoginIcon from "@mui/icons-material/Login";
import SideMenuComponent from "@/views/home/selfie/SideMenu";
import { APP_ROUTES } from "@/utils/routes";
import { SOCIAL_LINKS } from "@/utils/constants";
import { AiFillFacebook, AiFillInstagram, AiFillYoutube } from "react-icons/ai";

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

const StyledMainContent = styled(Box)(({ theme }) => ({
  paddingTop: 70,
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
}));

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { data: session, status } = useSession();
  const theme = useTheme();
  const isXsSmDevice = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  const router = useRouter();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleSocialLinkNavigation = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <Fragment>
      <AppBar color="primary" position="fixed">
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            {isXsSmDevice && pathname === APP_ROUTES.SELFIE && (
              <Grid item>
                <IconButton
                  onClick={() => {
                    setOpenMenu(!openMenu);
                  }}
                  sx={(theme) => ({ color: theme.palette.common.white })}
                >
                  <Icon icon="material-symbols:menu" />
                </IconButton>
              </Grid>
            )}
            {isXsSmDevice && pathname === APP_ROUTES.RECOMMENDATIONS && (
              <Grid item>
                <IconButton
                  onClick={() => {
                    router.back();
                  }}
                  sx={(theme) => ({ color: theme.palette.common.white })}
                >
                  <Icon icon="material-symbols:arrow-back-ios" />
                </IconButton>
              </Grid>
            )}

            <Grid item>
              <img
                width={150}
                style={{ paddingTop: 10 }}
                src="/logo/logo_gold_white.png"
              />
            </Grid>
            <Grid
              item
              container
              xs
              justifyContent="flex-end"
              alignItems="center"
              spacing={1}
              // paddingLeft={isMobile ? 0:1}
              direction={isMobile ? "column" : "row"} // Stack on mobile, row on desktop
            >
              <Grid item>
                <Typography
                  color="white"
                  fontWeight="bold"
                  fontSize="0.875rem"
                  textAlign="center"
                >
                  Join Us Online
                </Typography>
              </Grid>

              <Grid
                item
                container
                xs="auto"
                spacing={1}
                justifyContent="flex-end"
              >
                <Grid item>
                  <IconButton
                    onClick={() =>
                      handleSocialLinkNavigation(SOCIAL_LINKS.insta)
                    }
                    sx={{
                      color: "white",
                      padding: "4px",
                      fontSize: isMobile ? "1rem" : "1.5rem",
                    }}
                  >
                    <AiFillInstagram />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() =>
                      handleSocialLinkNavigation(SOCIAL_LINKS.youtube)
                    }
                    sx={{
                      color: "white",
                      padding: "4px",
                      fontSize: isMobile ? "1rem" : "1.5rem",
                    }}
                  >
                    <AiFillYoutube />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() =>
                      handleSocialLinkNavigation(SOCIAL_LINKS.facebook)
                    }
                    sx={{
                      color: "white",
                      padding: "4px",
                      fontSize: isMobile ? "1rem" : "1.5rem",
                    }}
                  >
                    <AiFillFacebook />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>

            {session?.user?.id && (
              <Grid item paddingLeft={isMobile ? 0 : 5}>
                <IconButton
                  onClick={() => {
                    signOut().then(() => {
                      router.push("/");
                    });
                  }}
                >
                  <Icon color="yellow" icon="material-symbols:logout" />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <StyledMainContent>{children}</StyledMainContent>
      <FooterComponent />
      <Drawer
        onClose={() => {
          setOpenMenu(!openMenu);
        }}
        variant={"temporary"}
        anchor="left"
        open={openMenu}
      >
        <SideMenuComponent />
      </Drawer>
    </Fragment>
  );
};

export default DefaultLayout;
