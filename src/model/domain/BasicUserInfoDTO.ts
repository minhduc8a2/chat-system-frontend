/* eslint-disable @typescript-eslint/no-explicit-any */
interface BasicUserInfoDTOParams {
  id: string
  username: string
}

export class BasicUserInfoDTO {
  id: string
  username: string
  constructor({ id, username }: BasicUserInfoDTOParams) {
    this.id = id
    this.username = username
  }

  static fromJson(data: any): BasicUserInfoDTO {
    return new BasicUserInfoDTO({
      id: data.id,
      username: data.username,
    })
  }
}
