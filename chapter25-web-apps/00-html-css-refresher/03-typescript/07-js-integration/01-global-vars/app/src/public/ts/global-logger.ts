class GlobalLogger {
  static logEmailsToConsole() {
    for (const email of CONTACT_EMAIL_ARRAY) {
      console.log(`found contact:`, email);
    }
  }
}

window.addEventListener('load', () => {
  console.log(`Window is loaded!`);
  GlobalLogger.logEmailsToConsole();
});