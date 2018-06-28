/**
 * @author [chen jinsheng]
 * @email [allen.chen@uxin.com]
 * @create date 2018-06-14 04:15:29
 * @modify date 2018-06-14 04:15:29
 * @desc [description]
*/

import axios from 'axios';
import Qs from 'qs';
 

/**
 * 跨域配置headers
 */
axios.interceptors.request.use(
    config => {
        config.headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        };
        return config;
    },
    err => {
        return Promise.reject(err);
});
//GET公共请求函数
export function getAxios(url,sendData,callback,errorCB) {

    if (typeof url === 'undefined' || typeof sendData !== 'object' 
        || Array.isArray(sendData) || typeof callback !== 'function') {

         return false;
    }

    axios.get(url,{ params:sendData })
        .then((res) => {
            if (typeof callback === 'function') { callback(res.data);}
        })
        .catch(function (error) {
            console.log(error);
            if (typeof errorCB === 'function') { errorCB(error);}
        });
}

export default getAxios

export function getAxios_showPage(url,sendData,callback,errorCB){
  getAxios(url,sendData,function(rep){
      const retData = typeof res.data.b.pageData !== 'undefined' && res.data.b.pageData; //返回每页显示的条数
      const pgTotal = typeof res.data.b.dataTotal !== 'undefined' && res.data.b.dataTotal; //返回总条数
      if (typeof callback !== 'function') { return false;}
      callback(retData,pgTotal);
  },errorCB)
}

//有聊审核 - 公共请求函数 - 
export function getAxiosResponse (url,sendData,callback) {

    if (typeof url === 'undefined' || typeof sendData !== 'object' 
        || Array.isArray(sendData) || typeof callback !== 'function') {

         return false;
    }
    axios.get(url,{ params:sendData })
        .then((res) => {

            const retData = typeof res.data.b.pageData !== 'undefined' && res.data.b.pageData; //返回每页显示的条数
            const pgTotal = typeof res.data.b.dataTotal !== 'undefined' && res.data.b.dataTotal; //返回总条数

            if ( res.data.b.pageData.length ) {

                // 有聊审核模块
                if ( retData[0].headPic || retData[0].qsStatus || retData[0].urls ) {
                    const st = ["不通过", "未知", "通过"];//答题状态
                    console.log('有聊审核模块...')
                    retData.filter(function (d) {
                        d.headPic+='&x-oss-process=image/resize,m_lfit,h_200,w_135';//用户头像
                        d.qsStatus = st[d.qsStatus]; //答题状态
                        d.urls = d.urls.map(function (v) {
                            v+='?x-oss-process=image/resize,m_lfit,h_200,w_135';//用户图片
                            return v;
                        });
                        return d;
                    });
                }
                //关键字过滤与审计日志模块
                if ( retData[0].osType || retData[0].osVersion || retData[0].phone ) {
                    console.log('关键字与审计模块...')
                    retData.map(function (v) {
                        v.flag = v.flag === 0 ? '登录' : '注册';
                        v.status = v.status === 'undefined' ? '' : (v.status === 1 ? '成功' : '失败');
                        v.ip = typeof v.ip === 'undefined' ? '' : v.ip;
                        v.phone = v.phone.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2');
                        return v;
                    });
                }
                //公共请求函数 - 有聊举报 - 举报操作
                if ( retData[0].objId || retData[0].objType || retData[0].processedResult ) {
                    console.log('举报模块...')

                    retData.map(function (v) {
                        // 解决-测试环境数据中，无 "picture",无法解析json字符串
                        // v.description =  v.description.indexOf('\"picture\"') !== -1 && JSON.parse(v.description); 
                        v.descriptionInfo = v.descriptionInfo || ''; //历史问题 descriptionInfo是最新
                        return v;
                    });
                }
            }

            if (typeof callback !== 'function') { return false;}
            callback(retData,pgTotal);
        })
        .catch(function (error) {
            console.log(error);
        });

}

//POST公共请求函数
export function postAxiosResponse (url,postData,callback,errorCB) {

    if (typeof url === 'undefined' || typeof postData !== 'object' 
        || Array.isArray(postData) || typeof callback !== 'function') {

         return false;
    }

    axios.post(url,Qs.stringify(postData))
        .then((res) => {
            const h = res.data.h; // res.data.h 为数据
            if (typeof callback !== 'function') { return false;}
            callback(h);
        })
        .catch(function (error) {
            console.log(error);
            if (typeof errorCB === 'function') { errorCB(error);}
            
        });
}

//晃脸 - 单曲榜 & 总榜
export function getAxiosHlrankData (url,sendData,callback) {

    if (typeof url === 'undefined' || typeof sendData !== 'object' 
        || Array.isArray(sendData) || typeof callback !== 'function') {
         return false;
    }

    axios.get(url,{ params:sendData })
        .then((res) => {
            const retData = typeof res.data.b.pageData !== 'undefined' && res.data.b.pageData; //返回每页显示的条数
            const pgTotal = typeof res.data.b.dataTotal !== 'undefined' && res.data.b.dataTotal; //返回总条数

            retData.map(function (v) {
                        v.status = v.status === 3 ? '正常' : v.status;
                        return v;
                    });

            if (typeof callback !== 'function') { return false;}
            callback(retData,pgTotal);
        })
        .catch(function (error) {
            console.log(error);
        });
}

//多人视频 -
export function getAxiosVdieoModuleData (url,sendData,callback) {

    if (typeof url === 'undefined' || typeof sendData !== 'object' 
        || Array.isArray(sendData) || typeof callback !== 'function') {
         return false;
    }

    axios.get(url,{ params:sendData })
        .then((res) => {
            const retData = typeof res.data.b.data !== 'undefined' && res.data.b.data; //返回的数据
            const pgTotal = typeof res.data.b.dataTotal !== 'undefined' && res.data.b.dataTotal; //返回总条数

            // retData.map(function (v) {
            //             v.status = v.status === 3 ? '正常' : v.status;
            //             return v;
            //         });
            //         
            if (typeof callback !== 'function') { return false;}
            callback(retData,pgTotal);
        })
        .catch(function (error) {
            console.log(error);
        });
}


