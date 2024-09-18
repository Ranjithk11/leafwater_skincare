import React, { Fragment } from "react";
import Card from "@mui/material/Card";
import {
  Box,
  Button,
  CardContent,
  Chip,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { capitalizeWords, shouldForwardProp } from "@/utils/func";

interface ProductCardProps {
  ribbenColor?: string;
  productBenefits: string;
  name: string;
  productUse: string;
  retailPrice: string;
  matches: any[];
  images: any[];
  enabledMask?: boolean;
}

const StyledProductCard = styled(Card, {
  shouldForwardProp: (prop) =>
    shouldForwardProp<{ enabledMask?: boolean }>(["enabledMask"], prop),
})<{ enabledMask?: boolean }>(({ theme, enabledMask }) => ({
  height: "100%",
  width: "100%",
  padding: 40,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  "& .MuiTypography-subtitle1": {
    fontWeight: 800,
    fontSize: 18,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",

    ...(enabledMask && {
      filter: `blur(1rem)`,
    }),
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    [theme.breakpoints.only("xs")]: {
      fontSize: 16,
      lineHeight: 1,
      marginBottom: 10,
    },
  },
  "& .MuiTypography-body1": {
    fontWeight: 500,
    fontSize: 16,
    color: theme.palette.text.secondary,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    ...(enabledMask && {
      filter: `blur(1rem)`,
    }),
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    [theme.breakpoints.only("xs")]: {
      fontSize: 14,
      lineHeight: 1,
      marginBottom: 10,
    },
  },
  "& .MuiTypography-h6": {
    ...(enabledMask && {
      filter: `blur(1rem)`,
    }),
    [theme.breakpoints.only("xs")]: {
      fontSize: 18,
    },
  },
  "& .product_image": {
    position: "relative",
    width: "100%",
    padding: 10,
    height: 200,
    marginBottom: 20,
    ...(enabledMask && {
      filter: `blur(1rem)`,
    }),
    [theme.breakpoints.only("xs")]: {
      height: 150,
    },
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
  "& .product-masking": {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  "& .chip": {
    ...(enabledMask && {
      filter: `blur(1rem)`,
    }),
  },
}));

const ProductCard = ({
  name,
  productBenefits,
  productUse,
  retailPrice,
  matches,
  images,
  enabledMask,
}: ProductCardProps) => {
  function handleAddToCart() {
    window.open(`https://leafwater.in/products/${name}`,"_blank")
  }

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <StyledProductCard enabledMask={enabledMask}>
        <Box
          component="div"
          className="product_image"
          sx={{
            backgroundImage: `url(${images?.[0]?.url})`,
          }}
        ></Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box mb={1}>
              <Grid container>
                <Grid item>
                  <Chip
                    variant="outlined"
                    className="chip"
                    style={{ borderRadius: 5 }}
                    color="primary"
                    size="small"
                    label={matches?.[0]?.name?.replace("_", " ")}
                  />
                </Grid>
              </Grid>
            </Box>
            <Typography color="primary" variant="subtitle1">
              {capitalizeWords(name)}
            </Typography>
            <Typography variant="body1">{productUse}</Typography>
            {productBenefits && (
              <Box mt={1}>
                <Typography variant="subtitle1">Benefits</Typography>
                <Typography variant="body1">{productBenefits}</Typography>
              </Box>
            )}

            <Box>
              <Typography variant="h6">INR {retailPrice}/-</Typography>
            </Box>
            <Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart()}   
                sx={{ marginTop: 2 }}
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {enabledMask && (
          <Box component="div" className="product-masking">
            <Grid container>
              <Grid item xs={12}>
                <Typography textAlign="center" variant="subtitle2">
                  To View more products{" "}
                </Typography>
                <Typography mt={1} textAlign="center" variant="subtitle2">
                  Call Us at{" "}
                  <span>
                    <b> +91 8977016605</b>
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </StyledProductCard>

      <Box component="div" className="ribbon">
        Highly Recommended
      </Box>
    </Box>
  );
};

export default ProductCard;
