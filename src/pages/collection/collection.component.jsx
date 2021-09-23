import React from 'react';
import CollectionItem from '../../components/collection-item/collection-item.component'
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss'

const CollectionPage = ({match}) => {
  // pulling collectionId off of url parameters using useParams Hook
  const {collectionId} = useParams();

  // because we're using reselectors, we are memoizing selectCollection below thus useSelector won't rerun again (IF you use reselectors)
  const collection = useSelector(selectCollection(collectionId))

  // console.log(match)
  // console.log('this is collection', collection)
  const {title, items} = collection;
  // match here references route passed to this CollectionPage component as a property from shop.component.jsx (lecture 146: Nested Routing in Shop Page). So match.path here will be '/shop/categoryId', match.url will be '/shop/hats', and we get get the categoryId from 'match.params.collectionId'
  return (
      <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

// see lecture 148: 'Collection Routing and Selector' on 'ownProps' and why state is passed after the createSelector call i.e. selectCollection
//"The second argument is actually called 'ownProps', which is the props of the component that were wrapping in our connect"
// i.e. its (the components) own property. Thus with mapStateToProps, we can append state to the properties of the component while with ownProps we can get its individual property e.g. that's not necessarily in the state such as a urlParam.
// const mapStateToProps = (state, ownProps) => ({
//     collection: selectCollection(ownProps.match.params.collectionId)(state)

// })

export default CollectionPage;