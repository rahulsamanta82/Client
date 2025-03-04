import styled from "styled-components";


export const MainChallan = styled.div`
padding: 2em;
width: 100%;
height: 100%;

`

export const HeadingDiv = styled.div`
.heading{
    font-size: 32px;
    font-weight: 500;
    color: var(--black-text);
    @media(max-width:768px) {
        font-size: 20px;
    }
}
`
export const ChallanForm = styled.form`
background-color: var(--white-color);
border-radius: 20px;
padding: 20px;
margin-top: 2%;
.form-heading{
    font-size: 24px;
    font-weight: 500;
    color:  var(--black-text);
    @media(max-width:768px) {
        font-size: 20px;
    }
}

.common-fields {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(308px, 1fr));
    gap: 1.5em;
    color: var(--lightgray-medium);
    font-size: 15px;
    font-weight: 400;

    @media screen and (max-width: 450px) {
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    }
  }
.challan-input-main{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    @media (max-width:1024px) {
        flex-wrap: wrap;
    }
}
.challan-label{
    font-size: 16px;
    font-weight: 400;
    color: var(--black-text);
    @media(max-width:768px) {
        font-size: 14px;
    }
}
.challan-input{
    border: 1px solid var(--field-border);
    width: 400px;
    height: 49.99px;
    border-radius: 8px;
    color: var(--black-text);
    padding-left: 10px;
    @media (max-width:425px) {
        width: 360px;
    }
    @media (max-width:400px) {
        width: 340px;
    }
    @media (max-width:380px) {
        width: 320px;
    }
    @media (max-width:355px) {
        width: 290px;
    }
    @media (max-width:320px) {
        width: 270px;
    }
    @media (max-width:320px) {
        width: 240px;
    }
}
.challan-price{
    background-color: #FFBB3826;
    color: #FFBB38;
    font-size: 24px;
    font-weight: 400;
    padding: 10px;
    width: 30%;
    border-radius: 4px;
}
.challan-button-div{
    margin-top: 20px;
    text-align: end;
}
.challan-button{
    font-size: 16px;
    font-weight: 500;
    background-color: var(--primary);
    color: var(--white-constant);
    border-radius: 8px;
   width: 175.88px;
   height: 55.1px;
}
`
export const ChallanTable = styled.div`
background-color: var(--white-color);
border-radius: 20px;
padding: 20px;
margin-top: 2%;
.table-heading{
    font-size: 24px;
    font-weight: 500;
    color:  var(--black-text);
    @media(max-width:768px) {
        font-size: 20px;
    }
}
td , th{
    text-align: start;
    width: 100px;
}
.table-data{
    font-family: 'Nunito';
    border-top: 1px solid #F2F4F7;
}
.status{
background-color: #0FCB0226;
color: #43AC43;
font-size: 13px;
font-weight: 400;
width: 34px;
height: 20px;
border-radius: 4px;
padding: 2px 4px 2px 4px;
}
.table-width{
    width: 100%;
    @media (max-width:900px ) {
        width: 300%;
    }
}
`