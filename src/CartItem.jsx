import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import Modal from "./Modal";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };
  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => {
        return total + parseFloat(item.cost.replace("$", "")) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace("$", ""));
    return (cost * item.quantity).toFixed(2);
  };
  return (
    <div className="cart-container">
      <h2 className="cart-header">Shopping Cart</h2>
      <div className="cart-summary">
        <div className="cart-count">
          Total Items: {cart.reduce((total, item) => total + item.quantity, 0)}
        </div>
        <div className="cart-total">
          Total Amount: ${calculateTotalAmount()}
        </div>
      </div>
      <div className="cart-items-container">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button
              className="get-started-button"
              onClick={(e) => handleContinueShopping(e)}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img
                className="cart-item-image"
                src={item.image}
                alt={item.name}
              />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">
                    {item.quantity}
                  </span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  Subtotal: ${calculateTotalCost(item)}
                </div>
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="checkout-section">
          <div className="continue_shopping_btn">
            <button
              className="get-started-button"
              onClick={(e) => handleContinueShopping(e)}
            >
              Continue Shopping
            </button>
            <button className="get-started-button1" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}

      <Modal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        title="Checkout"
      >
        <div className="checkout-message">
          <h3>🚧 Coming Soon! 🚧</h3>
          <p>
            We're working hard to bring you a seamless checkout experience. Our
            payment system will be available soon!
          </p>
          <p>
            In the meantime, feel free to continue browsing our beautiful
            collection of plants.
          </p>
          <div className="modal-buttons">
            <button
              className="modal-button secondary"
              onClick={() => setShowCheckoutModal(false)}
            >
              Close
            </button>
            <button
              className="modal-button primary"
              onClick={() => {
                setShowCheckoutModal(false);
                onContinueShopping();
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CartItem;
