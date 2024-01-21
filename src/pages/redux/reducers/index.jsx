const initState = {
    cartArr: [],
};
const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'cart/addCart':
            // eslint-disable-next-line no-case-declarations
            const productInCart = state.cartArr.find(
                (p) => p.id === action.payload.id
            );
            if (!productInCart) {
                return {
                    ...state,
                    cartArr: [
                        ...state.cartArr, action.payload
                    ]
                }
            } else {
                let newCart = state.cartArr;
                const objIdex = newCart.findIndex(
                    (obj) => obj.id === action.payload.id
                );
                if (newCart[objIdex].quantity === 1) {
                    newCart[objIdex].quantity = 2;
                } else {
                    newCart[objIdex].quantity = newCart[objIdex].quantity + 1;
                }
                return { cartArr: [...newCart] };
            }
        case 'cart/deleteCart':
            // eslint-disable-next-line no-case-declarations
            let newCart = state.cartArr;
            // eslint-disable-next-line no-case-declarations
            const objIdex = newCart.findIndex(
                (obj) => obj.id === action.payload.id
            );
            newCart.splice(objIdex, 1)
            return { cartArr: [...newCart] };
        case 'cart/increaseQty':
            // eslint-disable-next-line no-case-declarations
            const newCart1 = [...state.cartArr];
            // eslint-disable-next-line no-case-declarations
            const objIndex1 = newCart1.findIndex(
                (obj) => obj.id === action.payload.id
            );
            console.log(newCart1);
            if (objIndex1 >= 0) {
                newCart1[objIndex1] = {
                    ...newCart1[objIndex1],
                    quantity: newCart1[objIndex1].quantity + 1
                };
            }
            return { cartArr: newCart1 };
        case 'cart/decreaseQty':
            // eslint-disable-next-line no-case-declarations
            const newCart2 = [...state.cartArr];
            // eslint-disable-next-line no-case-declarations
            const objIndex2 = newCart2.findIndex(
                (obj) => obj.id === action.payload.id
            );
            if (objIndex2 >= 0) {
                newCart2[objIndex2] = {
                    ...newCart2[objIndex2],
                    quantity: newCart2[objIndex2].quantity - 1
                };
            }
            if (newCart2[objIndex2].quantity <= 0) {
                newCart2[objIndex2] = {
                    ...newCart2[objIndex2],
                    quantity: 1
                };
            }
            return { cartArr: newCart2 };
        default:
            return state;
    }
}

export default rootReducer;