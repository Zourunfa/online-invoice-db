import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

/**
 * 将指定的dom元素转为pdf 并下载
 * @param {element} dom
 * @param {string} filename
 */
export default function (dom, filename) {
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  html2Canvas(dom, {
    allowTaint: true,
    useCORS: true,
    taintTest: false,
    dpi: window.devicePixelRatio * 10, //将分辨率提高到特定的DPI 提高四倍
    scale: 10, //按比例增加分辨率
    height: dom?.scrollHeight,
    width: dom?.scrollWidth,
  }).then(canvas => {
    let imgWidth = 595
    let imgHeight = 842
    let pageData = canvas.toDataURL('image/jpeg', 1.0)
    let pdf = new JsPDF('', 'pt', 'a4')
    pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
    filename = filename.indexOf('.pdf') >= 0 ? filename : filename + '.pdf'
    pdf.save(filename)
  })
}
