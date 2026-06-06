export const handlePhoneChange = (
  value: string
) => {
  return value.replace(/\D/g, "").slice(0, 10);
};

export const handlePANChange = (
  value: string
) => {
  value = value.toUpperCase();

  let result = "";

  for (let i = 0; i < value.length && i < 10; i++) {
    const char = value[i];

    if (i < 5) {
      if (/[A-Z]/.test(char))
        result += char;
    } else if (i < 9) {
      if (/\d/.test(char))
        result += char;
    } else {
      if (/[A-Z]/.test(char))
        result += char;
    }
  }

  return result;
};

export const handleGSTChange = (
  value: string
) => {
  value = value.toUpperCase();

  let result = "";

  for (let i = 0; i < value.length && i < 15; i++) {
    const char = value[i];

    if (i <= 1) {
      if (/\d/.test(char))
        result += char;
    } else if (i <= 6) {
      if (/[A-Z]/.test(char))
        result += char;
    } else if (i <= 10) {
      if (/\d/.test(char))
        result += char;
    } else if (i === 11) {
      if (/[A-Z]/.test(char))
        result += char;
    } else if (i === 12) {
      if (/[A-Z0-9]/.test(char))
        result += char;
    } else if (i === 13) {
      if (char === "Z")
        result += char;
    } else if (i === 14) {
      if (/[A-Z0-9]/.test(char))
        result += char;
    }
  }

  return result;
};