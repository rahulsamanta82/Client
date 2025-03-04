import React, { FC, Fragment, useEffect, useState } from "react";
import Breadcrumb from "components/particles/breadcrumb";
import {
    CertificateManagementCreateMain,
    CertificateManagementCreateTop,
    CertificateManagementCreateSection,
    Filters,
} from "./style";
import { DownArrowLightgrayMediumSvg } from "assets/images/common/svgs";
import MultiselectDropdown from "components/particles/forms/multiselect-dropdown";
import { AddCertificateDTO } from "utils/helpers/models/organization/add-certificate.dto";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { warningToaster } from "utils/helpers/common/alert-service";
import { warningMessages } from "utils/helpers/enums/messages.enum";
import useOrganization from "../../useHooks";
import useUtils from "hooks/useUtils";

interface AdmissionStudentListingProps { }

const CertificateManagementCreate: FC<AdmissionStudentListingProps> = () => {
    let [formData, setFormData] = useState<AddCertificateDTO>(
        new AddCertificateDTO()
    );

    const options: any[] = [
        { id: 1, value: "cambridge", title: "Cambridge" },
        { id: 2, value: "inter", title: "Inter" },
        { id: 3, value: "graduate", title: "Graduate" },
        { id: 4, value: "technical", title: "Technical" },
    ];

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {
        handleSubmit,
        register,
        setValue,
        getValues,
        trigger,
        formState: { errors },
    } = useForm<AddCertificateDTO>();
    const {
        createDegreeCertificate,
        updateDegreeCertificate,
        getDegreeCertificateById,
        getSubjects,
        getCertificateLevelsAdmin,
    } = useOrganization();
    const [subjects, setSubjects] = useState<any[]>();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();
    const [certificateLevels, setCertificateLevels] = useState<any[]>([]);

    const handleSelect = (option: any) => {
        if (!option?.selected) {
            const index = formData.level.findIndex((item) => option.id === item.id);
            formData.level.splice(index, 1);
            setFormData({ ...formData });
        } else {
            formData.level.push(option);
            setFormData({ ...formData });
        }

        setValue(
            "level",
            formData.level.map((l) => l.value)
        );
        trigger(["level"]);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        console.log(name, value);
        trigger([name]);
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (data: AddCertificateDTO, addMore: boolean = false) => {
        if (!formData.level.length) {
            warningToaster(warningMessages.subjectTypeRequiredMsg);
        } else {
            if (params?.id) {
                updateDegreeCertificate(params?.id, data);
            } else {
                createDegreeCertificate(data, addMore, resetForm);
            }
        }
    };

    const resetForm = () => {
        for (const key in formData) {
            if (key === "level") {
                setValue(key as keyof AddCertificateDTO, []);
            } else {
                setValue(key as keyof AddCertificateDTO, "");
            }
        }
        formData = new AddCertificateDTO();
        setFormData({ ...formData });
    };

    useEffect(() => {
        if (params?.id) {
            getDegreeCertificateById(params?.id, formData, setValue, setFormData, options);
        }

        getSubjects(setSubjects);
        getCertificateLevelsAdmin(setCertificateLevels);
    }, []);

    return (
        <CertificateManagementCreateMain>
            <CertificateManagementCreateTop>
                <div className="left">
                    <span className="page-heading">{params?.id ? 'Update' : 'Add'} Certificate /Degree</span>
                    <Breadcrumb />
                </div>
            </CertificateManagementCreateTop>

            <CertificateManagementCreateSection className="content-radius-shadow">
                <Filters>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>Title</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="text"
                                        {...register("title", { required: true })}
                                    />
                                </div>
                                <FormErrorMessage error={errors?.title} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Type</label>
                            <div className="field-wrap multiselect">
                                <div className="custom-multi-select" onClick={toggleDropdown}>
                                    <div className="selected-options-container">
                                        {formData.level.map((option: any, index: number) => (
                                            <div className="selected-option" key={index}>
                                                {option.title}
                                            </div>
                                        ))}
                                        {!formData.level?.length && (
                                            <span className="placeholder-text">
                                                Select Subject Type
                                            </span>
                                        )}
                                    </div>
                                    <div className="dropdown-icon">
                                        <DownArrowLightgrayMediumSvg />
                                    </div>
                                </div>
                                {isDropdownOpen && (
                                    <Fragment>
                                        <MultiselectDropdown
                                            options={options}
                                            onSelect={handleSelect}
                                            value={formData.level.map((o) => o.id)}
                                        />
                                    </Fragment>
                                )}
                            </div>
                        </div>
                        <div className="radio-field">
                            <label>Ask for subject</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <label htmlFor="ask-for-subject-yes">Yes</label>
                                    <input
                                        type="radio"
                                        id="ask-for-subject-yes"
                                        value={1}
                                        checked={formData.ask_for_subject == 1}
                                        {...register("ask_for_subject", { required: true })}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="no">No</label>
                                    <input
                                        type="radio"
                                        id="no"
                                        value={0}
                                        checked={formData.ask_for_subject == 0}
                                        {...register("ask_for_subject", { required: true })}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <FormErrorMessage error={errors?.ask_for_subject} />
                        </div>

                        <div className="radio-field">
                            <label>Is DAE</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="radio"
                                        checked={formData.is_dae == 1}
                                        {...register("is_dae", { required: true })}
                                        onChange={handleChange}
                                        value={1}
                                        id="is-dae-yes"
                                    />
                                    <label htmlFor="is-dae-yes">Yes</label>
                                </div>
                                <div className="field">
                                    <input
                                        type="radio"
                                        checked={formData.is_dae == 0}
                                        {...register("is_dae", { required: true })}
                                        onChange={handleChange}
                                        value={0}
                                        id="is-dae-no"
                                    />
                                    <label htmlFor="is-dae-no">No</label>
                                </div>
                            </div>
                            <FormErrorMessage error={errors?.is_dae} />
                        </div>

                        <div className="radio-field">
                            <label>Is Specialization</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="radio"
                                        checked={formData.is_specialization == 1}
                                        {...register("is_specialization", { required: true })}
                                        onChange={handleChange}
                                        value={1}
                                        id="is-specialization-yes"
                                    />
                                    <label htmlFor="is-specialization-yes">Yes</label>
                                </div>
                                <div className="field">
                                    <input
                                        type="radio"
                                        checked={formData.is_specialization == 0}
                                        {...register("is_specialization", { required: true })}
                                        onChange={handleChange}
                                        value={0}
                                        id="is-specialization-no"
                                    />
                                    <label htmlFor="is-specialization-no">No</label>
                                </div>
                            </div>
                            <FormErrorMessage error={errors?.is_specialization} />
                        </div>
                        <div className="input-field">
                            <label>Required Subjects</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select
                                        {...register("required_subjects", { required: true })}
                                        onChange={handleChange}
                                        value={formData.required_subjects}
                                    >
                                        <option value="">Select Required Subjects</option>
                                        {subjects?.map((subject: any, index: number) => {
                                            return (
                                                <option value={subject.id} key={index}>
                                                    {subject.title}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <FormErrorMessage error={errors?.required_subjects} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Display Order</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="number"
                                        placeholder="Enter Display Order"
                                        {...register("display_order", { required: true })}
                                        onChange={handleChange}
                                        value={formData.display_order}
                                    />
                                </div>
                                <FormErrorMessage error={errors?.required_subjects} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Select Certificate Level</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select
                                        {...register("level_id", { required: false })}
                                        onChange={handleChange}
                                        value={formData.level_id}
                                    >
                                        <option value="">Select Certificate Level</option>
                                        {certificateLevels?.map((level: any, index: number) => {
                                            return (
                                                <option value={level.id} key={index}>
                                                    {level.title}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <FormErrorMessage error={errors?.level_id} />
                            </div>
                        </div>
                        <div className="radio-field">
                            <label>Require Marks</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="radio"
                                        checked={formData.required_marks == 1}
                                        {...register("required_marks", { required: true })}
                                        onChange={handleChange}
                                        value={1}
                                        id="required-marks-yes"
                                    />
                                    <label htmlFor="required-marks-yes">Yes</label>
                                </div>
                                <div className="field">
                                    <input
                                        type="radio"
                                        checked={formData.required_marks == 0}
                                        {...register("required_marks", { required: true })}
                                        onChange={handleChange}
                                        value={0}
                                        id="required-marks-no"
                                    />
                                    <label htmlFor="required-marks-no">No</label>
                                </div>
                            </div>
                            <FormErrorMessage error={errors?.required_marks} />
                        </div>
                        <div className="radio-field">
                            <label>Status</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="radio"
                                        checked={formData.is_active == 1}
                                        {...register("is_active", { required: true })}
                                        onChange={handleChange}
                                        value={1}
                                        id="is-active-yes"
                                    />
                                    <label htmlFor="is-active-yes">Yes</label>
                                </div>
                                <div className="field">
                                    <input
                                        type="radio"
                                        checked={formData.is_active == 0}
                                        {...register("is_active", { required: true })}
                                        onChange={handleChange}
                                        value={0}
                                        id="is-active-no"
                                    />
                                    <label htmlFor="is-active-no">No</label>
                                </div>
                            </div>
                            <FormErrorMessage error={errors?.is_active} />
                        </div>
                    </div>

                    <div className="submit-buttons">
                        <div className="buttons">
                            <button
                                className="lg-rounded-btn gray"
                                type="button"
                                onClick={resetForm}
                            >
                                Reset
                            </button>
                            {!params?.id && <button
                                className="lg-rounded-btn black"
                                onClick={handleSubmit((data: AddCertificateDTO) =>
                                    onSubmit(data, true)
                                )}
                            >
                                Save & Add More
                            </button>}
                            <button
                                className="lg-rounded-btn"
                                onClick={handleSubmit((data: AddCertificateDTO) =>
                                    onSubmit(data)
                                )}
                            >
                                {params?.id ? 'Update' : 'Save'} & Exit
                            </button>
                        </div>
                    </div>
                </Filters>
            </CertificateManagementCreateSection>
        </CertificateManagementCreateMain>
    );
};

export default CertificateManagementCreate;
