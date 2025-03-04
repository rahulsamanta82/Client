import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useEffect, useState } from "react";
import {
    CreateAcademicStatusSection,
    CreateAcademicStatusMain,
    CreateAcademicStatusTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useForm } from "react-hook-form";
import { AcademicStatusDTO } from "utils/helpers/models/academics/academic-status.dto";
import useUtils from "hooks/useUtils";
import useAcademics from "../../useHooks";
import FormErrorMessage from "components/particles/forms/form-error-message";

export const CreateAcademicStatus: FC = () => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Academic Status / ", path: siteRoutes.academicStatusListing },
        { title: "Add Academic Status", path: siteRoutes.createAcademicStatus },
    ]
    const { handleSubmit, register, setValue, trigger, formState: {errors}} = useForm<AcademicStatusDTO>();
    let [formData, setFormData] = useState<AcademicStatusDTO>(new AcademicStatusDTO());
    const { createAcademicStatus, updateAcademicStatus, getAcademicStatusById } = useAcademics();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const onSubmit = () => {
        if(params?.id){
            updateAcademicStatus(params?.id, formData);
        }else{
            createAcademicStatus(formData);
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name,value);
        trigger(name);
        setFormData({...formData, [name]: value});
    }

    const resetForm = () => {
        formData = new AcademicStatusDTO();
        for(let key in formData){
            setValue(key as keyof AcademicStatusDTO, formData[key as keyof AcademicStatusDTO]);
        }

        setFormData({...formData});
    }

    useEffect(() => {
        if(params?.id) getAcademicStatusById(params?.id, formData, setValue, setFormData);
    }, []);

    return (
        <CreateAcademicStatusMain>
            <CreateAcademicStatusTop>
                <div className="left">
                    <span className="page-heading">Add Academic Status</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </CreateAcademicStatusTop>

            <CreateAcademicStatusSection className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
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
                    <div className="input-field">
                        <label>Code</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Enter Status Code" {...register('code', {required: true})} value={formData.code} onChange={handleChange}/>
                            </div>
                            <FormErrorMessage error={errors.code}/>
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
            </CreateAcademicStatusSection>
        </CreateAcademicStatusMain>
    );
};

export default CreateAcademicStatus;
