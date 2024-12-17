export interface todoDTO{
    title:string,
    group:string,
    created_at?:string,
    completed?:boolean
}

export interface userDTO extends Document{
    username:string
    password:string
    todos?:todoDTO[]
}