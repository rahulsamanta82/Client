import { FC, useEffect, useState } from "react";
import { CreateAuthorityBoardForm, CreateAuthorityBoardMain, CreateAuthorityBoardTop } from "./style";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import useUtils from "hooks/useUtils";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { AuthorityBoardDTO } from "utils/helpers/models/authorities/authority-board.dto";
import useAuthorities from "../../useHooks";

interface CreateAuthorityBoardProps { }

const CreateAuthorityBoard: FC<CreateAuthorityBoardProps> = ({ }) => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: 'Authority & Committees / ', path: siteRoutes.authoritiesListing },
        { title: 'Authority Boards / ', path: siteRoutes.authorityBoardsListing },
        { title: 'Add Authority Board', path: siteRoutes.createAuthorityBoard },
    ]
    const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<AuthorityBoardDTO>();
    let [formData, setFormData] = useState<AuthorityBoardDTO>(new AuthorityBoardDTO());
    const { createAuthorityBoard, updateAuthorityBoard, getAuthorityBoardById } = useAuthorities();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const onSubmit = () => {
        if (params?.id) {
            updateAuthorityBoard(params?.id, formData);
        } else {
            createAuthorityBoard(formData);
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger(name);
        setFormData({ ...formData, [name]: value });
    }

    const resetForm = () => {
        formData = new AuthorityBoardDTO();
        for (let key in formData) {
            setValue(key as keyof AuthorityBoardDTO, formData[key as keyof AuthorityBoardDTO]);
        }

        setFormData({ ...formData });
    }

    useEffect(() => {
        if (params?.id) {
            getAuthorityBoardById(params?.id, formData, setFormData, setValue);
        }
      }, []);

    return (
        <CreateAuthorityBoardMain>
            <CreateAuthorityBoardTop>
                <div className="heading">
                    <span className="page-heading">Authority Boards</span>
                    {!params?.id ? <Breadcrumb links={breadcrumbLinks} /> : ''}
                </div>
            </CreateAuthorityBoardTop>
            <CreateAuthorityBoardForm className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
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
                    <div className="radio-field">
                        <label htmlFor="no">Status</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="radio" id="is_active_yes" {...register('is_active', { required: true })} value={1} onChange={handleChange} checked={formData.is_active == 1} />
                                <label htmlFor="is_active_yes">Yes</label>
                            </div>
                            <div className="field">
                                <input type="radio" id="is_active_no" {...register('is_active', { required: true })} value={0} onChange={handleChange} checked={formData.is_active == 0} />
                                <label htmlFor="is_active_no">No</label>
                            </div>
                        </div>
                        <FormErrorMessage error={errors.is_active} />
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
            </CreateAuthorityBoardForm>
        </CreateAuthorityBoardMain>
    )
}

export default CreateAuthorityBoard;