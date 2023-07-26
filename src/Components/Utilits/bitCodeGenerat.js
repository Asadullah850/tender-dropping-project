const generateRandomString = () => {
    let randomString = '';
    let uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    let numbers = '0123456789';
  
  
    for (let j = 0; j < 1; j++) {
      randomString += uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length));
    }
  
    for (let k = 0; k < 2; k++) {
      randomString += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    for (let j = 0; j < 1; j++) {
      randomString += lowercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length));
    }

    for (let m = 0; m < 2; m++) {
      randomString += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
  
    return randomString.trim();
  }


export default generateRandomString;