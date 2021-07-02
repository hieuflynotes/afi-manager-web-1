export class LocalStoryController {
    getLocal() {
        return JSON.parse(localStorage.getItem("setting") || "{}");
    }
    setLocal(data: any) {
        return localStorage.setItem("setting", JSON.stringify(data));
    }
    getByKey(key: string) {
        const data = this.getLocal();
        return data[key];
    }
    setDataByKey(key: string, data: any) {
        const getLocal = this.getLocal();
        getLocal[key] = data;
        this.setLocal({
            ...getLocal,
        });
    }
    setShowNavBar(isShow: boolean) {
        this.setDataByKey("isHiddenNarBar", isShow);
    }
    getShowNarBar(): boolean {
        return this.getByKey("isHiddenNarBar");
    }

    setSettingColumnTable(params: { idTable: string; column: string[] }) {
        const table = this.getByKey("table") || {};
        const getTable = table[params.idTable] || {};
        if (params.column.length == 0) {
            params.column = getTable?.column || [];
        }
        getTable.column = params.column;
        console.log("🚀 ~ file: LocalStoryController.ts ~ line 33 ~ LocalStoryController ~ setSettingColumnTable ~ getTable", getTable)
        table[params.idTable] = getTable;
        this.setDataByKey("table", table);
    }
    getSettingColumnTable(idTable: string): string[] {
        const table = this.getByKey("table") || {};
        const getTable = table[idTable] || {};
        return getTable.column;
    }
}
