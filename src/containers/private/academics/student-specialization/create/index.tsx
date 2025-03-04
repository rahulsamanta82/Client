import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useEffect, useState } from "react";
import {
    CreateStudentSpecializationSection,
    CreateStudentSpecializationMain,
    CreateStudentSpecializationTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useForm } from "react-hook-form";
import { StudentSpecializationDTO } from "utils/helpers/models/academics/student-specialization.dto";
import useUtils from "hooks/useUtils";
import useAcademics from "../../useHooks";
import FormErrorMessage from "components/particles/forms/form-error-message";

export const CreateStudentSpecialization: FC = () => {
    const { getQueryParams } = useUtils();
    const params = getQueryParams();
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Student Specialization  / ", path: siteRoutes.studentSpecializationsListing },
        { title: `${params?.id ? 'Update': 'Add'} Student Specialization`, path: siteRoutes.createStudentSpecialization },
    ]
    const { handleSubmit, register, setValue, trigger, formState: {errors}} = useForm<StudentSpecializationDTO>();
    let [formData, setFormData] = useState<StudentSpecializationDTO>(new StudentSpecializationDTO());
    const { createStudentSpecialization, updateStudentSpecialization, getStudentSpecializationById } = useAcademics();

    const onSubmit = () => {
        if(params?.id){
            updateStudentSpecialization(params?.id, formData);
        }else{
            createStudentSpecialization(formData);
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name,value);
        trigger(name);
        setFormData({...formData, [name]: value});
    }

    const resetForm = () => {
        formData = new StudentSpecializationDTO();
        for(let key in formData){
            setValue(key as keyof StudentSpecializationDTO, formData[key as keyof StudentSpecializationDTO]);
        }

        setFormData({...formData});
    }

    useEffect(() => {
        if(params?.id) getStudentSpecializationById(params?.id, formData, setValue, setFormData);
    }, []);

    return (
        <CreateStudentSpecializationMain>
            <CreateStudentSpecializationTop>
                <div className="left">
                    <span className="page-heading">{params?.id ? "Update" : 'Add'} Specialization</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </CreateStudentSpecializationTop>
`
            <CreateStudentSpecializationSection className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="common-fields">
                    <div className="input-field">
                        <label>Specialization Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Enter Title" {...register('title', {required: true})} value={formData.title} onChange={handleChange}/>
                            </div>
                            <FormErrorMessage error={errors.title}/>
                        </div>
                    </div>
                    <div className="radio-field">
                        <label htmlFor="no">Status</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="radio" id="active" {...register('status', { required: true })} value={1} checked={formData.status == 1} onChange={handleChange} />
                                <label htmlFor="active">Active</label>
                            </div>
                            <div className="field">
                                <input type="radio" id="inactive" {...register('status', { required: true })} value={0} checked={formData.status == 0} onChange={handleChange} />
                                <label htmlFor="inactive">Inactive</label>
                            </div>
                        </div>
                        <FormErrorMessage error={errors.status}/>
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
            </CreateStudentSpecializationSection>
        </CreateStudentSpecializationMain>
    );
};

export default CreateStudentSpecialization;
