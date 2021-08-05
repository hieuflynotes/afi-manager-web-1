export function downloadCSV<T>(arr: T[]) {
    let csvData = jsonToCSV(arr);
    var link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvData));
    link.setAttribute('download', 'cart.csv');
    link.click();
}

export function jsonToCSV<T>(arr: T[]) {
    var array = typeof arr != 'object' ? JSON.parse(arr) : arr;
    var str = '';
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line !== '') line += ',';
            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
}
