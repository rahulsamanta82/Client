import { FC, Fragment, useState } from "react";
import Breadcrumb from "components/particles/breadcrumb";
import {
    PermissionManagementCreateMain,
    PermissionManagementCreateTop,
    Form,
    PermissionManagementCreateSection,
} from "./style";
import { AddPermissionDTO } from "utils/helpers/models/organization/add-permission.dto";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useOrganization from "../../useHooks";

interface AdmissionStudentListingProps { }

const PermissionManagementCreate: FC<AdmissionStudentListingProps> = ({ }) => {
    const [formData, setFormData] = useState<AddPermissionDTO>(new AddPermissionDTO());
    const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm<AddPermissionDTO>();
    const { createPermission } = useOrganization();

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setValue(name, value);
        trigger([name]);
        setFormData({ ...formData, [name]: value });
    }

    const resetForm = () => {
        for (let key in formData) {
            setValue(key as keyof AddPermissionDTO, '');
            formData[key as keyof AddPermissionDTO] = '';
        }

        setFormData({ ...formData });
    }

    const onSubmit = (data: AddPermissionDTO) => {
        createPermission(data);
    }

    const roleTypes: any[] = [
        { title: 'Select Role Type', value: '' },
        { title: 'Super Admin', value: 'super-admin' },
        { title: 'Admin', value: 'admin' },
        { title: 'User', value: 'user' },
    ]

    return (
        <PermissionManagementCreateMain>
            <PermissionManagementCreateTop>
                <div className="left">
                    <span className="page-heading">Create New Permission</span>
                    <Breadcrumb />
                </div>
            </PermissionManagementCreateTop>

            <PermissionManagementCreateSection className="content-radius-shadow">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>Permissions</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input type="text" placeholder="Permisssions Name" {...register('name', { required: true })} value={formData.name} onChange={handleChange} />
                                </div>
                                <FormErrorMessage error={errors.name} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>
                                Role Type
                            </label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select {...register('guard_name', { required: true })} value={formData.guard_name} onChange={handleChange}>
                                        {roleTypes.map((item: any, index: number) => {
                                            return <option value={item.value} key={index}>{item.title}</option>
                                        })}
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.guard_name} />
                            </div>
                        </div>
                    </div>
                    <div className="submit-buttons">
                        <div className="buttons">
                            <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>Back</button>
                            <button className="lg-rounded-btn">Submit</button>
                        </div>
                    </div>
                </Form>
            </PermissionManagementCreateSection>
        </PermissionManagementCreateMain>
    );
};

export default PermissionManagementCreate;

