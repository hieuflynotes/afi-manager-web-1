export const checkoutCodeAle = (
    email: string,
    password: string,
    cardNumber: string,
    cardPin: string,
    orderPrice: number,
) => `VERSION BUILD=1011 RECORDER=CR
URL GOTO=https://www2.hm.com/en_gb/logout
wait seconds=2
URL GOTO=https://www2.hm.com/en_gb/login
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/login ATTR=ID:email CONTENT=${email}
TAG POS=1 TYPE=INPUT:PASSWORD FORM=ACTION:https://www2.hm.com/en_gb/login ATTR=ID:password CONTENT=${password}
TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/login ATTR=TXT:Sign<SP>in<SP>/<SP>Join
wait seconds=5
URL GOTO=https://www2.hm.com/en_gb/checkout-r
wait seconds=2
URL GOTO=https://www2.hm.com/en_gb/checkout-r
wait seconds=10
TAG POS=2 TYPE=SPAN ATTR=TXT:Add<SP>gift<SP>cards
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=ID:cardNumber CONTENT=${cardNumber
    .replaceAll(' ', '')
    .trim()}
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=ID:cardPin CONTENT=${cardPin}
TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=TXT:ADD
Wait seconds=2
TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=TXT:SAVE
Wait seconds=3`;

export const checkoutLoopAle = (
    email: string,
    password: string,
    cardNumber: string,
    cardPin: string,
) => `VERSION BUILD=1011 RECORDER=CR
set !var1 ${email}+hm
add !var1 {{!loop}}
URL GOTO=https://www2.hm.com/en_gb/logout
wait seconds=2
URL GOTO=https://www2.hm.com/en_gb/login
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/login ATTR=ID:email CONTENT={{!var1}}@gmail.com
TAG POS=1 TYPE=INPUT:PASSWORD FORM=ACTION:https://www2.hm.com/en_gb/login ATTR=ID:password CONTENT=${password}
TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/login ATTR=TXT:Sign<SP>in<SP>/<SP>Join
wait seconds=5
URL GOTO=https://www2.hm.com/en_gb/checkout-r
wait seconds=5
URL GOTO=https://www2.hm.com/en_gb/checkout-r
wait seconds=10
TAG POS=2 TYPE=SPAN ATTR=TXT:Add<SP>gift<SP>cards
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=ID:cardNumber CONTENT=${cardNumber}
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=ID:cardPin CONTENT=${cardPin}
TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=TXT:ADD
Wait seconds=2
TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=TXT:SAVE
wait seconds=5
TAG POS=1 TYPE=SPAN ATTR=TXT:COMPLETE<SP>PURCHASE
Wait seconds=20`;

export const checkoutCode = (
    email: string,
    password: string,
    cardNumber: string,
    cardPin: string,
    orderPrice: number,
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
${
    orderPrice <= 5
        ? 'TAG POS=1 TYPE=DIV ATTR=TXT:Add<SP>code<SP>£3'
        : 'TAG POS=1 TYPE=SPAN ATTR=TXT:PICK<SP>A<SP>DISCOUNT'
}
wait seconds=10
TAG POS=2 TYPE=SPAN ATTR=TXT:Add<SP>gift<SP>cards
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=ID:cardNumber CONTENT=${cardNumber
    .replaceAll(' ', '')
    .trim()}
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=ID:cardPin CONTENT=${cardPin}
TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=TXT:ADD
Wait seconds=2
TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=TXT:SAVE
Wait seconds=3`;

export const addAddressAndCheckout = (
    email: string,
    password: string,
    cardNumber: string,
    cardPin: string,
    orderPrice: number,
    info: {
        firstName: string;
        lastName: string;
        lineAddress: string;
        flatHouse: string;
        town: string;
        postCode: string;
        phonenumber: string;
    },
) => `URL GOTO=https://www2.hm.com/en_gb/logout
wait seconds=2
URL GOTO=https://www2.hm.com/en_gb/login
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/login ATTR=ID:email CONTENT=${email}
TAG POS=1 TYPE=INPUT:PASSWORD FORM=ACTION:https://www2.hm.com/en_gb/login ATTR=ID:password CONTENT=${password}
TAG POS=1 TYPE=SPAN ATTR=TXT:Sign<SP>in<SP>/<SP>Join
Wait seconds=10

URL GOTO=https://www2.hm.com/en_gb/account/settings/
TAG POS=1 TYPE=A ATTR=TXT:Edit
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/personal-details ATTR=ID:firstName CONTENT=${info.firstName.replaceAll(
    ' ',
    '<SP>',
)}
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/personal-details ATTR=ID:lastName CONTENT=${info.lastName.replaceAll(
    ' ',
    '<SP>',
)}
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/personal-details ATTR=ID:cellPhone CONTENT=${info.phonenumber.replaceAll(
    ' ',
    '<SP>',
)}
TAG POS=1 TYPE=SELECT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/personal-details ATTR=ID:gender CONTENT=%FEMALE
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/personal-details ATTR=ID:postalCode CONTENT=${info.postCode.replaceAll(
    ' ',
    '<SP>',
)}
TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/account/settings/personal-details ATTR=TXT:SAVE


URL GOTO=https://www2.hm.com/en_gb/account/settings/addressbook
TAG POS=1 TYPE=SPAN ATTR=TXT:add<SP>new<SP>address
 
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:line1 CONTENT=${info.lineAddress.replaceAll(
    ' ',
    '<SP>',
)}
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:line2 CONTENT=${info.flatHouse.replaceAll(
    ' ',
    '<SP>',
)}
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:town CONTENT=${info.town.replaceAll(
    ' ',
    '<SP>',
)}
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:postalCode CONTENT=${info.postCode.replaceAll(
    ' ',
    '<SP>',
)}
TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=TXT:SAVE
wait seconds = 6
TAG POS=2 TYPE=BUTTON ATTR=TXT:SAVE
Wait seconds=6
TAG POS=1 TYPE=BUTTON ATTR=TXT:add<SP>new<SP>address
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:firstName CONTENT=${info.firstName.replaceAll(
    ' ',
    '<SP>',
)}
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:lastName CONTENT=${info.lastName.replaceAll(
    ' ',
    '<SP>',
)}
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:line1 CONTENT=${info.lineAddress.replaceAll(
    ' ',
    '<SP>',
)}
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:line2 CONTENT=${info.flatHouse.replaceAll(
    ' ',
    '<SP>',
)}
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:town CONTENT=${info.town.replaceAll(
    ' ',
    '<SP>',
)}
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:postalCode CONTENT=${info.postCode.replaceAll(
    ' ',
    '<SP>',
)}
TAG POS=1 TYPE=SPAN ATTR=TXT:Use<SP>as<SP>default
TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:addressDefault CONTENT=YES
TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=TXT:SAVE
wait seconds = 6
TAG POS=2 TYPE=BUTTON ATTR=TXT:SAVE
Wait seconds=6
URL GOTO=https://www2.hm.com/en_gb/checkout-r
wait seconds=10
${
    orderPrice <= 5
        ? 'TAG POS=1 TYPE=DIV ATTR=TXT:Add<SP>code<SP>£3'
        : 'TAG POS=1 TYPE=SPAN ATTR=TXT:PICK<SP>A<SP>DISCOUNT'
}
wait seconds=10
TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=TXT:CONTINUE
wait seconds=3
TAG POS=2 TYPE=SPAN ATTR=TXT:Add<SP>gift<SP>cards
wait seconds=4
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=ID:cardNumber CONTENT=${cardNumber
    .replaceAll(' ', '')
    .trim()}
TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=ID:cardPin CONTENT=${cardPin}
TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=TXT:ADD
Wait seconds=4
TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/checkout-r ATTR=TXT:SAVE
Wait seconds=3

`;

export const addAddress = (
    emailCheckout: string,
    password: string,
    info: {
        firstName: string;
        lastName: string;
        lineAddress: string;
        flatHouse: string;
        town: string;
        postCode: string;
        phonenumber: string;
    },
) => {
    return `URL GOTO=https://www2.hm.com/en_gb/logout
    wait seconds=2
    URL GOTO=https://www2.hm.com/en_gb/login
    TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/login ATTR=ID:email CONTENT=${emailCheckout}+hm{{!loop}}@gmail.com
    TAG POS=1 TYPE=INPUT:PASSWORD FORM=ACTION:https://www2.hm.com/en_gb/login ATTR=ID:password CONTENT=${password}
    TAG POS=1 TYPE=SPAN ATTR=TXT:Sign<SP>in<SP>/<SP>Join
    Wait seconds=5
    
    URL GOTO=https://www2.hm.com/en_gb/account/settings/
    TAG POS=1 TYPE=A ATTR=TXT:Edit
    TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/personal-details ATTR=ID:firstName CONTENT=${info.firstName.replaceAll(
        ' ',
        '<SP>',
    )}
    TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/personal-details ATTR=ID:lastName CONTENT=${info.lastName.replaceAll(
        ' ',
        '<SP>',
    )}
    TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/personal-details ATTR=ID:cellPhone CONTENT=${info.phonenumber.replaceAll(
        ' ',
        '<SP>',
    )}
    TAG POS=1 TYPE=SELECT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/personal-details ATTR=ID:gender CONTENT=%FEMALE
    TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/personal-details ATTR=ID:postalCode CONTENT=${info.postCode.replaceAll(
        ' ',
        '<SP>',
    )}
    TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/account/settings/personal-details ATTR=TXT:SAVE
    
    
    URL GOTO=https://www2.hm.com/en_gb/account/settings/addressbook
    TAG POS=1 TYPE=SPAN ATTR=TXT:add<SP>new<SP>address
     
    TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:line1 CONTENT=${info.lineAddress.replaceAll(
        ' ',
        '<SP>',
    )}
    TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:line2 CONTENT=${info.flatHouse.replaceAll(
        ' ',
        '<SP>',
    )}
    TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:town CONTENT=${info.town.replaceAll(
        ' ',
        '<SP>',
    )}
    TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:postalCode CONTENT=${info.postCode.replaceAll(
        ' ',
        '<SP>',
    )}
    TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=TXT:SAVE
    wait seconds = 4
    TAG POS=2 TYPE=BUTTON ATTR=TXT:SAVE
    Wait seconds=6
    TAG POS=1 TYPE=BUTTON ATTR=TXT:add<SP>new<SP>address
    TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:firstName CONTENT=${info.firstName.replaceAll(
        ' ',
        '<SP>',
    )}
    TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:lastName CONTENT=${info.lastName.replaceAll(
        ' ',
        '<SP>',
    )}
    TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:line1 CONTENT=${info.lineAddress.replaceAll(
        ' ',
        '<SP>',
    )}
    TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:line2 CONTENT=${info.flatHouse.replaceAll(
        ' ',
        '<SP>',
    )}
    TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:town CONTENT=${info.town.replaceAll(
        ' ',
        '<SP>',
    )}
    TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:postalCode CONTENT=${info.postCode.replaceAll(
        ' ',
        '<SP>',
    )}
    TAG POS=1 TYPE=SPAN ATTR=TXT:Use<SP>as<SP>default
    TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=ID:addressDefault CONTENT=YES
    TAG POS=1 TYPE=BUTTON FORM=ACTION:https://www2.hm.com/en_gb/account/settings/addressbook ATTR=TXT:SAVE
    wait seconds = 4
    TAG POS=2 TYPE=BUTTON ATTR=TXT:SAVE
    Wait seconds=6`;
};
