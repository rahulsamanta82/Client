import Breadcrumb from "components/particles/breadcrumb";
import { FC, Fragment, useEffect, useState } from "react";
import {
    CreateAdmissionQuotaFormSection,
    CreateAdmissionQuotaMain,
    CreateAdmissionQuotaTop,
    DynamicFieldsSection,
} from "./style";
import {
    CreateAdmissionQuotaDTO,
    DynamicField,
} from "utils/helpers/models/admissions/create-quota.dto";
import { AddOptionSvg, DeleteOptionSvg } from "assets/images/common/svgs";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useAdmissions from "../../useHooks";
import useUtils from "hooks/useUtils";

interface CreateAdmissionQuotaProps { }

export const CreateAdmissionQuota: FC<CreateAdmissionQuotaProps> = () => {
    let [formData, setFormData] = useState<CreateAdmissionQuotaDTO>(
        new CreateAdmissionQuotaDTO()
    );
    const { createAdmissionQuota, updateAdmissionQuota, getAdmissionQuotaById } = useAdmissions();
    const { getQueryParams, extractAfterZeroDot } = useUtils();
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

    const handleDynamicFieldChange = (event: any, index: number) => {
        const { value, name } = event.target;
        setValue(name, value);
        const form_data: any = { ...formData };
        const formDataName = extractAfterZeroDot(name, index);
        form_data.extra_fields[index][formDataName] = value;
        trigger([name]);
        setFormData({ ...form_data });
    };

    const handleDeleteOption = (fieldIndex: number, optionIndex: number) => {
        formData.extra_fields[fieldIndex].options.splice(optionIndex, 1);
        setFormData({ ...formData });
    };

    const handleAddOption = (fieldIndex: number) => {
        formData.extra_fields[fieldIndex].options.push("");
        setFormData({ ...formData });
    };

    const handleOptionChange = (
        event: any,
        fieldIndex: number,
        optionIndex: number
    ) => {
        const { value } = event.target;
        const name: any = `extra_fields.${fieldIndex}.options.${optionIndex}`;
        formData.extra_fields[fieldIndex].options[optionIndex] = value;
        setValue(name, value);
        setFormData({ ...formData });
        trigger([name]);
    };

    const handleAddDynamicFields = () => {
        formData.extra_fields.push(new DynamicField());
        setFormData({ ...formData });
    };

    const handleDeleteDynamicFields = (fieldIndex: number) => {
        formData.extra_fields.splice(fieldIndex, 1);
        setFormData({ ...formData });
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
        <CreateAdmissionQuotaMain>
            <CreateAdmissionQuotaTop>
                <div className="left">
                    <span className="page-heading">{params?.id ? 'Update' : 'Add'} Quota</span>
                    <Breadcrumb />
                </div>
            </CreateAdmissionQuotaTop>

            <CreateAdmissionQuotaFormSection className="content-radius-shadow">
                <div className="static-fields">
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
                            <label>Additional Information</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="radio"
                                        id="no"
                                        value={0}
                                        checked={formData.additional_info == 0}
                                        {...register("additional_info", { required: true })}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="no">No</label>
                                </div>
                                <div className="field">
                                    <input
                                        type="radio"
                                        id="yes"
                                        checked={formData.additional_info == 1}
                                        value={1}
                                        {...register("additional_info", { required: true })}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="yes">Yes </label>
                                </div>
                            </div>
                            <FormErrorMessage error={errors?.additional_info} />
                        </div>
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

                {formData.additional_info == 1 && (
                    <DynamicFieldsSection>
                        <div className="header-part">
                            <div className="heading">
                                <span>Create Additional Information Form</span>
                            </div>
                        </div>
                        {formData.extra_fields.map((field: DynamicField, index: number) => {
                            return (
                                <Fragment key={index}>
                                    <div className="common-fields">
                                        <div className="input-field">
                                            <label>Field Type</label>
                                            <div className="field-wrap">
                                                <div className="field">
                                                    <select
                                                        value={field.type}
                                                        {...register(`extra_fields.${index}.type`, {
                                                            required: true,
                                                        })}
                                                        onChange={(e: any) =>
                                                            handleDynamicFieldChange(e, index)
                                                        }
                                                    >
                                                        <option value="">Select Field Type</option>
                                                        <option value="dropdown">Dropdown</option>
                                                        <option value="text">Text</option>
                                                        <option value="checkbox">Checkbox</option>
                                                        <option value="radio">Radio</option>
                                                        <option value="date">Date</option>
                                                    </select>
                                                </div>
                                                <FormErrorMessage error={errors?.['extra_fields']?.[index]?.['type']} />
                                            </div>
                                        </div>
                                        <div className="input-field">
                                            <label>Field Name</label>
                                            <div className="field-wrap">
                                                <div className="field">
                                                    <input
                                                        type="text"
                                                        value={field.name}
                                                        {...register(`extra_fields.${index}.name`, {
                                                            required: true,
                                                        })}
                                                        onChange={(e: any) =>
                                                            handleDynamicFieldChange(e, index)
                                                        }
                                                    />
                                                </div>
                                                <FormErrorMessage error={errors?.['extra_fields']?.[index]?.['name']} />
                                            </div>
                                        </div>
                                        <div className="input-field">
                                            <label>Field Label</label>
                                            <div className="field-wrap">
                                                <div className="field">
                                                    <input
                                                        type="text"
                                                        value={field.label}
                                                        {...register(`extra_fields.${index}.label`, {
                                                            required: true,
                                                        })}
                                                        onChange={(e: any) =>
                                                            handleDynamicFieldChange(e, index)
                                                        }
                                                    />
                                                </div>
                                                <FormErrorMessage error={errors?.['extra_fields']?.[index]?.['label']} />
                                            </div>
                                        </div>
                                    </div>
                                    {(formData.extra_fields[index].type === "dropdown" || formData.extra_fields[index].type === "checkbox" || formData.extra_fields[index].type === "radio") && (
                                        <div className="options-fields">
                                            {formData.extra_fields[index].options.map(
                                                (option: string, ind: number) => {
                                                    const optionsLength =
                                                        formData.extra_fields[index].options.length;
                                                    return (
                                                        <div className="particular-option" key={ind}>
                                                            <div className="input-field">
                                                                <label>{formData.extra_fields[index].type} option {ind + 1}</label>
                                                                <div className="field-wrap">
                                                                    <div className="field">
                                                                        <input
                                                                            type="text"
                                                                            value={option}
                                                                            {...register(
                                                                                `extra_fields.${index}.options.${ind}`,
                                                                                { required: true }
                                                                            )}
                                                                            onChange={(e: any) =>
                                                                                handleOptionChange(e, index, ind)
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <FormErrorMessage error={errors?.['extra_fields']?.[index]?.['options']?.[ind]} />
                                                                </div>
                                                            </div>
                                                            <div className="action-buttons">
                                                                {ind === optionsLength - 1 && (
                                                                    <div
                                                                        className="particular-button cp"
                                                                        onClick={() => handleAddOption(index)}
                                                                    >
                                                                        <AddOptionSvg />
                                                                    </div>
                                                                )}

                                                                {(formData.extra_fields[index].options.length !== 1) && (
                                                                    <div
                                                                        className="particular-button cp"
                                                                        onClick={() => handleDeleteOption(index, ind)}
                                                                    >
                                                                        <DeleteOptionSvg />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    )}
                                    <div className="common-fields">
                                        <div className="input-field">
                                            <label>Is Required</label>
                                            <div className="field-wrap">
                                                <div className="field">
                                                    <select
                                                        {...register(`extra_fields.${index}.is_required`)}
                                                        value={formData.extra_fields[index].is_required}
                                                        onChange={(e: any) =>
                                                            handleDynamicFieldChange(e, index)
                                                        }
                                                    >
                                                        <option value={1}>Yes</option>
                                                        <option value={0}>No</option>
                                                    </select>
                                                </div>
                                                <FormErrorMessage error={errors?.['extra_fields']?.[index]?.['is_required']} />
                                            </div>
                                        </div>
                                        <div className="input-field class">
                                            <label>Field Class</label>
                                            <div className="field-wrap">
                                                <div className="field">
                                                    <input
                                                        type="text"
                                                        {...register(`extra_fields.${index}.class`, { required: true })}
                                                        value={formData.extra_fields[index].class}
                                                        onChange={(e: any) =>
                                                            handleDynamicFieldChange(e, index)
                                                        }
                                                    />
                                                </div>
                                                <div className="action-buttons">
                                                    {index === formData.extra_fields.length - 1 && (
                                                        <div
                                                            className="particular-btn cp"
                                                            onClick={handleAddDynamicFields}
                                                        >
                                                            <AddOptionSvg />
                                                        </div>
                                                    )}
                                                    {
                                                        formData.extra_fields.length !== 1 && (
                                                            <div
                                                                className="particular-btn cp"
                                                                onClick={() => handleDeleteDynamicFields(index)}
                                                            >
                                                                <DeleteOptionSvg />
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                            <FormErrorMessage error={errors?.['extra_fields']?.[index]?.['class']} />
                                        </div>
                                    </div>
                                </Fragment>
                            );
                        })}
                    </DynamicFieldsSection>
                )}

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
            </CreateAdmissionQuotaFormSection>
        </CreateAdmissionQuotaMain>
    );
};

export default CreateAdmissionQuota;
