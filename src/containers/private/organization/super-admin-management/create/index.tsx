import { FC, useEffect, useState } from "react";
import {
    SuperAdminManagementCreateSection,
    SuperAdminManagementCreateMain,
    SuperAdminManagementCreateTop,
} from "./style";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import Breadcrumb from "components/particles/breadcrumb";
import useOrganization from "../../useHooks";
import { AddSuperAdminDTO } from "utils/helpers/models/organization/add-super-admin.dto";
import useUtils from "hooks/useUtils";

const SuperAdminManagementCreate: FC = () => {
    const [formData, setFormData] = useState<AddSuperAdminDTO>(
        new AddSuperAdminDTO()
    );
    const [roles, setRoles] = useState<any[]>([]);
    const {
        handleSubmit,
        register,
        trigger,
        formState: { errors },
        setValue,
    } = useForm<AddSuperAdminDTO>();
    const {
        createSuperAdmin,
        updateSuperAdmin,
        getSuperAdminById,
        getRolesBySuperAdmin
    } = useOrganization();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const onSubmit = (formData: AddSuperAdminDTO) => {
        if (!params?.id) {
            createSuperAdmin(formData);
        } else {
            updateSuperAdmin(params?.id, formData);
        }
    };

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger([name]);
        setFormData({ ...formData, [name]: value });
    };

    const resetForm = () => {
        for (const key in formData) {
            setValue(key as keyof AddSuperAdminDTO, "");
        }

        setFormData({ ...new AddSuperAdminDTO() });
    };

    useEffect(() => {
        getRolesBySuperAdmin(setRoles);
        if (params?.id) {
            getSuperAdminById(params?.id, formData, setValue, setFormData);
        }
    }, []);

    return (
        <SuperAdminManagementCreateMain>
            <SuperAdminManagementCreateTop>
                <div className="left">
                    <span className="page-heading">Add Super Admin</span>
                    <Breadcrumb />
                </div>
            </SuperAdminManagementCreateTop>

            <SuperAdminManagementCreateSection className="p-custom-scrollbar-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>Name</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        {...register("name", { required: true })}
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <FormErrorMessage error={errors.name} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Email</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        {...register("email", { required: true })}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <FormErrorMessage error={errors.email} />
                            </div>
                        </div>
                        {!params?.id && <div className="input-field">
                            <label>Password</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        {...register("password", { required: !params?.id })}
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                    />
                                </div>
                                <FormErrorMessage error={errors.password} />
                            </div>
                        </div>}
                    </div>

                    <div className="common-fields">
                        <div className="input-field">
                            <label>Status</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select
                                        {...register("status", { required: true })}
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Status</option>
                                        <option value={1}>Yes</option>
                                        <option value={0}>No</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.status} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Role</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select {...register("role_id", { required: true })} value={formData.role_id} onChange={handleChange}>
                                        <option value="">Select Role</option>
                                        {roles.map((role: any, index: number) => {
                                            return <option value={role.id} key={index}>{role.name}</option>
                                        })}
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.role_id} />
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

                            <button className="lg-rounded-btn" type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </SuperAdminManagementCreateSection>
        </SuperAdminManagementCreateMain>
    );
};

export default SuperAdminManagementCreate;
