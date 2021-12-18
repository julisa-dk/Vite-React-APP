import React from "react";
import Filter from "./components/Filter";
import Products from "./components/Products";
// import data from "./data.json";
import Cart from "./components/Cart";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
/*   constructor() {
    super();
    this.state = {
    
      cartItems: localStorage.getItem("cartItems") //Check at cartItem is empty 
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [], 
      size: "",
      sort: "",
    };
  } */
  /* createOrder = (order) => {
    alert("Need to save order for " + order.name);
  }; */

  /* removeFromCart = (product) =>{
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id)
    });
    localStorage.setItem(
      "cartItems", 
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    );

  }; */
  
  /* addToCart =(product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if(item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if(!alreadyInCart) {
      cartItems.push({...product, count: 1 });
    }
    this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); //if we refresh page out items should be here. So we make persistent for items
  };
 */
  /* We don't need this sort anymore because we moved to action sortProduct
  sortProducts = (event) =>{
    //imp
    const sort = event.target.value;
    console.log(event.target.value); //user selected in the dropdown exectly
    this.setState((state) =>({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a,b) =>
        sort === "lowest"
        ? a.price > b.price
          ? 1
          :-1
        : sort === "highest"
        ? a.price < b.price
          ? 1
          :-1
        : a._id < b._id
        ? 1
        :-1
        ),
    }));
  };
 */
  /* We don't need this filter anymore because we moved to action ProductFilter
  
  filterProducts = (event) =>{
    //imp
    console.log(event.target.value);
    if(event.target.value === "") {
      this.setState({size: event.target.value, products:data.products});
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
    
  };
 */
  render(){

  return (
    //wrap all functions in Provider (component from react-redux libriary)
    <Provider store={store}>
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a> 
      </header>
      <main>
        <div className="content">
          <div className="main">

            {/* We don't need code for filter anymore, because all component comes from state here */}
            <Filter></Filter>
            
            <Products></Products>
          </div>
          <div className="sidebar">
            <Cart />
          </div>
        </div>
      </main>
      <footer>All right is reserved</footer>
   </div>
   </Provider>
  );
  }
}

export default App;
