export interface TeacheProto{
  name: string,
  subject: string,
  access: number,
  infoTeacher(userid: string,name: string,subject:string,classes: number[]): object
}