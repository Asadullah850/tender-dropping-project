const generateRandomString = () => {
    var randomString = '';
    var uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    var numbers = '0123456789';
  
  
    for (var j = 0; j < 2; j++) {
      randomString += uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length));
    }
  
    for (var k = 0; k < 3; k++) {
      randomString += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
  
    for (var l = 0; l < 2; l++) {
      randomString += lowercaseLetters.charAt(Math.floor(Math.random() * lowercaseLetters.length));
    }
  
    for (var m = 0; m < 3; m++) {
      randomString += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
  
    return randomString.trim();
  }


export default generateRandomString;