import React, { useState } from 'react';

import { Card, CardMedia, CardContent, Typography, Grid } from '@material-ui/core';
import { shopsData } from './shops-list.data';
import Pagination from '@material-ui/lab/Pagination';
import SubcategoryCard from 'pages/category/components/subcategory-card/subcategory-card';
import { StyledPagination } from '../display.styles';

interface ShopsListProps {}

const ShopsList = (props: ShopsListProps) => {
  const [shops, setShops] = useState(shopsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(12);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = shops.slice(indexOfFirstPost, indexOfLastPost);
  var pages = 0;
  if (shops.length % postPerPage == 0) {
    pages = shops.length / postPerPage;
  } else {
    pages = Math.floor(shops.length / postPerPage) + 1;
  }

  const paginate = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  return (
    <>
      <Grid container spacing={3}>
        {currentPost.map(val => (
          <Grid item key={val.id} xs={12} sm={6} md={6} lg={2} xl={2}>
            {/* <SubcategoryCard imageSrc={val.url} title={val.title} link={val.link}></SubcategoryCard> */}
          </Grid>
        ))}
      </Grid>
      <StyledPagination count={pages} page={currentPage} onChange={paginate} />
    </>
  );
};

export default ShopsList;
