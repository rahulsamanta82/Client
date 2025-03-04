import { FC, useEffect, useState } from "react";
import {
  AddAllocateTeacherMain,
  Container,
  ContentWrapper,
} from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";

import { AddCourseTeacherDTO } from "utils/helpers/models/academics/academic-session.dto";
import useAcademics from "containers/private/academics/useHooks";
import { useForm } from "react-hook-form";
import { CourseTypeDTO } from "utils/helpers/models/academics/course-type.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";

interface AddAllocateTeacherProps {
  setOpen: Function;
  course_id: any;
}

const AllocateTeacher: FC<AddAllocateTeacherProps> = ({ setOpen, course_id }) => {

  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<AddCourseTeacherDTO>();
  const { addCourseTeacher, getTeachers, getCourseTypes } = useAcademics();
  const [teachers, setTeachers] = useState<any[]>([]);
  const [courseTypes, setCourseTypes] = useState<CourseTypeDTO[]>([]);
  const [formData, setFormData] = useState<AddCourseTeacherDTO>({ ...new AddCourseTeacherDTO(), course_id });

  const onSubmit = () => {
    addCourseTeacher(formData, setOpen);
  }

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValue(name, value);
    trigger(name);
    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
    getTeachers(setTeachers);
    getCourseTypes(setCourseTypes)
  }, []);

  return (
    <AddAllocateTeacherMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Allocate Teacher</span>
            </div>
            <div className="close-icon cp" onClick={() => setOpen(false)}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="common-fields">
              <div className="input-field">
                <label htmlFor="">Teacher</label>
                <div className="field-wrap">
                  <div className="field">
                    <select {...register('teacher_id', { required: true })} value={formData.teacher_id} onChange={handleChange}>
                      <option value="">Select teacher</option>
                      {teachers.map((teacher, index) => {
                        return <option value={teacher.id} key={index}>{`${teacher?.teacher_firstname} ${teacher?.teacher_firstname}`}</option>
                      })}
                    </select>
                  </div>
                  <FormErrorMessage error={errors.teacher_id} />
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Course type</label>
                <div className="field-wrap">
                  <div className="field">
                    <select {...register('course_type_id', { required: true })} value={formData.course_type_id} onChange={handleChange}>
                      <option value="">Select course type</option>
                      {courseTypes.map((type, index) => {
                        return <option value={type.id} key={index}>{type.title}</option>
                      })}
                    </select>
                  </div>
                  <FormErrorMessage error={errors.course_type_id} />
                </div>
              </div>

              <div className="radio-field">
                <label htmlFor="no">Is LMS Sync?</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="radio" id="lms_sync_yes" {...register('lms_sync', { required: true })} value={1} onChange={handleChange} checked={formData.lms_sync == 1} />
                    <label htmlFor="lms_sync_yes">Yes</label>
                  </div>
                  <div className="field">
                    <input type="radio" id="lms_sync_no" {...register('lms_sync', { required: true })} value={0} onChange={handleChange} checked={formData.lms_sync == 0} />
                    <label htmlFor="lms_sync_no">No</label>
                  </div>
                </div>
                <FormErrorMessage error={errors.lms_sync} />
              </div>
            </div>

            <div className="action-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray" onClick={() => setOpen(false)}>
                  Close
                </button>

                <button className="lg-rounded-btn" type="submit">
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

export default AllocateTeacher;
