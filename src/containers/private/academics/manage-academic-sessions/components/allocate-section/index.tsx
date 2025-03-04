import { FC, useEffect, useState } from "react";
import {
  AllocateSectionMain,
  Container,
  ContentWrapper,
} from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";
import { AddCourseSectionDTO } from "utils/helpers/models/academics/academic-session.dto";
import { useForm } from "react-hook-form";
import useAcademics from "containers/private/academics/useHooks";
import { AcademicSectionDTO } from "utils/helpers/models/academics/academic-section.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";

interface AddAllocateSectionProps {
  setOpen: Function;
  course_id: any;
}

const AllocateSection: FC<AddAllocateSectionProps> = ({ setOpen, course_id }) => {
  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<AddCourseSectionDTO>();
  const { addCourseSection, getAcademicSections } = useAcademics();
  const [sections, setSections] = useState<AcademicSectionDTO[]>([]);
  const [formData, setFormData] = useState<AddCourseSectionDTO>({ ...new AddCourseSectionDTO(), course_id });

  const onSubmit = () => {
    addCourseSection(formData, setOpen);
  }

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValue(name, value);
    trigger(name);
    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
    getAcademicSections(setSections);
  }, []);

  return (
    <AllocateSectionMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Allocate Section</span>
            </div>
            <div className="close-icon cp" onClick={() => setOpen(false)}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="common-fields">
              <div className="input-field">
                <label>Section</label>
                <div className="field-wrap">
                  <div className="field">
                    <select {...register('section_id', { required: true })} value={formData.section_id} onChange={handleChange}>
                      <option value="">Select Section</option>
                      {sections.map((section, index) => {
                        return <option value={section.id} key={index}>{section.title}</option>
                      })}
                    </select>
                  </div>
                  <FormErrorMessage error={errors.section_id} />
                </div>
              </div>
            </div>
            <div className="action-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray" type="button" onClick={() => setOpen(false)}>
                  Close
                </button>
                <button className="lg-rounded-btn">
                  Save & Close
                </button>
              </div>
            </div>
          </form>
        </ContentWrapper>
      </Container>
    </AllocateSectionMain>
  );
};

export default AllocateSection;
