import styled from 'styled-components';

export const Container = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #FFF;
  border-radius: 3px;
  margin: 0 10px;
  box-shadow: 0px 0px 5px 0px #D8ACE0;

  display: flex;
  flex-direction: column;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n - 1) {
        background: #F5F5F5;
      }
    }
  }

  footer {
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    background: #63F5B0;

    button {
      flex: 1;
      font-size: 16px;
      text-align: center;
      color: #FFF;
      background: transparent;
      border: 0;
      cursor: pointer;
    }
  }
`;
