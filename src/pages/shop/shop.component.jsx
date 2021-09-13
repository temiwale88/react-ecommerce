import {React, Component} from 'react';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

import CollectionPage from '../collection/collection.component'
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import {updateCollections} from '../../redux/shop/shop.actions'

import WithSpinner from '../../components/with-spinner/with-spinner.component'


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionsPageWithSpinner = WithSpinner(CollectionPage)

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
    // same as calling a consturctor // super // this.state
    state = {
        loading: true //this is for our HOC spinner while we wait to retrieve data back
    }
    
    unsubscribeFromSnapShot = null;
    componentDidMount(){
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');

        // collectionRef.onSnapshot(async snapshot => {
        //     // console.log(snapshot)
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        //     // console.log(collectionsMap)
        //     // The updateCollections fxn updates our reducer with the collections data
        //     updateCollections(collectionsMap)
        //     this.setState({loading: false})
        // })

        // Lecture 187: Promise Patterns and Observables
        collectionRef.get().then(            
            snapshot => {
            // console.log(snapshot)
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            // console.log(collectionsMap)
            // The updateCollections fxn updates our reducer with the collections data
            updateCollections(collectionsMap)
            this.setState({loading: false})
        })

        // const firestoreAPI = "https://firestore.googleapis.com/v1/projects/crown-db-4b2b0/databases/(default)/documents/collections"

        // fetch(firestoreAPI)
        // .then(response => response.json())
        // .then(collections => console.log(collections))

    }


    render() {
        const {match} = this.props;
        const {loading} = this.state;

        return (
        <div className='shop-page'>
            {/* <Route exact path = {`${match.path}`} component={CollectionsOverview} />
            <Route path={`${match.path}/:collectionId`} component={CollectionPage} /> */}
            <Route exact path = {`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading = {loading} {...props}/>} />
            <Route exact path = {`${match.path}/:collectionId`} render={(props) => <CollectionsPageWithSpinner isLoading = {loading} {...props}/>} />
        </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);