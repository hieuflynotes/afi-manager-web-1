import { Grid, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import React, { useState } from 'react'
import { OrderAddress } from 'src/afi-manager-base-model/model/OrderAddress';
import { addressTemplates } from 'src/constants/TemplateAddress';
import BaseDialog from '../common/BaseDialog';

interface Props {
    isDisplay: boolean;
    onSelect(template?:OrderAddress):void,
    onCancel():void;
}
export default function PopUpAddressTemplate(props:Props) {
    const [selectedAddress, setSelectedAddress] = useState<OrderAddress>()
    return (
        <Grid>
            <BaseDialog
                isDisplay={props.isDisplay}
                onCancel={props.onCancel}
                onClickConfirm={()=>props.onSelect(selectedAddress)}
                title="Địa chỉ mẫu"
                labelConfirmBtn="Chọn mẫu này"
            >
                <Autocomplete
                    freeSolo
                    options={addressTemplates}
                    getOptionLabel={(ad) => `${ad.address}`}
                    renderInput={(params) => (
                        <TextField {...params} label="Địa chỉ mẫu" margin="normal" variant="outlined" />
                    )}
                    renderOption={(ad) => {return(
                        <Grid>
                            <Typography>  Address: {ad.address}</Typography>
                            <Typography variant="body2">  Address 2: {ad.address2} {" ("}{ad.town} - {ad.postcode}{")"} </Typography>
                        </Grid>
                        )}}
                    onChange={(event, newValue) => {
                        setSelectedAddress(newValue as OrderAddress);
                    }}
      />
            </BaseDialog>
        </Grid>
    )
}

