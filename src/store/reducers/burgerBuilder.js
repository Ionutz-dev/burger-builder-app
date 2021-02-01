import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENTS_PRICE = {
  salad: 0.3,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

let updatedIngredient, updatedIngredients, updatedState;

const addIngredient = (state, action) => {
  updatedIngredient = {
    [action.ing]: state.ingredients[action.ing] + 1,
  };
  updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ing],
    building: true,
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  updatedIngredient = {
    [action.ing]: state.ingredients[action.ing] - 1,
  };
  updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ing],
    building: true,
  };
  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
  const ingredientsState = {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    error: false,
    totalPrice: 4,
    building: false,
  };
  return updateObject(state, ingredientsState);
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
