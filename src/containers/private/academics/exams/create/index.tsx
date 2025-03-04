import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useState } from "react";
import {
    CreateAcademicExamSection,
    CreateAcademicExamMain,
    CreateAcademicExamTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useForm } from "react-hook-form";

export const CreateAcademicExam: FC = () => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Exams /", path: siteRoutes.academicExamTypeListing },
        { title: "Add Exam", path: siteRoutes.createAcademicExam },
    ]
    const [formData, setFormData] = useState({ is_active: 1 });
    const { register } = useForm<any>();

    const handleChange = (event: any) => {

    }

    return (
        <CreateAcademicExamMain>
            <CreateAcademicExamTop>
                <div className="left">
                    <span className="page-heading">Add Exam Type</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </CreateAcademicExamTop>

            <CreateAcademicExamSection className="content-radius-shadow">
                <div className="common-fields">
                    <div className="input-field">
                        <label>Start Date</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="date" />
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>End Date</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="date" />
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Exam Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Exam Title" />
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Academic Session</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select>
                                    <option value="">Select Academic Session</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Campus</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select>
                                    <option value="">Select Campus</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Exam Type</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select>
                                    <option value="">Select Exam Type</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Course Type</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select>
                                    <option value="">Select Course Type</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="submit-buttons">
                    <div className="buttons">
                        <button className="lg-rounded-btn gray" type="button">
                            Reset
                        </button>
                        <button className="lg-rounded-btn">& Exit</button>
                    </div>
                </div>
            </CreateAcademicExamSection>
        </CreateAcademicExamMain>
    );
};

export default CreateAcademicExam;
