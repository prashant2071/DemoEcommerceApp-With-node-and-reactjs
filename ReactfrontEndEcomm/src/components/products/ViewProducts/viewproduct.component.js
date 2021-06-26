import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../../common/loader/loader.component";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { formatDate } from "../../../utilities/dateTimeUtilities/datetime.util";
import { connect } from "react-redux";
import {
  changePageNumber,
  fetchProducts_ac,
  removeProduct_ac,
} from "../../../action/products/product.action";
const IMG_URL = process.env.REACT_APP_IMG_URL;

class ViewProductComponent extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   isLoading: false,
    //   products: [],
    // };
  }
  componentDidMount = () => {
    console.log("props >>", this.props);
    // setTimeout(() =>{
    //   this.props.triggerAction()
    // },5000)
    const {pageNumber,pageSize} =this.props
    //using object shorthand
    this.props.fetchProducts_ac({pageNumber, pageSize});

    const { productData } = this.props;
    if (productData) {
      console.log("view product from search data", productData);
      return this.setState({
        products: productData,
      });
    }
    // this.setState({
    //   isLoading:true
    // })
  };

  removeProduct = (id, index) => {
    let confirmation = window.confirm("Do you really want to delete this");
    if (confirmation) {
      this.props.removeProduct_ac(id);
      // httpClient
      //   .DELETE(`/product/${Id}`, true)
      //   .then((response) => {
      //     notify.showInfo("Product Removed Successfully");
      //     const { products } = this.state;
      //     products.splice(index, 1);
      //     this.setState({
      //       products: products,
      //     });
      //     // this.state.products.splice(index,1)
      //   })
      //   .catch((err) => {
      //     handleError(err);
      //   });
    }
  };
  editProduct = (id, index) => {
    this.props.history.push(`/edit_products/${id}`);
  };
  changePage = (val) => {
    let currentPage = this.props.pageNumber;
    if (val === "next") {
      currentPage++;
    }
    if (val === "previous") {
      currentPage--;
    }
    this.props.fetchProducts_ac({pageNumber:currentPage, pageSize:this.props.pageSize});
    this.props.changePageNumber(currentPage);
  };

  render() {
    let content = this.props.loadingProduct ? (
      <Loader />
    ) : (
      <table className="table">
        <thead>
          <tr>
            <th>S No</th>
            <th>Name</th>
            {/* <th>Category</th> */}
            <th>Price</th>
            <th>Brand</th>
            <th>Images</th>
            <th>Created At</th>
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          {(this.props.products || []).map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>
                <Link to={`productDetails/${product._id}`}>{product.name}</Link>
              </td>
              {/* <td>{product.category}</td> */}
              <td>{product.price}</td>
              <td>{product.brand}</td>
              <td>
                <img
                  src={`${IMG_URL}/${product.image[0]}`}
                  height="100px"
                  width="100px"
                  alt={`${product.image[0]}`}
                />
              </td>
              <td>{formatDate(product.createdAt, "YYYY/MM/DD hh:mm a")}</td>
              <td>
                <Tippy content="Edit Product">
                  <button
                    onClick={() => this.editProduct(product._id, index)}
                    // title="Edit Product"
                    className="btn btn-primary"
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                </Tippy>
                &nbsp;
                <Tippy content="Delete Product">
                  <button
                    onClick={() => this.removeProduct(product._id, index)}
                    // title="Delete Product"
                    className="btn btn-danger"
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </Tippy>
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    );
    return (
      <>
        {this.props.productData && (
          <button
            onClick={() => this.props.resetSearch()}
            className="btn btn-primary"
          >
            Search Again
          </button>
        )}{" "}
        {/*yehi bata search vayo */}
        <p>Current page Number:{this.props.pageNumber}</p>
        {content}
        <button
          className="btn btn-primary"
          onClick={() => this.changePage("previous")}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => this.changePage("next")}
        >
          Next
        </button>
      </>
    );
  }
}
// mapState to props
// incomming data for connected component
const mapStateToProps = (rootStore) => ({
  pageNumber: rootStore.product.pageNumber,
  products: rootStore.product.records,
  loadingProduct: rootStore.product.loading,
  pageSize: rootStore.product.pageSize,
});
const mapDispachtoProps = (dispatch) => ({
  //newPageNumber vaneko currentPage
  changePageNumber: (newPageNumber) =>
    dispatch(changePageNumber(newPageNumber)),
  fetchProducts_ac: (params) =>
    dispatch(fetchProducts_ac(params)),
  removeProduct_ac: (id) => dispatch(removeProduct_ac(id)),
});
// removeProduct_ac:(id)=>dispatch(removeProduct_ac(id))
// yaha id vaneko yo component ko data jaha bata ni chinxa

// mapDispach to props return object

//mapDispachtoProps
// compoent bata kun action trigger garney

export const ViewProduct = connect(
  mapStateToProps,
  mapDispachtoProps
)(ViewProductComponent);
//this connect that import from redux it will connect to redux
