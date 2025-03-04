import { FC, useEffect, useState } from "react";
import { CreateFinanceApplicationForm, CreateFinanceApplicationMain, CreateFinanceApplicationTop } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import MultiselectDropdown from "components/particles/forms/multiselect-dropdown";
import { FinanceApplicationDTO } from "utils/helpers/models/finance/application.dto";
import { BankInfoDTO } from "utils/helpers/models/finance/bank-info.dto";
import useComponentVisible from "hooks/click-outside";
import useFinance from "../../useHooks";
import useUtils from "hooks/useUtils";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { warningToaster } from "utils/helpers/common/alert-service";

interface CreateFinanceApplicationProps { }

const CreateFinanceApplication: FC<CreateFinanceApplicationProps> = ({ }) => {
    let [formData, setFormData] = useState<FinanceApplicationDTO>(new FinanceApplicationDTO());
    const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<FinanceApplicationDTO>();
    const [banks, setBanks] = useState<BankInfoDTO[]>([]);
    const [searchedBanks, setSearchedBanks] = useState<BankInfoDTO[]>([]);
    const { getBankInfos } = useFinance();
    const { createFinanceApplication, updateFinanceApplication, getFinanceApplicationById } = useFinance();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();
    const [search, setSearch] = useState<string>('');
    const {
        isComponentVisible: showBanksDropdown,
        setIsComponentVisible: setShowBanksDropdown,
        ref: banksDropdownRef,
    } = useComponentVisible();


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
        getBankInfos(setBanks);
    }, []);

    const onSubmit = () => {
        if (!formData.bank_ids.length) {
            warningToaster('Please select atleast one bank');
        } else {
            if (params?.id) {
                updateFinanceApplication(params?.id, { ...formData, bank_ids: formData.bank_ids.join(',') });
            } else {
                createFinanceApplication({ ...formData, bank_ids: formData.bank_ids.join(',') });
            }
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger(name);
        setFormData({ ...formData, [name]: value });
    }

    const resetForm = () => {
        formData = new FinanceApplicationDTO();
        for (let key in formData) {
            setValue(key as keyof FinanceApplicationDTO, formData[key as keyof FinanceApplicationDTO]);
        }

        setFormData({ ...formData });
    }

    useEffect(() => {
        if (params?.id) getFinanceApplicationById(params?.id, formData, setValue, setFormData);
    }, []);

    return (
        <CreateFinanceApplicationMain>
            <CreateFinanceApplicationTop>
                <div className="heading">
                    <span className="page-heading">{params?.id ? 'Update' : 'Create'} Application</span>
                    {!params?.id ? <Breadcrumb /> : ''}
                </div>
            </CreateFinanceApplicationTop>
            <CreateFinanceApplicationForm className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="common-fields">
                    <div className="input-field">
                        <label htmlFor="application">Add Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Title" {...register('title', { required: true })} value={formData.title} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors.title} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="application">Add Challan Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Challan Title" {...register('challan_title', { required: true })} value={formData.challan_title} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors.challan_title} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fine-slot-title">API Code</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Code" {...register('code', { required: true })} value={formData.code} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors.code} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fine-slot-title">API Token</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="API token" {...register('token', { required: true })} value={formData.token} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors.token} />
                        </div>
                    </div>

                    <div className="multiselect-field" ref={banksDropdownRef}>
                        <div className="input-field" onClick={() => setShowBanksDropdown(true)}>
                            <label>Allowed Online Banks</label>
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
            </CreateFinanceApplicationForm>
        </CreateFinanceApplicationMain>
    )
}

export default CreateFinanceApplication;