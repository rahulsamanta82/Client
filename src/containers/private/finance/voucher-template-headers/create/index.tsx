import { FC, useEffect, useState } from "react";
import { CreateVoucherTemplateHeaderForm, CreateVoucherTemplateHeaderMain, CreateVoucherTemplateHeaderTop } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { VoucherTemplateHeaderDTO } from "utils/helpers/models/finance/voucher-template-header.dto";
import { useForm } from "react-hook-form";
import useFinance from "../../useHooks";
import useUtils from "hooks/useUtils";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { VoucherTypeDTO } from "utils/helpers/models/finance/voucher-type.dto";
import { BankInfoDTO } from "utils/helpers/models/finance/bank-info.dto";
import MultiselectDropdown from "components/particles/forms/multiselect-dropdown";
import useComponentVisible from "hooks/click-outside";
import { warningToaster } from "utils/helpers/common/alert-service";

interface CreateVoucherTemplateHeaderProps { }

const CreateVoucherTemplateHeader: FC<CreateVoucherTemplateHeaderProps> = ({ }) => {
    const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<VoucherTemplateHeaderDTO>();
    let [formData, setFormData] = useState<VoucherTemplateHeaderDTO>(new VoucherTemplateHeaderDTO());
    const [voucherTypes, setVoucherTypes] = useState<VoucherTypeDTO[]>([]);
    const [banks, setBanks] = useState<BankInfoDTO[]>([]);
    const [searchedBanks, setSearchedBanks] = useState<BankInfoDTO[]>([]);
    const [search, setSearch] = useState<string>('');
    const { createVoucherTemplateHeader, updateVoucherTemplateHeader, getVoucherTemplateHeaderById, getVoucherTypes, getBankInfos } = useFinance();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const {
        isComponentVisible: showBanksDropdown,
        setIsComponentVisible: setShowBanksDropdown,
        ref: banksDropdownRef,
    } = useComponentVisible();

    const onSubmit = () => {
        if (formData.bank_ids.length) {
            if (params?.id) {
                updateVoucherTemplateHeader(params?.id, { ...formData, bank_ids: formData.bank_ids.join(',') });
            } else {
                createVoucherTemplateHeader({ ...formData, bank_ids: formData.bank_ids.join(',') });
            }
        } else {
            warningToaster('Please select atleast one bank');
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger(name);
        setFormData({ ...formData, [name]: value });
    }

    const resetForm = () => {
        formData = new VoucherTemplateHeaderDTO();
        for (let key in formData) {
            setValue(key as keyof VoucherTemplateHeaderDTO, formData[key as keyof VoucherTemplateHeaderDTO]);
        }

        setFormData({ ...formData });
    }

    const onSelectPrograms = (bank: any) => {
        const { selected, id } = bank;
        const updatedBankIds = selected
            ? [...formData.bank_ids, id]
            : formData.bank_ids.filter((bankId) => bankId !== id);

        setFormData({ ...formData, bank_ids: updatedBankIds });
    }


    const handleSearchChange = (event: any) => {
        const { value } = event.target;
        setSearch(value);
        const banksHelper = banks.filter((bank) =>
            bank.account_title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchedBanks([...banksHelper]);
    };

    useEffect(() => {
        if (params?.id) {
            getVoucherTemplateHeaderById(params?.id, formData, setValue, setFormData);
        }
        getVoucherTypes(setVoucherTypes);
        getBankInfos(setBanks);
    }, []);

    return (
        <CreateVoucherTemplateHeaderMain>
            <CreateVoucherTemplateHeaderTop>
                <div className="heading">
                    <span className="page-heading">Add Voucher Template Header</span>
                    <Breadcrumb />
                </div>
            </CreateVoucherTemplateHeaderTop>
            <CreateVoucherTemplateHeaderForm className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="common-fields">
                    <div className="input-field">
                        <label htmlFor="application">Template Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Title" {...register('title', { required: true })} value={formData.title} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors.title} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fine-slot-title">Voucher Type</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select {...register('voucher_type_id', { required: true })} value={formData.voucher_type_id} onChange={handleChange}>
                                    <option value="">Select Voucher Type</option>
                                    {voucherTypes.map((voucherType, index) => {
                                        return <option value={voucherType.id} key={index}>{voucherType.title}</option>
                                    })}
                                </select>
                            </div>
                            <FormErrorMessage error={errors.voucher_type_id} />
                        </div>
                    </div>
                    {/* <div className="input-field">
                        <label htmlFor="fine-slot-title">Bank</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select {...register('bank_ids', {required: true})} value={formData.bank_ids} onChange={handleChange}>
                                    <option value="">Select Bank</option>
                                    {banks.map((bank,index) => {
                                        return <option value={bank.id} key={index}>{bank.bank}</option>
                                    })}
                                </select>
                            </div>
                            <FormErrorMessage error={errors.bank_ids}/>
                        </div>
                    </div> */}

                    <div className="multiselect-field" ref={banksDropdownRef}>
                        <div className="input-field" onClick={() => setShowBanksDropdown(true)}>
                            <label>Banks</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <div className="selected-items">
                                        <input
                                            type="search"
                                            placeholder="Select Banks"
                                            value={search}
                                            onChange={handleSearchChange}
                                        />
                                        {formData.bank_ids.length ? (
                                            <div className="item">
                                                {formData.bank_ids.length} selected
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {showBanksDropdown && (
                            <MultiselectDropdown
                                options={search === "" ? banks : searchedBanks}
                                onSelect={onSelectPrograms}
                                value={formData.bank_ids}
                                property="bank"
                            />
                        )}
                    </div>
                </div>
                <div className="action-buttons">
                    <div className="buttons">
                        <button
                            className="lg-rounded-btn gray"
                            type="button"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>
                        <button className="lg-rounded-btn">
                            Submit
                        </button>
                    </div>
                </div>
            </CreateVoucherTemplateHeaderForm>
        </CreateVoucherTemplateHeaderMain>
    )
}

export default CreateVoucherTemplateHeader;