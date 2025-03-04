import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useEffect, useState } from "react";
import {
    CreateStudentGroupSection,
    CreateStudentGroupMain,
    CreateStudentGroupTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useForm } from "react-hook-form";
import { TemplateCourseDTO } from "utils/helpers/models/academics/template-course.dto";
import useAcademics from "../../useHooks";
import useUtils from "hooks/useUtils";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useOrganization from "containers/private/organization/useHooks";
import { GradeTemplateDTO } from "utils/helpers/models/academics/grade-template.dto";

export const CreateAcademicTemplateCourse: FC = () => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Template Courses  / ", path: siteRoutes.academicTemplateCoursesListing },
        { title: "Add Template Course", path: siteRoutes.createAcademicTemplateCourse },
    ]
    const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<TemplateCourseDTO>();
    let [formData, setFormData] = useState<TemplateCourseDTO>(new TemplateCourseDTO());
    const [gradeTemplates, setGradeTemplates] = useState<GradeTemplateDTO[]>([]);
    const { createTemplateCourse, updateTemplateCourse, getTemplateCourseById, getGradeTemplates } = useAcademics();
    const [orgStructures, setOrgStructures] = useState<any[]>([]);
    const { getOrgStructures } = useOrganization();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const onSubmit = () => {
        if (params?.id) {
            updateTemplateCourse(params?.id, formData);
        } else {
            createTemplateCourse(formData);
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger(name);
        setFormData({ ...formData, [name]: value });
    }

    const resetForm = () => {
        formData = new TemplateCourseDTO();
        for (let key in formData) {
            setValue(key as keyof TemplateCourseDTO, formData[key as keyof TemplateCourseDTO]);
        }

        setFormData({ ...formData });
    }

    useEffect(() => {
        if (params?.id) {
            getTemplateCourseById(params?.id, formData, setValue, setFormData);
        }
        getOrgStructures(setOrgStructures);
        getGradeTemplates(setGradeTemplates);
    }, []);

    return (
        <CreateStudentGroupMain>
            <CreateStudentGroupTop>
                <div className="left">
                    <span className="page-heading">Add Template Courses</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </CreateStudentGroupTop>

            <CreateStudentGroupSection className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="common-fields">
                    <div className="input-field">
                        <label>Course Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Enter Title" {...register('tc_title', { required: true })} value={formData.tc_title} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors.tc_title} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Course Short Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" {...register('tc_short_title', { required: true })} value={formData.tc_short_title} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors.tc_short_title} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Course Code</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" {...register('tc_code', { required: true })} value={formData.tc_code} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors.tc_code} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Theory Credit Hours</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="number" {...register('tc_credit_hours', { required: true })} value={formData.tc_credit_hours} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors.tc_credit_hours} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Lab Credit Hours</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" {...register('tc_lab_credit_hours', { required: true })} value={formData.tc_lab_credit_hours} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors.tc_lab_credit_hours} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Department</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select {...register('department_id', { required: true })} value={formData.department_id} onChange={handleChange}>
                                    <option value="">Select Department</option>
                                    {orgStructures.map((structure, index) => {
                                        return <option value={structure.id} key={index}>{structure.title}</option>
                                    })}
                                </select>
                            </div>
                            <FormErrorMessage error={errors.department_id} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Grading Scheme Template</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select {...register('grade_template_id', { required: true })} value={formData.grade_template_id} onChange={handleChange}>
                                    <option value="">Select Grading Scheme Template</option>
                                    {gradeTemplates.map((template, index) => {
                                        return <option value={template.id}>{template.title}</option>
                                    })}
                                </select>
                            </div>
                            <FormErrorMessage error={errors.grade_template_id} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label> Course Catalog Description</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" {...register('tc_description', { required: true })} value={formData.tc_description} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors.tc_description} />
                        </div>
                    </div>
                    <div className="radio-field">
                        <label htmlFor="no">Status</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="radio" id="is-active" {...register('tc_is_active', { required: true })} value={1} checked={formData.tc_is_active == 1} onChange={handleChange} />
                                <label htmlFor="is-active">Active</label>
                            </div>
                            <div className="field">
                                <input type="radio" id="is-inactive" {...register('tc_is_active', { required: true })} value={0} checked={formData.tc_is_active == 0} onChange={handleChange} />
                                <label htmlFor="is-inactive">Inactive</label>
                            </div>
                        </div>
                        <FormErrorMessage error={errors.tc_is_active} />
                    </div>
                    <div className="radio-field">
                        <label htmlFor="no">Is Lab</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="radio" id="tc_is_lab_yes" {...register('tc_is_lab', { required: true })} value={1} checked={formData.tc_is_lab == 1} onChange={handleChange} />
                                <label htmlFor="tc_is_lab_yes">Yes</label>
                            </div>
                            <div className="field">
                                <input type="radio" id="tc_is_lab_no" {...register('tc_is_lab', { required: true })} value={0} checked={formData.tc_is_lab == 0} onChange={handleChange} />
                                <label htmlFor="tc_is_lab_no">No</label>
                            </div>
                        </div>
                        <FormErrorMessage error={errors.tc_is_lab} />
                    </div>
                    <div className="radio-field">
                        <label htmlFor="no">Is Virtual</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="radio" id="tc_is_virtual_yes" {...register('tc_is_virtual', { required: true })} value={1} checked={formData.tc_is_virtual == 1} onChange={handleChange} />
                                <label htmlFor="tc_is_virtual_yes">Yes</label>
                            </div>
                            <div className="field">
                                <input type="radio" id="tc_is_virtual_no" {...register('tc_is_virtual', { required: true })} value={0} checked={formData.tc_is_virtual == 0} onChange={handleChange} />
                                <label htmlFor="tc_is_virtual_no">No</label>
                            </div>
                        </div>
                        <FormErrorMessage error={errors.tc_is_virtual} />
                    </div>
                    <div className="radio-field">
                        <label htmlFor="no">Is Elective</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="radio" id="tc_is_elective_yes" {...register('tc_is_elective', { required: true })} value={1} checked={formData.tc_is_elective == 1} onChange={handleChange} />
                                <label htmlFor="tc_is_elective_yes">Yes</label>
                            </div>
                            <div className="field">
                                <input type="radio" id="tc_is_elective_no" {...register('tc_is_elective', { required: true })} value={0} checked={formData.tc_is_elective == 0} onChange={handleChange} />
                                <label htmlFor="tc_is_elective_no">No</label>
                            </div>
                        </div>
                        <FormErrorMessage error={errors.tc_is_elective} />
                    </div>
                    <div className="radio-field">
                        <label htmlFor="no">Is Non-Credit</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="radio" id="tc_is_non_credit_yes" {...register('tc_is_non_credit', { required: true })} value={1} checked={formData.tc_is_non_credit == 1} onChange={handleChange} />
                                <label htmlFor="tc_is_non_credit_yes">Yes</label>
                            </div>
                            <div className="field">
                                <input type="radio" id="tc_is_non_credit_no" {...register('tc_is_non_credit', { required: true })} value={0} checked={formData.tc_is_non_credit == 0} onChange={handleChange} />
                                <label htmlFor="tc_is_non_credit_no">No</label>
                            </div>
                        </div>
                        <FormErrorMessage error={errors.tc_is_non_credit} />
                    </div>
                    <div className="radio-field">
                        <label htmlFor="no">For All Departments</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="radio" id="for_all_yes" {...register('for_all', { required: true })} value={1} checked={formData.for_all == 1} onChange={handleChange} />
                                <label htmlFor="for_all_yes">Yes</label>
                            </div>
                            <div className="field">
                                <input type="radio" id="for_all_no" {...register('for_all', { required: true })} value={0} checked={formData.for_all == 0} onChange={handleChange} />
                                <label htmlFor="for_all_no">No</label>
                            </div>
                        </div>
                        <FormErrorMessage error={errors.for_all} />
                    </div>
                    <div className="radio-field">
                        <label htmlFor="no">Is Thesis/Research?</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="radio" id="tc_is_research_course_yes" {...register('tc_is_research_course', { required: true })} value={1} checked={formData.tc_is_research_course == 1} onChange={handleChange} />
                                <label htmlFor="tc_is_research_course_yes">Yes</label>
                            </div>
                            <div className="field">
                                <input type="radio" id="tc_is_research_course_no" {...register('tc_is_research_course', { required: true })} value={0} checked={formData.tc_is_research_course == 0} onChange={handleChange} />
                                <label htmlFor="tc_is_research_course_no">No</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="submit-buttons">
                    <div className="buttons">
                        <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>
                            Reset
                        </button>
                        <button className="lg-rounded-btn">Submit</button>
                    </div>
                </div>
            </CreateStudentGroupSection>
        </CreateStudentGroupMain>
    );
};

export default CreateAcademicTemplateCourse;
