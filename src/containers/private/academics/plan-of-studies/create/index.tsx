import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useEffect, useState } from "react";
import {
  CreatePlanOfStudyForm,
  CreatePlanOfStudyMain,
  CreatePlanOfStudyTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useAcademics from "../../useHooks";
import { PlanOfStudyDTO } from "utils/helpers/models/academics/plan-of-study.dto";
import { useForm } from "react-hook-form";
import useUtils from "hooks/useUtils";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { GradeTemplateDTO } from "utils/helpers/models/academics/grade-template.dto";
import useOrganization from "containers/private/organization/useHooks";

export const CreatePlanOfStudy: FC = () => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },
    { title: "Plan of Studies  / ", path: siteRoutes.academicPlanofStudies },
    { title: "Add Plan Of Studies", path: siteRoutes.createStudyPlans },
  ];

  const { handleSubmit, register, setValue, trigger, formState: {errors}} = useForm<PlanOfStudyDTO>();
  let [formData, setFormData] = useState<PlanOfStudyDTO>(new PlanOfStudyDTO());
  const [programs, setPrograms] = useState<any[]>([]);
  const [gradeTemplates, setGradeTemplates] = useState<GradeTemplateDTO[]>([]);
  const { createPlanOfStudy, updatePlanOfStudy, getPlanOfStudyById, getGradeTemplates } = useAcademics();
  const { getPrograms } = useOrganization();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const onSubmit = () => {
      if(params?.id){
          updatePlanOfStudy(params?.id, formData);
      }else{
          createPlanOfStudy(formData);
      }
  }

  const handleChange = (event: any) => {
      const { value, name } = event.target;
      setValue(name,value);
      trigger(name);
      setFormData({...formData, [name]: value});
  }

  const resetForm = () => {
      formData = new PlanOfStudyDTO();
      for(let key in formData){
          setValue(key as keyof PlanOfStudyDTO, formData[key as keyof PlanOfStudyDTO]);
      }

      setFormData({...formData});
  }

  useEffect(() => {
      if(params?.id){
        getPlanOfStudyById(params?.id, formData, setValue, setFormData);
      }
      getPrograms(setPrograms);
      getGradeTemplates(setGradeTemplates);
  }, []);

  return (
    <CreatePlanOfStudyMain>
      <CreatePlanOfStudyTop>
        <div className="left">
          <span className="page-heading">Add Plan of study</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreatePlanOfStudyTop>

      <CreatePlanOfStudyForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label>Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Enter Title" {...register('title', {required: true})} value={formData.title} onChange={handleChange}/>
              </div>
              <FormErrorMessage error={errors.title}/>
            </div>
          </div>
          <div className="input-field">
            <label>Program</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register('program_id', {required: true})} value={formData.program_id} onChange={handleChange}>
                  <option value="">Select Program</option>
                  {programs.map((program,index) => {
                    return <option value={program.id} key={index}>{program.title}</option>
                  })}
                </select>
              </div>
              <FormErrorMessage error={errors.program_id}/>
            </div>
          </div>
          <div className="input-field">
            <label>External Grade Template</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register('grade_template_id', {required: true})} value={formData.grade_template_id} onChange={handleChange}>
                  <option value="">Select External Grade Template</option>
                  {gradeTemplates.map((template,index) => {
                    return <option value={template.id} key={index}>{template.title}</option>
                  })}
                </select>
              </div>
              <FormErrorMessage error={errors.grade_template_id}/>
            </div>
          </div>
          <div className="input-field">
            <label>Result Template</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register('result_template_id', {required: true})} value={formData.title} onChange={handleChange}>
                  <option value="">Select Result Template</option>
                </select>
              </div>
              <FormErrorMessage error={errors.result_template_id}/>
            </div>
          </div>
          <div className="input-field">
            <label>Total Semesters</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" {...register('total_semesters', {required: true})} value={formData.total_semesters} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.total_semesters}/>
            </div>
          </div>
          <div className="input-field">
            <label>Degree title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" {...register('degree_title', {required: true})} value={formData.degree_title} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.degree_title}/>
            </div>
          </div>

          <div className="radio-field">
                            <label>Ask for subject</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <label htmlFor="is_validated_yes">Yes</label>
                                    <input
                                        type="radio"
                                        id="is_validated_yes"
                                        value={1}
                                        checked={formData.is_validated == 1}
                                        {...register("is_validated", { required: true })}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="is_validated_no">No</label>
                                    <input
                                        type="radio"
                                        id="is_validated_no"
                                        value={0}
                                        checked={formData.is_validated == 0}
                                        {...register("is_validated", { required: true })}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <FormErrorMessage error={errors?.is_validated} />
                        </div>
        </div>
        <div className="submit-buttons">
          <div className="buttons">
            <button className="lg-rounded-btn gray" type="button">
              Reset
            </button>
            <button className="lg-rounded-btn">Submit</button>
          </div>
        </div>
      </CreatePlanOfStudyForm>
    </CreatePlanOfStudyMain>
  );
};

export default CreatePlanOfStudy;
