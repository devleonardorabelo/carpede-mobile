export const treatPrice = (price) => {
  const treated = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

  return treated;
};

export const regexMed = (text) => {
  if (text.length > 25) {
    const textCut = `${text.match(/^[\s\S]{0,25}/)}...`;
    return textCut;
  }
  return text;
};

export const WhatsappFormat = [
  { exactly: '(' },
  { char: /\d/, repeat: 2 },
  { exactly: ')' },
  { exactly: ' ' },
  { char: /\d/, repeat: 1 },
  { exactly: ' ' },
  { char: /\d/, repeat: 4 },
  { exactly: ' ' },
  { char: /\d/, repeat: 4 },
];

export const PhoneFormat = [
  { exactly: '(' },
  { char: /\d/, repeat: 2 },
  { exactly: ')' },
  { exactly: ' ' },
  { char: /\d/, repeat: 4 },
  { exactly: ' ' },
  { char: /\d/, repeat: 4 },
];
