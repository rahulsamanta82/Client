import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useEffect, useState } from "react";
import {
  CreateAcademicSessionForm,
  CreateAcademicSessionMain,
  CreateAcademicSessionTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { AcademicSessionDTO } from "utils/helpers/models/academics/academic-session.dto";
import { useForm } from "react-hook-form";
import useUtils from "hooks/useUtils";
import useAcademics from "../../useHooks";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useAdmissions from "containers/private/admissions/useHooks";

export const CreateAcademicSession: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },
    { title: "Academic Session  / ", path: siteRoutes.academicSessionListing },
    { title: `${params?.id ? 'Update' : 'Add'} Academic Session`, path: siteRoutes.createAcademicSession },
  ];

  const { handleSubmit, register, setValue, trigger, formState: {errors}} = useForm<AcademicSessionDTO>();
  const [formData, setFormData] = useState<AcademicSessionDTO>(new AcademicSessionDTO());
  const { createAcademicSession, updateAcademicSession, getAcademicSessionById } = useAcademics();
  const { getAdmissionSessions} = useAdmissions();
  const [sessions, setSessions] = useState<any[]>([]);

  const onSubmit = () => {
      if(params?.id){
          updateAcademicSession(params?.id, formData);
      }else{
          createAcademicSession(formData);
      }
  }

  const handleChange = (event: any) => {
      const { value, name } = event.target;
      setValue(name,value);
      trigger(name);
      setFormData({...formData, [name]: value});
  }

  const resetForm = () => {
      for(let key in formData){
        (formData as any)[key] = new AcademicSessionDTO()[key as keyof AcademicSessionDTO];
          setValue(key as keyof AcademicSessionDTO, (formData as any)[key]);
      }

      setFormData({...formData});
  }

  useEffect(() => {
      if(params?.id){
        getAcademicSessionById(params?.id, formData, setValue, setFormData);
      }
      getAdmissionSessions(setSessions);
  }, []);

  return (
    <CreateAcademicSessionMain>
      <CreateAcademicSessionTop>
        <div className="left">
          <span className="page-heading">{params?.id ? 'Update' : 'Add'} Academic Session</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateAcademicSessionTop>

      <CreateAcademicSessionForm className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
        <div className="common-fields">
          <div className="input-field">
            <label>Year</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" placeholder="Enter Year" {...register('year', {required: true})} value={formData.year} onChange={handleChange}/>
              </div>
              <FormErrorMessage error={errors.year}/>
            </div>
          </div>
          <div className="input-field">
            <label>Semester Type</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register('type', {required: true})} value={formData.type} onChange={handleChange}>
                  <option value="">Select Semester Type</option>
                  <option value="Spring">Spring</option>
                  <option value="Fall">Fall</option>
                </select>
              </div>
              <FormErrorMessage error={errors.type}/>
            </div>
          </div>
          <div className="input-field">
            <label>Start Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" {...register('sess_start_date', {required: true})} value={formData.sess_start_date} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.sess_start_date}/>
            </div>
          </div>
          <div className="input-field">
            <label>End Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" {...register('sess_end_date', {required: true})} value={formData.sess_end_date} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.sess_end_date}/>
            </div>
          </div>
          <div className="input-field">
            <label>Enrollment Start Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" {...register('enrol_start_date', {required: true})} value={formData.enrol_start_date} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.enrol_start_date}/>
            </div>
          </div>
          <div className="input-field">
            <label>Enrollment Close Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date"{...register('enrol_end_date', {required: true})} value={formData.enrol_end_date} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.enrol_end_date}/>
            </div>
          </div>
          <div className="input-field">
            <label>Course Repeat Close Date (Under Graduate)</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" {...register('ug_course_repeat_date', {required: true})} value={formData.pg_course_repeat_date} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.ug_course_repeat_date}/>
            </div>
          </div>
          <div className="input-field">
            <label>Course Repeat Close Date (Post Graduate)</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" {...register('pg_course_repeat_date', {required: true})} value={formData.pg_course_repeat_date} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.pg_course_repeat_date}/>
            </div>
          </div>
          <div className="input-field">
            <label>Result Last Submission Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" {...register('result_submission_date', {required: true})} value={formData.result_submission_date} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.result_submission_date}/>
            </div>
          </div>
          <div className="input-field">
            <label>Result Declaration Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" {...register('result_declaration_date', {required: true})} value={formData.result_declaration_date} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.result_declaration_date}/>
            </div>
          </div>
          <div className="input-field">
            <label>Semester Sequence Number</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" {...register('semester_sequence_no', {required: true})} value={formData.semester_sequence_no} onChange={handleChange}/>
              </div>
              <FormErrorMessage error={errors.semester_sequence_no}/>
            </div>
          </div>
          <div className="radio-field">
            <label htmlFor="no">Is Active</label>
            <div className="field-wrap">
              <div className="field">
                <input type="radio" id="is_active_yes" {...register('is_active', {required: true})} value={1} onChange={handleChange} checked={formData.is_active == 1}/>
                <label htmlFor="is_active_yes">Yes</label>
              </div>
              <div className="field">
                <input type="radio" id="is_active_no" {...register('is_active', {required: true})} value={0} onChange={handleChange} checked={formData.is_active == 0}/>
                <label htmlFor="is_active_no">No</label>
              </div>
            </div>
            <FormErrorMessage error={errors.is_active}/>
          </div>
          <div className="radio-field">
            <label htmlFor="no">Show on transcript</label>
            <div className="field-wrap">
              <div className="field">
                <input type="radio" id="show_on_transcript_yes" {...register('show_on_transcript', {required: true})} value={1} onChange={handleChange} checked={formData.show_on_transcript == 1}/>
                <label htmlFor="show_on_transcript_yes">Yes</label>
              </div>
              <div className="field">
                <input type="radio" id="show_on_transcript_no" {...register('show_on_transcript', {required: true})} value={0} onChange={handleChange} checked={formData.show_on_transcript == 0}/>
                <label htmlFor="show_on_transcript_no">No</label>
              </div>
            </div>
            <FormErrorMessage error={errors.is_active}/>
          </div>
          <div className="input-field">
            <label>Fee Types</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register('fee_type', {required: true})} value={formData.fee_type} onChange={handleChange}>
                  <option value="">Select Fee Types</option>
                  <option value="1">1</option>
                </select>
              </div>
              <FormErrorMessage error={errors.fee_type}/>
            </div>
          </div>
          <div className="input-field">
            <label>Session</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register('session_id', {required: true})} value={formData.session_id} onChange={handleChange}>
                  <option value="">Select Session</option>
                  {sessions.map((session,index) => {
                    return <option value={session.id} key={index}>{session.title}</option>
                  })}
                </select>
              </div>
              <FormErrorMessage error={errors.session_id}/>
            </div>
          </div>
        </div>
        <div className="submit-buttons">
          <div className="buttons">
            <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>
              Reset
            </button>
            <button className="lg-rounded-btn" type="submit">Submit</button>
          </div>
        </div>
      </CreateAcademicSessionForm>
    </CreateAcademicSessionMain>
  );
};

export default CreateAcademicSession;
