import { FC, useState } from "react";
import {
  AddAllocateTeacherMain,
  Container,
  ContentWrapper,
  AllocateTeacherDropdownMain,
} from "./style";
import { CloseMediumSvg, SmallUploadSvg } from "assets/images/common/svgs";

import { useNavigate } from "react-router-dom";
import { AuthorityMeetingdDTO } from "utils/helpers/models/authorities/authority-meeting.dto";
import { useForm } from "react-hook-form";
import { useLocation } from 'react-router-dom';
import useAuthorities from "containers/private/authorities/useHooks";
import useUtils from "hooks/useUtils";

interface EditAttendanceProps {
  setOpen: Function;
  id?: number;
}

const EditAttendance: FC<EditAttendanceProps> = ({ setOpen }) => {
 
  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<AuthorityMeetingdDTO>();
  let [formData, setFormData] = useState<AuthorityMeetingdDTO>(new AuthorityMeetingdDTO());
  const { createAuthorityMeeting, updateAuthorityMeeting, updateAuthorityMeetingAttendance } = useAuthorities();
  const { getQueryParams, compareDateStrings } = useUtils();
  const params = getQueryParams();

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
    setFormData({ ...formData, [name]: URL.createObjectURL(file) });
    setValue(name, file);
  };

  const resetForm = () => {
    formData = new AuthorityMeetingdDTO();
    for (let key in formData) {
      setValue(key as keyof AuthorityMeetingdDTO, formData[key as keyof AuthorityMeetingdDTO]);
    }
    setFormData({ ...formData });
  };

  const { authority_id, meetingId } = params;
  const onSubmit = (data: any) => {
    const form_data = new FormData();

    for (let key in formData) {
      if (key === "attachments") {
        form_data.append(key, data[key])
      } else {
        form_data.append(key, (formData as any)[key]);
      }
    }
    if (authority_id) {
      form_data.append("authority_id", authority_id);
    }
    if (params?.id) {
      updateAuthorityMeetingAttendance(meetingId, form_data)
      .then(() => {
        handleCloseModal();
    })
    } else {
      createAuthorityMeeting(form_data, false, resetForm);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete('meetingId');
    window.history.pushState({}, '', currentUrl);
  };
  
  return (
    <AddAllocateTeacherMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Add Attendance</span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form>
            <div className="upload-field">
              <label> Upload Sheet</label>
              <label className="field-wrapper">
                <div className="file-name-section">
                  <div className="inner-content">
                    <div className="upload-text">
                      <div className="upload-icon">
                        <SmallUploadSvg className="icon" />
                      </div>
                      <span className="text">Upload Attath Sheet</span>
                    </div>
                    <div className="upload-restrictions">
                      Select a 300x300 jpg image with maximum size of 400 KB
                    </div>
                  </div>
                </div>

                <input type="file" className="file"  {...register("attendance", { required: false })}
                  onChange={handleFileUpload} />
              </label>
            </div>
            <div className="action-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray" type="reset" onClick={handleCloseModal}>
                  Close
                </button>

                <button className="lg-rounded-btn" type="submit" onClick={handleSubmit(onSubmit)}>
                  Save & Close
                </button>
              </div>
            </div>
          </form>
        </ContentWrapper>
      </Container>
    </AddAllocateTeacherMain>
  );
};

export default EditAttendance;
