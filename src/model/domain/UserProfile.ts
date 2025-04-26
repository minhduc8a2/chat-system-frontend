/* eslint-disable @typescript-eslint/no-explicit-any */
interface UserProfileParams {
  email: string
  createdAt: string
  updatedAt: string
}

export interface UserProfileEditable {
  email: string
}

export class UserProfile {
  email: string
  createdAt: string
  updatedAt: string
  constructor({ email, createdAt, updatedAt }: UserProfileParams) {
    this.email = email
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static fromJson(data: any): UserProfile {
    return new UserProfile({
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    })
  }

  editableObject(): UserProfileEditable {
    return {
      email: this.email,
    }
  }
}
