//reducer is javascript function or pure function 
// why pure herek choti input j diyo tei anusar output aauxa
import {productActionType} from './../action/products/product.action'
const defaultState={
    records:[],
    loading:false,
    pageNumber:1
}
export const productReducer=(state=defaultState,action)=>{
    //logic to update state(store)
    //action will have what to do when to do
    // TODO ADD LOGIC
    console.log('at reducer with action',action)
    console.log('at reducer with state',state)
    //yeshe centraized state return garxa
    switch (action.type) {
      case productActionType.SET_IS_PAGE_NUMBER:
        return {
          ...state,
          pageNumber: action.currentPage,
        };
      case productActionType.SET_IS_LOADING:
        return {
          ...state,
          loading: action.payload,
        };
      case productActionType.SET_IS_SUBMITTING:
        return {
          ...state,
          submitting: action.payload,
        };
      case productActionType.PRODUCTS_RECIEVED: {
        return {
          ...state,
          records: action.payload,
        };
      }
      case productActionType.PRODUCT_DELETED: {
        const { records } = state;
        records.forEach((item, index) => {
          if (item._id === action.payload) {
            records.splice(index, 1);
          }
        });
        return {
          ...state,
          records: [...records],
        };
      }

      //   case productActionType.REVIEW_ADDED:
      case productActionType.PRODUCT_RECIEVED:
        return {
          ...state,
          product: action.payload,
        };

      default:
        return {
          ...state,
        };
    }
}