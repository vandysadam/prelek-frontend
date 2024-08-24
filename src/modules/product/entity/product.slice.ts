import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductPricingState, tmpProductPricing } from "./types";

const initialState: ProductPricingState = {
  productPricings: [],
  createdPricings: [],
  updatedPricings: [],
  deletedPricings: [],
  tmpProductPricings: [],
};

export const productPricingSlice = createSlice({
  name: "productPricingSlice",
  initialState,
  reducers: {
    /* used on on update product pricing */
    setProductPricings(state, action: PayloadAction<tmpProductPricing[] | []>) {
      state.productPricings = action.payload;
    },
    addProductPricing(state, action: PayloadAction<tmpProductPricing>) {
      state.productPricings.push(action.payload);
    },
    updateProductPricing(state, action: PayloadAction<tmpProductPricing>) {
      const index = state.productPricings.findIndex(
        (pricing) => pricing._id === action.payload._id
      );
      state.productPricings[index] = action.payload;
    },
    removeProductPricing(state, action: PayloadAction<tmpProductPricing>) {
      state.productPricings = state.productPricings.filter(
        (pricing) => pricing._id !== action.payload._id
      );
    },

    /* Temporary product pricing (used for add) */
    setTmpProductPricings(
      state,
      action: PayloadAction<tmpProductPricing[] | []>
    ) {
      state.tmpProductPricings = action.payload;
    },
    addTmpProductPricing(state, action: PayloadAction<tmpProductPricing>) {
      state.tmpProductPricings.push(action.payload);
    },
    updateTmpProductPricing(state, action: PayloadAction<tmpProductPricing>) {
      const index = state.tmpProductPricings.findIndex(
        (product) => product._id === action.payload._id
      );
      state.tmpProductPricings[index] = action.payload;
    },
    removeTmpProductPricing(state, action: PayloadAction<tmpProductPricing>) {
      state.tmpProductPricings = state.tmpProductPricings.filter(
        (pricing) => pricing._id !== action.payload._id
      );
    },

    /* to clear all created updated and deleted when first time the view is loaded */
    clearPricingList(state) {
      state.createdPricings = [];
      state.updatedPricings = [];
      state.deletedPricings = [];
    },
    /* product pricing that marked as new */
    addToCreatedPricingList(state, action: PayloadAction<tmpProductPricing>) {
      state.createdPricings.push(action.payload);
    },
    /* product pricing that marked as updated */
    addToUpdatedPricingList(state, action: PayloadAction<tmpProductPricing>) {
      state.updatedPricings.push(action.payload);
    },
    /* product pricing that marked as deleted */
    addToDeletedPricingList(state, action: PayloadAction<tmpProductPricing>) {
      state.deletedPricings.push(action.payload);
    },
  },
});

export const productPricingReducer = productPricingSlice.reducer;
