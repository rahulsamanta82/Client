import { FC, useEffect, useState } from "react";
import { AddParticularToChallanMain, Container, ContentWrapper } from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";
import MultiselectDropdown from "components/particles/forms/multiselect-dropdown";
import useComponentVisible from "hooks/click-outside";
import { VoucherParticularDTO } from "utils/helpers/models/finance/voucher-particular.dto";
import { AccSlotInstallmentParticular } from "utils/helpers/models/finance/acc-slot-installment-particular.dto";
import useFinance from "containers/private/finance/useHooks";
import { warningToaster } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";

interface AddParticularToChallanProps {
  setOpen: Function;
}

const AddParticularToSlot: FC<AddParticularToChallanProps> = ({ setOpen }) => {
  const {
    isComponentVisible: showDropdown,
    setIsComponentVisible: setShowDropdown,
    ref: dropdownRef,
  } = useComponentVisible(false);
  const { getQueryParams } = useUtils();
  const { slot_id } = getQueryParams();
  const [voucherParticulars, setVoucherParticulars] = useState<VoucherParticularDTO[]>([]);
  const [voucherSearchedParticulars, setSearchedVoucherParticulars] = useState<VoucherParticularDTO[]>([]);
  const [formData, setFormData] = useState<AccSlotInstallmentParticular>({ ...new AccSlotInstallmentParticular(), slot_id });
  const { createAccSlotInstallmentParticular, getVoucherParticulars } = useFinance();
  const [search, setSearch] = useState<string>('');

  const onSelectparticulars = (particular: any) => {
    const { selected, id } = particular;
    const updatedBankIds = selected
      ? [...formData.particular_id, id]
      : formData.particular_id.filter((particularId) => particularId !== id);

    setFormData({ ...formData, particular_id: updatedBankIds });
  }

  const onSubmit = () => {
    if (!formData.particular_id) {
      warningToaster('Select atleast one voucher particular');
    } else {
      createAccSlotInstallmentParticular({ ...formData, particular_id: formData.particular_id.join(',') }, setOpen)
    }
  }

  const handleSearchChange = (event: any) => {
    const { value } = event.target;
    setSearch(value);
    const filteredParticulars = voucherParticulars.filter((particular) =>
      particular.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchedVoucherParticulars([...filteredParticulars]);
  };

  useEffect(() => {
    getVoucherParticulars(setVoucherParticulars);
  }, []);


  return (
    <AddParticularToChallanMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8" expand={showDropdown}>
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span> Add Particulars to Installment slots</span>
            </div>
            <div className="close-icon cp" onClick={() => setOpen(false)}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form>
            <div className="multiselect-field" ref={dropdownRef}>
              <div
                className="input-field"
                onClick={() => setShowDropdown(true)}
              >
                <label>Voucher Particulars</label>
                <div className="field-wrap">
                  <div className="field">
                    <div className="selected-items">
                      <input
                        type="search"
                        placeholder="Select Particulars"
                        value={search}
                        onChange={handleSearchChange}
                      />
                      {formData.particular_id.length ? (
                        <div className="item">
                          {formData.particular_id.length} selected
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {showDropdown && (
                <MultiselectDropdown
                  options={search === "" ? voucherParticulars : voucherSearchedParticulars}
                  onSelect={onSelectparticulars}
                  value={[]}
                />
              )}
            </div>
            {!showDropdown && (
              <div className="action-buttons">
                <div className="buttons">
                  <button
                    className="lg-rounded-btn gray"
                    type="reset"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>

                  <button
                    className="lg-rounded-btn"
                    type="button"
                    onClick={onSubmit}
                  >
                    Save & Close
                  </button>
                </div>
              </div>
            )}
          </form>
        </ContentWrapper>
      </Container>
    </AddParticularToChallanMain>
  );
};

export default AddParticularToSlot;
