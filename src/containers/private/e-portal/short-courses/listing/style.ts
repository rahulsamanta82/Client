import styled from "styled-components";

export const EPShortCoursesMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 1em;

    @media screen and (max-width: 630px){
        padding: .5em;
    }
`;

export const EPShortCoursesTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5em;

  @media screen and (max-width: 490px) {
    flex-direction: column;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    @media screen and (max-width: 490px) {
      width: 100%;
    }
  }

  /* .right {
    @media screen and (max-width: 490px) {
      width: 100%;

      button {
        width: 100%;
      }
    }
  } */
`;

export const CoursesWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1.5em;
  flex-wrap: wrap;

  /* @media screen and (max-width: 1350px){
      flex-wrap: wrap;
  } */
  @media screen and (max-width: 1032px){
    justify-content: center;
  }
`;

export const CourseCard = styled.div`
  width: 460px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  border: 1px solid var(--field-border);
  border-radius: 10px;
  padding-bottom: 1.5em;

  @media screen and (max-width: 520px){
    width: 100%;
  }

  .card-header{
    width: 100%;
    padding: 0.5em 0;
    background: var(--primary-extralight);
    display: flex;
    justify-content: center;
    border-radius: 10px 10px 0px 0px;

    .header-text{
      width: 180px;
      display: flex;
      flex-direction: column;
      color: var(--primary);
      font-size: 16px;
      font-weight: 500;

      @media screen and (max-width: 630px){
        font-size: 14px;
      }
      span{
        text-align: center;
      }
    }
  }

  .info-section{
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding-left: 1.5em;

    .info{
      display: flex;
      gap: 0.5em;
      align-items: center;
      .title{
        font-size: 16px;
        font-weight: 500;
        color: var(--black-text);

        @media screen and (max-width: 520px){
          font-size: 13px;
        }
      }
      .detail{
        font-size: 15px;
        font-weight: 400;
        color: var(--lightgray-medium);

        @media screen and (max-width: 520px){
          font-size: 12px;
        }
      }
    }
  }

      .apply-button{
      width: 100%;
      display: flex;
      justify-content: center;
      padding-top: 1em;

    @media screen and (max-width: 520px){
      padding: 1em 1em 0 1em;
    }
      button{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5em;
    padding: 0 3em;

    @media screen and (max-width: 520px){
      width: 100%;
      height: 40px;
    }
      }
    }
`;

export const CoursesListingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;

  .heading{
    span{
      color: var(--black-text);
      font-size: 24px;
      font-weight: 500;

      @media screen and (max-width: 630px){
        font-size: 20px;
      }
      @media screen and (max-width: 490px){
        font-size: 18px;
      }
    }
  }
`;