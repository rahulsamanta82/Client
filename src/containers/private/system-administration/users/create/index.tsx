import { FC, useState, useEffect, ChangeEvent } from "react";
import { CreateUserSection, CreateUserMain, CreateUserTop } from "./style";

import FormErrorMessage from "components/particles/forms/form-error-message";
import Breadcrumb from "components/particles/breadcrumb";
import { SmallUploadSvg } from "assets/images/common/svgs";
import CnicAvatar from "assets/images/common/others/cnic-upload-images.png";
import squareAvatar from "assets/images/common/others/avatar-square-image.png";
import useSystemAdministration from "../../useHooks";
import { UserManagementDTO } from "utils/helpers/models/system-administration/user-management.dto";
import { useForm } from "react-hook-form";
import useUtils from "hooks/useUtils";
import useOrganization from "containers/private/organization/useHooks";
import { upload } from "@testing-library/user-event/dist/upload";


const CreateSystemUser: FC = () => {

  let [formData, setFormData] = useState<UserManagementDTO>(new UserManagementDTO());
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<UserManagementDTO>();
  const [cities, setCities] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const { createUser, updateUser, getUserById, getRoles } = useSystemAdministration();
  const { getCitiesAdmin, getCountriesAdmin } = useOrganization();


  const handleFileUpload = (event: any) => {
    const { name, files } = event.target;
    const file = files[0];
    setFormData({ ...formData, [name]: URL.createObjectURL(file) });
    setValue(name, file);
  };

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    console.log(name, value);
    setValue(name, value);
    trigger(name);
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    formData = new UserManagementDTO();
    for (let key in formData) {
      setValue(key as keyof UserManagementDTO, formData[key as keyof UserManagementDTO]);
    }
    setFormData({ ...formData });
  };

  const [role, setRole] = useState<any[]>([]);

  useEffect(() => {
    getRoles(setRole);
    getCitiesAdmin(setCities);
    getCountriesAdmin(setCountries);


    if (params?.id) {
      getUserById(params?.id, formData, setFormData, setValue);
    }
  }, []);

  const onSubmit = (data: any) => {
    const form_data = new FormData();
    for (let key in formData) {
      if (key === "profile_image") {
        form_data.append(key, data[key])
      }
      else if (key === "cnic_image") {
        form_data.append(key, data[key])
      } else {
        form_data.append(key, (formData as any)[key]);
      }
    }
    if (params?.id) {
      updateUser(params?.id, form_data);
    } else {
      createUser(form_data, false, resetForm);
    }
  };

  return (
    <CreateUserMain>
      <CreateUserTop>
        <div className="left">
          <span className="page-heading">Add User</span>
          <Breadcrumb />
        </div>
        <div className="right"></div>
      </CreateUserTop>

      <CreateUserSection className="p-custom-scrollbar-8">
        <form>
          <div className="common-fields">
            <div className="input-field ">
              <label>First Name</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="text" placeholder="Enter First Name" {...register('first_name', { required: true })} value={formData.first_name} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.first_name} />
              </div>
            </div>

            <div className="input-field ">
              <label>Last Name</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="text" placeholder="Enter Last Name" {...register('last_name', { required: true })} value={formData.last_name} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.last_name} />
              </div>
            </div>

            <div className="input-field">
              <label>CNIC</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="text" placeholder="Enter CNIC" {...register('cnic', { required: true })} value={formData.cnic} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.cnic} />
              </div>
            </div>
          </div>


          <div className="common-fields">
            <div className="input-field ">
              <label>Passport No.</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="text" placeholder="Enter Passport no" {...register('passport_no', { required: true })} value={formData.passport_no} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.passport_no} />
              </div>
            </div>

            <div className="input-field ">
              <label>Phone Number</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="text" placeholder="Enter Phone no" {...register('phone_no', { required: true })} value={formData.phone_no} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.phone_no} />
              </div>
            </div>

            <div className="input-field ">
              <label>Email</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="email" placeholder="Enter Email" {...register('email', { required: true })} value={formData.email} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.email} />
              </div>
            </div>
          </div>
          <div className="common-fields">
          <div className="input-field">
              <label>City</label>
              <div className="field-wrap">
                <div className="field">
                  <select {...register('city', { required: true })} value={formData.city} onChange={handleChange}>
                    <option value="">Select City</option>
                    {cities?.map((item: any) => {
                      return (<option value={item?.id}>{item?.title}</option>)
                    })}
                  </select>
                </div>
                <FormErrorMessage error={errors.city} />
              </div>
            </div>

            <div className="input-field">
              <label>Country</label>
              <div className="field-wrap">
                <div className="field">
                  <select {...register('country', { required: true })} value={formData.country} onChange={handleChange}>
                    <option value="">Select Country</option>
                    {countries?.map((item: any) => {
                      return (<option value={item?.id}>{item?.name}</option>)
                    })}
                  </select>
                </div>
                <FormErrorMessage error={errors.country} />
              </div>
            </div>

            <div className="radio-field">
              <label htmlFor="no">Gender</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="radio" id="male" {...register('gender', { required: true })} value={'Male'} checked={formData.gender == 'Male'} onChange={handleChange} />
                  <label htmlFor="yes">Male</label>
                </div>
                <div className="field">
                  <input type="radio" id="female" {...register('gender', { required: true })} value={'Female'} checked={formData.gender == 'Female'} onChange={handleChange} />
                  <label htmlFor="no">Female</label>
                </div>
                <div className="field">
                  <input type="radio" id="others" {...register('gender', { required: true })} value={'Others'} checked={formData.gender == 'Others'} onChange={handleChange} />
                  <label htmlFor="no">other</label>
                </div>
                <FormErrorMessage error={errors.gender} />
              </div>
            </div>
          </div>
      

          <div className="common-fields">
            <div className="radio-field">
              <label htmlFor="no">Status</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="radio" id="active" {...register('status', { required: true })} value={1} checked={formData.status == '1'} onChange={handleChange} />
                  <label htmlFor="yes">Active</label>
                </div>
                <div className="field">
                  <input type="radio" id="active" {...register('status', { required: true })} value={0} checked={formData.status == '0'} onChange={handleChange} />
                  <label htmlFor="no">De-active</label>
                </div>
                <FormErrorMessage error={errors.status} />
              </div>
            </div>
            <div className="input-field">
              <label>Address</label>
              <div className="field-wrap">
                <div className="field">
                <input type="text" placeholder="Enter Address" {...register('address', { required: true })} value={formData.address} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.address} />
              </div>
            </div>
          </div>
          <div className="upload-field">
            <label htmlFor="cnic_image">CNIC Image</label>
            <label className="field-wrapper" htmlFor="cnic_image">
              <div className="file-name-section">
                <div className="inner-content">
                  <div className="upload-text">
                    <div className="upload-icon">
                      <SmallUploadSvg className="icon" />
                    </div>
                    <span className="text">Upload CNIC Picture</span>
                  </div>
                  <div className="upload-restrictions">
                    Select a 300x300 jpg image with maximum size of 400 KB
                  </div>
                </div>
              </div>
              <div className="uploaded-image cnic-avatar">
                <img  src={formData.cnic_image === '' ? CnicAvatar : formData.cnic_image} alt="" />

              </div>
              <input
                type="file"
                className="d-none"
                id="cnic_image"
                {...register("cnic_image", { required: false })}
                onChange={handleFileUpload}
              />
            </label>
            <FormErrorMessage error={errors.cnic_image} />
          </div>
          <div className="upload-field">
            <label htmlFor="profile_image">Profile Picture</label>
            <label className="field-wrapper" htmlFor="profile_image">
              <div className="file-name-section">
                <div className="inner-content">
                  <div className="upload-text">
                    <div className="upload-icon">
                      <SmallUploadSvg className="icon" />
                    </div>
                    <span className="text">Upload Profile Picture</span>
                  </div>
                  <div className="upload-restrictions">
                    Select a 300x300 jpg image with maximum size of 400 KB
                  </div>
                </div>
              </div>
              <div className="uploaded-image domicile">
                <img src={formData.profile_image === '' ? squareAvatar : formData.profile_image} alt="" />

              </div>
              <input
                type="file"
                className="d-none"
                id="profile_image"
                {...register("profile_image", { required: false })}
                onChange={handleFileUpload}
              />
            </label>
            <FormErrorMessage error={errors.profile_image} />
          </div>

          <div className="action-buttons">
            <div className="buttons">
              <button className="lg-rounded-btn gray" type="button">
                Reset
              </button>
              {/* <button className="lg-rounded-btn black">Save & Add more</button> */}
              <button className="lg-rounded-btn" type="button" onClick={handleSubmit(onSubmit)}>Save</button>
            </div>
          </div>
        </form>
      </CreateUserSection>
    </CreateUserMain>
  );
};

export default CreateSystemUser;
