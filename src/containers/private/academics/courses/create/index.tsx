import { FC, useEffect, useState } from "react";
import { CreateAcademicCourseForm, CreateAcademicCourseMain, CreateAcademicCourseTop } from "./style";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import useFinance from "containers/private/finance/useHooks";
import useUtils from "hooks/useUtils";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

interface CreateAcademicCourseProps { }

const CreateAcademicCourse: FC<CreateAcademicCourseProps> = ({ }) => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: 'Academics/ ', path: siteRoutes.academicSessionListing },
        { title: 'Academic Sessions/ ', path: siteRoutes.academicSessionListing },
        { title: 'Manage Academic Sessions / ', path: siteRoutes.academicSessionManagementListing },
        { title: 'Courses ', path: siteRoutes.academicCourseListing },
        { title: 'Add Course ', path: siteRoutes.createAcademicCourse },
    ]
    const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<any>();
    let [formData, setFormData] = useState<any>({});
    // const { createAcademicCourseInfo, updateAcademicCourseInfo, getAcademicCourseInfoById } = useFinance();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const onSubmit = () => {
        if (params?.id) {
            // updateAcademicCourseInfo(params?.id, formData);
        } else {
            // createAcademicCourseInfo(formData);
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger(name);
        setFormData({ ...formData, [name]: value });
    }

    const resetForm = () => {
        // formData = new AcademicCourseInfoDTO();
        for (let key in formData) {
            // setValue(key as keyof AcademicCourseInfoDTO, formData[key as keyof AcademicCourseInfoDTO]);
        }

        setFormData({ ...formData });
    }

    useEffect(() => {
        // if (params?.id) getAcademicCourseInfoById(params?.id, formData, setValue, setFormData);
    }, []);

    return (
        <CreateAcademicCourseMain>
            <CreateAcademicCourseTop>
                <div className="heading">
                    <span className="page-heading">{params?.id ? 'Update' : 'Add'} Course </span>
                    {!params?.id ? <Breadcrumb links={breadcrumbLinks} /> : ''}
                </div>
            </CreateAcademicCourseTop>
            <CreateAcademicCourseForm className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="common-fields">
                    <div className="input-field">
                        <label htmlFor="application">AcademicCourse Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Course Title" {...register('bank', { required: true })} value={formData?.bank} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors?.bank} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fine-slot-title">Course Code</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select name="" id="">
                                    <option value="">Course code</option>
                                </select>
                            </div>
                            <FormErrorMessage error={errors.account_no} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fine-slot-title">Department</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select name="" id="">
                                    <option value="">Select Department</option>
                                </select>
                            </div>
                            <FormErrorMessage error={errors.account_no} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fine-slot-title">Credit Hours</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select name="" id="">
                                    <option value="">Select Credit hours</option>
                                </select>
                            </div>
                            <FormErrorMessage error={errors.account_no} />
                        </div>
                    </div>
                    <div className="radio-field">
                        <label htmlFor="no">Is Virtual</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="radio" id="active" {...register('is_active', { required: true })} value={1} checked={formData.is_active == 1} onChange={handleChange} />
                                <label htmlFor="active">Yes</label>
                            </div>
                            <div className="field">
                                <input type="radio" id="inactive" {...register('is_active', { required: true })} value={0} checked={formData.is_active == 0} onChange={handleChange} />
                                <label htmlFor="inactive">No</label>
                            </div>
                        </div>
                    </div>
                    <div className="radio-field">
                        <label htmlFor="no">Is Lab</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="radio" id="active" {...register('is_active', { required: true })} value={1} checked={formData.is_active == 1} onChange={handleChange} />
                                <label htmlFor="active">Yes</label>
                            </div>
                            <div className="field">
                                <input type="radio" id="inactive" {...register('is_active', { required: true })} value={0} checked={formData.is_active == 0} onChange={handleChange} />
                                <label htmlFor="inactive">No</label>
                            </div>
                        </div>
                    </div>
                    <div className="radio-field">
                        <label htmlFor="no">Is Elective</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="radio" id="active" {...register('is_active', { required: true })} value={1} checked={formData.is_active == 1} onChange={handleChange} />
                                <label htmlFor="active">Yes</label>
                            </div>
                            <div className="field">
                                <input type="radio" id="inactive" {...register('is_active', { required: true })} value={0} checked={formData.is_active == 0} onChange={handleChange} />
                                <label htmlFor="inactive">No</label>
                            </div>
                        </div>
                    </div>
                    <div className="radio-field">
                        <label htmlFor="no">Status</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="radio" id="active" {...register('is_active', { required: true })} value={1} checked={formData.is_active == 1} onChange={handleChange} />
                                <label htmlFor="active">Active</label>
                            </div>
                            <div className="field">
                                <input type="radio" id="inactive" {...register('is_active', { required: true })} value={0} checked={formData.is_active == 0} onChange={handleChange} />
                                <label htmlFor="inactive">Deactivate</label>
                            </div>
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
            </CreateAcademicCourseForm>
        </CreateAcademicCourseMain>
    )
}

export default CreateAcademicCourse;