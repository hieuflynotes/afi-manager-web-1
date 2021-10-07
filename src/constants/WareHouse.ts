export const wareHouses:WareHouse[] = [
    {name: "Mai Linh",codeDefault:"OFF40-18", codeOffs:["OFF40-18","OFF45-15","OFF30-60","OFF36-25","DEAL10","DEAL60"]},
    {name:"PLE",codeDefault:"DEAL25",codeOffs:["DEAL25"]},
    {name: "Amy",codeDefault:"OFF40-20",codeOffs:["OFF40-20","OFF30-60"]},
    {name: "Trang",codeDefault:"DEAL60",codeOffs:["DEAL60"]},
    {name: "Hải Pro",codeDefault:"DEAL25",codeOffs:["DEAL25","DEAL60"]},
    {name: "Elisa",codeDefault:"OFF40-18",codeOffs:["OFF50-10","OFF40-18","OFF45-15","OFF30-60","OFF36-25","DEAL10","DEAL60"]},
    {name: "Yến Anh",codeDefault:"DEAL60",codeOffs:["DEAL60"]},
    {name: "Alan",codeDefault:"DEAL10",codeOffs:["DEAL10","DEAL60"]},
    {name: "Hương Quỳnh",codeDefault:"DEAL60",codeOffs:["DEAL60"]},
]

export const afiCodes: CodeOff[] = [
    {code:"OFF50-10",maxPrice:10},
    {code:"OFF40-18",maxPrice:18},
    {code:"OFF40-20",maxPrice:20},
    {code:"OFF45-15",maxPrice:15},
    {code:"OFF30-60",maxPrice:60},
    {code:"OFF36-25",maxPrice:25},
    {code:"DEAL10", maxPrice:10},
    {code:"DEAL25", maxPrice:25},
    {code:"DEAL60", maxPrice:60},
]

export interface WareHouse {
    name:string,
    codeDefault:string,
    // defaultMaxPrice:number,
    codeOffs?:string[],
}
export interface CodeOff {
    code:string,
    minPrice?:number,
    maxPrice?:number,
    minQuantity?:number,
    mustOneProduct?:boolean,
    suitablePrices?:number[],
    isExpired?:boolean
}