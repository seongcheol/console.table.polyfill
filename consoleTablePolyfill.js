if (!console.table) {       
    console.table = function(arr, option) {
        if (!option) option = {header:false,rowNum:false};
        var isExcludeHeader = option.header || false;
        var isExcludeRowNum = option.rowNum || false;
    
        var ROWNUM_COL_ID = "_tableRowNum";
        var objColLen = {}; 
        var arrColOrd = [];
    
        if (Array === arr.constructor) {
        } else if (Object === arr.constructor) {
            arr = [arr];
        } else {
            throw "invalid obj";
        }
    
        // initialize objColLen _tableRowNum
        objColLen[ROWNUM_COL_ID] = (arr.length + "").length;
        arrColOrd[0] = ROWNUM_COL_ID;
        function setColInfo(colId, value) {
            setColLength(colId, value);
            setColOrder(colId);
        }
        function getStrByte(value) {
            var tmpValLen = 0, tmpVal = (value + "");
            for (var i = 0; i < tmpVal.length; i++) {
                var c = Number(tmpVal.charCodeAt(i));
                var ch = tmpVal.substr(i, 1).toUpperCase();
                if ((ch < "0" || ch > "9") && (ch < "A" || ch > "Z") && ((c > 255) || (c < 0))) {
                    tmpValLen += 2;
                } else {
                    tmpValLen += 1;
                }
            }
            return tmpValLen;
        }
        function setColLength(colId, value, j) {
            var tmpValLen = getStrByte(value);
            var valLen = tmpValLen > colId.length ? tmpValLen : colId.length;
            objColLen[colId] = (objColLen[colId] || 0) <= valLen ? valLen : (objColLen[colId] || 0);
        }
        function setColOrder(colId) {
            if (arrColOrd.indexOf(colId) < 0) arrColOrd.push(colId);
        }
        // org to new array
        for (var i in arr) {
            for (var j in arr[i]) {
                setColInfo(j, arr[i][j]);
            }
        }    
        // toString
        consoleTable();
        function consoleTable() {
            var sb = [];      
            if (!isExcludeHeader) {
                // if include header, convert header/delim str first
                var rowHeader = [], rowDelim = [];
                var makeHeader = function(colId) {
                    var str = colId;
                    if (ROWNUM_COL_ID == colId) { // if exclude RowNum, just continue loop
                        if (isExcludeRowNum) return "";
                        else str = "";
                    }
                    var tmpArr = [" │ ", str], lenDiff = objColLen[colId] - str.length;
                    for (var i = 0; i <= lenDiff; i++) { tmpArr.push(" "); }
                    return tmpArr.join("");
                }
                var makeDelim = function(colId) {
                    if (ROWNUM_COL_ID == colId && isExcludeRowNum) return "";
                    var tmpArr = ["─┼─"];
                    for (var i = 0; i <= objColLen[colId]; i++) { tmpArr.push("─"); }
                    return tmpArr.join("");
                }
                for (var idx in arrColOrd) {
                    rowHeader.push(makeHeader(arrColOrd[idx]));
                    rowDelim.push(makeDelim(arrColOrd[idx]));
                }
                rowHeader[0] = rowHeader[0].replace(" │ ", "  ");
                rowDelim[0] = rowDelim[0].replace("─┼─", "──");
                console.log(rowHeader.join(""));
                console.log(rowDelim.join(""));
            }
            var makeStr = function(rowNum, colId) {
                var val = (arr[rowNum][colId] || "") + "";
                if (ROWNUM_COL_ID == colId) {
                    if (isExcludeRowNum) return "";
                    else val = rowNum;
                }
                var tmpArr, lenDiff = objColLen[colId] - getStrByte(val);
                tmpArr = [" │ ", val];
                for (var i = 0; i <= lenDiff; i++) { tmpArr.push(" "); }
                return tmpArr.join("");
            }
            for (var rowNum in arr) {
                var tmpRow = [];
                for (var idx in arrColOrd) {
                    tmpRow.push(makeStr(rowNum, arrColOrd[idx]));
                }
                tmpRow[0] = tmpRow[0].replace(" │ ", "  ");
                console.log(tmpRow.join(""));
            }        
        }
    }
}