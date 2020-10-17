import React from 'react';

import { Typography, Grid, Hidden, createStyles, makeStyles, Theme } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { StyledImage, StyledLogo, StyledGrid, StyledPriceBox, MobileStyledPriceBox, StyledTextBox } from './product-item.styles';
import { translate } from 'lib/translate';
import { formatPrice } from 'utils/helpers/price-formatter';

export interface IProductItem {
  img?: string;
  link?: string;
  title: string;
  price: string;
  discountPrice?: string;
  description: string;
  logo: string;
}

const ProductItem = (props: IProductItem) => {
  return (
    <>
      <StyledGrid container spacing={2}>
        <Grid container item xs={12}>
          {/* Desktop product item */}
          <Hidden mdDown>
            {/* Desktop image */}
            {props.img && (
              <Grid item xs={2}>
                <Box>
                  <StyledImage src={props.img} />
                </Box>
              </Grid>
            )}
            <Grid container item xs={props.img ? 8 : 10}>
              <Grid item xs={12}>
                <Box fontFamily="RobotoBold" fontSize="18px">
                  {props.title.length > 100 ? props.title.substring(0, 100) + '...' : props.title}
                </Box>
              </Grid>
              <Grid item xs={props.discountPrice ? 2 : 12}>
                {props.discountPrice && <StyledPriceBox />}
                <Box fontFamily="OswaldMedium" fontSize="24px" mt={5}>
                  {formatPrice(props.price) + ' ' + translate('MegaMall_Product_Price_Currency', 'МКД')}
                </Box>
              </Grid>
              {props.discountPrice && (
                <Grid item xs={2}>
                  <Box fontFamily="OswaldMedium" fontSize="24px" mt={5}>
                    {props.discountPrice + ' ' + translate('MegaMall_Product_Price_Currency', 'МКД')}
                  </Box>
                </Grid>
              )}
            </Grid>
            <Grid container item xs={2}>
              <Box>
                <StyledLogo src={props.logo} />
              </Box>
            </Grid>
            {/* End desktop product item */}
          </Hidden>
          <Hidden mdUp>
            {/* Mobile product item */}
            {props.img && (
              <Grid item xs={3}>
                <Box>
                  <StyledImage src={props.img} />
                </Box>
              </Grid>
            )}
            <Grid container item xs={props.img ? 7 : 10}>
              <Grid item xs={12}>
                <Box fontFamily="RobotoRegular" fontSize="14px">
                  {props.title.length > 100 ? props.title.substring(0, 100) + '...' : props.title}
                </Box>
              </Grid>
              <Grid container spacing={props.discountPrice ? 1 : 0}>
                <Grid item xs={props.discountPrice ? 6 : 12}>
                  {props.discountPrice && <MobileStyledPriceBox />}
                  <Box fontFamily="OswaldMedium" fontSize="18px" mt={5}>
                    {props.price + ' ' + translate('MegaMall_Product_Price_Currency', 'МКД')}
                  </Box>
                </Grid>
                {props.discountPrice && (
                  <Grid item xs={6} offset-1>
                    <Box fontFamily="OswaldMedium" fontSize="18px" mt={5}>
                      {props.discountPrice + ' ' + translate('MegaMall_Product_Price_Currency', 'МКД')}
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Grid>
            {props.discountPrice ? (
              <Grid container item xs={12}>
                <Box mt={5} justifyContent="flex-end" alignContent="flex-end" alignItems="flex-end">
                  <StyledLogo src={props.logo} />
                </Box>
              </Grid>
            ) : (
              <Grid container item xs={2}>
                <Box>
                  <StyledLogo src={props.logo} />
                </Box>
              </Grid>
            )}

            {/* End mobile product item */}
          </Hidden>
        </Grid>
      </StyledGrid>
    </>
  );
};

export default ProductItem;
