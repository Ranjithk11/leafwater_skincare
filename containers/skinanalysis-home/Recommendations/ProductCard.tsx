import React, { Fragment } from "react";
import Card from "@mui/material/Card";
import {
  Box,
  CardContent,
  Chip,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { capitalizeWords } from "@/utils/func";

interface ProductCardProps {
  ribbenColor?: string;
  productBenefits: string;
  name: string;
  productUse: string;
  retailPrice: string;
  matches: any[];
  images: any[];
}

const StyledProductCard = styled(Card)(({ theme }) => ({
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
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    [theme.breakpoints.only("xs")]: {
      fontSize: 14,
      lineHeight: 1,
      marginBottom: 10,
    },
  },
  "& .MuiTypography-h6": {
    [theme.breakpoints.only("xs")]: {
      fontSize: 20,
    },
  },
  "& .product_image": {
    position: "relative",
    width: "100%",
    padding: 10,
    height: 250,
    marginBottom: 20,
    [theme.breakpoints.only("xs")]: {
      height: 150,
    },
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
}));

const ProductCard = ({
  name,
  productBenefits,
  productUse,
  retailPrice,
  matches,
  images,
}: ProductCardProps) => {
  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <StyledProductCard>
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
                    style={{ borderRadius: 5 }}
                    color="primary"
                    size="small"
                    label={matches?.[0]?.name?.replace("_"," ")}
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
          </Grid>
        </Grid>
      </StyledProductCard>

      <Box component="div" className="ribbon">
        Highly Recommended
      </Box>
    </Box>
  );
};

export default ProductCard;
