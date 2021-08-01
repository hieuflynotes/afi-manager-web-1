import { RouteComponent } from 'src/component/common/NavBar';

export class LocalStoryController {
    getLocal() {
        return JSON.parse(localStorage.getItem('setting') || '{}');
    }
    setLocal(data: any) {
        return localStorage.setItem('setting', JSON.stringify(data));
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
        this.setDataByKey('isHiddenNarBar', isShow);
    }
    getShowNarBar(): boolean {
        return this.getByKey('isHiddenNarBar');
    }

    setSettingColumnTable(params: { idTable: string; column: string[] }) {
        const table = this.getByKey('table') || {};
        const getTable = table[params.idTable] || {};
        if (params.column.length == 0) {
            params.column = getTable?.column || [];
        }
        getTable.column = params.column;
        table[params.idTable] = getTable;
        this.setDataByKey('table', table);
    }
    getSettingColumnTable(idTable: string): string[] {
        const table = this.getByKey('table') || {};
        const getTable = table[idTable] || {};
        return getTable.column;
    }

    setStateTool(value: any) {
        this.setDataByKey('stateToolKey', value);
    }
    getStateTool(): any {
        const data = this.getByKey('stateToolKey');
        if (data) {
            return data;
        }
        return {
            variables: [],
            text: [
                {
                    title: 'text1',
                    value: '',
                },
            ],
            textIndex: 0,
        };
    }

    getListUserLogin(): { username: string; password: string }[] {
        const get = this.getByKey('account');
        return get || [];
    }
    addUserLogin(params: { username: string; password: string }) {
        const get = this.getListUserLogin();
        const index = get.findIndex((item) => item.username == params.username);
        if (index >= 0) {
            get[index] = params;
        } else {
            get.push(params);
        }
        this.setDataByKey('account', get);
    }
    removeLogin(params: { username: string }) {
        const get = this.getListUserLogin();
        const index = get.findIndex((item) => item.username == params.username);
        if (index >= 0) {
            get.splice(index, 1);
        }
        this.setDataByKey('account', get);
    }

    addMenu(item: RouteComponent[]) {
        this.setDataByKey('menu', item);
    }
    getMenu(): RouteComponent[] {
        const get = this.getByKey('menu');
        return get || [];
    }
}
