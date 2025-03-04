import { FC, useEffect, useState, ChangeEvent } from "react";
import {
  CreateNotificationsTop,
  CreateNotificationsFormSection,
  CreateNotificationsMain,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useComponentVisible from "hooks/click-outside";
import useUtils from "hooks/useUtils";
import { SmallUploadSvg } from "assets/images/common/svgs";
import Editor from "components/particles/forms/editor";
import { Controller } from "react-hook-form";
import { AuthorityNotificationsDTO } from "utils/helpers/models/authorities/authority-notifications.dto";
import useAuthorities from "../../useHooks";
import { useLocation } from 'react-router-dom';


const CreateNotifications: FC = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<AuthorityNotificationsDTO>();
  let [formData, setFormData] = useState<AuthorityNotificationsDTO>(new AuthorityNotificationsDTO());
  const { getAcademicNotificationById, createAcademicNotification, updateAcademicNotification, getAuthorityMeetings } = useAuthorities();

  const [sessions, setSessions] = useState<any[]>([]);
  const [previousLevel, setPreviousLevel] = useState<string | null>(null);

  const {
    isComponentVisible: showDropdown,
    setIsComponentVisible: setShowDropdown,
    ref: dropdownRef,
  } = useComponentVisible();
  const { getQueryParams, compareDateStrings } = useUtils();
  const params = getQueryParams();
  const [searchedPrograms, setSearchedPrograms] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [campus, setCampus] = useState<any[]>([]);

  const resetForm = () => {
    formData = new AuthorityNotificationsDTO();
    for (let key in formData) {
      setValue(key as keyof AuthorityNotificationsDTO, formData[key as keyof AuthorityNotificationsDTO]);
    }
    setFormData({ ...formData });
  };

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    console.log(name, value);
    setValue(name, value);
    trigger(name);
    setFormData({ ...formData, [name]: value });
  };
  const [AuthorityMeeting, setAuthorityMeeting] = useState<any[]>([]);

  useEffect(() => {
    getAuthorityMeetings(setAuthorityMeeting);
    if (params?.id) {
      getAcademicNotificationById(params?.id, formData, setFormData, setValue);
    }
  }, []);


  const handleSearchChange = (event: any) => {
    const { value } = event.target;
    setSearch(value);
    const programsHelper = programs.filter((program) =>
      program.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchedPrograms([...programsHelper]);
  };
  const handleFileUpload = (event: any) => {
    const { name, files } = event.target;
    const file = files[0];
    setFormData({ ...formData, [name]: URL.createObjectURL(file) });
    setValue(name, file);
  };

  const triggerSpecificField = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target as any;
    setValue(name, value);
    setFormData({ ...formData, [name]: value });
    trigger([name]);
  };

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const authority_id = queryParams.get('authority_id');
  const onSubmit = (data: any) => {
    const form_data = new FormData();
    
    for (let key in formData) {
      if (key === "attachments") {
        form_data.append(key, data[key])
      }else {
        form_data.append(key, (formData as any)[key]);
      }
    }
    if (authority_id) {
      
      form_data.append("authority_id", authority_id);
    }
    if (params?.id) {
      updateAcademicNotification(params?.id, form_data);
    } else {
      createAcademicNotification(form_data, false, resetForm);
    }
  };
  return (
    <CreateNotificationsMain>
      <CreateNotificationsTop>
        <div className="heading">
          <span className="page-heading">
            Add Academic Council Notifications
          </span>
          <Breadcrumb />
        </div>
      </CreateNotificationsTop>

      <CreateNotificationsFormSection
        className="content-radius-shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="common-fields">
          <div className="input-field">
            <label>Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" placeholder="Enter Date" {...register('date', { required: true })} value={formData.date} onChange={handleChange} />
              </div>
            </div>
            <FormErrorMessage error={errors?.date} />
          </div>
          <div className="input-field">
            <label>Subject</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Notification Subject" {...register('subject', { required: true })} value={formData.subject} onChange={handleChange} />
              </div>
            </div>
            <FormErrorMessage error={errors?.is_public} />
          </div>

          <div className="input-field">
            <label>Meeting</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register('meeting_id', { required: true })} value={formData.meeting_id} onChange={handleChange}>
                  <option value="">Select Meeting</option>
                  {AuthorityMeeting?.map((item: any) => {
                    return (<option value={item?.id}>{item?.title}</option>)
                  })}
                </select>
              </div>
            </div>
            <FormErrorMessage error={errors?.meeting_id} />
          </div>

          {/* <div className="input-field">
            <label>Attatch Meeting Document</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div> */}
          <div className="input-field">
            <label>Send Notification To</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register('is_public', { required: true })} value={formData.is_public} onChange={handleChange}>
                  <option value="">Select an option</option>
                  <option value="0">Only Committee Members</option>
                  <option value="1">To All Accounts</option>
                </select>
              </div>
              <FormErrorMessage error={errors?.is_public} />
            </div>
          </div>
        </div>
        <div className="upload-field">
          <label>Document</label>
          <label className="field-wrapper">
            <div className="file-name-section">
              <div className="inner-content">
                <div className="upload-text">
                  <div className="upload-icon">
                    <SmallUploadSvg className="icon" />
                  </div>
                  <span className="text">Upload Document</span>
                </div>
                <div className="upload-restrictions">
                  Select a 300x300 jpg image with maximum size of 400 KB
                </div>
              </div>
            </div>

            <input
              type="file"
              className="d-none"
              id="profile_image"
              {...register("attachments", { required: false })}
              onChange={handleFileUpload}
            />
          </label>
        </div>
        <FormErrorMessage error={errors?.attachments} />

        <div className="editor-field">
          <label>Description</label>
          <div className="field-wrap">
            <div className="field">
              <input
                type="text"
                className="d-none"
                {...register('description', { required: true })}
                value={formData.description}
                onChange={handleChange}
              />
              <Editor
                value={formData.description}
                onChange={(name: string, value: string) =>
                  handleChange({ target: { name: 'description', value } })
                }
                name="description"
              />
            </div>
          </div>
          <FormErrorMessage error={errors?.description} />
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
            <button className="lg-rounded-btn" type="button" onClick={handleSubmit(onSubmit)}>
              Submit
            </button>
          </div>
        </div>
      </CreateNotificationsFormSection>
    </CreateNotificationsMain>
  );
};

export default CreateNotifications;
