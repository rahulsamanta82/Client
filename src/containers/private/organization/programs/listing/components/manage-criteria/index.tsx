import { FC, useState } from "react";
import { ManageCriteriaMain, Container, ContentWrapper } from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { AddEntryTestDTO } from "utils/helpers/models/e-portal/add-entry-test.dto";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useUtils from "hooks/useUtils";

interface ManageCriteriaProps {
  setOpen: Function;
  id?: number;
}

const ManageCriteria: FC<ManageCriteriaProps> = ({ setOpen }) => {
  const [formData, setFormData] = useState<AddEntryTestDTO>(
    new AddEntryTestDTO()
  );
  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<AddEntryTestDTO>({ defaultValues: formData });
  const navigate = useNavigate();

  const { state } = useLocation();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const onSubmit = (data: AddEntryTestDTO, addMore?: boolean) => {};

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValue(name, value);
    setFormData({ ...formData, [name]: value });
    trigger(name);
  };

  const resetForm = () => {};

  const handleCloseModal = () => {
    navigate(`${siteRoutes.programListing}?sessionId=${params?.sessionId}`);
    setOpen(false);
  };

  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  return (
    <ManageCriteriaMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Manage Criteria</span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form>
            <div className="common-fields">
              <div className="input-field">
                <label>Degree Name</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Degree</option>
                    </select>
                  </div>
                  <FormErrorMessage error={errors.total_marks} />
                </div>
              </div>
              <div className="input-field">
                <label>Weighted</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="number"
                      {...register("obtained_marks", { required: true })}
                      value={formData.obtained_marks}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.obtained_marks} />
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
                    onClick={resetForm}
                  >
                    Reset
                  </button>
                  {!state?.entryTest ? (
                    <button
                      className="lg-rounded-btn black"
                      type="submit"
                      onClick={handleSubmit((data: any) =>
                        onSubmit(data, true)
                      )}
                    >
                      Add More
                    </button>
                  ) : (
                    ""
                  )}

                  <button
                    className="lg-rounded-btn"
                    type="submit"
                    onClick={handleSubmit((data: any) => onSubmit(data))}
                  >
                    {state?.entryTest ? "Update" : "Save"}
                  </button>
                </div>
              )}
            </div>
          </form>
        </ContentWrapper>
      </Container>
    </ManageCriteriaMain>
  );
};

export default ManageCriteria;
