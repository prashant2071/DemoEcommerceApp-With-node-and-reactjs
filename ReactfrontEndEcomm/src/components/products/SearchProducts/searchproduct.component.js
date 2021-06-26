import React, { Component } from "react";
import { handleError } from "../../../utilities/error.handler";
import { httpClient } from "../../../utilities/httpClient/httpClient";
import Button from "../../common/submitButton/submitButton.component";
import { notify } from "../../../utilities/notify";
import { ViewProduct } from "../ViewProducts/viewproduct.component";

const defaultForm = {
  name: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  fromDate: "",
  toDate: "",
  brand: "",
  tags: "",
  multipleDateRange: "",
};
export class SearchProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        ...defaultForm,
      },
      error: {
        ...defaultForm,
      },
      categories: [],
      names: [],
      allProducts: [],
      isSubmitting: false,
      isValidForm: [],
      isLoading: false,
      searchResult: [],
    };
  }
  componentDidMount = () => {
    this.setState({
      isLoading: true,
    });
    let categories = [];
    httpClient
      .GET(`/product/search`, {})
      .then((response) => {
        (response.data || []).forEach((item, index) => {
          if (categories.indexOf(item.category) === -1) {
            categories.push(item.category);
          }
        });
        this.setState({
          categories,
          allProducts: response.data,
        });
        console.log("the categoty are", categories);
        console.log("all product data is ", this.state.allProducts);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { data } = this.state;
    if (!data.multipleDateRange) {
      data.toDate = data.fromDate;
    }
    httpClient
      .POST("/product/search", data)
      .then((response) => {
        console.log(response.data);
        if (!(response.data && response.data.length)) {
          notify.showInfo("no product Found!");
        }
        this.setState({
          searchResult: response.data,
        });
      })
      .catch((err) => {
        handleError(err);
      });
  };
  handleChange = (e) => {
    console.log("handlechange");
    let { name, value, type, checked } = e.target;
    if (name === "category") {
      console.log("hello");
      this.populateName(value);
    }
    if (type === "checkbox") {
      value = checked;
    }

    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [name]: value,
      },
    }));
  };
  populateName = (value) => {
    const names = this.state.allProducts.filter(
      (item) => item.category === value
    );
    this.setState({
      names: names,
    });
    console.log("the names value are ", names);
  };
  resetSearch = () => {
    this.setState({
      searchResult: [],
      data: {
        ...defaultForm,
      },
    });
  };

  render() {
    const {
      categories,
      isSubmitting,
      names,
      isLoading,
      data,
      searchResult,
    } = this.state;
    let content =
      searchResult && searchResult.length ? (
        <ViewProduct
          resetSearch={this.resetSearch}
          productData={searchResult}
        ></ViewProduct>
      ) : (
        <>
          <form className="form-group" onSubmit={this.handleSubmit}>
            <label>Category</label>
            <select
              className="form-control"
              name="category"
              onChange={this.handleChange}
            >
              <option value={this.state.data.category}>Select Catgories</option>

              {isLoading && <option>isLoading...</option>}

              {!isLoading &&
                categories.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
            </select>
            {data.category && (
              <>
                <label>Name</label>
                <select
                  className="form-control"
                  name="name"
                  onChange={this.handleChange}
                >
                  <option value={this.state.data.name}>Select Name</option>
                  {names.map((item, index) => (
                    <option key={item._id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </>
            )}

            <label>Brand</label>
            <input
              type="text"
              className="form-control"
              name="brand"
              placeholder="Brand"
              onChange={this.handleChange}
            />
            <label>color</label>
            <input
              type="text"
              className="form-control"
              name="color"
              placeholder="color"
              onChange={this.handleChange}
            />
            <label>Min Price</label>
            <input
              type="number"
              className="form-control"
              name="minPrice"
              placeholder="minimum price"
              onChange={this.handleChange}
            />
            <label>Max Price</label>
            <input
              type="number"
              className="form-control"
              name="maxPrice"
              placeholder="Number"
              onChange={this.handleChange}
            />
            <label>fromDate</label>
            <input
              type="date"
              className="form-control"
              name="fromDate"
              placeholder="yyyy/mm/dd"
              onChange={this.handleChange}
            />
            <input
              type="checkbox"
              name="multipleDateRange"
              onChange={this.handleChange}
            />

            <label>&nbsp; Multiple Date Range</label>
            {data.multipleDateRange && (
              <>
                <br></br>
                <label>To date</label>
                <input
                  type="date"
                  className="form-control"
                  name="toDate"
                  placeholder="yyyy/mm/dd"
                  onChange={this.handleChange}
                />
              </>
            )}
            <br></br>
            <label>Tags</label>
            <input
              type="text"
              className="form-control"
              name="tags"
              placeholder="tags"
              onChange={this.handleChange}
            />
            <br></br>
            <Button isSubmitting={isSubmitting}></Button>
          </form>
        </>
      );
    return content;
  }
}
