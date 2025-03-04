import { FC, useEffect, useState } from "react";
import { CreateVoucherTypeForm, CreateVoucherTypeMain, CreateVoucherTypeTop } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import { VoucherTypeDTO } from "utils/helpers/models/finance/voucher-type.dto";
import useUtils from "hooks/useUtils";
import useFinance from "../../useHooks";
import FormErrorMessage from "components/particles/forms/form-error-message";

interface CreateVoucherTypeProps { }

const CreateVoucherType: FC<CreateVoucherTypeProps> = ({ }) => {
    const { handleSubmit, register, setValue, trigger, formState: {errors}} = useForm<VoucherTypeDTO>();
    let [formData, setFormData] = useState<VoucherTypeDTO>(new VoucherTypeDTO());
    const { createVoucherType, updateVoucherType, getVoucherTypeById } = useFinance();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const onSubmit = () => {
        if(params?.id){
            updateVoucherType(params?.id, formData);
        }else{
            createVoucherType(formData);
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name,value);
        trigger(name);
        setFormData({...formData, [name]: value});
    }

    const resetForm = () => {
        formData = new VoucherTypeDTO();
        for(let key in formData){
            setValue(key as keyof VoucherTypeDTO, formData[key as keyof VoucherTypeDTO]);
        }

        setFormData({...formData});
    }

    useEffect(() => {
        if(params?.id) getVoucherTypeById(params?.id, formData, setValue, setFormData);
    }, []);
    
    return (
        <CreateVoucherTypeMain>
            <CreateVoucherTypeTop>
                <div className="heading">
                    <span className="page-heading">Add Voucher Type</span>
                    {!params?.id ? <Breadcrumb /> : ''}
                </div>
            </CreateVoucherTypeTop>
            <CreateVoucherTypeForm className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="common-fields">
                    <div className="input-field">
                        <label htmlFor="application">Voucher Type Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Enter title" {...register('title', {required: true})} value={formData.title} onChange={handleChange}/>
                            </div>
                            <FormErrorMessage error={errors.title}/>
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fine-slot-title">Account Code</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Enter code" {...register('acc_code', {required: true})} value={formData.acc_code} onChange={handleChange}/>
                            </div>
                            <FormErrorMessage error={errors.acc_code}/>
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
                            Submit
                        </button>
                    </div>
                </div>
            </CreateVoucherTypeForm>
        </CreateVoucherTypeMain>
    )
}

export default CreateVoucherType;