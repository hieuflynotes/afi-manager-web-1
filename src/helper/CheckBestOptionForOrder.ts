import { OrderTracking} from "src/afi-manager-base-model/model/OrderTracking";
import { UserHm } from "src/afi-manager-base-model/model/UserHm";
import { afiCodes, wareHouses } from "src/constants/WareHouse";


// Todo: Find the max price can be bought
export const maxPriceForOrder = (order:UserHm)=>{
    let codeDefault = wareHouses.find(w => w.name == order.extraInfor?.wareHouse)?.codeDefault
    let maxPrice = afiCodes.find(c => c.code == (order.extraInfor?.codeOff||codeDefault))?.maxPrice
    
    return maxPrice
}

export const minPriceForOrder = (order:UserHm)=>{
    let codeDefault = wareHouses.find(w => w.name == order.extraInfor?.wareHouse)?.codeDefault
    let maxPrice = afiCodes.find(c => c.code == (order.extraInfor?.codeOff||codeDefault))?.minPrice
    
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
    // return true
    if(!order.extraInfor||!order.extraInfor.wareHouse) return true
    else {
        let maxPrice = maxPriceForOrder(order)
        let productIds: string[] =[]

        products.map(p => p.productOrder).length > 0
        && products.forEach(p => p.productOrder 
            && p.productOrder.forEach(p => p.productId && productIds.push(p.productId)))

        let productNumber = productIds.filter((v, i, a) => a.indexOf(v) === i).length;
              
        let maxProduct = afiCodes.find(c => c.code == order.extraInfor?.codeOff)?.mustOneProduct
                            ?1
                            :productNumber
        // console.log({productNumber},{maxProduct},{productIds})
        // console.log(Boolean(maxProduct >= productNumber)?"true":"false");
        // console.log(products.findIndex(p => p.totalPrice && maxPrice && p.totalPrice > (maxPrice)));
        if(Boolean(products.findIndex(p => p.totalPrice && maxPrice && p.totalPrice > (maxPrice)) == -1) && 
        Boolean(maxProduct >= productNumber)){
            return true
        }
    else return false}
}
// return list code for 
export const getAvailableCodes = (wareHouse:string) =>{
    let codes = wareHouses.find(w => w.name == wareHouse)?.codeOffs||[];
    let availableAfiCodes = afiCodes.map(c => c.code)
    let rst = codes.length >0 && availableAfiCodes ? codes.filter(c => availableAfiCodes.includes(c)) : []
    console.log({codes},{availableAfiCodes},{rst});

    return rst
}

export const checkExpiredCode = (code:string) => {
    return afiCodes.find(c => c.code == code)?
            afiCodes.find(c => c.code == code)?.isExpired : true
}