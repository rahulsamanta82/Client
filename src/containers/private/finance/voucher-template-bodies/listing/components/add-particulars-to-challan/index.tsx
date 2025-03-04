import { FC, useEffect, useState } from "react";
import {
    AddParticularToChallanMain,
    Container,
    ContentWrapper,
} from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";
import MultiselectDropdown from "components/particles/forms/multiselect-dropdown";
import useComponentVisible from "hooks/click-outside";
import { VoucherParticularDTO } from "utils/helpers/models/finance/voucher-particular.dto";
import useFinance from "containers/private/finance/useHooks";
import { VoucherTemplateBodyDTO } from "utils/helpers/models/finance/voucher-template-body.dto";
import useUtils from "hooks/useUtils";
import { warningToaster } from "utils/helpers/common/alert-service";

interface AddParticularToChallanProps {
    setOpen: Function;
}

const AddParticularToChallan: FC<
    AddParticularToChallanProps
> = ({ setOpen }) => {
    const {
        isComponentVisible: showDropdown,
        setIsComponentVisible: setShowDropdown,
        ref: dropdownRef,
    } = useComponentVisible(false);
    const { getQueryParams } = useUtils();
    const { header_id } = getQueryParams() || {};
    const [formData, setFormData] = useState<VoucherTemplateBodyDTO>({...new VoucherTemplateBodyDTO(), header_id});
    const [particulars, setParticulars] = useState<VoucherParticularDTO[]>([]);
    const [searchedParticulars, setSearchedParticulars] = useState<VoucherParticularDTO[]>([]);
    const { getVoucherParticulars } = useFinance();
    const [search, setSearch] = useState<string>('');
    const {createVoucherTemplateBody } = useFinance();
    const onSelectparticulars = (particular: any) => {
        const { selected, id } = particular;
        const updatedBankIds = selected
            ? [...formData.particular_ids, id]
            : formData.particular_ids.filter((particularId) => particularId !== id);

        setFormData({ ...formData, particular_ids: updatedBankIds });
    }

    const handleSearchChange = (event: any) => {
        const { value } = event.target;
        setSearch(value);
        const filteredParticulars = particulars.filter((program) =>
            program.title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchedParticulars([...filteredParticulars]);
    };

    useEffect(() => {
        getVoucherParticulars(setParticulars);
    }, []);

    const onSubmit = () => {
        if(formData.particular_ids.length){
            createVoucherTemplateBody({...formData, particular_ids: formData.particular_ids.join(',')}, setOpen);
        }else{
            warningToaster('Please select atleast one voucher particular');
        }
    }

    return (
        <AddParticularToChallanMain>
            <Container>
                <ContentWrapper className="p-custom-scrollbar-8" expand={showDropdown}>
                    <div className="header">
                        <div className="empty"></div>
                        <div className="heading">
                            <span>Add Particulars to Challan</span>
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
                                        {formData.particular_ids.length ? (
                                            <div className="item">
                                                {formData.particular_ids.length} selected
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
                                    options={search === "" ? particulars : searchedParticulars}
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

export default AddParticularToChallan;
