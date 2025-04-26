/* eslint-disable @typescript-eslint/no-explicit-any */
interface UserProfileParams {
  email: string
}

export class UserProfile {
  email: string
  constructor({ email }: UserProfileParams) {
    this.email = email
  }

  static fromJson(data: any): UserProfile {
    return new UserProfile({ email: data.email })
  }
}
