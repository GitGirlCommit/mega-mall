import React from 'react';

import { Grid, Box, Typography, Hidden } from '@material-ui/core';
import Card from './../../../../components/card/card';
import { StyledLink } from 'components/styled-link';
import { cards } from './category-grid.data';
import { translate } from 'lib/translate';
import { MenuItem } from 'lib/data';
import { connect } from 'react-redux';
import ApplicationState from 'store/application-state';
import { AppDispatch } from 'index';

interface ICategoryGrid {
  menuItems: MenuItem[];
}

const CategoryGrid = (props: ICategoryGrid) => {
  return (
    <>
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5">{translate('MegaMall_Categorygrid_Search', 'Пребарај по категорија')}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box mt={3}>
        <Grid container spacing={3}>
          {props.menuItems.slice(0, 6).map(item => (
            <Grid item key={item.id} xs={12} md={6} lg={4}>
              <Card title={item.title} imageSrc={item.imageSrc} link={item.link} size="large">
                {item.children &&
                  item.children.slice(0, 3).map((child, index) => {
                    return (
                      <Box key={index} mt={index > 0 ? 2 : 0}>
                        <Typography variant="subtitle1">
                          <StyledLink placeToRender="card" href={child.link}>
                            {child.title}
                          </StyledLink>
                        </Typography>
                      </Box>
                    );
                  })}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

const mapDisptachToProps = (disptach: AppDispatch) => ({});

const mapStateToProps = (state: ApplicationState) => {
  return {
    menuItems: state.shared.menuItems
  };
};

const CategoryGridContainer = connect(() => mapStateToProps, mapDisptachToProps)(CategoryGrid);

export default CategoryGridContainer;
