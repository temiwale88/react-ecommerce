import {createSelector} from 'reselect';

// See lecture 148: 'Collection Routing and Selector' for why we're building out this map and the selectCollection selector below. 
// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     womens: 4, 
//     mens: 5
// }

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
)

// find the collection where the collection.id matches our url parameter ('collectionUrlParam') e.g. 'shop/hat'. With .find() returns True?
// export const selectCollection = collectionUrlParam =>
//   createSelector([selectCollections], collections => {
//     return collections.find(collection => {
//       return collection.routeName === collectionUrlParam
//     })
//   });

// Lecture 151 (Data Normalization): Refactored because geting stored data in an array is slower than in an object / hash map. We changed SHOP_DATA to an object instead of an array
export const selectCollection = collectionUrlParam => 
  createSelector([selectCollections], 
    collections => collections ? collections[collectionUrlParam] : null
  );

// Lecture 153 (Data flow in our app): for the sake of the other components that need this as an array, we will convert our object to an array with a new selector

export const selectCollectionsForPreview = createSelector(
  [selectCollections], 
  collections => collections ? Object.keys(collections).map(key => collections[key]): []
)