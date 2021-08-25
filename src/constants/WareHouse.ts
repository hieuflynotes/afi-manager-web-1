export const wareHouses:WareHouse[] = [
    {name: "Mai Linh",defaultMaxPrice:20},
    {name:"PLE",defaultMaxPrice:15,codeOffs:["OFF40","DEAL 1M"]},
    {name: "Amy",defaultMaxPrice:20},
    {name: "Trang",defaultMaxPrice:20},
    {name: "Hải pro",defaultMaxPrice:20},
    {name: "Elisa",defaultMaxPrice:20,codeOffs:["OFF50-8","EXTRA-50"]},
    {name: "Yến Anh",defaultMaxPrice:15,codeOffs:["MAX10","OFF50-10"]}
]

export const afiCodes: CodeOff[] = [
    {code:"DEAL 1M",maxPrice:10,mustOneProduct:true},
    {code:"OFF40",maxPrice:20},
    {code:"OFF50-10",maxPrice:10,isExpired:true},
    {code:"OFF50-8",maxPrice:8, isExpired:true},
    {code:"EXTRA-50", maxPrice:10},
    {code:"MAX10",maxPrice:10},
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