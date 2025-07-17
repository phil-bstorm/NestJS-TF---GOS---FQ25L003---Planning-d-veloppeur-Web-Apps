export class UsernameAlreadyExistsException extends Error {
  constructor(username: string) {
    super(`Username "${username}" already exists.`);
    this.name = 'UsernameAlreadyExistsException';
  }
}

export class InvalidLoginException extends Error {
  constructor() {
    super(`Invalid login`);
    this.name = 'InvalidLoginException';
  }
}

export class NotFoundException extends Error {
  constructor() {
    super(`Not found`);
    this.name = 'NotFoundException';
  }
}
