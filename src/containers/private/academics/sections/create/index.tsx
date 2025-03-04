import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useEffect, useState } from "react";
import {
    CreateAcademicSectionForm,
    CreateAcademicSectionMain,
    CreateAcademicSectionTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useForm } from "react-hook-form";
import { AcademicSectionDTO } from "utils/helpers/models/academics/academic-section.dto";
import useUtils from "hooks/useUtils";
import useAcademics from "../../useHooks";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useOrganization from "containers/private/organization/useHooks";

export const CreateAcademicSection: FC = () => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Sections  / ", path: siteRoutes.studentGroupListing },
        { title: "Add Section", path: siteRoutes.createAcademicSection },
    ]
    const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<AcademicSectionDTO>();
    let [formData, setFormData] = useState<AcademicSectionDTO>(new AcademicSectionDTO());
    const { createAcademicSection, updateAcademicSection, getAcademicSectionById } = useAcademics();
    const { getPrograms, getOrgStructures } = useOrganization();
    const [programs, setPrograms] = useState<any[]>([]);
    const [orgStructures, setOrgStructures] = useState<any[]>([]);
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const onSubmit = () => {
        if (params?.id) {
            updateAcademicSection(params?.id, formData);
        } else {
            createAcademicSection(formData);
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger(name);
        setFormData({ ...formData, [name]: value });
    }

    const resetForm = () => {
        formData = new AcademicSectionDTO();
        for (let key in formData) {
            setValue(key as keyof AcademicSectionDTO, formData[key as keyof AcademicSectionDTO]);
        }

        setFormData({ ...formData });
    }

    useEffect(() => {
        if (params?.id){
            getAcademicSectionById(params?.id, formData, setValue, setFormData);
        }
        getOrgStructures(setOrgStructures);
        getPrograms(setPrograms);
    }, []);

    return (
        <CreateAcademicSectionMain>
            <CreateAcademicSectionTop>
                <div className="left">
                    <span className="page-heading">Add Section</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </CreateAcademicSectionTop>

            <CreateAcademicSectionForm className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="common-fields">
                    <div className="input-field">
                        <label>Section Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Enter Title" {...register('title', {required: true})} value={formData.title} onChange={handleChange}/>
                            </div>
                            <FormErrorMessage error={errors.title}/>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Department</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select {...register('department_id', {required: true})} value={formData.department_id} onChange={handleChange}>
                                    <option value="">Select Department</option>
                                    {orgStructures.map((dept,index) => {
                                        return <option value={dept.id} key={index}>{dept.title}</option>
                                    })}
                                </select>
                            </div>
                            <FormErrorMessage error={errors.department_id}/>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Program</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select {...register('program_id', {required: true})} value={formData.program_id} onChange={handleChange}>
                                    <option value="">Select Program</option>
                                    {programs.map((program,index) => {
                                        return <option value={program.id} key={index}>{program.title}</option>
                                    })}
                                </select>
                            </div>
                            <FormErrorMessage error={errors.program_id}/>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Enrollment Size</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="number" {...register('enrollment_size', {required: true})} value={formData.enrollment_size} onChange={handleChange}/>
                            </div>
                            <FormErrorMessage error={errors.enrollment_size}/>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Semester No</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="number" {...register('semester_number', {required: true})} value={formData.semester_number} onChange={handleChange}/>
                            </div>
                            <FormErrorMessage error={errors.semester_number}/>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Sequence No</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" {...register('sequence_number', {required: true})} value={formData.sequence_number} onChange={handleChange}/>
                            </div>
                            <FormErrorMessage error={errors.sequence_number}/>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Shift</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select {...register('Shift', {required: true})} value={formData.Shift} onChange={handleChange}>
                                    <option value="">Select Shift</option>
                                    <option value="M">Morning</option>
                                    <option value="E">Evening</option>
                                </select>
                            </div>
                            <FormErrorMessage error={errors.Shift}/>
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
                                <label htmlFor="inactive">Inactive</label>
                            </div>
                        </div>
                    </div>
                    <div className="radio-field">
                        <label htmlFor="no">Is First Half</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="radio" id="is_first_half_yes" {...register('is_first_half', { required: true })} value={1} checked={formData.is_first_half == 1} onChange={handleChange} />
                                <label htmlFor="is_first_half_yes">Yes</label>
                            </div>
                            <div className="field">
                                <input type="radio" id="is_first_half_no" {...register('is_first_half', { required: true })} value={0} checked={formData.is_first_half == 0} onChange={handleChange} />
                                <label htmlFor="is_first_half_no">No</label>
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
            </CreateAcademicSectionForm>
        </CreateAcademicSectionMain>
    );
};

export default CreateAcademicSection;
