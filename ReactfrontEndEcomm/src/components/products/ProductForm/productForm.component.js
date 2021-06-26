import React, { Component } from 'react'
import Button from '../../common/submitButton/submitButton.component'
import { formatDate } from '../../../utilities/dateTimeUtilities/datetime.util'
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
const IMG_URL = process.env.REACT_APP_IMG_URL;
const defaultForm = {
  name: "",
  category: "",
  price: "",
  quantity: "",
  modelNo: "",
  warrentyStatus: "",
  warrentyPeriod: "",
  color: "",
  isReturnEligible: "",
  description: "",
  tags: "",
  offer: "",
  discountedItem: "",
  discountType: "",
  discountedvalue: "",
  returnedDate: "",
  manuDate: "",
  purchasedDate: "",
  salesDate: "",
  expiryDate: "",
  brand: "",
  size: "",
};
export  class ProductForm extends Component {
  constructor() {
    super();

    this.state = {
      data: {
        ...defaultForm,
      },
      error: {
        ...defaultForm,
      },
      isValid: false,
      filestoUpload: [],
      filestoPreview: [],
      filestoRemove: [],
    };
  }
  componentDidMount = () => {
    console.log("this props from edit form >>", this.props);
    const { productData } = this.props;

    if (productData) {
      this.setState({
        data: {
          ...defaultForm,
          ...productData,
          discountedItem:
            productData.discount && productData.discount.discountedItem
              ? productData.discount.discountedItem
              : "",
          discountType:
            productData.discount && productData.discount.discountType
              ? productData.discount.discountType
              : "",
          discountedvalue:
            productData.discount && productData.discount.discountedvalue
              ? productData.discount.discountedvalue
              : "",
          salesDate: productData.salesDate
            ? formatDate(productData.salesDate, "YYYY-MM-DD")
            : "",
          purchasedDate: productData.purchasedDate
            ? formatDate(productData.purchasedDate, "YYYY-MM-DD")
            : "",
          manuDate: productData.manuDate
            ? formatDate(productData.manuDate, "YYYY-MM-DD")
            : "",
          expiryDate: productData.expiryDate
            ? formatDate(productData.expiryDate, "YYYY-MM-DD")
            : "",
        },
      });
      this.populateImage(productData.image);
    }
  };

  populateImage = (Images = []) => {
    const previousImage = Images.map((img) => `${IMG_URL}/${img}`);
    this.setState({
      filestoPreview: previousImage,

      // filestoUpload:Images  //yeso garda file ko format bigrinxa jastai yaha image matri uplad garney bela file janxa
    });
    console.log("PREVIIOUS IMAGE IS", previousImage);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { data, filestoRemove } = this.state;
    data.filestoRemove = filestoRemove;

    this.props.submitAction(data, this.state.filestoUpload);
  };

  removeExistingImage = (img, index) => {
    const { filestoPreview, filestoRemove } = this.state;

    filestoRemove.push(img);

    filestoPreview.splice(index, 1);

    this.setState({
      filestoPreview,
      filestoRemove,
    });
  };
  removeNewImage = (img, index) => {
    const { filestoPreview,filestoUpload } = this.state;


    filestoUpload.splice(index,1)

    this.setState({
      filestoPreview,
      filestoUpload
   });
  };

  handleChange = (e) => {
    let { name, value, type, checked, files } = e.target;

    if (type === "file") {
      if(!files.length) return
      const { filestoUpload } = this.state;
      filestoUpload.push(files[0]); //In this position files is pushed
      // console.log('the data from file to upload is',filestoUpload)

      this.setState({
        filestoUpload,
      });
      return;
    }
    if (type === "checkbox") {
      value = checked;
    }
    this.setState(
      (preState) => ({    //yo annonymous functtion aarkoi call gareko ho so jashma hamro sabai data hunxa  call garepaxi return ni hunu purxa so either =>() or return statement
        data: {
          ...preState.data,
          [name]: value,
        },
      }),
      () => {
        this.ValidateForm(name);
      }
    );
  };

  ValidateForm = (feildname) => {
    let errMsg;
    switch (feildname) {
      case "name":
        errMsg = this.state.data[feildname] ? "" : "required Feild*";
        break;
      case "price":
        errMsg = this.state.data[feildname] ? "" : "required feild*";
        break;
      case "category":
        errMsg = this.state.data[feildname] ? "" : "required feild*";
        break;
      case "description":
        errMsg = this.state.data[feildname] ? "" : "required feild*";
        break;
      case "brand":
        errMsg = this.state.data[feildname] ? "" : "required feild*";
        break;
      default:
        break;
    }
    this.setState(
      (prevState) => ({
        error: {
          ...prevState.error,
          [feildname]: errMsg,
        },
      }),
      () => {
        const errors = Object.values(this.state.error).filter((err) => err);
        console.log("the errors are", errors);
        this.setState({
          isValid: errors.length === 0,
        });
      }
    );
  };

  render() {
    const { data, error } = this.state;
    const mode = this.props.isEdit ? "Edit" : "Add";

    return (
      <div>
        <h2>{mode} data</h2>
        <p>{mode} nessary Details</p>
        {this.props.description}
        <form className="form-group" onSubmit={this.handleSubmit}>
          <label htmlFor="category"> category</label>
          <input
            type="text"
            className="form-control"
            placeholder="category"
            name="category"
            value={data.category}
            onChange={this.handleChange}
          />
          <p className="error">{error.category}</p>
          <label htmlFor="name"> name</label>
          <input
            type="text"
            className="form-control"
            placeholder="name"
            name="name"
            value={data.name}
            onChange={this.handleChange}
          />
          <p className="error">{error.name}</p>
          <label htmlFor="description"> description</label>
          <textarea
            rows="5"
            className="form-control"
            placeholder="description"
            name="description"
            value={data.description}
            onChange={this.handleChange}
          />
          <p className="error">{error.description}</p>
          <label htmlFor="price"> price</label>
          <input
            type="number"
            className="form-control"
            placeholder="price"
            name="price"
            value={data.price}
            onChange={this.handleChange}
          />
          <p className="error">{error.price}</p>
          <label htmlFor="color"> color</label>
          <input
            type="text"
            className="form-control"
            placeholder="color"
            name="color"
            value={data.color}
            onChange={this.handleChange}
          />
          <label htmlFor="brand"> brand</label>
          <input
            type="text"
            className="form-control"
            placeholder="brand"
            name="brand"
            value={data.brand}
            onChange={this.handleChange}
          />
          <label htmlFor="size"> size</label>
          <input
            type="text"
            className="form-control"
            placeholder="size"
            name="size"
            value={data.size}
            onChange={this.handleChange}
          />
          <label htmlFor="quantity"> Quantity</label>
          <input
            type="number"
            className="form-control"
            placeholder="quantity"
            name="quantity"
            value={data.quantity}
            onChange={this.handleChange}
          />
          <input
            type="checkbox"
            name="isReturnEligible"
            value={data.isReturnEligible}
            onChange={this.handleChange}
          />
          <label>&nbsp; IsReturn Eligible</label>
          <br></br>
          <input
            type="checkbox"
            name="discountedItem"
            checked={data.discountedItem}
            onChange={this.handleChange}
          />
          <label>&nbsp; Discounted Item</label>
          <br></br>
          {data.discountedItem && (
            <>
              <label>Discount Type</label>
              <select
                name="discountType"
                value={data.discountType}
                className="form-control"
                onChange={this.handleChange}
              >
                <option value="">(Select Type)</option>
                <option value="percentage">Percentage</option>
                <option value="quantity">Quantity</option>
                <option value="value">Value</option>
              </select>
              <label>Discount Value</label>
              <input
                type="text"
                value={data.discountedvalue}
                name="discountedvalue"
                className="form-control"
                onChange={this.handleChange}
                placeholder="Discount Value"
              ></input>
            </>
          )}
          <input
            type="checkbox"
            name="warrentyStatus"
            checked={data.warrentyStatus}
            onChange={this.handleChange}
          />
          <label>&nbsp; Warrenty Status</label>
          <br></br>
          {data.warrentyStatus && (
            <>
              <label>Warrenty Period</label>
              <input
                type="text"
                value={data.warrentyPeriod}
                name="warrentyPeriod"
                className="form-control"
                onChange={this.handleChange}
                placeholder="Warrenty Period"
              ></input>
            </>
          )}

          <label htmlFor="tags"> tags</label>
          <input
            type="text"
            className="form-control"
            placeholder="tags"
            name="tags"
            value={data.tags}
            onChange={this.handleChange}
          />
          <label htmlFor="offer"> offer</label>
          <input
            type="text"
            className="form-control"
            placeholder="offer"
            name="offer"
            value={data.offer}
            onChange={this.handleChange}
          />
          <label htmlFor="purchasedDate"> purchasedDate</label>
          <input
            type="date"
            className="form-control"
            placeholder="purchasedDate"
            name="purchasedDate"
            value={data.purchasedDate}
            onChange={this.handleChange}
          />
          <label htmlFor="salesDate"> salesDate</label>
          <input
            type="date"
            className="form-control"
            placeholder="salesDate"
            name="salesDate"
            value={data.salesDate}
            onChange={this.handleChange}
          />
          <label htmlFor="manuDate"> manuDate</label>
          <input
            type="date"
            className="form-control"
            placeholder="manuDate"
            name="manuDate"
            value={data.manuDate}
            onChange={this.handleChange}
          />
          <label htmlFor="expiryDate"> expiryDate</label>
          <input
            type="date"
            className="form-control"
            placeholder="expiryDate"
            name="expiryDate"
            value={data.expiryDate}
            onChange={this.handleChange}
          />
          <label htmlFor="image"> Files</label>
          <input
            type="file"
            className="form-control"
            placeholder="file"
            name="image"
            accept="image/png, image/gif, image/jpeg"
            onChange={this.handleChange}
          />
          <br></br>

          {/* FOR EXISTING IMAGE */}
          {this.state.filestoPreview.map((img, index) => (
            <div key={index}>
              <img
                
                src={img}
                width="100px"
                alt="selected images"
                height="100px"
              />
              <Tippy content="Delete Product">
                <i
                  className="fa fa-trash  btn btn-danger"
                  onClick={() => this.removeExistingImage(img, index)}
                  style={{ marginLeft: "5px" }}
                ></i>
              </Tippy>
            </div>
          ))}
            {/*FOR NEW IMAGES */}
          {this.state.filestoUpload.map((img, index) => (
            <div key={index}>
              <img
                src={URL.createObjectURL(img)}
                width="100px"
                alt="selected images"
                height="100px"
              />
              <Tippy content="Delete Product">
                <i
                  className="fa fa-trash  btn btn-danger"
                  onClick={() => this.removeNewImage(img, index)}
                  style={{ marginLeft: "5px" }}
                ></i>
              </Tippy>
            </div>
          ))}
          <Button
            isSubmitting={this.props.isSubmitting}
            isDisabled={!this.state.isValid}
          />
        </form>
      </div>
    );
  }
}
