import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProduct_ac,addReview_ac } from '../../../action/products/product.action'
import { ProductDetails } from './Details/details.component'
import AddReview from './Review/addReview.component'

class ProductDetailsLanding extends Component {

    componentDidMount = () =>{
        this.productId = this.props.match.params['id']
        this.props.fetchProduct_ac(this.productId)
        setTimeout(() => {
            console.log('product is',this.props.product)
        },4000)
    }
    addReview = (data) => {
        console.log('addReviewData is :',data)
        this.props.addReview_ac(this.productId,data)
        
    }

    render() {
        return (
          <div>
                <ProductDetails isLoading={ this.props.isLoading} product={ this.props.product} />
                <AddReview isSubmitting={this.props.isSubmitting} submit={this.addReview } />
          </div>
        );
    }
}

const mapStateToProps = (rootStore) => ({
    isLoading: rootStore.product.loading,
    product: rootStore.product.product,
    isSubmitting:rootStore.product.submitting
})
//here the function is return containing dispatch as an argument
const mapDispachtoProps = dispatch => ({       
    fetchProduct_ac: (id) => dispatch(fetchProduct_ac(id)),
    addReview_ac :(id,data)=>dispatch(addReview_ac(id,data))
    
})

export default connect(mapStateToProps,mapDispachtoProps)(ProductDetailsLanding)
