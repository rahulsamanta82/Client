import { FC, useEffect, useState } from "react";
import {
    AddParticularToChallanMain,
    Container,
    ContentWrapper,
} from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";
import MultiselectDropdown from "components/particles/forms/multiselect-dropdown";
import useComponentVisible from "hooks/click-outside";

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
    const [data, setData] = useState<any[]>([
        { id: 1, title: "Information security" },
        { id: 1, title: "Information security" },
        { id: 1, title: "Information security" },
        { id: 1, title: "Information security" },
        { id: 1, title: "Information security" },
        { id: 1, title: "Information security" },
    ])

    const onSelectPrograms = () => {

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
                                                placeholder="Select Particular(s)"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {showDropdown && (
                                <MultiselectDropdown
                                    options={data}
                                    onSelect={onSelectPrograms}
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
                                    // onClick={onSubmit}
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
