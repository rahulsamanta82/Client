import { FC, useEffect, useState } from "react";
import { CreateFineSlotForm, CreateFineSlotMain, CreateFineSlotTop } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { FineSlotDTO } from "utils/helpers/models/finance/fine-slot.dto";
import useUtils from "hooks/useUtils";
import useFinance from "../../useHooks";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { FinanceApplicationDTO } from "utils/helpers/models/finance/application.dto";
import { warningToaster } from "utils/helpers/common/alert-service";

interface CreateFineSlotProps { }

const CreateFineSlot: FC<CreateFineSlotProps> = ({ }) => {
    const { handleSubmit, register, setValue, trigger, formState: {errors}} = useForm<FineSlotDTO>();
    let [formData, setFormData] = useState<FineSlotDTO>(new FineSlotDTO());
    const [applications, setApplications] = useState<FinanceApplicationDTO[]>([]);
    const { createFineSlot, updateFineSlot, getFineSlotById, getFinanceApplications } = useFinance();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const onSubmit = () => {
        if(parseInt(formData.year) > 99){
            warningToaster('Please write last 2 digits of the year');
        }else{
            if(params?.id){
                updateFineSlot(params?.id, formData);
            }else{
                createFineSlot(formData);
            }
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name,value);
        trigger(name);
        setFormData({...formData, [name]: value});
    }

    const resetForm = () => {
        formData = new FineSlotDTO();
        for(let key in formData){
            setValue(key as keyof FineSlotDTO, formData[key as keyof FineSlotDTO]);
        }

        setFormData({...formData});
    }

    useEffect(() => {
        if(params?.id){
            getFineSlotById(params?.id, formData, setValue, setFormData);
        }
        getFinanceApplications(setApplications);
    }, []);
    return (
        <CreateFineSlotMain>
            <CreateFineSlotTop>
                <div className="heading">
                    <span className="page-heading">{params?.id ? 'Update' : 'Add'} Fine Slot</span>
                    <Breadcrumb />
                </div>
            </CreateFineSlotTop>
            <CreateFineSlotForm className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="common-fields">
                    <div className="input-field">
                        <label htmlFor="application">Application</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select {...register('application_id', {required: true})} value={formData.application_id} onChange={handleChange}>
                                    <option value="">Select Application</option>
                                    {applications.map((application, index) => {
                                        return <option value={application.id}>{application.title}</option>
                                    })}
                                </select>
                                <FormErrorMessage error={errors.application_id}/>
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fine-slot-title">Fine Slot Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Fine Slot Title" {...register('title', {required: true})} value={formData.title} onChange={handleChange}/>
                            </div>
                            <FormErrorMessage error={errors.title}/>
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fine-slot-title">From date</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="date" {...register('start_date', {required: true})} value={formData.start_date} onChange={handleChange}/>
                            </div>
                            <FormErrorMessage error={errors.start_date}/>
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fine-slot-title">To date</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="date" {...register('end_date', {required: true})} value={formData.end_date} onChange={handleChange}/>
                            </div>
                            <FormErrorMessage error={errors.end_date}/>
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fine-slot-title">Late Fee Fine</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="number" {...register('late_fee_fine', {required: true})} value={formData.late_fee_fine} onChange={handleChange} placeholder="Late Fee Fine"/>
                                <FormErrorMessage error={errors.late_fee_fine}/>
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fine-slot-title">Re instate fee</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="number" {...register('reinstate_fine', {required: true})} value={formData.reinstate_fine} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors.reinstate_fine}/>
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fine-slot-title">Year (Last 2 Digits Of the Year)</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="number" {...register('year', {required: true})} value={formData.year} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fine-slot-title">Semester</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select {...register('semester', {required: true})} value={formData.semester} onChange={handleChange}>
                                    <option value="">Select Semester</option>
                                    {['Fall', 'Spring'].map((semester, index) => {
                                        return <option value={semester} key={index}>{semester}</option>
                                    })}
                                </select>
                            </div>
                            <FormErrorMessage error={errors.semester}/>
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
                            {params?.id? 'Update' : 'Submit'}
                        </button>
                    </div>
                </div>
            </CreateFineSlotForm>
        </CreateFineSlotMain>
    )
}

export default CreateFineSlot;