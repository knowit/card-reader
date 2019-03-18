export const copyTextToClipboard = (text, el) => {
  if (!window || !document) {
    return false;
  }

  const textArea = document.createElement('textarea');

  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.padding = '0';
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  textArea.value = text;

  el.appendChild(textArea);

  textArea.select();

  try {
    const successful = document.execCommand('copy');
    el.removeChild(textArea);
    return successful;
  } catch (err) {
    el.removeChild(textArea);
    return false;
  }
};
