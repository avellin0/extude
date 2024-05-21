export interface StudentsProto {
  name: string,
  second_name: string,
  age: number,
  classe: number,
  fullname(): string
  infoStudent(): object;
}