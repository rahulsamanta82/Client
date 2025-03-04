import { FC, useEffect, useState } from "react";
import { CreateCommonCoursesPoolForm, CreateCommonCoursesPoolMain, CreateCommonCoursesPoolTop } from "./style";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import useFinance from "containers/private/finance/useHooks";
import useUtils from "hooks/useUtils";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

interface CreateCommonCoursesPoolProps { }

const CreateCommonCoursesPool: FC<CreateCommonCoursesPoolProps> = ({ }) => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: 'Academics / ', path: siteRoutes.academicSessionListing },
        { title: 'Common Courses Pools /', path: siteRoutes.commonCoursesPoolsListing },
        { title: 'Common Courses Pools', path: siteRoutes.createCommonCoursesPools }
    ]
    const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<any>();
    let [formData, setFormData] = useState<any>({});
    // const { createCommonCoursesPoolInfo, updateCommonCoursesPoolInfo, getCommonCoursesPoolInfoById } = useFinance();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const onSubmit = () => {
        if (params?.id) {
            // updateCommonCoursesPoolInfo(params?.id, formData);
        } else {
            // createCommonCoursesPoolInfo(formData);
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger(name);
        setFormData({ ...formData, [name]: value });
    }

    const resetForm = () => {
        // formData = new CommonCoursesPoolInfoDTO();
        for (let key in formData) {
            // setValue(key as keyof CommonCoursesPoolInfoDTO, formData[key as keyof CommonCoursesPoolInfoDTO]);
        }

        setFormData({ ...formData });
    }

    useEffect(() => {
        // if (params?.id) getCommonCoursesPoolInfoById(params?.id, formData, setValue, setFormData);
    }, []);

    return (
        <CreateCommonCoursesPoolMain>
            <CreateCommonCoursesPoolTop>
                <div className="heading">
                    <span className="page-heading">{params?.id ? 'Update' : 'Add'} Course </span>
                    {!params?.id ? <Breadcrumb links={breadcrumbLinks} /> : ''}
                </div>
            </CreateCommonCoursesPoolTop>
            <CreateCommonCoursesPoolForm className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="common-fields">
                    <div className="input-field">
                        <label htmlFor="application">Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Enter Title" {...register('bank', { required: true })} value={formData?.bank} onChange={handleChange} />
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
            </CreateCommonCoursesPoolForm>
        </CreateCommonCoursesPoolMain>
    )
}

export default CreateCommonCoursesPool;