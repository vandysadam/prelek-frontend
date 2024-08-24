import React from "react";

import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { ModalType } from "../../../components/modal/ModalBase";
import { productPricingSlice } from "../../../modules/product/entity/product.slice";
import { tmpProductPricing } from "../../../modules/product/entity/types";
import { useTypedDispatch } from "../../../store";
import PricingTable from "./PricingTable";
import SubscriptionModalForm from "./SubscriptionModalForm";

interface SubscriptionPlanPageProps {
  pricings?: tmpProductPricing[] | [];
  editMode: boolean;
}

const SubscriptionPlanPage: React.FC<any> = ({
  pricings,
  editMode,
}: SubscriptionPlanPageProps) => {
  const dispatch = useTypedDispatch();

  const [modalState, setModalState] = React.useState(false);
  const [viewOnly, setViewOnly] = React.useState(false);

  const [selectedPricing, setSelectedPricing] =
    React.useState<tmpProductPricing | null>(null);

  const [modalType, setModalType] = React.useState<ModalType>(ModalType.INFO);

  return (
    <section className="bg-white shadow-lg rounded-sm border border-gray-200 relative mt-2">
      {/* navigation */}
      <header className="px-5 pt-4 pb-5 flex flex-row justify-between">
        <h2 className="font-semibold text-gray-800 ml-3 mt-1">
          Product Pricings
        </h2>
        <div className="flex flex-row justify-between">
          <Button
            color={"primary"}
            onClick={(e) => {
              e.preventDefault();
              setSelectedPricing(null);
              setModalState(true);
            }}
          >
            <FaPlus />
          </Button>
        </div>
      </header>

      <PricingTable
        pricingList={pricings}
        onEditPricing={(data: tmpProductPricing) => {
          setSelectedPricing(data);
          setModalType(ModalType.INFO);
          setViewOnly(false);
          setModalState(true);
        }}
        onViewPricing={(data: tmpProductPricing) => {
          setSelectedPricing(data);
          setModalType(ModalType.INFO);
          setViewOnly(true);
          setModalState(true);
        }}
        onDeletePricing={(data: tmpProductPricing) => {
          setViewOnly(false);
          /* on create */
          if (!editMode) {
            dispatch(productPricingSlice.actions.removeTmpProductPricing(data));
          }
          /* on edit */
          if (editMode) {
            dispatch(productPricingSlice.actions.removeProductPricing(data));
            dispatch(productPricingSlice.actions.addToDeletedPricingList(data));
          }
        }}
      />

      <SubscriptionModalForm
        modalState={modalState}
        modalType={modalType}
        pricing={selectedPricing ? selectedPricing : null}
        viewOnly={viewOnly}
        onSetModalState={setModalState}
        onAddPricing={(data: tmpProductPricing) => {
          /* on create */
          if (!editMode) {
            if (!data._id) data._id = Math.random().toString(36).substr(2, 9);
            data.flags = "new";
            dispatch(productPricingSlice.actions.addTmpProductPricing(data));
          }
          /* on edit */
          if (editMode) {
            dispatch(productPricingSlice.actions.addProductPricing(data));
            dispatch(productPricingSlice.actions.addToCreatedPricingList(data));
          }
          setModalState(false);
        }}
        onEditPricing={(data: tmpProductPricing) => {
          /* on create */
          if (!editMode) {
            dispatch(productPricingSlice.actions.updateTmpProductPricing(data));
          }
          /* on edit */
          if (editMode) {
            dispatch(productPricingSlice.actions.updateProductPricing(data));
            dispatch(productPricingSlice.actions.addToUpdatedPricingList(data));
          }
          setModalState(false);
        }}
      />
    </section>
  );
};

export default SubscriptionPlanPage;
