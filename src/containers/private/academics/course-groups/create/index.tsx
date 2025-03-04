import { FC, useEffect, useState } from "react";
import { CreateAcademicCourseGroupForm, CreateAcademicCourseGroupMain, CreateAcademicCourseGroupTop } from "./style";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import useFinance from "containers/private/finance/useHooks";
import useUtils from "hooks/useUtils";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

interface CreateAcademicCourseGroupProps { }

const CreateAcademicCourseGroup: FC<CreateAcademicCourseGroupProps> = ({ }) => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: 'Academics / ', path: siteRoutes.academicSessionListing },
        { title: 'Academic Sessions / ', path: siteRoutes.academicSessionListing },
        { title: 'Course Groups /', path: siteRoutes.academicCourseGroupListing },
        { title: 'Add Course Group', path: siteRoutes.createAcademicCourseGroup }
    ]
    const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<any>();
    let [formData, setFormData] = useState<any>({});
    // const { createAcademicCourseGroupInfo, updateAcademicCourseGroupInfo, getAcademicCourseGroupInfoById } = useFinance();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const onSubmit = () => {
        if (params?.id) {
            // updateAcademicCourseGroupInfo(params?.id, formData);
        } else {
            // createAcademicCourseGroupInfo(formData);
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
        <CreateAcademicCourseGroupMain>
            <CreateAcademicCourseGroupTop>
                <div className="heading">
                    <span className="page-heading">{params?.id ? 'Update' : 'Add'} Course </span>
                    {!params?.id ? <Breadcrumb links={breadcrumbLinks} /> : ''}
                </div>
            </CreateAcademicCourseGroupTop>
            <CreateAcademicCourseGroupForm className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="common-fields">
                    <div className="input-field">
                        <label htmlFor="application">Group title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Group title" {...register('bank', { required: true })} value={formData?.bank} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors?.bank} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fine-slot-title">Group Type</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select name="" id="">
                                    <option value="">Select group type</option>
                                </select>
                            </div>
                            <FormErrorMessage error={errors.account_no} />
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
            </CreateAcademicCourseGroupForm>
        </CreateAcademicCourseGroupMain>
    )
}

export default CreateAcademicCourseGroup;