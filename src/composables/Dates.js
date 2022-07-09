/**
 * Convertit une string au format ISO 8601 (avec heures UTC) en objet Date
 *
 * @param {string} str La date au format ISO 8601 avec heures UTC
 * @return {Date} en "local timezone"
 */
 export function strToDate(str) {
    return new Date(Date.UTC(
      str.substr(0, 4),
      str.substr(4, 2) - 1,
      str.substr(6, 2),
      str.substr(9, 2),
      str.substr(11, 2),
      str.substr(13, 2)
    ));
  }
  /**
   * Convertit un objet Date en string au format FR_CH simplifié
   *
   * @param {Date}
   * @return {string} exemple de retour: "Lun 02.11"
   */
  export function dateToFrCh(date) {
    let mapDay = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    let day = date.getDate();
    let dayName = mapDay[date.getDay()];
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    return `${dayName} ${day}.${month}`;
  }
  /**
   * Convertit un objet Date au format heures:minutes en "local timezone"
   *
   * @param {Date}
   * @return {string} exemple de retour: "15:32"
   */
  export function dateToHours(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    return `${hours}:${minutes}`;
  }
  