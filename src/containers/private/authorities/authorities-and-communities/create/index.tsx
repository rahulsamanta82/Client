import { FC, useEffect, useState } from "react";
import {
  CreateAuthoritiesTop,
  CreateAuthoritiesFormSection,
  CreateAuthoritiesMain,
} from "./style";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useUtils from "hooks/useUtils";
import {
  AddOptionSvg,
  DeleteOptionSvg,
  SmallUploadSvg,
} from "assets/images/common/svgs";
import Editor from "components/particles/forms/editor";
import { AuthorityDTO, ExternalMember, InternalMember } from "utils/helpers/models/authorities/authorities.dto";
import useSystemAdministration from "containers/private/system-administration/useHooks";
import { UserManagementDTO } from "utils/helpers/models/system-administration/user-management.dto";
import useOrganization from "containers/private/organization/useHooks";
import useAuthorities from "../../useHooks";
import squareAvatar from "assets/images/common/others/avatar-square-image.png";
import { AuthorityTypesDTO } from "utils/helpers/models/authorities/authorities-types.dto";
import { AuthorityBoardDTO } from "utils/helpers/models/authorities/authority-board.dto";
import { warningToaster } from "utils/helpers/common/alert-service";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

interface CreateAdmissionCampaignProps { }

const CreateAuthorities: FC<CreateAdmissionCampaignProps> = () => {
  const { getQueryParams, extractAfterZeroDot, concatPathWithBackendUrl } = useUtils();
  const params = getQueryParams();
  const breadcrumbLinks: BreadcrumbLink[] = [
    {
      title: "Authorities & Committees /",
      path: siteRoutes.authoritiesListing,
    },

    {
      title: `${params?.id ? "Update" : 'Add'} Authorities & Committees`,
      path: siteRoutes.createAuthorities,
    },
  ]
  const { getUsers } = useSystemAdministration();
  const { getOrgStructures } = useOrganization();
  const { getCommitteeTypes, uploadAuthorityDocument, createAuthority, updateAuthority, getAuthorityBoards, getAuthorityById } = useAuthorities();
  const [users, setUsers] = useState<UserManagementDTO[]>([]);
  const [orgStructures, setOrgStructures] = useState<any[]>([]);
  const [authorityBoards, setAuthorityBoards] = useState<AuthorityBoardDTO[]>([]);
  const [memberTypes, setMemberTypes] = useState<AuthorityTypesDTO[]>([]);
  const [formData, setFormData] = useState<AuthorityDTO>(new AuthorityDTO());

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<AuthorityDTO>();

  const onSubmit = () => {
    if (!formData.document) {
      warningToaster('Please attach the document');
      return;
    }
    if (params?.id) {
      updateAuthority(params?.id, formData);
    } else {
      createAuthority(formData);
    }
  };

  const resetForm = () => {
    for (let key in getValues()) {
      setValue(key as keyof AuthorityDTO, "");
    }
    setFormData({ ...new AuthorityDTO() });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValue(name, value);
    formData[name as keyof AuthorityDTO] = value as never;
    setFormData({ ...formData });
    trigger(name);
  }

  const handleDynamicFieldChange = (event: any, arrayName: string, index: number) => {
    const { value, name } = event.target;
    setValue(name, value);
    const form_data: any = { ...formData };
    const formDataName = extractAfterZeroDot(name, index);
    form_data[arrayName][index][formDataName] = value;
    trigger([name]);
    setFormData({ ...form_data });
  };

  const handleAddInternalMember = () => {
    formData.internal_members.push(new InternalMember());
    setFormData({ ...formData });
  }

  const handleDeleteInternalMember = (index: number) => {
    formData.internal_members.splice(index, 1);
    setFormData({ ...formData });
  }
  const handleAddExternalMember = () => {
    formData.external_members.push(new ExternalMember());
    setFormData({ ...formData });
  }

  const handleDeleteExternalMember = (index: number) => {
    formData.external_members.splice(index, 1);
    setFormData({ ...formData });
  }

  const handleFileUpload = (event: any) => {
    const { files } = event.target;
    const body = new FormData();
    body.append('document', files[0]);
    uploadAuthorityDocument(body, formData, setFormData, setValue);
  };

  useEffect(() => {
    if (params?.id) {
      getAuthorityById(params?.id, formData, setFormData, setValue);
    }
    getUsers(setUsers);
    getOrgStructures(setOrgStructures);
    getCommitteeTypes(setMemberTypes);
    getAuthorityBoards(setAuthorityBoards);
  }, []);

  return (
    <CreateAuthoritiesMain>
      <CreateAuthoritiesTop>
        <div className="heading">
          <span className="page-heading">{params?.id ? 'Update' : 'Add'} Authorities & Committees </span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateAuthoritiesTop>

      <CreateAuthoritiesFormSection
        className="content-radius-shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="common-fields">
          <div className="input-field">
            <label>Reference No</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Reference No" {...register('reference', { required: true })} value={formData.reference} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.reference} />
            </div>
          </div>
          <div className="input-field">
            <label>Formation Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" {...register('formation_date', { required: true })} value={formData.formation_date} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.formation_date} />
            </div>
          </div>

          <div className="input-field">
            <label>Name/Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Name/Title" {...register('name', { required: true })} value={formData.name} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.name} />
            </div>
          </div>
          <div className="radio-field">
            <label>Active Status</label>
            <div className="field-wrap">
              <div className="field">
                <label htmlFor="is_active_yes">Active</label>
                <input type="radio" id="is_active_yes" value={1} {...register('is_active', { required: true })} checked={formData.is_active == 1} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="is_active_no">Deactivate</label>
                <input type="radio" id="is_active_no" value={0} {...register('is_active', { required: true })} checked={formData.is_active == 0} onChange={handleChange} />
              </div>
            </div>
            <FormErrorMessage error={errors.is_active} />
          </div>

          <div className="input-field">
            <label>Is Appointing Authority</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register('is_appointing_authority', { required: true })} value={formData.is_appointing_authority} onChange={handleChange}>
                  <option value="">Select one</option>
                  <option value={1}>Yes</option>
                  <option value={0}>No</option>
                </select>
              </div>
              <FormErrorMessage error={errors.is_appointing_authority} />
            </div>
          </div>
          <div className="input-field">
            <label>Type</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register('type_id', { required: true })} value={formData.type_id} onChange={handleChange}>
                  <option value="">Select Type</option>
                  {memberTypes.map((type, index) => {
                    return <option value={type.id} key={index}>{type.title}</option>
                  })}
                </select>
              </div>
              <FormErrorMessage error={errors?.type_id} />
            </div>
          </div>
          <div className="input-field">
            <label>Organization</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register('authority_board_id', { required: true })} value={formData.authority_board_id} onChange={handleChange}>
                  <option value="">Select Organization</option>
                  {authorityBoards.map((board, index) => {
                    return <option value={board.id} key={index}>{board.title}</option>
                  })}
                </select>
              </div>
              <FormErrorMessage error={errors?.authority_board_id} />
            </div>
          </div>
          <div className="input-field">
            <label>Campus</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register('campus_id', { required: true })} value={formData.campus_id} onChange={handleChange}>
                  <option value="">Select Campus</option>
                  {orgStructures.map((structure, index) => {
                    return <option value={structure.id} key={index}>{structure.title}</option>
                  })}
                </select>
              </div>
              <FormErrorMessage error={errors.campus_id} />
            </div>
          </div>
          <div className="input-field">
            <label>Teaching type</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register('teaching_type', { required: true })} value={formData.teaching_type} onChange={handleChange}>
                  <option value="all">All</option>
                  <option value='teaching'>Teaching</option>
                  <option value='non-teaching'>Non-Teaching</option>
                </select>
              </div>
              <FormErrorMessage error={errors.teaching_type} />
            </div>
          </div>
          <div className="input-field">
            <label>Faculty</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register('faculty_id', { required: true })} value={formData.faculty_id} onChange={handleChange}>
                  <option value="">Select Faculty</option>
                  {orgStructures.map((structure, index) => {
                    return <option value={structure.id} key={index}>{structure.title}</option>
                  })}
                </select>
              </div>
              <FormErrorMessage error={errors.faculty_id} />
            </div>
          </div>
          <div className="input-field">
            <label>Department</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register('department_id', { required: true })} value={formData.department_id} onChange={handleChange}>
                  <option value="">Select Department</option>
                  {orgStructures.map((structure, index) => {
                    return <option value={structure.id} key={index}>{structure.title}</option>
                  })}
                </select>
              </div>
              <FormErrorMessage error={errors.department_id} />
            </div>
          </div>
        </div>
        <div className="upload-field">
          <label>Attath Document/Letter</label>
          <label className="field-wrapper">
            <div className="file-name-section">
              <div className="inner-content">
                <div className="upload-text">
                  <div className="upload-icon">
                    <SmallUploadSvg className="icon" />
                  </div>
                  <span className="text">Upload Attath Document/Letter</span>
                </div>
                <div className="upload-restrictions">
                  Select a 300x300 jpg image with maximum size of 400 KB
                </div>
              </div>
            </div>

            <input type="file" className="d-none" onChange={handleFileUpload} />
            <div className="uploaded-file">
              {formData.document && <img src={concatPathWithBackendUrl(formData.document)} />}
            </div>
          </label>
        </div>
        <div className="editor-field">
          <label>Description</label>
          <div className="field-wrap">
            <div className="field">
              <Editor
                value={formData.description}
                register={register}
                onChange={(name: string, value: string) =>
                  handleChange({ target: { name, value } })
                }
                name="description"
              />
            </div>
          </div>
          <FormErrorMessage error={errors.description} />
        </div>
        {/* internal memeber section */}
        <div>
          <div className="subform-heading">
            <span>Add Internal Member</span>
          </div>
          {formData.internal_members.map((field, index) => (
            <div className="common-fields">
              <div className="input-field">
                <label>Member</label>
                <div className="field-wrap">
                  <div className="field">
                    <select {...register(`internal_members.${index}.user_id`, { required: true })} value={formData.internal_members[index].user_id} onChange={(e) => handleDynamicFieldChange(e, 'internal_members', index)}>
                      <option value="">Select Member</option>
                      {users.map((user, index) => {
                        return <option value={user.id} key={index}>{`${user.first_name} ${user.last_name}`}</option>
                      })}
                    </select>
                  </div>
                  <FormErrorMessage error={errors?.internal_members?.[index]?.user_id} />
                </div>
              </div>

              <div className="input-field">
                <label>Member Type</label>
                <div className="field-wrap">
                  <div className="field">
                    <select {...register(`internal_members.${index}.authority_mem_type_id`, { required: true })} value={formData.internal_members[index].authority_mem_type_id} onChange={(e) => handleDynamicFieldChange(e, 'internal_members', index)}>
                      <option value="">Select Member Type</option>
                      {memberTypes.map((type, index) => {
                        return <option value={type.id} key={index}>{type.title}</option>
                      })}
                    </select>
                  </div>
                  <FormErrorMessage error={errors?.internal_members?.[index]?.authority_mem_type_id} />
                </div>
              </div>

              <div className="input-field">
                <label>Active From</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="date" {...register(`internal_members.${index}.active_from`, { required: true })} value={formData.internal_members[index].active_from} onChange={(e) => handleDynamicFieldChange(e, 'internal_members', index)} />
                  </div>
                  <FormErrorMessage error={errors.internal_members?.[index]?.active_from} />
                </div>
              </div>

              <div className="input-field last">
                <label>Active To</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="date" {...register(`internal_members.${index}.active_to`, { required: true })} value={formData.internal_members[index].active_to} onChange={(e) => handleDynamicFieldChange(e, 'internal_members', index)} />
                  </div>
                  <div className="action-buttons">
                    {index === formData.internal_members.length - 1 && (
                      <div
                        className="particular-btn cp"
                        onClick={handleAddInternalMember}
                      >
                        <AddOptionSvg />
                      </div>
                    )}
                    {
                      formData.internal_members.length !== 1 && (
                        <div
                          className="particular-btn cp"
                          onClick={() => handleDeleteInternalMember(index)}
                        >
                          <DeleteOptionSvg />
                        </div>
                      )}
                  </div>
                </div>
                <FormErrorMessage error={errors?.internal_members?.[index]?.active_to} />
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="subform-heading">
            <span>Add External Member</span>
          </div>
          {formData.external_members.map((field, index) => (
            <div className="common-fields">
              <div className="input-field">
                <label>First Name</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" {...register(`external_members.${index}.first_name`, { required: true })} value={formData.external_members[index].first_name} onChange={(e) => handleDynamicFieldChange(e, 'external_members', index)} />
                  </div>
                  <FormErrorMessage error={errors?.external_members?.[index]?.first_name} />
                </div>
              </div>

              <div className="input-field">
                <label>Last Name</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" {...register(`external_members.${index}.last_name`, { required: true })} value={formData.external_members[index].last_name} onChange={(e) => handleDynamicFieldChange(e, 'external_members', index)} />
                  </div>
                  <FormErrorMessage error={errors?.external_members?.[index]?.last_name} />
                </div>
              </div>

              <div className="input-field last">
                <label>Email</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="email" {...register(`external_members.${index}.email`, { required: true })} value={formData.external_members[index].email} onChange={(e) => handleDynamicFieldChange(e, 'external_members', index)} />
                  </div>
                  <div className="action-buttons">
                    {index === formData.external_members.length - 1 && (
                      <div
                        className="particular-btn cp"
                        onClick={handleAddExternalMember}
                      >
                        <AddOptionSvg />
                      </div>
                    )}
                    {
                      formData.external_members.length !== 1 && (
                        <div
                          className="particular-btn cp"
                          onClick={() => handleDeleteExternalMember(index)}
                        >
                          <DeleteOptionSvg />
                        </div>
                      )}
                  </div>
                </div>
                <FormErrorMessage error={errors?.external_members?.[index]?.email} />
              </div>
            </div>
          ))}
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
            <button className="lg-rounded-btn" type="submit">
              {params?.id ? "Update" : 'Submit'}
            </button>
          </div>
        </div>
      </CreateAuthoritiesFormSection>
    </CreateAuthoritiesMain>
  );
};

export default CreateAuthorities;
