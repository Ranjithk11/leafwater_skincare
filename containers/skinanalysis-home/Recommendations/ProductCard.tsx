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
  position: "relative",
  "& .MuiTypography-subtitle1": {
    fontWeight: 800,
    fontSize: 18,
  },
  "& .MuiTypography-body1": {
    fontWeight: 500,
    fontSize: 16,
    color: theme.palette.text.secondary,
  },
  "& .product_image": {
    position: "relative",
    width: "100%",
    height: 250,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "top center",
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
    <Box sx={{ position: "relative" }}>
      <StyledProductCard>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box
                component="div"
                className="product_image"
                sx={{
                  backgroundImage: `url(${images?.[0]?.url})`,
                }}
              ></Box>
            </Grid>
            <Grid item xs={12}>
              <Box mb={1}>
                <Grid container>
                  <Grid item>
                    <Chip
                      variant="outlined"
                      style={{ borderRadius: 5 }}
                      color="primary"
                      size="small"
                      label={matches?.[0]?.name}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Typography color="primary" variant="subtitle1">
                {name}
              </Typography>
              <Typography variant="body1">{productUse}</Typography>
              <Box mt={1}>
                <Typography variant="subtitle1">Benefits</Typography>
                <Typography variant="body1">{productBenefits}</Typography>
              </Box>
              <Box>
                <Typography variant="h6">INR {retailPrice}/-</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </StyledProductCard>

      <Box component="div" className="ribbon">
        Highly Recommended
      </Box>
    </Box>
  );
};

export default ProductCard;
