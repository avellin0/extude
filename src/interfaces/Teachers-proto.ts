export interface TeacheProto{
  name: string,
  subject: string,
  classes: number[],
  infoTeacher(userid: string,name: string,subject:string,classes: number[]): object
}