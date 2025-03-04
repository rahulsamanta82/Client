import { FC, useEffect, useState } from "react";
import { EnrollPoolTeacherForm, EnrollPoolTeacherMain, EnrollPoolTeacherTop } from "./style";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import useFinance from "containers/private/finance/useHooks";
import useUtils from "hooks/useUtils";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

interface EnrollPoolTeacherProps { }

const EnrollPoolTeacher: FC<EnrollPoolTeacherProps> = ({ }) => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: 'Academics / ', path: siteRoutes.academicSessionListing },
        { title: 'Common Courses Pools / ', path: siteRoutes.commonCoursesPoolsListing },
        { title: 'Pool Teachers /', path: siteRoutes.poolTeachersListing },
        { title: 'Enroll Teacher', path: siteRoutes.enrollPoolTeacher }
    ]
    const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<any>();
    let [formData, setFormData] = useState<any>({});
    // const { EnrollPoolTeacherInfo, updateAcademicCourseGroupInfo, getAcademicCourseGroupInfoById } = useFinance();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const onSubmit = () => {
        if (params?.id) {
            // updateAcademicCourseGroupInfo(params?.id, formData);
        } else {
            // EnrollPoolTeacherInfo(formData);
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger(name);
        setFormData({ ...formData, [name]: value });
    }

    const resetForm = () => {
        // formData = new AcademicCourseGroupInfoDTO();
        for (let key in formData) {
            // setValue(key as keyof AcademicCourseGroupInfoDTO, formData[key as keyof AcademicCourseGroupInfoDTO]);
        }

        setFormData({ ...formData });
    }

    useEffect(() => {
        // if (params?.id) getAcademicCourseGroupInfoById(params?.id, formData, setValue, setFormData);
    }, []);

    return (
        <EnrollPoolTeacherMain>
            <EnrollPoolTeacherTop>
                <div className="heading">
                    <span className="page-heading"> Enroll Teacher </span>
                    {!params?.id ? <Breadcrumb links={breadcrumbLinks} /> : ''}
                </div>
            </EnrollPoolTeacherTop>
            <EnrollPoolTeacherForm className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="common-fields">
                    <div className="input-field">
                        <label htmlFor="application">Course</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select>
                                    <option>Select Course</option>
                                </select>
                            </div>
                            <FormErrorMessage error={errors?.bank} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="application">Workload</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select>
                                    <option>Select Workload</option>
                                </select>
                            </div>
                            <FormErrorMessage error={errors?.bank} />
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
                        <button className="lg-rounded-btn">
                            {params?.id ? 'Update' : 'Save'}
                        </button>
                    </div>
                </div>
            </EnrollPoolTeacherForm>
        </EnrollPoolTeacherMain>
    )
}

export default EnrollPoolTeacher;