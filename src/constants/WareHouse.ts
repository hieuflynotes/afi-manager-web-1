export const wareHouses:WareHouse[] = [
    {name: "Mai Linh",defaultMaxPrice:50},
    {name:"PLE",defaultMaxPrice:30,codeOffs:["OFF40","DEAL 1M","MAX10"]},
    {name: "Amy",defaultMaxPrice:50,codeOffs:["OFF36"]},
    {name: "Trang",defaultMaxPrice:50},
    {name: "Hải pro",defaultMaxPrice:50},
    {name: "Elisa",defaultMaxPrice:50,codeOffs:["OFF50-8","EXTRA-50","OFF36","DEAL-299","DEAL50-100"]},
    {name: "Yến Anh",defaultMaxPrice:25,codeOffs:["MAX10","OFF50-10","DEAL50-100"]},
    {name: "Alan",defaultMaxPrice:10,codeOffs:["DEAL50-100"]},
    {name: "Hương Quỳnh",defaultMaxPrice:25},
]

export const afiCodes: CodeOff[] = [
    {code:"DEAL 1M",maxPrice:10,mustOneProduct:true,isExpired:true},
    {code:"OFF40",maxPrice:20,isExpired:true},
    {code:"OFF50-10",maxPrice:10,isExpired:true},
    {code:"OFF36",maxPrice:25},
    {code:"OFF50-8",maxPrice:8, isExpired:true},
    {code:"EXTRA-50", maxPrice:10},
    {code:"MAX10",maxPrice:10,isExpired:true},
    {code:"DEAL-299", maxPrice:15, isExpired:true},
    {code:"DEAL50-100", maxPrice:8},
]

export interface WareHouse {
    name:string,
    defaultMaxPrice:number
    codeOffs?:string[],
}
export interface CodeOff {
    code:string,
    maxPrice:number,
    mustOneProduct?:boolean,
    isExpired?:boolean
}