import { FC, useEffect, useState } from "react";
import { CreateBankForm, CreateBankMain, CreateBankTop } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import { BankInfoDTO } from "utils/helpers/models/finance/bank-info.dto";
import useFinance from "../../useHooks";
import useUtils from "hooks/useUtils";
import FormErrorMessage from "components/particles/forms/form-error-message";

interface CreateBankProps { }

const CreateBank: FC<CreateBankProps> = ({ }) => {
    const { handleSubmit, register, setValue, trigger, formState: {errors}} = useForm<BankInfoDTO>();
    let [formData, setFormData] = useState<BankInfoDTO>(new BankInfoDTO());
    const { createBankInfo, updateBankInfo, getBankInfoById } = useFinance();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const onSubmit = () => {
        if(params?.id){
            updateBankInfo(params?.id, formData);
        }else{
            createBankInfo(formData);
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name,value);
        trigger(name);
        setFormData({...formData, [name]: value});
    }

    const resetForm = () => {
        formData = new BankInfoDTO();
        for(let key in formData){
            setValue(key as keyof BankInfoDTO, formData[key as keyof BankInfoDTO]);
        }

        setFormData({...formData});
    }

    useEffect(() => {
        if(params?.id) getBankInfoById(params?.id, formData, setValue, setFormData);
    }, []);

    return (
        <CreateBankMain>
            <CreateBankTop>
                <div className="heading">
                    <span className="page-heading">{params?.id ? 'Update' : 'Add'} Bank info</span>
                    {!params?.id ? <Breadcrumb /> : ''}
                </div>
            </CreateBankTop>
            <CreateBankForm className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="common-fields">
                    <div className="input-field">
                        <label htmlFor="application">Bank Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Title" {...register('bank', {required: true})} value={formData.bank} onChange={handleChange}/>
                            </div>
                            <FormErrorMessage error={errors.bank}/>
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fine-slot-title">Account Number</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Account Number" {...register('account_no', {required: true})} value={formData.account_no} onChange={handleChange}/>
                            </div>
                            <FormErrorMessage error={errors.account_no}/>
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fine-slot-title">Account Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Account Title" {...register('account_title', {required: true})} value={formData.account_title} onChange={handleChange}/>
                            </div>
                            <FormErrorMessage error={errors.account_title}/>
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fine-slot-title">FTN</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="FTN NO." {...register('ftn', {required: true})} value={formData.ftn} onChange={handleChange}/>
                            </div>
                            <FormErrorMessage error={errors.ftn}/>
                        </div>
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
                            {params?.id ? 'Update' : 'Submit'}
                        </button>
                    </div>
                </div>
            </CreateBankForm>
        </CreateBankMain>
    )
}

export default CreateBank;