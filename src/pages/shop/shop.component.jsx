import React, {Component} from 'react';
import SHOP_DATA from './shop.data.js'
import CollectionPreview from '../../components/collection-preview/collection-preview.component'

class ShopPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            collections: SHOP_DATA
        }
    }

    render () {
        const {collections} = this.state
        return <div className='shop-page'>
            {
                collections.map(({id, ...otherCollectionsProps}) => (
                    <CollectionPreview key={id} {...otherCollectionsProps}/>
                    // otherCollectionsPropos includes 'item' in the top object from which the CollectionPreview will pull its id and name i.e. item.id (which is different from 'id' in the top shop_data object and is passed as 'key' in CollectionPreview) and item.name
                ))
            }
        </div>
    }
}

export default ShopPage;