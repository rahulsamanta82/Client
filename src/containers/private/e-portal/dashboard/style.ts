import styled from "styled-components";

export const EportalDashboardMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 1em;

    @media screen and (max-width: 630px){
        padding: .5em;
    }
`;

export const EportalDashboardTop = styled.div`
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

export const EportalFeatures = styled.div`
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(24%, 1fr));
        gap: 1.5em;

        @media screen and (max-width: 960px){
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }

    .particular-feature{
        box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: center;
        padding: 1.5em 0;
        border-radius: 15px;
        background: var(--white-color);
        color: var(--black-text);
        cursor: pointer;

        .inner-content{
            display: flex;
            flex-direction: column;
            gap: 1em;
            align-items: center;
            font-size: 16px;
            font-weight: 500;

            @media screen and (max-width: 450px){
                font-size: 14px;
            }

            .feature-icon{
                .icon{
                    path{
                        fill: var(--black-text);
                    }
                }
            }
        }
    }
`;