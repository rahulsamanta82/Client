import { ChangeEvent, FC, useEffect, useState } from "react";
import { CreateOrgMain, Form, TopSection } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import profileLogo from "assets/images/organization/others/profile-logo.png";
import Editor from "components/particles/forms/editor";
import { useForm } from "react-hook-form";
import { AddOrganizationDTO } from "utils/helpers/models/organization/add-organization.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useUtils from "hooks/useUtils";
import useOrganization from "../../useHooks";
import { warningToaster } from "utils/helpers/common/alert-service";
import { warningMessages } from "utils/helpers/enums/messages.enum";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateOrganization: FC = () => {
  const breadcrumbLinks = [
    { title: "Organization /", path: siteRoutes.organizationListing },
    { title: "Add Organization", path: siteRoutes.createOrganization },
  ]
  const { getQueryParams } = useUtils();
  let [formData, setFormData] = useState<AddOrganizationDTO>(
    new AddOrganizationDTO()
  );
  const {
    createOrganization,
    getCitiesSuperAdmin,
    getDistrictsSuperAdmin,
    getOrganizationById,
    updateOrganization,
    getStatesBySuperAdmin,
  } = useOrganization();
  const params = getQueryParams();
  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<AddOrganizationDTO>({
    defaultValues: formData,
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValue(name, value);
    formData[name as keyof AddOrganizationDTO] = value as never;
    setFormData({ ...formData });
    trigger(name);
  };

  // const watchFields = watch(['district', 'city', 'state']);

  const onSubmit = (data: AddOrganizationDTO) => {
    if (!formData.logo) {
      warningToaster(warningMessages.logoRequiredMsg);
      return;
    }
    const form_data = new FormData();
    for (let key in data) {
      form_data.append(key, data[key as keyof AddOrganizationDTO]);
    }
    if (params?.id) {
      updateOrganization(form_data, params?.id);
    } else {
      createOrganization(form_data);
    }
  };

  useEffect(() => {
    if (params?.id)
      getOrganizationById(params?.id, getValues, setValue, setFormData);
    getCitiesSuperAdmin(setCities);
    getDistrictsSuperAdmin(setDistricts);
    getStatesBySuperAdmin(setStates);
  }, []);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file: any = event.target.files![0];
    if (file) {
      setValue("logo", file);
      setFormData({ ...formData, logo: URL.createObjectURL(file) });
      trigger(["logo"]);
    }
  };

  const resetForm = () => {
    for (let key in getValues()) {
      setValue(key as keyof AddOrganizationDTO, "");
    }
    formData = new AddOrganizationDTO();
    setFormData({ ...formData });
  };

  const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target as any;
    setValue(name, value);
    setFormData({ ...formData, [name]: value });
    trigger([name]);
  };

  return (
    <CreateOrgMain>
      <TopSection>
        <span className="page-heading">
          {params?.id ? "Update" : "Add"} Organization
        </span>
        {!params?.id && <Breadcrumb links={breadcrumbLinks} />}
      </TopSection>
      <Form className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
        <div className="upload-profile-image-field">
          <div className="field">
            <label className="image" htmlFor={"org-logo"}>
              <img src={formData.logo ?? profileLogo} alt="" />
              <input
                type="file"
                className="d-none"
                id="org-logo"
                {...register("logo", { required: false })}
                onChange={handleUpload}
              />
            </label>
            <label htmlFor={"org-logo"}>Organization Logo</label>
          </div>
          <FormErrorMessage error={errors?.logo} />
        </div>
        <div className="common-fields">
          <div className="input-field">
            <label>Organization Name</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="text"
                  {...register("name", { required: true })}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="xyz"
                />
              </div>
              <FormErrorMessage error={errors?.name} />
            </div>
          </div>
          <div className="input-field">
            <label>Website</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="url"
                  placeholder="xyzdomain.com"
                  {...register("website", { required: true })}
                  value={formData.website}
                  onChange={handleChange}
                  disabled={params?.id}
                />
              </div>
              <FormErrorMessage error={errors?.website} />
            </div>
          </div>
          <div className="input-field">
            <label>Email</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="email"
                  placeholder="xyz@gmail.com"
                  {...register("email", { required: true })}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <FormErrorMessage error={errors?.email} />
            </div>
          </div>
          <div className="input-field">
            <label>Phone</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="tel"
                  placeholder="+92 000000000"
                  {...register("phone", { required: true })}
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <FormErrorMessage error={errors?.phone} />
            </div>
          </div>
          <div className="input-field">
            <label>Address</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="text"
                  placeholder="Street abc"
                  {...register("address1", { required: true })}
                  value={formData.address1}
                  onChange={handleChange}
                />
              </div>
              <FormErrorMessage error={errors?.address1} />
            </div>
          </div>
          <div className="input-field">
            <label>City</label>
            <div className="field-wrap">
              <div className="field">
                <select
                  {...register("city", { required: true })}
                  onChange={handleChange}
                  value={formData.city}
                >
                  <option value="">Select City</option>
                  {cities?.map((city: any, index: number) => {
                    return (
                      <option value={city.id} key={index}>
                        {city.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <FormErrorMessage error={errors?.city} />
            </div>
          </div>
          <div className="input-field">
            <label>District</label>
            <div className="field-wrap">
              <div className="field">
                <select
                  {...register("district", { required: true })}
                  onChange={handleChange}
                  value={formData.district}
                >
                  <option value="">Select District</option>
                  {districts?.map((district: any, index: number) => {
                    return (
                      <option value={district.id} key={index}>
                        {district.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <FormErrorMessage error={errors?.district} />
            </div>
          </div>
          <div className="input-field">
            <label>Select State</label>
            <div className="field-wrap">
              <div className="field">
                <select
                  {...register("state", { required: true })}
                  onChange={handleChange}
                  value={formData.state}
                >
                  <option value="">Select State</option>
                  {states?.map((state: any, index: number) => {
                    return (
                      <option value={state.id} key={index}>
                        {state.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <FormErrorMessage error={errors?.state} />
            </div>
          </div>
          {!params?.id && (
            <div className="input-field">
              <label>Password</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="text"
                    {...register("password", { required: true })}
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <FormErrorMessage error={errors?.password} />
              </div>
            </div>
          )}

          <div className="input-field">
            <label>Username</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="text"
                  {...register("username", { required: true })}
                  placeholder="Enter Usename"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <FormErrorMessage error={errors?.username} />
            </div>
          </div>

          <div className="radio-field">
            <label>Allow Organization to Add Structure Type</label>
            <div className="field-wrap">
              <div className="field">
                <label htmlFor="yes">Yes</label>
                <input
                  type="radio"
                  id="yes"
                  value={1}
                  checked={formData.add_structure_type == 1}
                  {...register("add_structure_type", { required: true })}
                  onChange={onRadioChange}
                />
              </div>
              <div className="field">
                <label htmlFor="no">No</label>
                <input
                  type="radio"
                  id="no"
                  value={0}
                  checked={formData.add_structure_type == 0}
                  {...register("add_structure_type", { required: true })}
                  onChange={onRadioChange}
                />
              </div>
            </div>
            <FormErrorMessage error={errors?.add_structure_type} />
          </div>
        </div>
        <div className="detail-fields">
          <div className="editor-field">
            <label>Mission</label>
            <div className="field-wrap">
              <div className="field">
                <Editor
                  value={formData.mission}
                  onChange={(name: string, value: string) =>
                    handleChange({ target: { name, value } })
                  }
                  name="mission"
                />
                <input
                  type="text"
                  className="d-none"
                  {...register("mission", { required: true })}
                />
              </div>
              <FormErrorMessage error={errors.mission} />
            </div>
          </div>
          <div className="editor-field">
            <label>Vision</label>
            <div className="field-wrap">
              <div className="field">
                <Editor
                  value={formData.vision}
                  onChange={(name: string, value: string) =>
                    handleChange({ target: { name, value } })
                  }
                  name="vision"
                />
                <input
                  type="text"
                  className="d-none"
                  {...register("vision", { required: true })}
                />
              </div>
              <FormErrorMessage error={errors.vision} />
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
              {params?.id ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </Form>
    </CreateOrgMain>
  );
};

export default CreateOrganization;
