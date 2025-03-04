import { FC, useEffect, useState } from "react";
import { QualificationTestMain, ContentWrapper, Container } from "./style";
import { CloseMediumSvg, SmallUploadSvg } from "assets/images/common/svgs";
import dummyAvatar from "assets/images/common/others/dummy-avatar.png";
import { PublicationInfoDTO } from "utils/helpers/models/e-portal/publication-info.dto";
import { useForm } from "react-hook-form";
import { warningToaster } from "utils/helpers/common/alert-service";
import useEportal from "containers/private/e-portal/useHooks";
import FormErrorMessage from "components/particles/forms/form-error-message";

interface AddPublicationProps {
  setOpen: Function;
  publication: PublicationInfoDTO | null;
}

const AddPublication: FC<AddPublicationProps> = ({ setOpen, publication }) => {
  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<PublicationInfoDTO>();
  const [formData, setFormData] = useState<PublicationInfoDTO>(new PublicationInfoDTO());
  const { createPublicationInfo, updatePublicationInfo } = useEportal();
  const onSubmit = (data: PublicationInfoDTO, addMore: boolean = false) => {
    if (!formData.file_url) {
      warningToaster('Please upload the file');
      return;
    }
    const body = new FormData();
    for (let key in formData) {
      body.append(key, key === 'file_url' ? data[key] : (formData as any)[key]);
    }
    if (publication?.id) {
      updatePublicationInfo(publication?.id, body, setOpen);
    } else {
      createPublicationInfo(body, setOpen, addMore, resetForm);
    }
  }

  const handleChange = (event: any) => {
    const { value, name, checked = false } = event.target;
    if (name === 'is_continue') {
      (formData as any)[name] = checked ? 1 : 0;
    } else {
      (formData as any)[name] = value;
    }
    setValue(name, (formData as any)[name]);
    trigger(name);
    setFormData({ ...formData });
  }

  const handleFileUpload = (event: any) => {
    const { name, files } = event.target;
    const file = files[0];
    setValue(name, file);
    setFormData({ ...formData, [name]: URL.createObjectURL(file) });
    trigger([name]);
  };

  const resetForm = () => {
    const initialForm: any = new PublicationInfoDTO();
    for (let key in formData) {
      setValue(key as keyof PublicationInfoDTO, initialForm[key]);
      (formData as any)[key] = initialForm[key];
    }

    setFormData({ ...formData });
  }

  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (publication?.id) {
      for (let key in formData) {
        (formData as any)[key] = (publication as any)[key];
        setValue(key as keyof PublicationInfoDTO, (formData as any)[key]);
      }

      setFormData({ ...formData });
    }
  }, []);

  return (
    <QualificationTestMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Publications </span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form onSubmit={handleSubmit(data => onSubmit(data))}>
            <div className="common-fields">
              <div className="input-field">
                <label>DOI#</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" {...register('doi', { required: true })} value={formData.doi} onChange={handleChange} placeholder="DOI" />
                  </div>
                  <FormErrorMessage error={errors.doi} />
                </div>
              </div>
              <div className="input-field">
                <label>Title/ Research Article</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" placeholder="Title/ Research Article" {...register('title', { required: true })} value={formData.title} onChange={handleChange} />
                  </div>
                  <FormErrorMessage error={errors.title} />
                </div>
              </div>
              <div className="input-field">
                <label>Journal/ Publisher Name</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="number"
                      {...register('journal_name', { required: true })} value={formData.journal_name} onChange={handleChange}
                      placeholder="Enter The Journal/ Publisher Name"
                    />
                  </div>
                  <FormErrorMessage error={errors.journal_name} />
                </div>
              </div>
              <div className="input-field">
                <label>Author Name</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="text"
                      placeholder="Author Name"
                      {...register('author_name', { required: true })} value={formData.author_name} onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.author_name} />
                </div>
              </div>
              <div className="input-field">
                <label>Impact Factor/ HEC Category </label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="text"
                      placeholder="Impact Factor/ HEC Category"
                      {...register('impact_factor', { required: true })} value={formData.impact_factor} onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.impact_factor} />
                </div>
              </div>
              <div className="input-field">
                <label>Volume / No / Pages </label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="number" placeholder="Volume / No / Pages" {...register('volume_no', { required: true })} value={formData.volume_no} onChange={handleChange} />
                  </div>
                  <FormErrorMessage error={errors.volume_no} />
                </div>
              </div>
              <div className="input-field">
                <label>Year of Publication </label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="number" placeholder="Year of Publication" {...register('publication_year', { required: true })} value={formData.publication_year} onChange={handleChange} />
                  </div>
                  <FormErrorMessage error={errors.publication_year} />
                </div>
              </div>
              <div className="input-field">
                <label>Month of Publication </label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="number" placeholder="Month of Publication " {...register('publication_month', { required: true })} value={formData.publication_month} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>

            <div className="upload-field">
              <label>Uploade Bibtex File</label>
              <label className="field-wrapper">
                <div className="file-name-section">
                  <div className="inner-content">
                    <div className="upload-text">
                      <div className="upload-icon">
                        <SmallUploadSvg className="icon" />
                      </div>
                      <span className="text">Upload Bibtex File</span>
                    </div>
                    <div className="upload-restrictions">
                      The maximum size of the file can be 1 Megabyte
                    </div>
                  </div>
                </div>
                <div className="uploaded-image">
                  <img src={formData.file_url ?? dummyAvatar} alt="" />
                </div>
                <input type="file" className="d-none" onChange={handleFileUpload} name="file_url" />
              </label>
            </div>

            <div className="action-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>
                  Reset
                </button>
                {publication?.id ? <button className="lg-rounded-btn black" onClick={handleSubmit((data) => onSubmit(data, true))}>
                  Save & Add More
                </button> : ''}
                <button className="lg-rounded-btn" onClick={handleSubmit((data) => onSubmit(data))}>
                  Save
                </button>
              </div>
            </div>
          </form>
        </ContentWrapper>
      </Container>
    </QualificationTestMain>
  );
};

export default AddPublication;
