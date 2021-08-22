import { OrderTracking} from "src/afi-manager-base-model/model/OrderTracking";
import { UserHm } from "src/afi-manager-base-model/model/UserHm";
import { afiCodes, wareHouses } from "src/constants/WareHouse";

// Todo: Find the max price can be bought
export const maxPriceForOrder = (order:UserHm)=>{
     let maxPrice = Boolean(order.extraInfor && order.extraInfor.codeOff)
    ? afiCodes.find(c => c.code == order.extraInfor?.codeOff)?.maxPrice
    : wareHouses.find(w => w.name == order.extraInfor?.wareHouse)?.defaultMaxPrice
    console.log({maxPrice});
    
    return maxPrice
}

// To do: Warning on product has price higher than standard
export const isDangerousPrice = (prodPrice:number,order:UserHm)=>{
    let maxPrice = maxPriceForOrder(order)
    if(prodPrice - (maxPrice||prodPrice)>0)return true
    else return false
}

// to do: alert if has any product is not match code condition
export const isCorrectCode = (order:UserHm, products:OrderTracking[]) =>{
    if(!order.extraInfor||!order.extraInfor.wareHouse) return true
    else {
        let maxPrice = maxPriceForOrder(order)
        let productNumber = products.map(p => p.id).filter((v, i, a) => a.indexOf(v) === i).length;
        let maxProduct = afiCodes.find(c => c.code == order.extraInfor?.codeOff)?.mustOneProduct
                            ?1
                            :productNumber
        console.log({productNumber},{maxProduct})
        if(products.findIndex(p => p.totalPrice && maxPrice && p.totalPrice > (maxPrice)) != -1 && maxProduct>=products.length)
        return true
    else return false}
}
// return list code for 
export const getAvailableCodes = (wareHouse:string) =>{
    let codes = wareHouses.find(w => w.name == wareHouse)?.codeOffs||[];
    let availableAfiCodes = afiCodes.filter(c => c.isExpired!=true).map(c => c.code)
    let rst = codes.length >0 && availableAfiCodes ? codes.filter(c => availableAfiCodes.includes(c)) : []
    console.log({codes},{availableAfiCodes},{rst});

    return rst}

