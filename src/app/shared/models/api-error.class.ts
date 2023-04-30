
export class FirebaseErrorResponse {
  private fireError;

  constructor(public error: any) {
  }

  get errorCode() {
    return this.error.code.replaceAll('/', '.').replaceAll('-', '_');
  }
}
