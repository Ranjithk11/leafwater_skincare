import React from "react";
import {
  Card,
  Box,
  Grid,
  Typography,
  Button,
  Chip,
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
  shopifyUrl: string;
  minWidth?: number;
}

const StyledProductCard = styled(Card, {
  shouldForwardProp: (prop) =>
    shouldForwardProp<{ enabledMask?: boolean; minWidth?: number }>(
      ["enabledMask", "minWidth"],
      prop
    ),
})<{ enabledMask?: boolean; minWidth?: number }>(
  ({ theme, enabledMask, minWidth }) => ({
    height: "100%",
    ...(minWidth && {
      minWidth: minWidth,
      height: "auto",
      padding: 20,
      marginRight: 15,
    }),
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
      WebkitLineClamp: "2",
      WebkitBoxOrient: "vertical",
      ...(enabledMask && {
        filter: "blur(1rem)",
      }),
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
      WebkitLineClamp: "2",
      WebkitBoxOrient: "vertical",
      ...(enabledMask && {
        filter: "blur(1rem)",
      }),
      [theme.breakpoints.only("xs")]: {
        fontSize: 14,
        lineHeight: 1,
        marginBottom: 10,
      },
    },
    "& .product_image": {
      position: "relative",
      width: "100%",
      padding: 10,
      height: 200,
      marginBottom: 20,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
      ...(enabledMask && {
        filter: "blur(1rem)",
      }),
      [theme.breakpoints.only("xs")]: {
        height: 150,
      },
    },
  })
);

const ProductCard = ({
  name,
  productBenefits,
  productUse,
  matches,
  images,
  enabledMask,
  shopifyUrl,
  minWidth,
}: ProductCardProps) => {
  const handleAddToCart = () => {
    window.open(shopifyUrl);
  };

  return (
    <StyledProductCard enabledMask={enabledMask} minWidth={minWidth}>
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
            <Chip
              variant="outlined"
              className="chip"
              style={{ borderRadius: 5 }}
              color="primary"
              size="small"
              label={matches?.[0]?.name?.replace("_", " ")}
            />
          </Box>
          <Typography color="primary" variant="subtitle1">
            {capitalizeWords(name)}
          </Typography>
          <Typography variant="body1">
            {productUse
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
          </Typography>
          {productBenefits && (
            <Box mt={1}>
              <Typography variant="subtitle1">Benefits</Typography>
              <Typography variant="body1">
                {productBenefits
                  .split(" ")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ")}
              </Typography>
            </Box>
          )}
          {!enabledMask && shopifyUrl && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              size="small"
              sx={{
                marginTop: 2,
                padding: "6px 12px",
                typography: "body2",
                whiteSpace: "nowrap",
              }}
            >
              Add to Cart
            </Button>
          )}
        </Grid>
      </Grid>
    </StyledProductCard>
  );
};

export default ProductCard;
