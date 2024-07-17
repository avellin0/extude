export type ProxyCacheStudent = {userid: number , name:string , email: string, password: string, permission: string}


export interface StudentsProto {
  userid: number,
  name: string,
  email: string,
  password: string,
  permission: string,
  
  infoStudent(): Promise<ProxyCacheStudent[]>;
}