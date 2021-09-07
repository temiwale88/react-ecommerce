import {React, Component} from 'react';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

import CollectionPage from '../collection/collection.component'
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import {updateCollections} from '../../redux/shop/shop.actions'

// const ShopPage = ({match}) => (
// // We have access to 'match' because in the App.js we nest ShopPage in Route component which passes its property (including 'match', 'location', and 'history') to the ShopPage component. In this case we passed '/shop' to the path in App.js for ShopPage component and that's what our match.path will be.
// // console.log(match)

//     <div className='shop-page'>
//         <Route exact path = {`${match.path}`} component={CollectionsOverview} />
//         <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//     </div>
// )

// lecture 179 - migrating shop data to firebase and bringing it back
class ShopPage extends Component {
    unsubscribeFromSnapShot = null;
    componentDidMount(){
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async snapshot => {
            // console.log(snapshot)
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            // console.log(collectionsMap)
            updateCollections(collectionsMap)
        })
    }


    render() {
        const {match} = this.props;

        return (
        <div className='shop-page'>
            <Route exact path = {`${match.path}`} component={CollectionsOverview} />
            <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
        </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);