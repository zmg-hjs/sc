<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Order Packing List</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style type="text/css">
        body{
            font-family:Times new roman;
        }
        *{
            padding:0;
            margin:0;
        }
        .pageNext{page-break-after: always;}
    </style>
</head>
<body>
<div>

    <table width="100%" align="center" border="0" bordercolor="#000"
           style="border-collapse: collapse;">
   <#list mapList as map1>
       <tr style="padding-top:14px;margin-top:8%">
           <td  align="left" style="padding-left:17%;font-size:10px;">${SkuLabelBarCodecnName}</td>
       </tr>
       <tr>
           <td style="padding-bottom:10%;width:200pt;">
               <img src="${SkuLabelBarCodeaddress}" style="height:26pt;width:200pt;"/><br/>
               <span  style="font-size:12px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${SkuLabelBarCodeskuCode}</span>
           </td>
       </tr>
   </#list>
    </table>
</div>
</body>
</html>