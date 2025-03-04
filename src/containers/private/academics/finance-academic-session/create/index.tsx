import { FC, useEffect, useState } from "react";
import { CreateFinanceAcademicSessionForm, CreateFinanceAcademicSessionMain, CreateFinanceAcademicSessionTop } from "./style";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import { BankInfoDTO } from "utils/helpers/models/finance/bank-info.dto";
// import useFinance from "../../useHooks";
import useUtils from "hooks/useUtils";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

interface CreateFinanceAcademicSessionProps { }

const CreateFinanceAcademicSession: FC<CreateFinanceAcademicSessionProps> = ({ }) => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: 'Academics / ', path: siteRoutes.academicSessionListing },
        { title: 'Finance Academic Session / ', path: siteRoutes.financeAcademicSessionListing },
        { title: 'Add Finance Academic Session', path: siteRoutes.createFinanceAcademicSession },
    ]
    const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<any>();
    let [formData, setFormData] = useState<any>({});
    // const { CreateFinanceAcademicSessionInfo, updateBankInfo, getBankInfoById } = useFinance();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const onSubmit = () => {
        if (params?.id) {
            // updateBankInfo(params?.id, formData);
        } else {
            // CreateFinanceAcademicSessionInfo(formData);
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger(name);
        setFormData({ ...formData, [name]: value });
    }

    const resetForm = () => {
        formData = new BankInfoDTO();
        for (let key in formData) {
            setValue(key as keyof BankInfoDTO, formData[key as keyof BankInfoDTO]);
        }

        setFormData({ ...formData });
    }

    useEffect(() => {
        // if (params?.id) getBankInfoById(params?.id, formData, setValue, setFormData);
    }, []);

    return (
        <CreateFinanceAcademicSessionMain>
            <CreateFinanceAcademicSessionTop>
                <div className="heading">
                    <span className="page-heading">{params?.id ? 'Update' : 'Add'} Finance Academic Session</span>
                    {!params?.id ? <Breadcrumb links={breadcrumbLinks} /> : ''}
                </div>
            </CreateFinanceAcademicSessionTop>
            <CreateFinanceAcademicSessionForm className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="common-fields">
                    <div className="input-field">
                        <label htmlFor="application">Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Title" {...register('bank', { required: true })} value={formData.bank} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors.bank} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="application">Academic Session</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select>
                                    <option value="">Select Academic Session</option>
                                </select>
                            </div>
                            <FormErrorMessage error={errors.bank} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="application">Voucher Type</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select>
                                    <option value="">Select Voucher Type</option>
                                </select>
                            </div>
                            <FormErrorMessage error={errors.bank} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="application">Regular Semester Due Date</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="date" name="" id="" />
                            </div>
                            <FormErrorMessage error={errors.bank} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="application">Annual Semester Due Date</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="date" name="" id="" />
                            </div>
                            <FormErrorMessage error={errors.bank} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="application">Distance Semester Due Date</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="date" name="" id="" />
                            </div>
                            <FormErrorMessage error={errors.bank} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="application">Sequence Number</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="number" />
                            </div>
                            <FormErrorMessage error={errors.bank} />
                        </div>
                    </div>
                    <div className="radio-field">
                        <label htmlFor="no">Status</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="radio" id="active" {...register('is_active', { required: true })} value={1} checked={formData.is_active == 1} onChange={handleChange} />
                                <label htmlFor="active">Active</label>
                            </div>
                            <div className="field">
                                <input type="radio" id="inactive" {...register('is_active', { required: true })} value={0} checked={formData.is_active == 0} onChange={handleChange} />
                                <label htmlFor="inactive">Deactive</label>
                            </div>
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
            </CreateFinanceAcademicSessionForm>
        </CreateFinanceAcademicSessionMain>
    )
}

export default CreateFinanceAcademicSession;