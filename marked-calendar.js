import { LitElement, html, css } from 'lit-element';

/**
 * `marked-calendar`
 * MarkedCalendar
 *
 * @custom-element
 * @polymer
 * @litElement
 * @demo demo/index.html
 */

class MarkedCalendar extends LitElement {
  static get is() {
    return 'marked-calendar';
  }

  static get properties() {
    return {
      lang: { type: String },
      view: { type: String },
      year: { type: Number },
      name: { type: String },
      saveData: { type: Boolean, attribute: 'save-data' },
      weekends: { type: Boolean },
      changeView: { type: Boolean, attribute: 'change-view' },
      legend: { type: String }, // stringify of an array
      holidays: { type: String } // stringify of an array
    };
  }

  static get styles() {
    return css`
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
        height: 1.5em;
      }

      #guide {
        display: flex;
        justify-content: center;
        font-weight: bold;
        margin: 1em 0;
      }
      #guide:hover {
        cursor: pointer;
      }
      #selectedState {
        color: #F30;
        font-weight: bold;
        font-size: 1.1rem;
        letter-spacing: 3px;
      }
      #selectedState span {
        width: 1em;
        height: 1em;
        display: inline-block;
        vertical-align: middle;
      }

      #states {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        width: 25rem;
      }
      #states div {
        position: relative;
        margin: 5px 1em;
        padding-left: var(--cellSize);
        width: 2em;
      }
      #states div span {
        position: absolute;
        left: 0;
        top: 0.25em;
        width: 1em;
        height: 1em;
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
        margin-bottom: 0.25em;
      }

      #daysHeader {
        margin-left: var(--cellSize);
        margin-bottom: 0;
        margin-top: 1em;
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
          --cellSize: 1em;
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
          flex-direction: column;
          align-items: center;
          font-size:1rem;
        }
        #states {
          width: 100%;
        }
      }
    `;
  }

  constructor() {
    super();
    this.view = 'year';
    this.lang = 'sp';
    this.YEARNOW = new Date().getFullYear();
    this.year = this.YEARNOW;
    this.YEAR = this.year;
    this.day = new Date().getDate();
    this.month = new Date().getMonth();
    this.saveData = false;
    this.changeView = false;
    this.weekends = false;
    this.LEGEND = {
      0: { code: '#FFFFFF', label: 'X', title: 'delete' },
      1: { code: '#2DE1C2', label: '😃', title: 'very-happy' },
      2: { code: '#01BAEF', label: '😊', title: 'happy' },
      3: { code: '#AFBFC0', label: '😐', title: 'neutral' },
      4: { code: '#037171', label: '😞', title: 'sad' },
      5: { code: '#305654', label: '😭', title: 'very-sad' }
    };
    this.legend = '';
    this.holidays = '';
    this.arrHolidays = [];
    this.MONTH_LETTERS = {
      sp: [
        { letter: 'E', name: 'Enero' },
        { letter: 'F', name: 'Febrero' },
        { letter: 'M', name: 'Marzo' },
        { letter: 'A', name: 'Abril' },
        { letter: 'M', name: 'Mayo' },
        { letter: 'J', name: 'Junio' },
        { letter: 'J', name: 'Julio' },
        { letter: 'A', name: 'Agosto' },
        { letter: 'S', name: 'Septiembre' },
        { letter: 'O', name: 'Octubre' },
        { letter: 'N', name: 'Noviembre' },
        { letter: 'D', name: 'Diciembre' }
      ]
    };
    this.DAYOFWEEK_LETTER = {
      sp: [
        { letter: 'L', name: 'Lunes' },
        { letter: 'M', name: 'Martes' },
        { letter: 'X', name: 'Miércoles' },
        { letter: 'J', name: 'Jueves' },
        { letter: 'V', name: 'Viernes' },
        { letter: 'S', name: 'Sábado' },
        { letter: 'D', name: 'Domingo' }
      ]
    };
    this.selectedState = null;
    this.DAYHEADERLENGTH = 31;

    this._selectLegendType = this._selectLegendType.bind(this);
    this._changeToViewMonth = this._changeToViewMonth.bind(this);
    this._decrementMonth = this._decrementMonth.bind(this);
    this._incrementMonth = this._incrementMonth.bind(this);
    this._decrementYear = this._decrementYear.bind(this);
    this._incrementYear = this._incrementYear.bind(this);
    this.setCellValue = this.setCellValue.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.YEAR = this.year;
  }

  setStates() {
    let colorKeys = Object.keys(this.LEGEND);

    colorKeys.forEach(e => {
      let state = document.createElement('div');
      let color = document.createElement('span');

      color.style.background = this._getGradient(this.LEGEND[e].code);

      state.setAttribute('state', e);
      color.setAttribute('state', e);

      state.textContent += this.LEGEND[e].label;
      state.title = this.LEGEND[e].title;
      state.appendChild(color);

      this.MOODS.appendChild(state);
    });
  }

  setMarkedDays(markedDays) {
    markedDays = (typeof markedDays === 'string') ? JSON.parse(markedDays) : markedDays;
    markedDays.forEach(el => {
      let dayVal = el.day.split('/');
      let day = dayVal[0] - 1;
      let month = dayVal[1] - 1;
      let val = el.value;
      let year = this._getCurrentLSStructure();
      year[month][day] = val;
      this._setCurrentLSStructure(year);
      this.generateVisualStructure();
    });
  }

  getMarkedDays() {
    let markedDays = [];
    let year = this._getCurrentLSStructure();
    for (let month in year) {
      if (Object.prototype.hasOwnProperty.call(year, month)) {
        for (let day in year[month]) {
          if (Object.prototype.hasOwnProperty.call(year[month], month) && year[month][day]) {
            markedDays.push({day: (Number(day) + 1) + '/' + (Number(month) + 1), value: year[month][day]});
          }
        }
      }
    }
    return markedDays;
  }

  checkLocalStorage() {
    if (window.localStorage['structure' + this.year] === undefined) {
      let structure = this.generateDataStructure();
      localStorage.setItem('structure' + this.year, JSON.stringify(structure));
    }
  }

  generateDataStructure() {
    let data = {};
    for (let i = 0; i < 12; i++) {
      data[i] = Array.from({ length: this._getDaysFromMonth(i + 1) }, () => null);
    }
    return data;
  }

  createDayCells(dayHeaderLength) {
    this.DAYS_HEADER.textContent = '';
    for (let day = 1; day <= dayHeaderLength; day++) {
      let dayHeader = document.createElement('div');
      dayHeader.className = 'dayHeader';
      dayHeader.textContent = day;
      this.DAYS_HEADER.appendChild(dayHeader);
    }
  }

  setDayContent(dataMonthDay, month, day) {
    let dayContainer = document.createElement('div');
    let noHolidays = true;
    let noWeekend = true;
    let holidays = (this.arrHolidays.length > 0);
    dayContainer.className = 'dayContainer';
    if (dataMonthDay) {
      dayContainer.style.background = this._getGradient(this.LEGEND[dataMonthDay].code);
      dayContainer.title = this.LEGEND[dataMonthDay].label;
    }
    if (this.weekends) {
      [dayContainer, noWeekend] = this.drawIsWeekend(dayContainer, month, day);
    }
    if (holidays) {
      [dayContainer, noHolidays] = this.drawIsHoliday(dayContainer, month, day);
    }
    dayContainer.dataset.noweekend = noWeekend;
    dayContainer.dataset.noholidays = noHolidays;
    dayContainer.dataset.month = month;
    dayContainer.dataset.day = day;

    return dayContainer;
  }

  setDayStyle(month, monthContainer) {
    const data = this._getCurrentLSStructure();
    let days = Object.keys(data[month]);
    days.forEach(day => {
      let dayContainer = this.setDayContent(data[month][day], month, day);
      monthContainer.appendChild(dayContainer);
    });
  }

  _decrementMonth(e) {
    this.month--;
    if (this.month === 0) {
      this.month = 11;
      this.year--;
    }
    this.createWeeks(this.month);
    this.shadowRoot.querySelector('#navTitle').textContent = `${this.MONTH_LETTERS.sp[this.month].name} ${this.year}`;
  }

  _incrementMonth(e) {
    this.month++;
    if (this.month === 12) {
      this.month = 0;
      this.year++;
    }
    this.createWeeks(this.month);
    this.shadowRoot.querySelector('#navTitle').textContent = `${this.MONTH_LETTERS.sp[this.month].name} ${this.year}`;
  }

  addBtnEventsMonthNavBar() {
    this.shadowRoot.querySelector('#lastMonthBtn').onclick = this._decrementMonth;
    this.shadowRoot.querySelector('#nextMonthBtn').onclick = this._incrementMonth;
    if (this.changeView) {
      this.shadowRoot.querySelector('#changeViewBtn').onclick = (e) => {
        this.view = 'year';
        this.generateVisualStructure();
      };
    }
  }

  _decrementYear(e) {
    this.year--;
    if (typeof window.localStorage['structure' + this.year] === 'undefined') {
      if (this.saveData) {
        let structure = this.generateDataStructure();
        localStorage.setItem('structure' + this.year, JSON.stringify(structure));
      } else {
        this.year++;
        return;
      }
    }
    this.createDayCells(this.DAYHEADERLENGTH);
    this.createMonths();
    this.shadowRoot.querySelector('#navTitle').textContent = `${this.year}`;
  }

  _incrementYear(e) {
    this.year++;
    if (typeof window.localStorage['structure' + this.year] === 'undefined') {
      if (this.saveData) {
        let structure = this.generateDataStructure();
        localStorage.setItem('structure' + this.year, JSON.stringify(structure));
      } else {
        this.year--;
        return;
      }
    }
    this.createDayCells(this.DAYHEADERLENGTH);
    this.createMonths();
    this.shadowRoot.querySelector('#navTitle').textContent = `${this.year}`;
  }

  addBtnEventsYearNavBar() {
    this.shadowRoot.querySelector('#lastYearBtn').onclick = this._decrementYear;
    this.shadowRoot.querySelector('#nextYearBtn').onclick = this._incrementYear;
    if (this.changeView) {
      this.shadowRoot.querySelector('#changeViewBtn').onclick = (e) => {
        this.view = 'month';
        this.generateVisualStructure();
      };
    }
  }

  _addNavEvents(mode) {
    if (mode === 'month') {
      this.addBtnEventsMonthNavBar();
    } else {
      this.addBtnEventsYearNavBar();
    }
  }

  drawNavigationBar(mode, value) {
    let navBar = document.createElement('div');
    if (mode === 'month') {
      navBar.innerHTML = `
        <div class="navBar">
          <button id="lastMonthBtn"><</button>
          <div id="navTitle" class="navTitle">${this.MONTH_LETTERS.sp[value].name} ${this.year}</div>
          <button id="nextMonthBtn">></button>
          ${(this.changeView) ? '<button id="changeViewBtn">Vista Año</button>' : ''}
        </div>`;
      navBar.className = 'calendarNavigation';
    } else {
      /** TODO: Tengo que ver en que parte se llama y se pinta cuando se selecciona la vista año.
       * Reutilizar las llamadas a los botones de mes del lateral en la vista año **/
      navBar.innerHTML = `
        <div class="navBar">
          <button id="lastYearBtn"><</button>
          <div id="navTitle" class="navTitle">${this.year}</div>
          <button id="nextYearBtn">></button>
          ${(this.changeView) ? '<button id="changeViewBtn">Vista Mes</button>' : ''}
        </div>`;
    }
    this.shadowRoot.querySelector('#calendarNav').textContent = '';
    this.shadowRoot.querySelector('#calendarNav').appendChild(navBar);
    this._addNavEvents(mode);
  }

  drawMonthHeaderBar(month) {
    month = Number(month);
    this.MAIN_CONTAINER.textContent = '';
    this.MONTH_HEADER.textContent = '';
    this.DAYS_HEADER.textContent = '';
    this.MAIN_CONTAINER.className = 'monthMainContainer';
  }

  drawDayOfTheWeeksHeader() {
    for (let i = 0; i < 7; i++) {
      let weekDayContainer = document.createElement('span');
      weekDayContainer.className = 'dayofweek';
      weekDayContainer.textContent = this.DAYOFWEEK_LETTER.sp[i].letter;
      this.MAIN_CONTAINER.appendChild(weekDayContainer);
    }
  }

  drawMonth(month) {
    month = Number(month);
    const data = this._getCurrentLSStructure();
    const firstDay = new Date((month + 1) + '/1/' + this.year).getDay();
    const lastDay = new Date(this.year, (month + 1), 0).getDate();
    const firstDayOfWeek = (firstDay === 0) ? 7 : firstDay;
    let counterDay = 0;
    for (let i = 1; i <= 42; i++) {
      let weekDayContainer = document.createElement('span');
      if (i >= firstDayOfWeek && counterDay < lastDay) {
        weekDayContainer.className = 'dayofmonth';
        weekDayContainer.textContent = ++counterDay;
        let dayContainer = this.setDayContent(data[month][counterDay - 1], month, counterDay - 1);
        weekDayContainer.appendChild(dayContainer);
      }
      this.MAIN_CONTAINER.appendChild(weekDayContainer);
    }
  }

  createWeeks(month) {
    this.month = month;
    this.checkLocalStorage();
    this.drawMonthHeaderBar(this.month);
    this.drawDayOfTheWeeksHeader();
    this.drawMonth(this.month);
  }

  _changeToViewMonth(e) {
    let m = e.target.dataset.monthnum;
    this.view = 'month';
    this.createWeeks(m);
    this.generateVisualStructure();
  }

  createMonths() {
    const data = this._getCurrentLSStructure();
    const months = Object.keys(data);
    this.MONTH_HEADER.textContent = '';
    this.MAIN_CONTAINER.textContent = '';
    this.MAIN_CONTAINER.className = 'yearMainContainer';
    months.forEach(month => {
      let monthContainer = document.createElement('div');
      monthContainer.className = 'monthContainer';
      let monthHeader = document.createElement('div');
      monthHeader.className = 'monthHeader';
      let letter = this.MONTH_LETTERS[this.lang][month].letter;
      let name = this.MONTH_LETTERS[this.lang][month].name;
      monthHeader.innerHTML = `<button id="month_${name}" class="monthLetterBtn" title="click to change view of ${name}" data-monthnum="${month}">${letter}</button>`;
      monthHeader.title = name;

      this.setDayStyle(month, monthContainer);

      this.MONTH_HEADER.appendChild(monthHeader);
      this.MAIN_CONTAINER.appendChild(monthContainer);
      this.shadowRoot.querySelector('#month_' + name).onclick = this._changeToViewMonth;
    });
  }

  generateVisualStructure() {
    switch (this.view) {
      case 'month':
        this.drawNavigationBar('month', this.month);
        this.createWeeks(this.month);
        break;
      default:
        this.drawNavigationBar('year', this.YEAR);
        this.createDayCells(this.DAYHEADERLENGTH);
        this.createMonths();
    }
  }

  drawIsWeekend(dayContainer, month, day) {
    let noWeekend = true;
    let DoW = new Date(`${this.year}/${Number(month) + 1}/${Number(day) + 1}`).getDay();
    if (DoW === 0 || DoW === 6) {
      dayContainer.style.background = '#CCC';
      dayContainer.style.cursor = 'not-allowed';
      noWeekend = false;
    }
    return [dayContainer, noWeekend];
  }

  drawIsHoliday(dayContainer, month, day) {
    let noHolidays = true;
    let d = String(Number(day) + 1);
    let m = String(Number(month) + 1);
    let y = this.year;
    this.arrHolidays.forEach(dayHoliday => {
      if (dayHoliday.date === d + '/' + m  && this.year === this.YEAR ||
          dayHoliday.date === d + '/' + m + '/' + this.year) {
        dayContainer.style.background = '#999';
        dayContainer.style.cursor = 'not-allowed';
        dayContainer.title = dayHoliday.title;
        noHolidays = false;
      }
    });
    return [dayContainer, noHolidays];
  }

  assignState(month, day, e) {
    const item = e.target;
    const noLimits = (this.year <= this.YEAR + 1 && month < 1) || (this.year === this.YEAR);
    const noholidays = (item.dataset.noholidays === 'true');
    const noweekend = (item.dataset.noweekend === 'true');
    if (noholidays && noweekend && noLimits && this.saveData) {
      const data = this._getCurrentLSStructure();
      data[month][day] = (this.selectedState === '0') ? null : this.selectedState;

      if (this.selectedState) {
        item.style.background = this._getGradient(this.LEGEND[this.selectedState].code);
        item.title = this.LEGEND[this.selectedState].label;
        let settingCalenderEvent = new CustomEvent('setting-calendarItem', { detail: {year: this.year, month: month, day: day, state: this.selectedState} });
        this.dispatchEvent(settingCalenderEvent);
        if (this.saveData) {
          localStorage.setItem('structure' + this.year, JSON.stringify(data));
        }
      } else {
        this.showNotice(e);
      }
    }
  }

  showNotice(e) {
    this.NOTICE_LAYER.style.display = 'block';
    let w = this.NOTICE_LAYER.offsetWidth;
    let h = this.NOTICE_LAYER.offsetHeight;
    this.NOTICE_LAYER.style.top = (e.pageY - h / 2) + 'px';
    this.NOTICE_LAYER.style.left = (e.pageX - w / 2) + 'px';
    setTimeout(() => {
      this.NOTICE_LAYER.style.display = 'none';
    }, 1000);
  }

  _getDaysFromMonth(month) {
    return new Date(this.year, month, 0).getDate();
  }

  _getCurrentLSStructure() {
    return JSON.parse(window.localStorage['structure' + this.year]);
  }

  _setCurrentLSStructure(data) {
    localStorage.setItem('structure' + this.year, JSON.stringify(data));
  }

  _getGradient(colorId) {
    return `radial-gradient(ellipse at center, rgba(255,255,255,.1) -95%, ${colorId} 100%)`;
  }

  _selectLegendType(e) {
    if (e.target.attributes[0].value >= 0) {
      this.selectedState = e.target.attributes[0].value;
      this.SELECTED_MOOD.style.background = this._getGradient(this.LEGEND[this.selectedState].code);
    }
  }

  updated() {
    if (this.saveData) {
      this.GUIDES.addEventListener('click', this._selectLegendType);
    }
  }

  _defineLEGEND() {
    if (this.legend !== '') {
      this.LEGEND = JSON.parse(this.legend);
      if (this.saveData) {
        this.LEGEND.unshift({code: '#FFFFFF', label: 'X', title: 'borrar'});
      } else {
        this.LEGEND.unshift({code: '#FFFFFF', label: ' ', title: ' '});
      }
    }
  }

  _setArrHolidays() {
    if (this.holidays !== '') {
      this.arrHolidays = JSON.parse(this.holidays);
    }
  }

  setCellValue(e) {
    const month = e.target.dataset.month;
    const day = e.target.dataset.day;
    this.assignState(month, day, e);
  }

  init() {
    this.checkLocalStorage();
    this.generateVisualStructure();
    this.setStates();
  }

  firstUpdated() {
    this.name = this.name || html`Year in pixels`;
    this._defineLEGEND();
    this._setArrHolidays();
    this.MAIN_CONTAINER = this.shadowRoot.querySelector('#mainContainer');
    this.DAYS_HEADER = this.shadowRoot.querySelector('#daysHeader');
    this.MONTH_HEADER = this.shadowRoot.querySelector('#monthHeader');
    this.GUIDES = this.shadowRoot.querySelector('#guide');
    this.GUIDES = this.shadowRoot.querySelector('#guide');
    this.SELECTED_MOOD = this.shadowRoot.querySelector('#selectedState span');
    this.MOODS = this.shadowRoot.querySelector('#states');
    this.NOTICE_LAYER = this.renderRoot.querySelector('#notice');
    this.init();
    this.renderRoot.querySelector('div [state="0"] span').style.border = '1px solid black';
    this.MAIN_CONTAINER.onclick = this.setCellValue;
  }

  render() {
    return html`
      <h1 class="title">${this.name}</h1>
      <div id="guide">
        <div id="selectedState">${(this.saveData) ? html`Select an option:` : html`Legend`}<span></span></div>
        <div id="states"></div>
      </div>
      <div id="calendarNav" class="calendarNavigation"></div>
      <div class="content">
        <div id="daysHeader"></div>
        <div id="tableContainer">
          <div id="monthHeader"></div>
          <div id="mainContainer"></div>
        </div>
      </div>
      <div id="notice" class="notice">Select option first</div>
    `;
  }
}

window.customElements.define(MarkedCalendar.is, MarkedCalendar);