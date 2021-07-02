import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import TableCrud, { ColumnTable } from "../component/common/TableCrud";
import { testController } from "../controller";
import { TestModel } from "../controller/TestController";
import { useCrudHook } from "../hook/useCrudHook";

export default function CustomerManager() {
    const [column, setColumn] = useState<ColumnTable<TestModel>[]>([
        { id: "id", label: "Id" },
        { id: "email", label: "Email", isSort: true },
        { id: "fullName", label: "Name" },
    ]);
    const crud = useCrudHook<TestModel>({
        controller: testController,
    });
    return (
        <Grid style={{ padding: 50 }}>
            <TableCrud<TestModel>
                id="d378de61-6716-495e-94bb-ff0599c94046"
                column={column}
                data={crud.pagingList}
                query={crud.query}
                onQuery={crud.setQuery}
                // onChangeColumn={(column)=>setColumn(column)}
            />
        </Grid>
    );
}
