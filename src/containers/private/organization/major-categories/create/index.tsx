import Breadcrumb from "components/particles/breadcrumb";
import { FC, useEffect, useState } from "react";
import {
    CreateMajorCategoriesSection,
    CreateMajorCategoriesMain,
    CreateMajorCategoriesTop,
    
} from "./style";
import {
    CreateAdmissionQuotaDTO,
    DynamicField,
} from "utils/helpers/models/admissions/create-quota.dto";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useUtils from "hooks/useUtils";
import useAdmissions from "containers/private/admissions/useHooks";

interface CreateAdmissionQuotaProps { }

export const CreateMajorCategories: FC<CreateAdmissionQuotaProps> = () => {
    let [formData, setFormData] = useState<CreateAdmissionQuotaDTO>(
        new CreateAdmissionQuotaDTO()
    );
    const { createAdmissionQuota, updateAdmissionQuota, getAdmissionQuotaById } = useAdmissions();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        getValues,
        formState: { errors },
    } = useForm<CreateAdmissionQuotaDTO>({
        defaultValues: formData,
    });

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        const form_data: any = { ...formData };
        form_data[name] = value;
        setValue(name as keyof CreateAdmissionQuotaDTO, value);
        if (name === "additional_info" && value == 1) {
            form_data.extra_fields.push(new DynamicField());
        } else if (name === "additional_info") {
            form_data.extra_fields = [];
        }

        trigger([name]);

        setFormData({ ...form_data });
    };





    



    const onSubmit = (data: any, addMore: boolean = false) => {
        const optionTypes = ['dropdown', 'checkbox', 'radio'];
        const extra_fields: any = { ...formData }.extra_fields.map((item: any) => {
            if (!optionTypes.includes(item.type)) {
                delete item.options;
            }
            return item;
        })

        if (params?.id) {
            updateAdmissionQuota(params?.id, { ...formData, extra_fields });
        } else {
            createAdmissionQuota({ ...formData, extra_fields }, addMore, resetForm);
        }
    };

    const resetForm = () => {
        for (let key in getValues()) {
            setValue(key as keyof CreateAdmissionQuotaDTO, '');
        }
        formData = new CreateAdmissionQuotaDTO();
        setFormData({ ...formData });
    };

    useEffect(() => {
        if (params?.id)
            getAdmissionQuotaById(params?.id, setValue, formData, setFormData);
    }, []);

    return (
        <CreateMajorCategoriesMain>
            <CreateMajorCategoriesTop>
                <div className="left">
                    <span className="page-heading">{params?.id ? 'Update' : 'Add'} Major Categories</span>
                    <Breadcrumb />
                </div>
            </CreateMajorCategoriesTop>

            <CreateMajorCategoriesSection className="content-radius-shadow">
                <div className="common-fields">
                <div className="input-field">
                        <label>Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="text"
                                    id=""
                                    {...register("title", { required: true })}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormErrorMessage error={errors.title} />
                        </div>
                    </div>
                    <div className="radio-fields-group">
                        <div className="radio-field">
                            <label>Status</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="radio"
                                        id="active"
                                        value={1}
                                        checked={formData.is_active == 1}
                                        {...register("is_active", { required: true })}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="active">Active</label>
                                </div>
                                <div className="field">
                                    <input
                                        type="radio"
                                        id="deactivate"
                                        checked={formData.is_active == 0}
                                        value={0}
                                        {...register("is_active", { required: true })}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="deactivate">Deactivate</label>
                                </div>
                            </div>
                            <FormErrorMessage error={errors?.is_active} />
                        </div>
                    </div>
                </div>
                <div className="submit-buttons">
                    <div className="buttons">
                        <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>Reset</button>
                        {!params?.id && <button
                            className="lg-rounded-btn black"
                            onClick={handleSubmit((data: any) => onSubmit(data, true))}
                        >
                            Save & Add more
                        </button>}
                        <button
                            className="lg-rounded-btn"
                            onClick={handleSubmit((data: any) => onSubmit(data))}
                        >
                            {params?.id ? 'Update' : 'Save'} & Exit
                        </button>
                    </div>
                </div>
            </CreateMajorCategoriesSection>
        </CreateMajorCategoriesMain>
    );
};

export default CreateMajorCategories;
