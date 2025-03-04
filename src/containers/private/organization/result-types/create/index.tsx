import { FC, useEffect, useState } from "react";
import {
    ResultTypeCreateSection,
    ResultTypeCreateMain,
    ResultTypeCreateTop,
} from "./style";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import Breadcrumb from "components/particles/breadcrumb";
import { CreateResultTypeDTO } from "utils/helpers/models/organization/create-result-type.dto";
import useOrganization from "../../useHooks";
import useUtils from "hooks/useUtils";

const ResultTypeCreate: FC = () => {
    const [formData, setFormData] = useState<CreateResultTypeDTO>(
        new CreateResultTypeDTO()
    );

    const { createResultTypeAdmin, updateResultTypeAdmin, getResultTypeByIdAdmin } = useOrganization();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();
    const {
        handleSubmit,
        register,
        trigger,
        formState: { errors },
        setValue,
    } = useForm<any>({ defaultValues: formData });

    const onSubmit = (data: CreateResultTypeDTO) => {
        console.log(formData, "formdata");
        if (params?.id) {
            updateResultTypeAdmin(params?.id, data);
        } else {
            createResultTypeAdmin(data);
        }

    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setValue(name, value);
        trigger([name]);
        setFormData({ ...formData, [name]: value });
    };

    const resetForm = () => {
        for (let key in formData) {
            setValue(key, formData[key as keyof CreateResultTypeDTO]);
        }
        setFormData({ ... new CreateResultTypeDTO() });
    };

    useEffect(() => {
        if (params?.id) getResultTypeByIdAdmin(params?.id, formData, setValue, setFormData)
    }, []);
    return (
        <ResultTypeCreateMain>
            <ResultTypeCreateTop>
                <div className="left">
                    <span className="page-heading">{params?.id ? 'Update' : 'Create'} Result Type</span>
                    {!params?.id && <Breadcrumb />}
                </div>
                <div className="right"></div>
            </ResultTypeCreateTop>

            <ResultTypeCreateSection className="p-custom-scrollbar-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>Title</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="text"
                                        value={formData.title}
                                        {...register("title", { required: true })}
                                        onChange={handleChange}
                                    />
                                </div>
                                <FormErrorMessage error={errors.title} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Display Order</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select
                                        {...register("display_order", { required: true })}
                                        value={formData.display_order}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>
                                            Select Display Order
                                        </option>
                                        {[1, 2, 3, 4].map((order: number, index: number) => {
                                            return (
                                                <option value={order} key={index}>
                                                    {order}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.display_order} />
                            </div>
                        </div>

                        <div className="input-field">
                            <label>Status</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select
                                        {...register("is_active", { required: true })}
                                        value={formData.is_active}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select status</option>
                                        <option value={1}>Active</option>
                                        <option value={0}>Inactive</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.is_active} />
                            </div>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <div className="buttons">
                            <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>
                                Reset
                            </button>

                            <button className="lg-rounded-btn" type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </ResultTypeCreateSection>
        </ResultTypeCreateMain>
    );
};

export default ResultTypeCreate;
