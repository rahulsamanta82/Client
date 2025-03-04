import { ChangeEvent, FC, useEffect, useState } from "react";
import {
    SuperAdminManagementCreateSection,
    SuperAdminManagementCreateMain,
    SuperAdminManagementCreateTop,
} from "./style";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import Breadcrumb from "components/particles/breadcrumb";
import { AddMeritKeyDTO } from "utils/helpers/models/admissions/add-merit-key.dto";
import useUtils from "hooks/useUtils";
import useAdmissions from "../../useHooks";

// interface AddHostelProps {
//     setOpen: Function;
// }

const CreateMeritKeys: FC = () => {
    const [formData, setFormData] = useState<AddMeritKeyDTO>(
        new AddMeritKeyDTO()
    );
    const { createMeritKey, updateMeritKey, getMeritKeyById } = useAdmissions();
    const {
        handleSubmit,
        register,
        trigger,
        formState: { errors },
        setValue,
    } = useForm<AddMeritKeyDTO>({ defaultValues: formData });
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const onSubmit = (formData: AddMeritKeyDTO, addMore: boolean = false) => {
        if (params?.id) {
            updateMeritKey(params?.id, formData);
        } else {
            createMeritKey(formData, addMore, resetForm);
        }
    };

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger([name]);
        setFormData({ ...formData, [name]: value });
    };

    const resetForm = () => {
        for (const key in formData) {
            setValue(key as keyof AddMeritKeyDTO, "");
        }
        setFormData({ ...new AddMeritKeyDTO() });
    };

    useEffect(() => {
        if (params?.id) {
            getMeritKeyById(params?.id, formData, setValue, setFormData);
        }
    }, []);

    return (
        <SuperAdminManagementCreateMain>
            <SuperAdminManagementCreateTop>
                <div className="left">
                    <span className="page-heading">Add Merit Keys</span>
                    <Breadcrumb />
                </div>
                <div className="right"></div>
            </SuperAdminManagementCreateTop>

            <SuperAdminManagementCreateSection className="p-custom-scrollbar-8">
                <form>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>Title</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="text"
                                        {...register("key_title", { required: true })}
                                    />
                                </div>
                                <FormErrorMessage error={errors.key_title} />
                            </div>
                        </div>
                        <div className="radio-field">
                            <label>Status</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="radio"
                                        id="status-no"
                                        value={0}
                                        checked={formData.status == 0}
                                        {...register("status", { required: true })}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="status-no">Active</label>
                                </div>
                                <div className="field">
                                    <input
                                        type="radio"
                                        id="status-yes"
                                        value={1}
                                        checked={formData.status == 1}
                                        {...register("status", { required: true })}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="status-yes">De-active</label>
                                </div>
                            </div>
                            <FormErrorMessage error={errors.status} />
                        </div>
                    </div>

                    <div className="input-field">
                        <label>Key Body</label>
                        <div className="field-wrap">
                            <div className="field textarea">
                                <textarea
                                    {...register("key_body", { required: true })}
                                    value={formData.key_body}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormErrorMessage error={errors.key_body} />
                        </div>
                    </div>

                    <div className="action-buttons">
                        <div className="buttons">
                            <button
                                className="lg-rounded-btn gray"
                                type="button"
                                onClick={resetForm}
                            >
                                Reset
                            </button>

                            {!params?.id && (
                                <button
                                    className="lg-rounded-btn black"
                                    type="submit"
                                    onClick={handleSubmit((data: AddMeritKeyDTO) =>
                                        onSubmit(data, true)
                                    )}
                                >
                                    Save & Add more
                                </button>
                            )}

                            <button
                                className="lg-rounded-btn"
                                type="submit"
                                onClick={handleSubmit((data: AddMeritKeyDTO) => onSubmit(data))}
                            >
                                {params?.id ? 'Update' : 'Save'} & Exit
                            </button>
                        </div>
                    </div>
                </form>
            </SuperAdminManagementCreateSection>
        </SuperAdminManagementCreateMain>
    );
};

export default CreateMeritKeys;
