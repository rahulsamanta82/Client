import { FC, Fragment, useEffect, useState } from "react";
import Breadcrumb from "components/particles/breadcrumb";
import {
  RollManagementCreateMain,
  RollManagementCreateTop,
  Form,
  RollManagementCreateSection,
} from "./style";
import useOrganization from "../../useHooks";
import { AddRoleDTO } from "utils/helpers/models/organization/add-role.dto";
import { useForm } from "react-hook-form";
import { warningToaster } from "utils/helpers/common/alert-service";
import { warningMessages } from "utils/helpers/enums/messages.enum";
import useUtils from "hooks/useUtils";
import FormErrorMessage from "components/particles/forms/form-error-message";

interface AdmissionStudentListingProps { }

const RollManagementCreate: FC<AdmissionStudentListingProps> = ({ }) => {
  const [permissions, setPermissions] = useState<any>({});
  const {
    getPermissionsByAdmin,
    createRoleByAdmin,
    updateRoleByAdmin,
    getRoleByIdByAdmin,
  } = useOrganization();
  const [formData, setFormData] = useState<AddRoleDTO>(new AddRoleDTO());
  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<AddRoleDTO>();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const toggleRowExpand = (key: string) => {
    permissions[key]["isExpanded"] = !permissions[key]["isExpanded"];
    setPermissions({ ...permissions });
  };

  useEffect(() => {
    if (formData.guard_name) {
      setPermissions([]);
      const { guard_name } = formData;
      const queryParams = { guard_name, per_page: "All" };
      getPermissionsByAdmin(setPermissions, queryParams);
    }
  }, [formData.guard_name]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValue(name, value);
    trigger([name]);

    if (name === "guard_name") {
      setFormData({ ...formData, permission: [], [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleChangePermissions = (id: number) => {
    if (formData.permission.includes(id)) {
      const index = formData.permission.indexOf(id);
      formData.permission.splice(index, 1);
    } else {
      formData.permission.push(id);
    }

    setFormData({ ...formData });
  };

  const onSubmit = (data: AddRoleDTO) => {
    if (!formData.permission.length) {
      warningToaster(warningMessages.permissionsRequiredMsg);
      return;
    }

    if (params?.id) {
      updateRoleByAdmin(params?.id, formData);
    } else {
      createRoleByAdmin(formData);
    }
  };

  const resetForm = () => {
    for (let key in formData) {
      if (key === "permission") {
        setValue(key as keyof AddRoleDTO, []);
      } else {
        setValue(key as keyof AddRoleDTO, "");
      }
    }

    setFormData({ ...new AddRoleDTO() });
  };

  useEffect(() => {
    if (params?.id)
      getRoleByIdByAdmin(params?.id, formData, setValue, setFormData);
  }, []);

  return (
    <RollManagementCreateMain>
      <RollManagementCreateTop>
        <div className="left">
          <span className="page-heading">
            {params?.id ? "Update" : "Create New"} Role
          </span>
          <Breadcrumb />
        </div>
      </RollManagementCreateTop>

      <RollManagementCreateSection className="content-radius-shadow">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="filter-fields">
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
              <label>Role Type</label>
              <div className="field-wrap">
                <div className="field">
                  <select
                    {...register("guard_name", { required: true })}
                    value={formData.guard_name}
                    onChange={handleChange}
                  >
                    <option value="">Select Role Type</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <FormErrorMessage error={errors.name} />
              </div>
            </div>
            <div className="input-field">
              <label>Status</label>
              <div className="field-wrap">
                <div className="field">
                  <select
                    {...register("status")}
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="">Select status</option>
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </select>
                </div>
                <FormErrorMessage error={errors.status} />
              </div>
            </div>
          </div>

          <div className="data-table">
            <table className="bottom-bordered-cells">
              <div className="input-field">
                <label>Permissions:</label>
              </div>
              <tbody>
                {Object.entries(permissions)?.map(
                  ([key, value]: any[], index: number) => (
                    <Fragment key={index}>
                      <tr>
                        <td className="main-drop-down">
                          <div className="mw-150 module-name">{key}</div>
                          <div
                            className="rounded-expand-button"
                            onClick={() => toggleRowExpand(key)}
                          >
                            <span>{value.isExpanded ? "-" : "+"}</span>
                          </div>
                        </td>
                      </tr>

                      {value?.isExpanded && (
                        <tr>
                          <td>
                            <div className="expanded-content">
                              {value?.data?.map((item: any, index: number) => {
                                return (
                                  <div className="particular-info" key={index}>
                                    <span className="title">
                                      <input
                                        // {...register(`permission.${index}`, { required: false })}
                                        type="checkbox"
                                        name={item.id}
                                        id={item.id}
                                        checked={formData.permission.includes(
                                          item.id
                                        )}
                                        onChange={() =>
                                          handleChangePermissions(item?.id)
                                        }
                                      />
                                    </span>
                                    <label className="info" htmlFor={item.id}>
                                      {item.name}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className="submit-buttons">
            <div className="buttons">
              <button
                className="lg-rounded-btn gray"
                type="button"
                onClick={resetForm}
              >
                Reset
              </button>
              <button className="lg-rounded-btn">Submit</button>
            </div>
          </div>
        </Form>
      </RollManagementCreateSection>
    </RollManagementCreateMain>
  );
};

export default RollManagementCreate;
