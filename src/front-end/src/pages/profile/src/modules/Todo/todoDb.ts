export const db:string[] = [
]

export const createTask = async(str:string) => {
    db.push(str)
}

export const deleteTask = (index:number) => {
    db.splice(index, 1)
}