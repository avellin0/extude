export type ProxyCacheStudent = {userid: number , name:string , age: number, classe: number, access: number}


export interface StudentsProto {
  userid: number,
  name: string,
  age: number,
  classe: number,
  access: number,
  
  infoStudent(): Promise<ProxyCacheStudent[]>;
}