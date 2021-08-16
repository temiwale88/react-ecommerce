import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import CollectionPreview from '../collection-preview/collection-preview.component';
import {selectCollectionsForPreview} from '../../redux/shop/shop.selectors'

import './collections-overview.styles.scss'

const CollectionsOverview = ({collections}) => (

    <div>
    {
        collections.map(({id, ...otherCollectionsProps}) => (
            <CollectionPreview key={id} {...otherCollectionsProps}/>
            // otherCollectionsPropos includes 'item' in the top object from which the CollectionPreview will pull its id and name i.e. item.id or just 'id' (which is different from 'id' in the top shop_data object and is passed as 'key' in CollectionPreview) and item.name or just 'name'.
        ))
    }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})


export default connect(mapStateToProps)(CollectionsOverview);