import React, { FC, useEffect, useState } from "react";
import Breadcrumb from "components/particles/breadcrumb";
import {
    SubjectManagementCreateMain,
    SubjectManagementCreateTop,
    SubjectManagementCreateSection,
    Form
} from "./style";
import { useForm } from "react-hook-form";
import { AddSubjectDTO } from "utils/helpers/models/organization/add-subject.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useUtils from "hooks/useUtils";
import useOrganization from "containers/private/organization/useHooks";

interface AdmissionStudentListingProps { }

const CreateAdmissionSubjectManagement: FC<AdmissionStudentListingProps> = () => {
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const [formData, setFormData] = useState<AddSubjectDTO>(new AddSubjectDTO());
    const { createSubject, getSubjectById, updateSubject } = useOrganization();

    const {
        handleSubmit,
        register,
        setValue,
        trigger,
        getValues,
        formState: { errors },
    } = useForm<AddSubjectDTO>();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name as keyof AddSubjectDTO, value);
        trigger([name]);
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (data: AddSubjectDTO, addMore: boolean = false) => {
        if (params?.id) {
            updateSubject(params?.id, data);
        } else {
            createSubject(data, addMore, resetForm);
        }
    };

    const resetForm = () => {
        for (const key in formData) {
            setValue(
                key as keyof AddSubjectDTO,
                formData[key as keyof AddSubjectDTO]
            );
        }

        setFormData({ ...new AddSubjectDTO() });
    };

    useEffect(() => {
        if (params?.id) getSubjectById(params?.id, formData, setValue, setFormData);
    }, []);

    return (
        <SubjectManagementCreateMain>
            <SubjectManagementCreateTop>
                <div className="left">
                    <span className="page-heading">Add Subject</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                </div>
            </SubjectManagementCreateTop>

            <SubjectManagementCreateSection className="content-radius-shadow">
                <Form>
                    <div className="filter-fields">
                        <div className="input-field">
                            <label>Title</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="text"
                                        {...register("title", { required: true })}
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                </div>
                                <FormErrorMessage error={errors.title} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Type</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select
                                        {...register("type", { required: true })}
                                        value={formData.type}
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            Select Subject Type
                                        </option>
                                        <option value="subject">Subject</option>
                                        <option value="specialization">Specialization</option>
                                        <option value="diploma">Diploma</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.type} />
                            </div>
                        </div>
                        <div className="radio-field">
                            <label htmlFor="no">Is Specialization</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="radio"
                                        id="yes"
                                        checked={formData.is_specialization == 1}
                                        value={1}
                                        {...register("is_specialization", { required: true })}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="yes">Yes</label>
                                </div>
                                <div className="field">
                                    <input
                                        type="radio"
                                        id="no"
                                        value={0}
                                        checked={formData.is_specialization == 0}
                                        {...register("is_specialization", { required: true })}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="no">No</label>
                                </div>
                            </div>

                            <FormErrorMessage error={errors.is_specialization} />
                        </div>
                    </div>
                    <div className="radio-field">
                        <label htmlFor="no">Status</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="radio"
                                    id="yes"
                                    checked={formData.is_active == 1}
                                    value={1}
                                    {...register("is_active", { required: true })}
                                    onChange={handleChange}
                                />
                                <label htmlFor="yes">Active</label>
                            </div>
                            <div className="field">
                                <input
                                    type="radio"
                                    id="no"
                                    value={0}
                                    checked={formData.is_active == 0}
                                    {...register("is_active", { required: true })}
                                    onChange={handleChange}
                                />
                                <label htmlFor="no">Inactive</label>
                            </div>
                        </div>
                        <FormErrorMessage error={errors.is_active} />
                    </div>

                    <div className="submit-buttons">
                        <div className="buttons">
                            <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>
                                Reset
                            </button>
                            {!params?.id && <button
                                className="lg-rounded-btn black"
                                onClick={handleSubmit((data: AddSubjectDTO) =>
                                    onSubmit(data, true)
                                )}
                            >
                                Save & Add More
                            </button>}
                            <button
                                className="lg-rounded-btn"
                                onClick={handleSubmit((data: AddSubjectDTO) => onSubmit(data))}
                            >
                                Save & Exit
                            </button> 
                        </div>
                    </div>
                </Form>
            </SubjectManagementCreateSection>
        </SubjectManagementCreateMain>
    );
};

export default CreateAdmissionSubjectManagement;
