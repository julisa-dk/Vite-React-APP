//Product list
import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
// import { connect } from 'mongoose';
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

class Products extends Component {
    //define constructor for Modal
    constructor(props){
        super(props);
        this.state = {
            product: null,   //not show the Modal
        };
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    openModal = (product) =>{
        this.setState({product});   //if the user click on the product, it should be define in the state
    };
    closeModal = () => {
        this.setState({product: null });
    };

    render() {
        const {product} = this.state;
        console.log(this.props.products);
        return (
            // Fade - all products come up from down to top (animation)
            <div>
                <Fade bottom cascade>
                    {
                    !this.props.products ? ( 
                        <div> Loading...</div>
                    ) : (
                        <ul className="products">
                          {this.props.products.map((product) => (
                        <li key={product._id}>
                            <div className="product">
                                <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                                    <img src={product.image} alt={product.title}></img>
                                    <p>
                                        {product.title}
                                    </p>
                                </a>
                                <div className="product-price">
                                {/* //check if there is a define price of each product in the products collection in the database.  */}
                                {/* If not - can modify the code to avid errors */}
                                    <div>
                                        {product.price ? (formatCurrency(product.price)) : (null)}
                                    </div>
                                    <button onClick={() => this.props.addToCart(product)} 
                                            className="button primary">
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                )}
                </Fade>
                {product && (
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                                <button className="close-modal" onClick={this.closeModal}>
                                    x
                                </button>
                                <div className="product-details">
                                    <img src={product.image} alt={product.title}></img>
                                    <div className="product-details-description">
                                        <p>
                                            <strong>{product.title}</strong>
                                        </p>
                                        <p>
                                            {product.description}
                                        </p>
                                        <p>
                                            Available Sizes: {" "}
                                            {product.availableSizes.map((x) => (
                                                <span> 
                                                    {" "} 
                                                    <button className="button">{x}</button>
                                                </span>
                                            ))
                                            }
                                        </p>
                                        <div className="product-price">
                                            <div>
                                                {formatCurrency(product.price)}
                                            </div>
                                            <button className="button primary" onClick={() =>{
                                                this.props.addToCart(product);
                                                this.closeModal();
                                            }}>
                                                Add To cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Zoom>

                        </Modal>
                    )
                }
            </div>
        );
    }
}
//first parameter is which part of state we gonna use (products). 
//second parameter is connect to action fetchProducts
//last one is component to connect (Products)
export default connect(
    (state)=>({ products: state.products.filteredItems }),   //items came from productReducers.js
    {  
    fetchProducts,
    addToCart,
    }
)(Products);