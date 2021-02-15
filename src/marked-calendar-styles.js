import { css } from 'lit-element';

export const markedCalendarStyles = css`
  :host {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f8f7f2;
    font-family: "Amatic SC", cursive;
    font-size: 100%;
    -webkit-user-select: none;
      -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;

    --cellSize: 1.25em;
  }

  .title {
    text-align: center;
    font-family: "Pacifico", cursive;
    margin: 0;
    color: #564d65;
    text-shadow: 1px 3px 1px #dfe8ea;
  }

  .social {
    position: absolute;
    left: 10px;
    top: 10px;
  }
  .social a img {
    display: inline-block;
    height: 1.5rem;
  }

  #guide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin: 1em 0;
  }
  .cursor_pointer:hover {
    cursor: pointer;
  }
  #selectedState {
    color: #F30;
    font-weight: bold;
    font-size: 1.1rem;
    letter-spacing: 3px;
  }
  #selectedState span {
    width: 1rem;
    height: 1rem;
    display: inline-block;
    vertical-align: middle;
  }

  #states {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width:22rem;
  }
  #states div {
    position: relative;
    margin: 5px 1rem;
    padding-left: var(--cellSize);
    width: 2rem;
  }
  #states div span {
    position: absolute;
    left: 0;
    top: 0.25rem;
    width: 1rem;
    height: 1rem;
  }
  .typeselected {
    border:3px inset !important;
  }

  /* Vista AÑO */
  .content {
    display: inline-flex;
    flex-direction: column;
  }

  .yearMainContainer,
  #monthHeader,
  #daysHeader,
  #tableContainer {
    display: flex;
    justify-content: center;
    margin-bottom: 0.25rem;
  }

  #daysHeader {
    margin-left: var(--cellSize);
    margin-bottom: 0;
    margin-top: 1rem;
  }

  .monthHeader,
  .dayHeader {
    width: var(--cellSize);
    height: var(--cellSize);
    font-size: 1rem;
    padding: 1px 0 0 1px;
    text-align: center;
    font-weight: bold;
  }

  .monthContainer {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  .monthContainer:hover {
    cursor: pointer;
  }
  .monthLetterBtn {
    width:var(--cellSize);
    padding:0;
  }

  .dayContainer {
    width: var(--cellSize);
    height: var(--cellSize);
    border: 1px solid #dfe8ea;
    margin-right: -1px;
    margin-bottom: -1px;
  }

  /* VISTA MES */
  .monthMainContainer {
    width:21rem;
    display:grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .monthMainContainer span.dayofweek {
    text-align: center;
    font-weight:bold;
    font-size:1.2rem;
  }

  .monthMainContainer span.dayofmonth { 
    border:1px solid #CCC; 
    height: 3rem;
    width: 3rem; 
  }

  .monthMainContainer span div {
    font-size: 2rem;
    text-align:center;
    height:65%;
    width:100%;
  }

  .calendarNavigation { 
    text-align: center;
    color:red;
    
    height: 2rem;
  }
  .calendarNavigation .navBar {
    display:flex;
    width:80%;
    margin-left:10%;
  }
  .calendarNavigation .navBar button {
    margin:0 1rem;
  }
  .calendarNavigation .navBar .navTitle {
    width:200px;
  }
  #changeViewBtn { width:7rem; }
  .notice { width:150px; height:50px; padding:5px; position:absolute; display:none; border:2px solid #000; border-radius:10px; background:#F90; }

  @media (min-width: 769px) {
    .content {
      display: flex;
      justify-content: center;
      --cellSize: 1rem;
    }

    .yearMainContainer {
      flex-direction: column;
    }

    #monthHeader {
      flex-direction: column;
    }

    .dayHeader,
    #daysHeader,
    .monthContainer {
      flex-direction: row;
    }
  }
  @media (max-width: 768px) {
    .content {
      display: inline-flex;
      flex-direction: row;
      justify-content: center;
      width: 90%;
    }

    .yearMainContainer,
    #monthHeader {
      flex-direction: row;
    }

    .dayHeader,
    #daysHeader,
    #tableContainer {
      flex-direction: column;
    }

    .monthMainContainer {
      width:15rem;
      margin:0;
    }

    .monthMainContainer span.dayofweek {
      font-size:0.8rem;
    }
    .monthMainContainer span.dayofmonth { 
      border:1px solid #CCC; 
      height: 3rem;
      width: 2.1rem; 
      font-size:0.8rem;
    }

    #guide {
      font-size:1rem;
    }
    #states {
      width: 100%;
    }
  }
`;