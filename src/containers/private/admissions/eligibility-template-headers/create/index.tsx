import { FC, useEffect, useState } from "react";
import {
    CreateAdmissionETHFormSection,
    CreateAdmissionETHMain,
    CreateAdmissionETHTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import useAdmissions from "containers/private/admissions/useHooks";
import { useForm } from "react-hook-form";
import { CreateEligibilityTemplateHeaderDTO } from "utils/helpers/models/admissions/create-eligibility-template-header.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useUtils from "hooks/useUtils";

interface CreateAdmissionETHProps { }

const CreateAdmissionETH: FC<CreateAdmissionETHProps> = () => {
    const [formData, setFormData] = useState<CreateEligibilityTemplateHeaderDTO>(
        new CreateEligibilityTemplateHeaderDTO()
    );
    const { getQueryParams } = useUtils();
    const params = getQueryParams();
    const {
        createTemplateHeader,
        getTemplateHeaderById,
        updateTemplateHeader,
    } = useAdmissions();
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
        trigger,
    } = useForm<CreateEligibilityTemplateHeaderDTO>({
        defaultValues: formData,
    });

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        setFormData({ ...formData, [name]: value });
        trigger([name]);
    };

    const onSubmit = (
        data: CreateEligibilityTemplateHeaderDTO,
        addMore: boolean = false
    ) => {
        if (params?.id) {
            updateTemplateHeader(params?.id, data);
        } else {
            createTemplateHeader(data, addMore, resetForm);
        }
    };

    const resetForm = () => {
        setFormData(new CreateEligibilityTemplateHeaderDTO());
        for (let key in formData) {
            setValue(key as keyof CreateEligibilityTemplateHeaderDTO, null);
        }
    };

    useEffect(() => {
        if (params?.id) {
            getTemplateHeaderById(params?.id, formData, setFormData, setValue);
        }
    }, []);

    return (
        <CreateAdmissionETHMain>
            <CreateAdmissionETHTop>
                <div className="left">
                    <span className="page-heading">Eligibility Templates Header</span>
                    <Breadcrumb />
                </div>
            </CreateAdmissionETHTop>

            <CreateAdmissionETHFormSection className="content-radius-shadow">
                <div className="common-fields">
                    <div className="input-field">
                        <label>Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="text"
                                    {...register("title", { required: true })}
                                    onChange={handleChange}
                                    value={formData.title}
                                />
                            </div>
                            <FormErrorMessage error={errors.title} />
                        </div>
                    </div>

                    <div className="radio-field">
                        <label htmlFor="no">Is Quota</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="radio"
                                    id="no"
                                    {...register("is_quota", { required: true })}
                                    onChange={handleChange}
                                    checked={formData.is_quota == 0}
                                    value={0}
                                />
                                <label htmlFor="no">No</label>
                            </div>
                            <div className="field">
                                <input
                                    type="radio"
                                    id="yes"
                                    {...register("is_quota", { required: true })}
                                    value={1}
                                    onChange={handleChange}
                                    checked={formData.is_quota == 1}
                                />
                                <label htmlFor="yes">Yes </label>
                            </div>
                        </div>
                        <FormErrorMessage error={errors.is_quota} />
                    </div>
                </div>

                <div className="submit-buttons">
                    <div className="buttons">
                        <button className="lg-rounded-btn gray" onClick={resetForm}>
                            Reset
                        </button>
                        {!params?.id && (
                            <button
                                className="lg-rounded-btn black"
                                type="submit"
                                onClick={handleSubmit(
                                    (data: CreateEligibilityTemplateHeaderDTO) =>
                                        onSubmit(data, true)
                                )}
                            >
                                Save & Add more
                            </button>
                        )}

                        <button
                            className="lg-rounded-btn"
                            type="submit"
                            onClick={handleSubmit(
                                (data: CreateEligibilityTemplateHeaderDTO) => onSubmit(data)
                            )}
                        >
                            {params?.id ? 'Update' : 'Save'} & Exit
                        </button>
                    </div>
                </div>
            </CreateAdmissionETHFormSection>
        </CreateAdmissionETHMain>
    );
};

export default CreateAdmissionETH;
