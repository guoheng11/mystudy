export default {
	
	baseNodeUrl:"../../service/",

//  //window.location.href = data.Message   //导出

    pagingParam:function(pageNumber, pageSize){
        var param="?";
        if (pageSize != undefined) {
            param += 'pageSize=' + pageSize;
        } else {
            param += 'pageSize=10';
        }
      
        if (pageNumber != undefined) {
            param += '&pageNumber=' + pageNumber;
        } else {
            param += '&pageNumber=1';
        }
        return param;
    },
    orderPagingParam:function(pageNumber, pageSize,sortName, sortOrder){
        var param="?";
        if (pageSize != undefined) {
            param += 'pageSize=' + pageSize;
        } else {
            param += 'pageSize=10';
        }
      
        if (pageNumber != undefined) {
            param += '&pageNumber=' + pageNumber;
        } else {
            param += '&pageNumber=1';
        }

        if (sortName != undefined) {
            param += '&sortName=' + sortName;
        } else {
            param += '&sortName=ID';
        }
      
        if (sortOrder != undefined) {
            param += '&sortOrder=' + sortOrder;
        } else {
            param += '&sortOrder=desc';
        }

        return param;
    },
    orderOftenPagingParam:function(pageNumber, pageSize, sortName, sortOrder, condition) {
        var param = "";
        param += this.orderPagingParam(pageNumber, pageSize, sortName, sortOrder);

        if (condition != undefined && condition != '') {
            param += '&condition=' + condition;
        } 

        return param;
    },
    oftenPagingParam:function(pageNumber, pageSize, condition) {
        var param = "";
        param += this.pagingParam(pageNumber, pageSize);

        if (condition != undefined && condition != '') {
            param += '&condition=' + condition;
        } 

        return param
    },
    orderComPagingParam:function(pageNumber, pageSize, sortName, sortOrder, condition,paramObj){
        var param = "";

        param += this.orderPagingParam(pageNumber, pageSize, sortName, sortOrder);
        
        if (condition != undefined && condition != '') {
            param += '&condition=' + condition;
        } 

        for (var key in paramObj) {
            if(key != undefined && key != '' )
            param += '&' + key + '=' + paramObj[key];
        }

        return param
    },
    comPagingParam:function(pageNumber, pageSize, condition,paramObj){
        var param = "";
            
        param += this.pagingParam(pageNumber, pageSize);
        
        if (condition != undefined && condition != '') {
            param += '&condition=' + condition;
        } 

        for (var key in paramObj) {
            if(key != undefined && key != '' )
            param += '&' + key + '=' + paramObj[key];
        }

        return param

    },
    comGetParam:function(condition,paramObj){
        var param = "";
        if (condition != undefined && condition != '') {
            param += '?condition=' + condition;
        } 

        for (var key in paramObj) {
            if(key != undefined && key != '' )
            {
	            if(param!="")
	            {
	            	param += '&' + key + '=' + paramObj[key];
	            }else
	            {
	            	param += '&' + key + '=' + paramObj[key];
	            }
            }
        }

        return param

    },
    //计算天数  时间；
    getCalculateDays:function(begin_date,end_date){
    　　var sdate = new Date(begin_date.replace(/-/g, "/"));
    　　var now = new Date(end_date.replace(/-/g, "/"));
    　　var days = now.getTime() - sdate.getTime();
    　　var day = parseInt(days / (1000 * 60 * 60 * 24));
    　　return day;
    }

}