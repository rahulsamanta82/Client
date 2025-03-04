import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useEffect, useState } from "react";
import {
    CreateStudentStatusSection,
    CreateStudentStatusMain,
    CreateStudentStatusTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { StudentStatusDTO } from "utils/helpers/models/academics/student-status.dto";
import useUtils from "hooks/useUtils";
import useAcademics from "../../useHooks";

export const CreateStudentStatus: FC = () => {
    const { getQueryParams } = useUtils();
    const params = getQueryParams();
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Student Status  / ", path: siteRoutes.studentStatusListing },
        { title: `${params?.id ? 'Update' : 'Add'} Student Status`, path: siteRoutes.createStudentStatus },
    ]
    const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<StudentStatusDTO>();
    let [formData, setFormData] = useState<StudentStatusDTO>(new StudentStatusDTO());
    const { createStudentStatus, updateStudentStatus, getStudentStatusById } = useAcademics();

    const onSubmit = () => {
        if (params?.id) {
            updateStudentStatus(params?.id, formData);
        } else {
            createStudentStatus(formData);
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger(name);
        setFormData({ ...formData, [name]: value });
    }

    const resetForm = () => {
        formData = new StudentStatusDTO();
        for (let key in formData) {
            setValue(key as keyof StudentStatusDTO, formData[key as keyof StudentStatusDTO]);
        }

        setFormData({ ...formData });
    }

    useEffect(() => {
        if (params?.id) getStudentStatusById(params?.id, formData, setValue, setFormData);
    }, []);

    return (
        <CreateStudentStatusMain>
            <CreateStudentStatusTop>
                <div className="left">
                    <span className="page-heading">{params?.id ? 'Update' : 'Add'} Student Status</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </CreateStudentStatusTop>

            <CreateStudentStatusSection className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="common-fields">
                    <div className="input-field">
                        <label>Status Label</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Enter Title" {...register('title', { required: true })} value={formData.title} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors.title} />
                        </div>
                    </div>
                    <div className="radio-field">
                        <label htmlFor="no">For Department?</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="radio"
                                    id="no"
                                    value={0}
                                    checked={formData.for_department == 0}
                                    {...register("for_department", { required: true })}
                                    onChange={handleChange}
                                />
                                <label htmlFor="no">No</label>
                            </div>
                            <div className="field">
                                <input
                                    type="radio"
                                    id="yes"
                                    checked={formData.for_department == 1}
                                    value={1}
                                    {...register("for_department", { required: true })}
                                    onChange={handleChange}
                                />
                                <label htmlFor="yes">Yes </label>
                            </div>
                        </div>
                        <FormErrorMessage error={errors.for_department} />
                    </div>
                </div>
                <div className="submit-buttons">
                    <div className="buttons">
                        <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>
                            Reset
                        </button>
                        <button className="lg-rounded-btn" type="button" onClick={handleSubmit(onSubmit)}>Submit</button>
                    </div>
                </div>
            </CreateStudentStatusSection>
        </CreateStudentStatusMain>
    );
};

export default CreateStudentStatus;
