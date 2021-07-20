export const checkoutCode = (
    email: string,
    password:string,
    cardNumber: string,
    cardPin:string,
    orderPrice: number
) => `VERSION BUILD=1011 RECORDER=CR
URL GOTO=https://www2.hm.com/en_gb/logout
wait seconds=2
URL GOTO=https://www2.hm.com/en_gb/login
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/login ATTR=ID:email CONTENT=${email}
TAG POS=1 TYPE=INPUT:PASSWORD FORM=ACTION:https://www2.hm.com/en_gb/login ATTR=ID:password CONTENT=${password}
TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/login ATTR=TXT:Sign<SP>in<SP>/<SP>Join
wait seconds=5
URL GOTO=https://www2.hm.com/en_gb/checkout-r
wait seconds=10
TAG POS=1 TYPE=SPAN ATTR=TXT:PICK<SP>A<SP>DISCOUNT
wait seconds=5
${
    orderPrice <= 5
        ? "TAG POS=1 TYPE=DIV ATTR=TXT:Add<SP>code<SP>£3"
        : "TAG POS=2 TYPE=SPAN ATTR=TXT:Add<SP>gift<SP>cards"
}
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=ID:cardNumber CONTENT=${cardNumber}
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=ID:cardPin CONTENT=${cardPin}
TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=TXT:ADD
Wait seconds=2
TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=TXT:SAVE
Wait seconds=10`;
