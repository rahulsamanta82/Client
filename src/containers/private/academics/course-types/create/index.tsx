import { FC, useEffect, useState } from "react";
import { CreateCourseTypeForm, CreateCourseTypeMain, CreateCourseTypeTop } from "./style";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import useFinance from "../../useHooks";
import useUtils from "hooks/useUtils";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { CourseTypeDTO } from "utils/helpers/models/academics/course-type.dto";
import useAcademics from "../../useHooks";

interface CreateCourseTypeProps { }

const CreateCourseType: FC<CreateCourseTypeProps> = ({ }) => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: 'Academics / ', path: siteRoutes.academicSessionListing },
        { title: 'Course types / ', path: siteRoutes.courseTypesListing },
        { title: 'Add Course type', path: siteRoutes.createCourseType },
    ]
    const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<CourseTypeDTO>();
    const [formData, setFormData] = useState<CourseTypeDTO>(new CourseTypeDTO());
    const { getQueryParams } = useUtils();
    const params = getQueryParams();
    const { createCourseType, updateCourseType, getCourseTypeById } = useAcademics();

    const onSubmit = () => {
        if (params?.id) {
            updateCourseType(params?.id, formData);
        } else {
            createCourseType(formData);
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger(name);
        setFormData({ ...formData, [name]: value });
    }

    const resetForm = () => {
        formData.title = ''
        setValue('title', formData.title)
        setFormData({ ...formData });
    }

    useEffect(() => {
        if (params?.id) getCourseTypeById(params?.id, formData, setValue, setFormData);
    }, []);

    return (
        <CreateCourseTypeMain>
            <CreateCourseTypeTop>
                <div className="heading">
                    <span className="page-heading">Add Course type</span>
                    {!params?.id ? <Breadcrumb links={breadcrumbLinks} /> : ''}
                </div>
            </CreateCourseTypeTop>
            <CreateCourseTypeForm className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="common-fields">
                    <div className="input-field">
                        <label htmlFor="application">Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Title" {...register('title', { required: true })} value={formData.title} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors.title} />
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
                            Cancel
                        </button>
                        <button className="lg-rounded-btn">
                            {params?.id ? 'Update' : 'Submit'}
                        </button>
                    </div>
                </div>
            </CreateCourseTypeForm>
        </CreateCourseTypeMain>
    )
}

export default CreateCourseType;