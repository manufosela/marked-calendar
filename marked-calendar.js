import { LitElement, html, css } from 'lit-element';

/**
 * `marked-calendar`
 * MarkedCalendar
 *
 * @customElement
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
      YEAR: { type: Number, attribute: 'year' },
      name: { type: String },
      saveData: { type: Boolean, attribute: 'save-data' },
      weekends: { type: Boolean },
      changeView: { type: Boolean, attribute: 'change-view' },
      options: { type: String }, // stringify of an array
      holidays: { type: String } // stringify of an array
    };
  }

  static get styles() {
    return css`
      :host {
        background: #f8f7f2;
        font-family: "Amatic SC", cursive;
        -webkit-user-select: none;
          -moz-user-select: none;
            -ms-user-select: none;
                user-select: none;
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
      #guide #selectedMood span {
        width: 1em;
        height: 1em;
        display: inline-block;
        vertical-align: middle;
      }

      #moods {
        display: flex;
      }
      #moods div {
        position: relative;
        margin: 0 1em;
        padding-left: 1.25em;
      }
      #moods div span {
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
        margin-left: 1.25em;
        margin-bottom: 0;
        margin-top: 1em;
      }

      .monthHeader,
      .dayHeader {
        width: 1.25em;
        height: 1.25em;
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

      .dayContainer {
        width: 1.25em;
        height: 1.25em;
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

      .monthMainContainer .monthname { 
        text-align: center;
        color:red;
        grid-column-start: 1;
        grid-column-end: 8;
        height: 2rem;
      }
      .monthMainContainer .monthBar {
        display:flex;
      }
      .monthMainContainer .monthBar button {
        margin:0 1rem;
      }
      .monthMainContainer .monthBar .monthTitle {
        width:200px;
      }
      #changeViewBtn { width:7rem; }




      .notice { width:150px; height:50px; padding:5px; position:absolute; display:none; border:2px solid #000; border-radius:10px; background:#F90; }

      @media (min-width: 769px) {
        .content {
          display: flex;
          justify-content: center;
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
          width: 100%;
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
      }
    `;
  }

  constructor() {
    super();
    this.view = 'year';
    this.lang = 'sp';
    this.YEAR = 2019;
    this.year = this.YEAR;
    this.saveData = false;
    this.changeView = false;
    this.weekends = false;
    this.COLORS = {
      0: { code: '#FFFFFF', label: 'X', title: 'delete' },
      1: { code: '#2DE1C2', label: '😃', title: 'very-happy' },
      2: { code: '#01BAEF', label: '😊', title: 'happy' },
      3: { code: '#AFBFC0', label: '😐', title: 'neutral' },
      4: { code: '#037171', label: '😞', title: 'sad' },
      5: { code: '#305654', label: '😭', title: 'very-sad' }
    };
    this.options = '';
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
    this.selectedMood = null;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('confirm-dataItem', this.confirmDataItem);
    document.addEventListener('confirm-item', this.confirmItem);
  }

  confirmDataItem(e) {
    console.log(e.details);
  }

  confirmItem(e) {
    console.log(e.details);
  }

  setMoods() {
    let colorKeys = Object.keys(this.COLORS);

    colorKeys.forEach(e => {
      let mood = document.createElement('div');
      let color = document.createElement('span');

      color.style.background = this._getGradient(this.COLORS[e].code);


      mood.setAttribute('mood', e);
      color.setAttribute('mood', e);

      mood.textContent += this.COLORS[e].label;
      mood.title = this.COLORS[e].title;
      mood.appendChild(color);

      this.MOODS.appendChild(mood);
    });
  }

  setMarkedDays(markedDays) {
    markedDays.forEach(el => {

      // Por hacer
    });
  }

  getMarkedDays() {
    let markedDays = [];
    let year = this._getCurrentLSStructure();
    for (let month in year) {
      if (year.hasOwnProperty(month)) {
        for (let day in year[month]) {
          if (year[month].hasOwnProperty(month) && year[month][day]) {
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
    let noLimits = (this.year <= this.YEAR + 1 && month < 1) || (this.year === this.YEAR);
    let holidays = (this.arrHolidays.length > 0);
    dayContainer.className = 'dayContainer';
    if (dataMonthDay) {
      dayContainer.style.background = this._getGradient(this.COLORS[dataMonthDay].code);
      dayContainer.title = this.COLORS[dataMonthDay].label;
    }
    if (this.weekends) {
      [dayContainer, noWeekend] = this.drawIsWeekend(dayContainer, month, day);
    }
    if (holidays) {
      [dayContainer, noHolidays] = this.drawIsHoliday(dayContainer, month, day);
    }
    if (noHolidays && noWeekend && noLimits) {
      dayContainer.onclick = (e) => {
        this.assignMood(month, day, dayContainer, e);
      };
    }
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

  addBtnEventsMonthHeadearBar(month) {
    this.shadowRoot.querySelector('#lastMonthBtn').onclick = (e) => {
      if (month === 0) {
        month = 12;
        this.year--;
      }
      this.createWeeks(month - 1);
    };
    this.shadowRoot.querySelector('#nextMonthBtn').onclick = (e) => {
      if (month === 11) {
        month = -1;
        this.year++;
      }
      this.createWeeks(month + 1);
    };
    if (this.changeView) {
      this.shadowRoot.querySelector('#changeViewBtn').onclick = (e) => {
        this.view = (this.view === 'month') ? '' : 'month';

        this.generateVisualStructure();
      };
    }
  }

  drawMonthHeaderBar(month) {
    this.MAIN_CONTAINER.innerHTML = '';
    this.MAIN_CONTAINER.className = 'monthMainContainer';
    let monthHeaderBar = document.createElement('div');
    monthHeaderBar.innerHTML = `
      <div class="monthBar">
        <button id="lastMonthBtn"><</button>
        <div class="monthTitle">${this.MONTH_LETTERS.sp[month].name}</div>
        <button id="nextMonthBtn">></button>
        ${(this.changeView) ? '<button id="changeViewBtn">Vista Año</button>' : ''}
      </div>`;
    monthHeaderBar.className = 'monthname';
    this.MAIN_CONTAINER.appendChild(monthHeaderBar);
    this.addBtnEventsMonthHeadearBar(month);
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
    this.checkLocalStorage();
    this.drawMonthHeaderBar(month);
    this.drawDayOfTheWeeksHeader();
    this.drawMonth(month);
  }

  createMonths() {
    const data = this._getCurrentLSStructure();
    const months = Object.keys(data);
    this.MAIN_CONTAINER.innerHTML = '';
    this.MAIN_CONTAINER.className = 'yearMainContainer';
    months.forEach(month => {
      let monthContainer = document.createElement('div');
      monthContainer.className = 'monthContainer';
      let monthHeader = document.createElement('div');
      monthHeader.className = 'monthHeader';
      monthHeader.textContent = this.MONTH_LETTERS[this.lang][month].letter;
      monthHeader.title = this.MONTH_LETTERS[this.lang][month].name;

      this.setDayStyle(month, monthContainer);

      this.MONTH_HEADER.appendChild(monthHeader);
      this.MAIN_CONTAINER.appendChild(monthContainer);
    });
  }

  generateVisualStructure() {
    const dayHeaderLength = 31;
    let month = new Date().getMonth();
    switch (this.view) {
      case 'month':
        this.createWeeks(month);
        break;
      default:
        this.createDayCells(dayHeaderLength);
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
          dayHoliday.date === d + '/' + m + '/' + this.year && this.year === this.YEAR + 1) {
        dayContainer.style.background = '#999';
        dayContainer.style.cursor = 'not-allowed';
        dayContainer.title = dayHoliday.title;
        noHolidays = false;
      }
    });
    return [dayContainer, noHolidays];
  }

  assignMood(month, day, item, e) {
    let data = this._getCurrentLSStructure();
    data[month][day] = this.selectedMood;

    if (this.selectedMood) {
      item.style.background = this._getGradient(this.COLORS[this.selectedMood].code);
      item.title = this.COLORS[this.selectedMood].label;
      let settingCalenderEvent = new CustomEvent('setting-calendarItem', { detail: {year: this.year, month: month, day: day, mood: this.selectedMood} });
      this.dispatchEvent(settingCalenderEvent);
      if (this.saveData) {
        localStorage.setItem('structure' + this.year, JSON.stringify(data));
      }
    } else {
      this.showNotice(e);
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

  _getGradient(colorId) {
    return `radial-gradient(ellipse at center, rgba(255,255,255,.1) -95%, ${colorId} 100%)`;
  }

  updated() {
    this.GUIDES.addEventListener('click', e => {
      if (e.target.attributes[0].value >= 0) {
        this.selectedMood = e.target.attributes[0].value;
        this.SELECTED_MOOD.style.background = this._getGradient(this.COLORS[this.selectedMood].code);
      }
    });
  }

  _setCOLORSwithOptions() {
    if (this.options !== '') {
      let opts = JSON.parse(this.options);
      opts.unshift(['#FFFFFF', 'X']);
      this.COLORS = Object.assign({}, opts.map((opt) => {
        return {
          'code': opt[0],
          'label': opt[1],
          'title': opt[2]
        };
      }));
    }
  }

  _setArrHolidays() {
    if (this.holidays !== '') {
      this.arrHolidays = JSON.parse(this.holidays);
    }
  }

  firstUpdated() {
    this.name = this.name || html`Year in pixels`;
    this._setCOLORSwithOptions();
    this._setArrHolidays();
    this.MAIN_CONTAINER = this.shadowRoot.querySelector('#mainContainer');
    this.DAYS_HEADER = this.shadowRoot.querySelector('#daysHeader');
    this.MONTH_HEADER = this.shadowRoot.querySelector('#monthHeader');
    this.GUIDES = this.shadowRoot.querySelector('#guide');
    this.GUIDES = this.shadowRoot.querySelector('#guide');
    this.SELECTED_MOOD = this.shadowRoot.querySelector('#selectedMood span');
    this.MOODS = this.shadowRoot.querySelector('#moods');
    this.NOTICE_LAYER = this.renderRoot.querySelector('#notice');
    this.checkLocalStorage();
    this.generateVisualStructure();
    this.setMoods();
    this.renderRoot.querySelector('div [mood="0"] span').style.border = '1px solid black';
  }

  render() {
    return html`
      <h1 class="title">${this.name} (${this.year})</h1>
      <div id="guide">
        <div id="selectedMood">Selected option: <span></span></div>
        <div id="moods"></div>
      </div>
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