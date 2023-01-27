import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart, removeItem, incrementItem, decrementItem } from '../store/slices/cartSlice';


const Cart = () => {

    const { isCartOpen, cartItems } = useSelector((state) => state.cart);


    const dispatch = useDispatch();


    const handleCloseCart = (close) => {
        dispatch(toggleCart(close));
    };


    const handleRemove = (itemId) => {
        dispatch(removeItem(itemId));
    };


    const handleIncrement = (itemId) => {
        dispatch(incrementItem(itemId));
    };

    const handleDecrement = (itemId) => {
        dispatch(decrementItem(itemId));
    };



    useEffect(() => {
        const docBody = document.body;

        isCartOpen ? (
            docBody.classList.add('overflow_hide')
        ) : (
            docBody.classList.remove('overflow_hide')
        );

    }, [isCartOpen]);



    const cartQuantity = cartItems.length;

    const cartTotal = cartItems.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);


    return (
        <>
            {
                isCartOpen && (
                    <div id="cart">
                        <div className="cart_content">
                            <div className="cart_head">
                                <h2>Cart <small>({cartQuantity})</small></h2>
                                <div
                                    title="Close"
                                    className="close_btn"
                                    onClick={() => handleCloseCart(false)}
                                >
                                    <span>&times;</span>
                                </div>
                            </div>

                            <div className="cart_body">
                                {
                                    cartQuantity === 0 ? (
                                        <h2>Cart is empty</h2>
                                    ) : (
                                        cartItems.map(item => {
                                            const { id, img, title, price, quantity } = item;
                                            const itemTotal = price * quantity;

                                            return (
                                                <div className="cart_items" key={id}>
                                                    <figure className="cart_items_img">
                                                        <img src={img} alt="product-img" />
                                                    </figure>

                                                    <div className="cart_items_info">
                                                        <h4>{title}</h4>
                                                        <h3 className="price">${itemTotal.toLocaleString()}</h3>
                                                    </div>

                                                    <div className="cart_items_quantity">
                                                        <span onClick={() => handleDecrement(id)}>&#8722;</span>
                                                        <b>{quantity}</b>
                                                        <span onClick={() => handleIncrement(id)}>&#43;</span>
                                                    </div>



                                                    <div
                                                        title="Remove Item"
                                                        className="cart_items_delete"
                                                        onClick={() => handleRemove(id)}
                                                    >

                                                        <span>&times;</span>
                                                    </div>
                                                </div>



                                            );
                                        })
                                    )
                                }
                            </div>
                            <div className="flex flex-col justify-center items-end p-5 space-y-5 mt-14" align="right">

                                <div className="cart_items_line">
                                    <h2 className="font-semibold text-lg text-blue-800">
                                        <b>The total amount of</b>
                                    </h2>
                                </div>
                                
                                <div className="cart_items_info">
                                    <h3>
                                        {" "}
                                        <span className="text-gray-700 font-semibold" >
                                            Temporary Amount
                                        </span>{" "}
                                        : ${cartTotal.toLocaleString()}
                                    </h3>

                                </div>
                                <div className="cart_items_info">
                                    <h3>
                                        {" "}
                                        <span className="text-gray-700 font-semibold">
                                            Shipping
                                        </span>{" "}
                                        : Gratis
                                    </h3>
                                </div>
                                <div className="cart_items_info">
                                    <h3>
                                        {" "}
                                        <span className="text-gray-700 font-semibold">
                                            The total amount of
                                        </span>{" "}
                                        : ${cartTotal.toLocaleString()}
                                    </h3>
                                    </div>
                                    <div className="cart_btn">
                                    <button className="checkout_btn" >
                                        GO TO CHECKOUT
                                    </button>
                                        </div>

                            </div>
                            {/* <div className="flex flex-col justify-center items-end p-5 space-y-5 mt-14" align="right">
                                <h1 className="font-semibold text-lg text-blue-800" align="right">
                                    The total amount of
                                </h1>

                                <p>
                                    {" "}
                                    <span className="text-gray-700 font-semibold" >
                                        Temporary Amount
                                    </span>{" "}
                                    : ${cartTotal.toLocaleString()}
                                </p>
                                <p>
                                    {" "}
                                    <span className="text-gray-700 font-semibold">
                                        Shipping
                                    </span>{" "}
                                    : Gratis
                                </p>
                                <p>
                                    {" "}
                                    <span className="text-gray-700 font-semibold">
                                        The total amount of
                                    </span>{" "}
                                    : ${cartTotal.toLocaleString()}
                                </p>
                                <button className="bg-blue-700 hover:bg-blue-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-blue-600 font-bold hover:text-blue-700 p-3">
                                    GO TO CHECKOUT
                                </button>
                            </div> */}

                            {/* <div className="cart_foot">
                                <h3>
                                    <small>Total:</small>
                                    <b>${cartTotal.toLocaleString()}</b>
                                </h3>

                                <button
                                    type="button"
                                    className="checkout_btn"
                                    disabled={cartQuantity === 0}
                                >
                                    Checkout
                                </button>
                            </div> */}
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Cart;