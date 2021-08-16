import React from 'react';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import {Route} from 'react-router-dom'
import CollectionPage from '../collection/collection.component'

const ShopPage = ({match}) => (
// We have access to 'match' because in the App.js we nest ShopPage in Route component which passes its property (including 'match', 'location', and 'history') to the ShopPage component. In this case we passed '/shop' to the path in App.js for ShopPage component and that's what our match.path will be.
// console.log(match)

    <div className='shop-page'>
        <Route exact path = {`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
)


export default ShopPage;