class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

export default HttpError;
