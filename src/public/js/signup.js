function validateSignupForm() {
  const memberNick = $(".member-nick").val();
  const memberPhone = $(".member-phone").val();
  const memberPassword = $(".member-password").val();
  const confirmPassword = $(".confirm-password").val();

  // Barcha maydonlar to'ldirilganligini tekshirish (memberNick to'g'irlandi)
  if (
    memberNick === "" ||
    memberPhone === "" ||
    memberPassword === "" ||
    confirmPassword === ""
  ) {
    alert("Please insert all required inputs");
    return false; // Forma yuborilishini to'xtatadi
  }

  // Parollar mos kelishini tekshirish
  if (memberPassword !== confirmPassword) {
    alert("Passwords do not match");
    return false; // Forma yuborilishini to'xtatadi
  }

  return true; // Hammasi joyida bo'lsa davom etadi
}
