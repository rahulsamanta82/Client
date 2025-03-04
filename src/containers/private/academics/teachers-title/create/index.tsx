import { FC, useEffect, useState } from "react";
import { CreateTeachersTitleForm, CreateTeachersTitleMain, CreateTeachersTitleTop } from "./style";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import useFinance from "../../useHooks";
import useUtils from "hooks/useUtils";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useAcademics from "../../useHooks";
import { TeachersTitleDTO } from "utils/helpers/models/academics/teachers-title.dto";

interface CreateTeachersTitleProps { }

const CreateTeachersTitle: FC<CreateTeachersTitleProps> = ({ }) => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: 'Authority & Committees / ', path: siteRoutes.academicSessionListing },
        { title: 'Teachers titles / ', path: siteRoutes.teachersTitlesListing },
        { title: 'Add Teachers title', path: siteRoutes.createTeachersTitle },
    ]
    const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<TeachersTitleDTO>();
    let [formData, setFormData] = useState<TeachersTitleDTO>(new TeachersTitleDTO());
    const { getQueryParams } = useUtils();
    const params = getQueryParams();
    const { createTeachersTitle, updateTeachersTitle, getTeachersTitleById } = useAcademics();

    const onSubmit = () => {
        if (params?.id) {
            updateTeachersTitle(params?.id, formData);
        } else {
            createTeachersTitle(formData);
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger(name);
        setFormData({ ...formData, [name]: value });
    }

    const resetForm = () => {
        formData.title = '';
        setValue('title', formData.title)
        setFormData({ ...formData });
    }

    useEffect(() => {
        if (params?.id) getTeachersTitleById(params?.id, formData, setValue, setFormData);
    }, []);

    return (
        <CreateTeachersTitleMain>
            <CreateTeachersTitleTop>
                <div className="heading">
                    <span className="page-heading">Add Teachers title</span>
                    {!params?.id ? <Breadcrumb links={breadcrumbLinks} /> : ''}
                </div>
            </CreateTeachersTitleTop>
            <CreateTeachersTitleForm className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
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
            </CreateTeachersTitleForm>
        </CreateTeachersTitleMain>
    )
}

export default CreateTeachersTitle;