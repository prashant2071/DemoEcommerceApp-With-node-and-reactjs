import React, { Component } from 'react'
import { httpClient } from '../../../utilities/httpClient/httpClient'
import { ProductForm } from '../ProductForm/productForm.component';
import {notify} from './../../../utilities/notify'
import { handleError } from "./../../../utilities/error.handler";



export  class AddProduct extends Component {
    constructor() {
        super()
    
        this.state = {
            isSubmitting:false
             
        }
    }
    add = (data,files) =>{
        console.log('the data is >>',data)
        httpClient.UPLOAD('POST','/product',data,files)
        .then(response =>{
            notify.showSuccess('products added successfully')
            this.props.history.push('/view_product')
        })
        .catch(err=>{
            handleError(err)
            this.setState({
                isSubmitting:false
            })
        })

    }
    
    render() {
        return (
          <>
            <ProductForm
              title="Add Product"
              description="Please add details"
              isSubmitting={this.state.isSubmitting}
              submitAction={this.add}
            ></ProductForm>
          </>
        );
    }
}
