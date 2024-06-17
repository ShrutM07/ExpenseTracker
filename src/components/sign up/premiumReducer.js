import { ACTIVATE_PREMIUM } from "./actions";

const initialState = {
    isPremiumActivated: false,
};

const premiumReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIVATE_PREMIUM:
            return {
                ...state,
                isPremiumActivated: true,
            };
        default:
            return state;
    }
};

export default premiumReducer;
