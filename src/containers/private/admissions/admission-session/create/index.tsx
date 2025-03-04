import { FC, useEffect, useState } from "react";
import {
    CreateAdmisionSessionTop,
    CreateAdmissionFormSection,
    CreateAdmissionSessionMain,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { AddAdmissionSessionDTO } from "utils/helpers/models/admissions/add-admission-session.dto";
import useAdmissions from "../../useHooks";
import useUtils from "hooks/useUtils";
import { warningToaster } from "utils/helpers/common/alert-service";
import { warningMessages } from "utils/helpers/enums/messages.enum";

interface CreateAdmissionSessionProps { }

const CreateAdmissionSession: FC<CreateAdmissionSessionProps> = () => {
    const [formData, setFormData] = useState<AddAdmissionSessionDTO>(
        new AddAdmissionSessionDTO()
    );
    const { createAdmissionSession, updateAdmissionSession, getAdmissionSessionById } = useAdmissions();
    const { getQueryParams } = useUtils();
    const [years, setYears] = useState<number[]>([]);
    const params = getQueryParams();
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        trigger,
        formState: { errors },
    } = useForm<AddAdmissionSessionDTO>();
    const { compareDateStrings } = useUtils();

    const onSubmit = (data: AddAdmissionSessionDTO) => {
        if (!compareDateStrings(formData.start_date, formData.end_date)) {
            warningToaster(warningMessages.startDateLargerThanEndDateMsg);
            return;
        }
        if (params?.id) {
            updateAdmissionSession(params?.id, data);
        } else {
            createAdmissionSession(data);
        }
    };

    const resetForm = () => {
        for (let key in getValues()) {
            setValue(key as keyof AddAdmissionSessionDTO, "");
        }
        setFormData({ ...new AddAdmissionSessionDTO() });
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setValue(name, value);
        formData[name as keyof AddAdmissionSessionDTO] = value as never;
        setFormData({ ...formData });
        trigger(name);
    };

    const getYears = () => {
        const date = new Date();
        const currentYear = date.getFullYear();
        for (let year = currentYear - 20; year < currentYear + 21; year++) {
            years.push(year);
        }

        setYears([...years]);
    }
    const selectType = ["Fall", "Spring", "Summer"];

    useEffect(() => {
        getYears();
        if (params?.id) {
            getAdmissionSessionById(params?.id, formData, setValue, setFormData);
        }
    }, []);

    return (
        <CreateAdmissionSessionMain>
            <CreateAdmisionSessionTop>
                <div className="heading">
                    <span className="page-heading">Create Admission Session</span>
                    <Breadcrumb />
                </div>
            </CreateAdmisionSessionTop>

            <CreateAdmissionFormSection
                className="content-radius-shadow"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="common-fields">
                    <div className="input-field">
                        <label>Slug</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="Slug Here"
                                    {...register("slug", { required: true })}
                                    value={formData.slug}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormErrorMessage error={errors?.slug} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="Enter Title"
                                    {...register("title", { required: true })}
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormErrorMessage error={errors?.title} />
                        </div>
                    </div>

                    <div className="input-field">
                        <label>Code</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="Enter Code"
                                    {...register("code", { required: true })}
                                    value={formData.code}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <FormErrorMessage error={errors?.code} />
                    </div>

                    <div className="input-field">
                        <label>Year</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select
                                    {...register("year", { required: true })}
                                    value={formData.year}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Year</option>
                                    {years?.map((item: any, index: number) => {
                                        return (
                                            <option value={item.id} key={index}>
                                                {item}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <FormErrorMessage error={errors?.year} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Start Date</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="date"
                                    {...register("start_date", { required: true })}
                                    value={formData.start_date}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormErrorMessage error={errors?.start_date} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>End Date</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="date"
                                    {...register("end_date", { required: true })}
                                    value={formData.end_date}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormErrorMessage error={errors?.end_date} />
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
                                    <option value="">Select Type</option>
                                    {selectType?.map((item: any, index: number) => {
                                        return (
                                            <option value={item.id} key={index}>
                                                {item}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <FormErrorMessage error={errors?.type} />
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
                                    <option value="">Status</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                            <FormErrorMessage error={errors?.is_active} />
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
                            Reset
                        </button>
                        <button className="lg-rounded-btn" type="submit">
                            Submit
                        </button>
                    </div>
                </div>
            </CreateAdmissionFormSection>
        </CreateAdmissionSessionMain>
    );
};

export default CreateAdmissionSession;
