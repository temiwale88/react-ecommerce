// Lecture 191: Container Pattern
/* Andrei: Containers don't render anything but pass props down to components
 */
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';

import collectionsOverview from './collections-overview.component';


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
    // isLoading is the same name WithSpinner is expecting
})


/* Yihua: 
So what will happen is this WithSpinner will first wrap around collectionsOverview, giving us back our collections overview with Spinner component, whichwill  then get passed into our connect which will then give it the isLoading [props]. */
/*Yihua: And what 'compose' does is it lets us pass these [functions] in by just calling the function...compose evaluates from right to left. So what it will do is evaluate WithSpinner first by passing in collectionsOverview to that (WS) and then passing that [result] to 'connect'. Compose esentially allows us to curry or chain our functions together. */

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner)
    (collectionsOverview)

// SAME AS ABOVE but without 'compose': for readability.
// const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(collectionsOverview))

export default CollectionsOverviewContainer;