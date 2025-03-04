import { FC, useEffect, useState } from "react";
import {
  LinkCertificatesMain,
  Container,
  ContentWrapper,
  QuotaListDropdownMain,
} from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { AddSubjectLinkToCertificateDTO } from "utils/helpers/models/admissions/add-subject-link-to-certificate.dto";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useUtils from "hooks/useUtils";
import useOrganization from "containers/private/organization/useHooks";
import { warningToaster } from "utils/helpers/common/alert-service";
import { warningMessages } from "utils/helpers/enums/messages.enum";
import useAdmissions from "containers/private/admissions/useHooks";

interface LinkCertificatesProps {
  setOpen: Function;
}

const LinkCertificates: FC<LinkCertificatesProps> = ({ setOpen }) => {
  const { state: { certificate } } = useLocation();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [ linkId, setLinkId ] = useState<string>('');
  const { getDegreeCertificates, getSubjects } = useOrganization();
  const { createLinkSubjectToCertificate, updateLinkSubjectToCertificate, getLinkSubjectToCertificateById } = useAdmissions();
  const [formData, setFormData] = useState<AddSubjectLinkToCertificateDTO>(
    {...new AddSubjectLinkToCertificateDTO(), certificate_id: certificate?.id}
  );
  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
    setValue,
  } = useForm<AddSubjectLinkToCertificateDTO>({ defaultValues: formData });

  const onSubmit = () => {
    if(!formData.subject_id.length){
      warningToaster(warningMessages.subjectsRequiredMsg);
    }else{
      if (certificate?.certificate_link_subjects?.length){
        updateLinkSubjectToCertificate(linkId, { ...formData, subject_id: formData.subject_id.join(',') }, setOpen);
      }else{
        createLinkSubjectToCertificate({ ...formData, subject_id: formData.subject_id.join(',') }, setOpen);
      }
    }
  }

  const handleCloseModal = () => {
    setOpen(false);
  };

  const { isLoading } = useSelector((state: any) => state.sharedReducer);

  const handleSelect = (item: any) => {
    const { id } = item;
    if(formData.subject_id.includes(id)){
      const index = formData.subject_id.findIndex((subjectId: number) => id === subjectId);
      formData.subject_id.splice(index, 1);
    }else{
      formData.subject_id.push(id);
    }

    setFormData({...formData});
  };

  const handleChange = (event: any) => {
    const { name, value} = event.target;
    setValue(name, value);
    trigger([name]);
    setFormData({...formData, [name]: value});
  }

  useEffect(() => {
    getSubjects(setSubjects);
    getDegreeCertificates(setCertificates);
    if (certificate?.certificate_link_subjects?.length){
      getLinkSubjectToCertificateById(certificate?.id, formData, setValue, setFormData, setLinkId);
    }
  }, []);

  return (
    <LinkCertificatesMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>{certificate?.certificate_link_subjects?.length ? 'Update' : 'Add'}/Link Subjects to Certificate / Degree</span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="common-fields">
              <div className="input-field">
                <label>Degree/ Certificate</label>
                <div className="field-wrap">
                  <div className="field">
                    <select {...register('certificate_id', { required: true })} value={formData.certificate_id} onChange={handleChange}>
                      <option value="">Select Degree/ Certificate</option>
                      {certificates.map((certificate: any, index: number) => {
                        return <option value={certificate.id} key={index}>{certificate.title}</option>
                      })}
                    </select>
                  </div>
                  <FormErrorMessage error={errors.certificate_id} />
                </div>
              </div>
              <div className="input-field">
                <label>Subjects</label>
                <div className="field-wrap">
                  <QuotaListDropdownMain>
                    <ul className="p-custom-scrollbar-8">
                      {subjects.map((item: any, index: number) => (
                        <li key={index} onClick={() => handleSelect(item)}>
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              checked={formData.subject_id.includes(item?.id)}
                            />
                          </div>
                          <div className="item-text">
                            <span className="text">{item.title}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </QuotaListDropdownMain>
                </div>
              </div>
            </div>
            <div className="action-buttons">
              {isLoading ? (
                <div className="sm-primary-loader"></div>
              ) : (
                <div className="buttons">
                  <button
                    className="lg-rounded-btn gray"
                    type="reset"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>

                  <button
                    className="lg-rounded-btn"
                  >
                      {certificate?.certificate_link_subjects?.length ? 'Update' : 'Save'} & Close
                  </button>
                </div>
              )}
            </div>
          </form>
        </ContentWrapper>
      </Container>
    </LinkCertificatesMain>
  );
};

export default LinkCertificates;
