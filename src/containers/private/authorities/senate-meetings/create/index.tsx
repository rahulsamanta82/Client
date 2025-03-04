import { FC, useState, ChangeEvent } from "react";
import {
  CreateAuthoritiesTop,
  CreateAuthoritiesFormSection,
  CreateAuthoritiesMain,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import {
  SmallUploadSvg,
} from "assets/images/common/svgs";
import Editor from "components/particles/forms/editor";
import { AuthorityMeetingdDTO } from "utils/helpers/models/authorities/authority-meeting.dto";
import useAuthorities from "../../useHooks";
import useUtils from "hooks/useUtils";
import { warningToaster } from "utils/helpers/common/alert-service";

interface CreateAdmissionCampaignProps { }

const CreateMeetings: FC<CreateAdmissionCampaignProps> = () => {
  const { getQueryParams, concatPathWithBackendUrl } = useUtils();
  const params = getQueryParams();
  const { authority_id } = params;
  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<AuthorityMeetingdDTO>();
  const { createAuthorityMeeting, updateAuthorityMeeting, uploadAuthorityMeetingDocument } = useAuthorities();
  let [formData, setFormData] = useState<AuthorityMeetingdDTO>(
    { ...new AuthorityMeetingdDTO(), authority_id }
  );

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    console.log(name, value);
    setValue(name, value);
    trigger(name);
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (event: any) => {
    const { name, files } = event.target;
    const file = files[0];
    const form_data = new FormData();
    form_data.append('document', file);
    console.log(form_data, 'formdata')
    uploadAuthorityMeetingDocument(form_data, name, formData, setFormData, setValue)
  };

  const resetForm = () => {
    formData = new AuthorityMeetingdDTO();
    for (let key in formData) {
      setValue(
        key as keyof AuthorityMeetingdDTO,
        formData[key as keyof AuthorityMeetingdDTO]
      );
    }
    setFormData({ ...formData });
  };

  const onSubmit = () => {
    for (let attachment of formData.attachments) {
      if (!attachment.filename) {
        warningToaster(`${attachment.type} document is required`);
        return;
      }
    }
    if (params?.id) {
      updateAuthorityMeeting(params?.id, formData);
    } else {
      createAuthorityMeeting(formData, false, resetForm);
    }
  };

  return (
    <CreateAuthoritiesMain>
      <CreateAuthoritiesTop>
        <div className="heading">
          <span className="page-heading">Add Senate Meetings </span>
          <Breadcrumb />
        </div>
      </CreateAuthoritiesTop>

      <CreateAuthoritiesFormSection className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label>Title</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="text"
                  placeholder="Enter Title"
                  {...register("title", { required: true })}
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
            </div>
            <FormErrorMessage error={errors?.title} />
          </div>
          <div className="input-field">
            <label>Date</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="date"
                  placeholder="Meeting date"
                  {...register("date", { required: true })}
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>
            <FormErrorMessage error={errors?.date} />
          </div>
        </div>
        <div className="upload-field">
          <label>Notice</label>
          <label className="field-wrapper">
            <div className="file-name-section">
              <div className="inner-content">
                <div className="upload-text">
                  <div className="upload-icon">
                    <SmallUploadSvg className="icon" />
                  </div>
                  <span className="text">Upload the Notice</span>
                </div>
                <div className="upload-restrictions">
                  Select a 300x300 jpg image with maximum size of 400 KB
                </div>
              </div>
            </div>

            <input type="file" className="d-none" name="notice" onChange={handleFileUpload} />
            <div className="uploaded-file">
              {formData.attachments[0].filename ? <img src={concatPathWithBackendUrl(formData.attachments[0].filename)} /> : ''}
            </div>
          </label>
        </div>
        <div className="upload-field">
          <label>Attach Agenda</label>
          <label className="field-wrapper">
            <div className="file-name-section">
              <div className="inner-content">
                <div className="upload-text">
                  <div className="upload-icon">
                    <SmallUploadSvg className="icon" />
                  </div>
                  <span className="text">Upload Attath Agenda</span>
                </div>
                <div className="upload-restrictions">
                  Select a 300x300 jpg image with maximum size of 400 KB
                </div>
              </div>
            </div>

            <input type="file" className="d-none" name="agenda" onChange={handleFileUpload} />
            <div className="uploaded-file">
              {formData.attachments[1].filename ? <img src={concatPathWithBackendUrl(formData.attachments[1].filename)} /> : ''}
            </div>
          </label>
        </div>
        <div className="upload-field">
          <label> Working Paper</label>
          <label className="field-wrapper">
            <div className="file-name-section">
              <div className="inner-content">
                <div className="upload-text">
                  <div className="upload-icon">
                    <SmallUploadSvg className="icon" />
                  </div>
                  <span className="text">Upload Working Paper</span>
                </div>
                <div className="upload-restrictions">
                  Select a 300x300 jpg image with maximum size of 400 KB
                </div>
              </div>
            </div>

            <input type="file" className="d-none" name="working-paper" onChange={handleFileUpload} />
            <div className="uploaded-file">
              {formData.attachments[2].filename ? <img src={concatPathWithBackendUrl(formData.attachments[2].filename)} /> : ''}
            </div>
          </label>
        </div>
        <div className="upload-field">
          <label>Minutes</label>
          <label className="field-wrapper">
            <div className="file-name-section">
              <div className="inner-content">
                <div className="upload-text">
                  <div className="upload-icon">
                    <SmallUploadSvg className="icon" />
                  </div>
                  <span className="text">Upload Minutes</span>
                </div>
                <div className="upload-restrictions">
                  Select a 300x300 jpg image with maximum size of 400 KB
                </div>
              </div>
            </div>

            <input type="file" className="d-none" name="minutes" onChange={handleFileUpload} />
            <div className="uploaded-file">
              {formData.attachments[3].filename ? <img src={concatPathWithBackendUrl(formData.attachments[3].filename)} /> : ''}
            </div>
          </label>
        </div>
        <div className="editor-field">
          <label>Description</label>
          <div className="field-wrap">
            <div className="field">
              <input
                type="text"
                className="d-none"
                {...register("description", { required: true })}
                value={formData.description}
                onChange={handleChange}
              />
              <Editor
                onChange={(name: string, value: string) =>
                  handleChange({ target: { name: 'description', value } })
                }
                name="description"
                value={formData.description}
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
            <button
              className="lg-rounded-btn"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </button>
          </div>
        </div>
      </CreateAuthoritiesFormSection>
    </CreateAuthoritiesMain>
  );
};

export default CreateMeetings;
