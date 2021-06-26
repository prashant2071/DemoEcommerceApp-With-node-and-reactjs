import { handleError } from "../../utilities/error.handler";
import { httpClient } from "../../utilities/httpClient/httpClient";
import { notify } from "../../utilities/notify";

// middleware usages
export const productActionType = {
  SET_IS_SUBMITTING: "SET_IS_SUBMITTING",
  SET_IS_LOADING: "SET_IS_LOADING",
  SET_IS_PAGE_NUMBER: "SET_IS_PAGE_NUMBER",
  PRODUCTS_RECIEVED: "PRODUCTS_RECIEVED",
  PRODUCT_DELETED: "PRODUCT_DELETED",
  PRODUCT_RECIEVED: "PRODUCT_RECIEVED",
  REVIEW_ADDED: "REVIEW_ADDED",
};

export const changePageNumber = (pageNumber) => {
  console.log("at action file", pageNumber);
  // enhancer is used here in the case of delayed dispach
  //return is without delayed dispach
  //delay garera dispatch garna dispach teshko lagi middleware
  //thunk middleware use gareko matri vayara return function use garna pako
  return function (dispatch) {
    dispatch({
      type: productActionType.SET_IS_PAGE_NUMBER,
      currentPage: pageNumber,
    });
  };
};
//action file will dispach an object to reducer
//yaha bata dispach vako kura reducer ma janxa
//
//
//
// export const fetchProduct_ac =params=>{
//   return dispatch =>{

//   }
// }
// these all are same can be return in any way
//this return function having argument dispatch
export const fetchProducts_ac =
  (params = {}) =>
  (dispatch) => {
    console.log("at pageNumber params", params.pageNumber);
    console.log("at product action", params);
    console.log("pageSize is", params.pageSize);
    dispatch({
      type: productActionType.SET_IS_LOADING,
      payload: true,
    });
    httpClient
      .GET("/product", true, params)
      .then((response) => {
        dispatch({
          type: productActionType.PRODUCTS_RECIEVED,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log("error productAction is", err);
        handleError(err);
      })
      .finally(() => {
        dispatch({
          type: productActionType.SET_IS_LOADING,
          payload: false,
        });
      });
  };

export const removeProduct_ac = (id) => (dispatch) => {
  httpClient
    .DELETE(`/product/${id}`, true)
    .then((response) => {
      notify.showInfo("Product Removed Successfully");
      dispatch({
        type: productActionType.PRODUCT_DELETED,
        payload: id,
      });
      // this.state.products.splice(index,1)
    })
    .catch((err) => {
      handleError(err);
    });
};

export const fetchProduct_ac = (id) => dispatch => {
  dispatch(isLoading(true));
  httpClient.POST(`/product/search`, { _id: id })
    .then((response) => {
    dispatch({
      type: productActionType.PRODUCT_RECIEVED,
      payload: response.data[0], //response yauta aauxa array ma object ma transfer garna lai 0 index leko
    });
    })
    .catch(err => {
    handleError(err)
    })
    .finally(() => {
    dispatch(isLoading(false))
  })
  
};

export const addReview_ac = (id, data) => dispatch => {
  console.log("here at product action add review ", data);
  // console.log('isSubmitting is ',this.props.isSubmitting)
 dispatch(isSubmitting(true));
  httpClient.POST(`/product/add_review/${id}`, data, true)
    .then(response => {
      dispatch(fetchProduct_ac(id))
    })
    .catch(err => {
    handleError(err)
    })
    .finally(() => {
    dispatch(isSubmitting(false))
  })
 }  

const isLoading = (isLoading) => ({
  type: productActionType.SET_IS_LOADING,
  payload: isLoading,
});

const isSubmitting = (isSubmitting) => ({
  type: productActionType.SET_IS_SUBMITTING,
  payload: isSubmitting,
});