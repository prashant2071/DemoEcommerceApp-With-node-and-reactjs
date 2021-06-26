import React, { Component } from 'react'
import { handleError } from '../../../utilities/error.handler'
import { httpClient } from '../../../utilities/httpClient/httpClient'
import { notify } from '../../../utilities/notify'
import { Loader } from '../../common/loader/loader.component'
import { ProductForm } from '../ProductForm/productForm.component'

export  class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: false,
      isLoading: false,
      product: {},
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    this.productId = this.props.match.params["id"];
    httpClient
      .GET(`/product/${this.productId}`, true)
      .then((response) => {
        this.setState({
          product: response.data,
        });
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  }
  
  edit = (data,files) => {
    this.setState({
      isSubmitting:true
    })
    // data.vendor=data.vendor._id  basically we dont assign for 

              httpClient
                .UPLOAD('PUT',`/product/${this.productId}`, data, files)
                .then((response) => {
                  notify.showSuccess("proudct updated");
                  this.props.history.push("/view_product");
                })
                .catch((err) => {
                  handleError(err);
                  this.setState({
                    isSubmitting: false,
                  });
                });
  };

  render() {
    let content = this.state.isLoading ? (
      <Loader></Loader>
    ) : (
      <ProductForm
        isSubmitting={this.state.isSubmitting}
        isEdit={true}
        submitAction={this.edit}
        productData={this.state.product}
      ></ProductForm>
    );
    return content;
  }
}