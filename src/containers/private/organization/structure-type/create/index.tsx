import { FC, useEffect } from "react";
import { Main, STCreateContent, STCreateTop } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import { AddStructureTypeDTO } from "utils/helpers/models/organization/add-structure-type.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useUtils from "hooks/useUtils";
import useOrganization from "../../useHooks";

interface CreateStructureTypeProps { }

const CreateStructureType: FC<CreateStructureTypeProps> = () => {
  const breadcrumbLinks = [
    {
      title: "Organization /",
      path: "/private/organization/org/organization-listing",
    },
    {
      title: "Structure Types /",
      path: "/private/organization/structure-types/structure-types-listing",
    },
    {
      title: "Add Structure Type",
      path: "/private/organization/structure-types/create-structure-type",
    },
  ]
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<AddStructureTypeDTO>({
    defaultValues: new AddStructureTypeDTO(),
  });

  const {
    createStructureTypeSuperAdmin,
    getStructureTypeByIdSuperAdmin,
    updateStructureTypeSuperAdmin,
    createStructureTypeAdmin,
    getStructureTypeByIdAdmin,
    updateStructureTypeAdmin,
  } = useOrganization();

  const onSubmit = (
    formData: AddStructureTypeDTO,
    addMore: boolean = false
  ) => {
    if (params?.structureTypeId) {
      if (params?.organizationId) {
        updateStructureTypeSuperAdmin(
          formData,
          params?.structureTypeId,
          params?.organizationId
        );
      } else {
        updateStructureTypeAdmin(
          formData,
          params?.structureTypeId,
          addMore,
          resetForm
        );
      }
    } else {
      // createStructureType(formData);
      if (params?.organizationId) {
        createStructureTypeSuperAdmin({
          ...formData,
          organizations_id: params?.organizationId,
        });
      } else {
        createStructureTypeAdmin(formData);
      }
    }
  };

  const resetForm = () => {
    for (let key in getValues()) {
      setValue(key as keyof AddStructureTypeDTO, "");
    }
  };

  useEffect(() => {
    // console.log
    // if (params?.structureTypeId) getStructureTypeById(params?.structureTypeId, getValues, setValue);
    if (params?.structureTypeId) {
      if (params?.organizationId) {
        getStructureTypeByIdSuperAdmin(
          params?.structureTypeId,
          params?.organizationId,
          getValues,
          setValue
        );
      } else {
        getStructureTypeByIdAdmin(params?.structureTypeId, getValues, setValue);
      }
    }
  }, []);

  return (
    <Main>
      <STCreateTop>
        <div className="heading">
          <span className="page-heading">
            {params?.structureTypeId ? "Update" : "Add"} Structure Type
          </span>
          {!params?.structureTypeId && <Breadcrumb links={breadcrumbLinks} />}
        </div>
      </STCreateTop>
      <STCreateContent className="content-radius-shadow">
        <div className="detail">
          <div className="page-sub-heading">
            <span>
              {params?.structureTypeId ? "Update" : "Add"} Structure Type
            </span>
          </div>
          <div className="description">
            <div className="text">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
              <span className="link-text"> More Info</span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <form>
            <div className="fields-section">
              <div className="input-field">
                <label>Name</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="text"
                      placeholder="i.e Institute, Department"
                      {...register("title", { required: true })}
                    />
                  </div>
                  <FormErrorMessage error={errors.title} />
                </div>
              </div>
              <div className="input-field">
                <label>Slug</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="tel"
                      placeholder="xyzdomain.com"
                      {...register("slug", { required: true })}
                    />
                  </div>
                  <FormErrorMessage error={errors.slug} />
                </div>
              </div>
              <div className="input-field">
                <label>Status</label>
                <div className="field-wrap">
                  <div className="field">
                    <select {...register("is_active", { required: true })}>
                      <option value={""} selected disabled>
                        Select Status
                      </option>
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                  </div>
                  <FormErrorMessage error={errors.is_active} />
                </div>
              </div>
            </div>
            <div className="action-buttons">
              <div className="buttons">
                <button
                  type="button"
                  className="lg-rounded-btn gray"
                  onClick={resetForm}
                >
                  Reset
                </button>
                {!params?.id && (
                  <button
                    type="button"
                    className="lg-rounded-btn green"
                    onClick={handleSubmit((data: AddStructureTypeDTO) =>
                      onSubmit(data, true)
                    )}
                  >
                    Save & Add More
                  </button>
                )}
                <button
                  className="lg-rounded-btn"
                  onClick={handleSubmit((data: AddStructureTypeDTO) =>
                    onSubmit(data)
                  )}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </STCreateContent>
    </Main>
  );
};

export default CreateStructureType;
