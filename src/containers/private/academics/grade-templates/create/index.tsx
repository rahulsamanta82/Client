import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useEffect, useState } from "react";
import {
    CreateAcademicExamTypeSection,
    CreateAcademicExamTypeMain,
    CreateAcademicExamTypeTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useForm } from "react-hook-form";
import { GradeTemplateDTO } from "utils/helpers/models/academics/grade-template.dto";
import useAcademics from "../../useHooks";
import useUtils from "hooks/useUtils";
import FormErrorMessage from "components/particles/forms/form-error-message";

export const CreateAcademicGradeTemplate: FC = () => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Grades Template /", path: siteRoutes.academicGradeTemplatesListing },
        { title: "Add Grades Template", path: siteRoutes.createAcademicGradeTemplate },
    ]
    const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<GradeTemplateDTO>();
    let [formData, setFormData] = useState<GradeTemplateDTO>(new GradeTemplateDTO());
    const { createGradeTemplate, updateGradeTemplate, getGradeTemplateById } = useAcademics();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const onSubmit = () => {
        if (params?.id) {
            updateGradeTemplate(params?.id, formData);
        } else {
            createGradeTemplate(formData);
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger(name);
        setFormData({ ...formData, [name]: value });
    }

    const resetForm = () => {
        formData = new GradeTemplateDTO();
        for (let key in formData) {
            setValue(key as keyof GradeTemplateDTO, formData[key as keyof GradeTemplateDTO]);
        }

        setFormData({ ...formData });
    }

    useEffect(() => {
        if (params?.id) getGradeTemplateById(params?.id, formData, setValue, setFormData);
    }, []);

    return (
        <CreateAcademicExamTypeMain>
            <CreateAcademicExamTypeTop>
                <div className="left">
                    <span className="page-heading">Add Grades Template</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </CreateAcademicExamTypeTop>

            <CreateAcademicExamTypeSection className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="common-fields">
                    <div className="input-field">
                        <label>Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Enter Title" {...register('title', {required: true})} value={formData.title} onChange={handleChange}/>
                            </div>
                            <FormErrorMessage error={errors.title}/>
                        </div>
                    </div>
                    <div className="radio-field">
                        <label htmlFor="no">Is Generic </label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="radio" id="is_generic_yes" {...register('is_generic', { required: true })} value={1} checked={formData.is_generic == 1} onChange={handleChange} />
                                <label htmlFor="is_generic_yes">Yes</label>
                            </div>
                            <div className="field">
                                <input type="radio" id="is_generic_no" {...register('is_generic', { required: true })} value={0} checked={formData.is_generic == 0} onChange={handleChange} />
                                <label htmlFor="is_generic_no">No</label>
                            </div>
                        </div>
                        <FormErrorMessage error={errors.is_generic}/>
                    </div>
                    <div className="radio-field">
                        <label htmlFor="no">Is Public </label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="radio" id="public_yes" {...register('public', { required: true })} value={1} checked={formData.public == 1} onChange={handleChange} />
                                <label htmlFor="public_yes">Yes</label>
                            </div>
                            <div className="field">
                                <input type="radio" id="public_no" {...register('public', { required: true })} value={0} checked={formData.public == 0} onChange={handleChange} />
                                <label htmlFor="public_no">No</label>
                            </div>
                        </div>
                        <FormErrorMessage error={errors.public}/>
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
            </CreateAcademicExamTypeSection>
        </CreateAcademicExamTypeMain>
    );
};

export default CreateAcademicGradeTemplate;
