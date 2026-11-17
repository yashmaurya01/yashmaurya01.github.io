(() => {
  const form = document.getElementById('qr-form');
  const qrText = document.getElementById('qr-text');
  const qrCodeDiv = document.getElementById('qrcode');
  const downloadLink = document.getElementById('download-btn');
  const placeholder = document.getElementById('qr-placeholder');
  const status = document.getElementById('qr-status');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const text = qrText.value.trim();
    if (!text) return;
    qrCodeDiv.innerHTML = '';
    qrCodeDiv.hidden = false;
    downloadLink.hidden = true;
    downloadLink.removeAttribute('href');
    try {
      new QRCode(qrCodeDiv, {
        text,
        width: Number(document.getElementById('qr-size').value),
        height: Number(document.getElementById('qr-size').value),
        colorDark: '#111111',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel[document.getElementById('qr-ec').value]
      });
      placeholder.hidden = true;
      downloadLink.href = qrCodeDiv.querySelector('canvas').toDataURL('image/png');
      downloadLink.hidden = false;
      status.textContent = 'QR code ready.';
    } catch (_) {
      qrCodeDiv.innerHTML = '';
      qrCodeDiv.hidden = true;
      placeholder.hidden = false;
      status.textContent = 'This text is too long for a QR code. Try a shorter link or message.';
    }
  });
})();
