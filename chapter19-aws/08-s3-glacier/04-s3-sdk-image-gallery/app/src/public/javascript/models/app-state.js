class AppState {
  #selectedFile
  #uploadedFiles;

  constructor() {
    console.log(`Building AppState instance`);
    this.#uploadedFiles = [];
  }

  get selectedFile() {
    return this.#selectedFile;
  }

  set selectedFile(file) {
    this.#selectedFile = file;
  }

  get uploadedFiles() {
    return this.#uploadedFiles;
  }

  addUploadedFile(uploadedFile) {
    this.#uploadedFiles.push(uploadedFile);
  }
}

export const appState = new AppState();
