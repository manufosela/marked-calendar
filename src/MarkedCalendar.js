/* eslint-disable no-bitwise */
import { LitElement, html } from 'lit-element';
import { markedCalendarStyles } from './marked-calendar-styles';

/**
 * `marked-calendar`
 * MarkedCalendar
 *
 * @custom-element
 * @polymer
 * @litElement
 * @demo demo/index.html
 */

export class MarkedCalendar extends LitElement {
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
      easterWeek: { type: Boolean, attribute: 'easter-week' },
      changeView: { type: Boolean, attribute: 'change-view' }
    };
  }

  static get styles() {
    return [markedCalendarStyles];
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
      ],
      en: [
        { letter: 'J', name: 'January' },
        { letter: 'F', name: 'February' },
        { letter: 'M', name: 'March' },
        { letter: 'A', name: 'April' },
        { letter: 'M', name: 'May' },
        { letter: 'J', name: 'June' },
        { letter: 'J', name: 'July' },
        { letter: 'A', name: 'August' },
        { letter: 'S', name: 'September' },
        { letter: 'O', name: 'October' },
        { letter: 'N', name: 'November' },
        { letter: 'D', name: 'December' }
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
      ],
      en: [
        { letter: 'M', name: 'Monday' },
        { letter: 'T', name: 'Tuesday' },
        { letter: 'W', name: 'Wednesday' },
        { letter: 'T', name: 'Thursday' },
        { letter: 'F', name: 'Friday' },
        { letter: 'S', name: 'Saturday' },
        { letter: 'S', name: 'Sunday' }
      ]
    };
    this.selectedState = null;
    this.DAYHEADERLENGTH = 31;
    this.id = this.id || this._createUUID();
    this.structureName = `marked-calendar-${this.id}`;

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

  getArrDaysByMonth() {
    const febDays = ((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0) ? 29 : 28;
    return [31, febDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }

  _createUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
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
    const structure = this._getCurrentLSStructure();
    const year = structure[this.year];
    markedDays = (typeof markedDays === 'string') ? JSON.parse(markedDays) : markedDays;
    markedDays.forEach(el => {
      let dayVal = el.day.split('/');
      let day = dayVal[0] - 1;
      let month = dayVal[1] - 1;
      let val = el.value;
      year[month][day] = val;
      this._setCurrentLSStructure(year);
      this.generateVisualStructure();
    });
  }

  getMarkedDays() {
    let markedDays = [];
    const structure = this._getCurrentLSStructure();
    const year = structure[this.year];
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
    if (window.localStorage[this.structureName] === undefined) {
      let structure = this.generateDataStructure();
      localStorage.setItem(this.structureName, JSON.stringify(structure));
    }
  }

  generateDataStructure() {
    let data = {};
    data[this.year] = {};
    for (let i = 0; i < 12; i++) {
      data[this.year][i] = {}; //Array.from({ length: this._getDaysFromMonth(i + 1) }, () => null);
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
    let structure = this._getCurrentLSStructure();
    const data = structure[this.year];
    const days = this.getArrDaysByMonth()[month];
    for (let day = 0; day < days; day++) {
      const content = (data[month][day]) ? data[month][day] : '';
      const dayContainer = this.setDayContent(content, month, day);
      monthContainer.appendChild(dayContainer);
    }
  }

  _decrementMonth(e) {
    this.month--;
    if (this.month === 0) {
      this.month = 11;
      this.year--;
      this._calcEasterWeek();
    }
    this.createWeeks(this.month);
    this.shadowRoot.querySelector('#navTitle').textContent = `${this.MONTH_LETTERS.sp[this.month].name} ${this.year}`;
  }

  _incrementMonth(e) {
    this.month++;
    if (this.month === 12) {
      this.month = 0;
      this.year++;
      this._calcEasterWeek();
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
    if (typeof window.localStorage[this.structureName] === 'undefined') {
      let structure = this.generateDataStructure();
      localStorage.setItem(this.structureName, JSON.stringify(structure));
      this.year++;
    }
    this._calcEasterWeek();
    this.createDayCells(this.DAYHEADERLENGTH);
    this.createMonths();
    this.shadowRoot.querySelector('#navTitle').textContent = `${this.year}`;
  }

  _incrementYear(e) {
    this.year++;
    if (typeof window.localStorage[this.structureName] === 'undefined') {
      if (this.saveData) {
        let structure = this.generateDataStructure();
        localStorage.setItem(this.structureName, JSON.stringify(structure));
      } else {
        this.year--;
        return;
      }
    }
    this._calcEasterWeek();
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
      weekDayContainer.textContent = this.DAYOFWEEK_LETTER[this.lang][i].letter;
      this.MAIN_CONTAINER.appendChild(weekDayContainer);
    }
  }

  drawMonth(month) {
    month = Number(month);
    const structure = this._getCurrentLSStructure();
    const data = structure[this.year];
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
    const structure = this._getCurrentLSStructure();
    const data = structure[this.year];
    const months = Object.keys(this.getArrDaysByMonth());
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
    this.MAIN_CONTAINER.onclick = this.setCellValue;
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
      dayContainer.style.cursor = (this.saveData) ? 'not-allowed' : 'help';
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
      if (dayHoliday.date === d + '/' + m) {
        dayContainer.style.background = '#999';
        dayContainer.style.cursor = (this.saveData) ? 'not-allowed' : 'help';
        dayContainer.title = dayHoliday.title;
        noHolidays = false;
      }
    });
    return [dayContainer, noHolidays];
  }

  assignState(month, day, e) {
    const item = e.target;
    const noLimits = true; // (this.year <= this.YEAR + 1 && month < 1) || (this.year === this.YEAR);
    const noholidays = (item.dataset.noholidays === 'true');
    const noweekend = (item.dataset.noweekend === 'true');
    if (noholidays && noweekend && noLimits && this.saveData) {
      const structure = this._getCurrentLSStructure();
      const data = structure[this.year];
      data[month][day] = (this.selectedState === '0') ? null : this.selectedState;

      if (this.selectedState) {
        item.style.background = this._getGradient(this.LEGEND[this.selectedState].code);
        item.title = this.LEGEND[this.selectedState].label;
        let settingCalenderEvent = new CustomEvent('setting-calendarItem', { detail: {year: this.year, month: month, day: day, state: this.selectedState} });
        this.dispatchEvent(settingCalenderEvent);
        if (this.saveData) {
          structure[this.year] = data;
          localStorage.setItem(this.structureName, JSON.stringify(structure));
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
    const structure = JSON.parse(window.localStorage[this.structureName]);
    if (structure[this.year] === undefined) {
      structure[this.year] = this.generateDataStructure()[this.year];
    }
    return structure;
  }

  _setCurrentLSStructure(data) {
    const structure = this._getCurrentLSStructure();
    structure[this.year] = data;
    localStorage.setItem(this.structureName, JSON.stringify(structure));
  }

  _getGradient(colorId) {
    return `radial-gradient(ellipse at center, rgba(255,255,255,.1) -95%, ${colorId} 100%)`;
  }

  _selectLegendType(e) {
    if (e.target.attributes[0].value >= 0) {
      if (this.shadowRoot.querySelector('span[class="typeselected"]')) {
        this.shadowRoot.querySelector('span[class="typeselected"]').classList.remove('typeselected');
      }
      this.selectedState = e.target.attributes[0].value;
      e.target.classList.add('typeselected');
    }
  }

  updated() {
    if (this.saveData) {
      this.GUIDES.addEventListener('click', this._selectLegendType);
    }
  }

  _calcEasterWeek() {
    let M;
    let N;
    let dia;
    let mes;
    if      (this.year > 1583 && this.year < 1699) { M=22; N=2; } 
    else if (this.year > 1700 && this.year < 1799) { M=23; N=3; } 
    else if (this.year > 1800 && this.year < 1899) { M=23; N=4; } 
    else if (this.year > 1900 && this.year < 2099) { M=24; N=5; } 
    else if (this.year > 2100 && this.year < 2199) { M=24; N=6; } 
    else if (this.year > 2200 && this.year < 2299) { M=25; N=0; } 

    const a = this.year % 19;
    const b = this.year % 4;
    const c = this.year % 7;
    const d = ((19*a) + M) % 30;
    const e = ((2*b) + (4*c) + (6*d) + N) % 7;
    const f = d + e;

    if (f < 10) { 
     dia = f + 22;
     mes = 3;
    } else  {
     dia = f - 9;
     mes = 4;
    };

    if (dia == 26 && mes == 4){ 
     dia = 19;
    };

    if (dia == 25 && mes == 4 && d == 28 && e == 6 && a > 10){
     dia = 18;
    };

    const easterWeek = new Date(this.year, mes - 1, dia);
    const jS = new Date(this.year, mes - 1, dia);
    const vS = new Date(this.year, mes - 1, dia);
    const juevesSanto = new Date(jS.setDate(easterWeek.getDate() - 3));
    const viernesSanto = new Date(vS.setDate(easterWeek.getDate() - 2));
    this.arrHolidays = this.arrHolidays.filter((obj) => {
      return (obj.title !== 'Jueves Santo' && obj.title !== 'Viernes Santo');
    });
    this.arrHolidays.push({title:'Jueves Santo', date:`${juevesSanto.getDate()}/${juevesSanto.getMonth() + 1}` });
    this.arrHolidays.push({title:'Viernes Santo', date:`${viernesSanto.getDate()}/${viernesSanto.getMonth() + 1}` });
    // console.log(juevesSanto, viernesSanto);
  }; 

  _defineLEGEND() {
    const legendDOM = [...this.querySelectorAll('#legend li')];
    if (legendDOM) {
      this.LEGEND = legendDOM.map((legendItem) => {
        return { code: legendItem.getAttribute('code'), label: legendItem.getAttribute('label'), title: legendItem.textContent };
      });
      if (this.saveData) {
        this.LEGEND.unshift({code: '#FFFFFF', label: 'X', title: 'borrar'});
      } else {
        this.LEGEND.unshift({code: '#FFFFFF', label: ' ', title: ' '});
      }
    }
  }

  _setArrHolidays() {
    const holidaysDOM = [...this.querySelectorAll('#holidays li')];
    if (holidaysDOM) {
      this.arrHolidays = holidaysDOM.map((holidayItem) => {
        return { title: holidayItem.getAttribute('title'), date: holidayItem.textContent };
      });
      this._calcEasterWeek();
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
    const select = (this.saveData) ? 'cursor_pointer' : 'cursor_normal';
    return html`
      <h1 class="title">${this.name}</h1>
      <div id="guide" class="${select}">
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
