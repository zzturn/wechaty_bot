
import qrTerm from 'qrcode-terminal'

export default async function onScan (qrcode, status) {
  qrTerm.generate(qrcode, {small: true})

  const qrcodeImageUrl = [
    'https://wechaty.js.org/qrcode/',
    encodeURIComponent(qrcode),
  ].join('')

  console.log(status, qrcodeImageUrl)
}

