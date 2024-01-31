export default class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new Error('Email invalid');
    }

    this.value = value;
  }

  viewValue(): string {
    return this.value;
  }

  private validate(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}