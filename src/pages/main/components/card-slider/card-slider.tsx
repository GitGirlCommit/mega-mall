import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AppDispatch } from 'index';
import ApplicationState from 'store/application-state';

import SliderCard from './../../../../components/slider-card/slider-card';
import Carousel from 'react-multi-carousel';
import { Box, Grid, Typography, Link } from '@material-ui/core';
import { translate } from 'lib/translate';
import { getMostPopularProducts } from 'store/main-store';
import { formatPrice } from 'utils/helpers/price-formatter';

interface ICardSlider {
  data: Models.Product.Model[];
  onInit: () => void;
}

const CardSlider = (props: ICardSlider) => {
  const defaultImage = './../../../../assets/images/product-list/applie_laptop.jpg';
  useEffect(() => {
    props.onInit();
  }, []);

  return (
    <>
      <Box>
        <Grid container justify="space-between">
          <Grid item sm={6} xs={12}>
            <Typography variant="h5">Најпосетени производи</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box mt={3} pb={3}>
        <Carousel
          arrows
          infinite
          minimumTouchDrag={80}
          swipeable
          responsive={{
            superLargeDesktop: {
              breakpoint: {
                max: 10000,
                min: 3000
              },
              items: 4,
              slidesToSlide: 1,
              partialVisibilityGutter: 50
            },
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024
              },
              items: 4,
              partialVisibilityGutter: 0,
              slidesToSlide: 1
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464
              },
              items: 3,
              partialVisibilityGutter: 20,
              slidesToSlide: 1
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              items: 1,
              partialVisibilityGutter: 60,
              slidesToSlide: 1
            }
          }}
        >
          {/* TODO: Add destination product url to the interface*/}
          {props.data ? (
            props.data.map(res => (
              <Box key={res.id}>
                <Link href={res.link}>
                  <SliderCard title={res.name.length > 25 ? res.name.substring(0, 25) + '...' : res.name} url={res.imageSource || defaultImage}>
                    <Typography variant="h4">{formatPrice(res.price) + ' ' + translate('MegaMall_Product_Price_Currency', 'МКД')}</Typography>
                  </SliderCard>
                </Link>
              </Box>
            ))
          ) : (
            <>Loading data...</>
          )}
        </Carousel>
      </Box>
    </>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onInit: () => {
    dispatch(getMostPopularProducts());
  }
});

const mapStateToProps = (state: ApplicationState) => {
  return {
    data: state.main.mostViewedData
  };
};

const CardSliderContainer = connect(mapStateToProps, mapDispatchToProps)(CardSlider);
export default CardSliderContainer;
