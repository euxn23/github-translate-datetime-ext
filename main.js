const shortenMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function monthStrToIndex (monthStr) {
  return shortenMonths.indexOf(monthStr)
}
const thisYear = new Date().getFullYear()

const thisYearRegExp = new RegExp(`^on\\s(\\d+)\\s(${shortenMonths.join('|')})\\s?(\\d\\d\\d\\d)?$`, 'i')

browser.tabs.onActivated.addEventListener(() => {
  Array.from(document.querySelectorAll('relative-time')).forEach(async (el) => {
    const [matched, date, month, year] = el.textContent.match(thisYearRegExp) ?? []
    if (!matched) {
      return
    }
    const isoDate = new Intl.DateTimeFormat().format(new Date(year ?? thisYear, monthStrToIndex(month), date))
    el.textContent = isoDate
  })
})
