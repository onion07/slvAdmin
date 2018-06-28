
/**
 * 如获取时间戳使用：dateFormat( new Date().setTime(时间戳 * 1000),'yyyy-MM-dd hh:mm:ss' )
 * 对日期进行格式化，
 * @param date 要格式化的日期
 * @param format 进行格式化的模式字符串
 *     支持的模式字母有：
 *     y:年,
 *     M:年中的月份(1-12),
 *     d:月份中的天(1-31),
 *     h:小时(0-23),
 *     m:分(0-59),
 *     s:秒(0-59),
 *     S:毫秒(0-999),
 *     q:季度(1-4)
 * @return String
 */
export function dateFormat (date, format) {
  date = new Date(date)
  format = format || 'yyyy-MM-dd hh:mm:'
  let map = {
    'M': date.getMonth() + 1, // 月份
    'd': date.getDate(), // 日
    'h': date.getHours(), // 小时
    'm': date.getMinutes(), // 分
    's': date.getSeconds(), // 秒
    'q': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }

  format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
    let v = map[t]
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v
        v = v.substr(v.length - 2)
      }
      return v
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length)
    }
    return all
  })

  return format
}
// (时间戳) 转 yyyy-MM-dd hh:mm:ss
export function getDateFormat(dayString) {
  return dateFormat(new Date().setTime(dayString * 1000), 'yyyy-MM-dd hh:mm:ss');
}
// 获取(传入的时间格式)的时间戳(以s为单位),参数为空：当前时间
export function getDateString (pram) {
  if (pram) {
    return Date.parse(new Date(pram)) / 1000;
  }
  return Date.parse(new Date()) / 1000;
}

/**
 * 对日期进行格式化，
 * @param date 要转化为毫秒数的日期
 * @return String
 */
export function dateGetTime (date) {
  return new Date(date).getTime();
}


/**
 * 将昵称字符串中的emoji表情过滤不处理 
 * @param substring 要过滤的字符串
 */
export function nickNameFormat(substring){
  substring = substring || '';
  var _ts = this;
  var str = '';
  for(var i = 0; i < substring.length; i++) {
    var hs = substring.charCodeAt(i);
    if(hs == 0xd83c && substring.charCodeAt(i+2)==0xfe0f){//\ud83c开头\ufe0f结尾的3字节emoji表情的Unicode码
      str += substring.charAt(i) + substring.charAt(i+1) + substring.charAt(i+2); 
      i += 2; //跳过下一个unicode编码
      continue;
    }
    if(0xd800 <= hs && hs <= 0xdbff) {
      if(substring.length > 1) {
        var ls = substring.charCodeAt(i + 1);
        var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;//1024  56320 65536
        if(0x1d000 <= uc && uc <= 0x1f77f) {//118784  128895
          str += substring.charAt(i) + substring.charAt(i+1);
          i += 1; //跳过下一个unicode编码
          continue;
        }
      }
    } else {
      if(substring.length > 1 && i < substring.length - 1) {
        var ls = substring.charCodeAt(i + 1);
        var lns = substring.charCodeAt(i + 2);
        if (ls==0xfe0f){
          if(lns == 0x20e3) {//\ufe0f\u20e3结尾的3字节emoji表情的Unicode码
            str += substring.charAt(i) + substring.charAt(i+1) + substring.charAt(i+2); 
            i += 2; //跳过下一个unicode编码
            continue;
          }else{//\ufe0f结尾的emoji表情的Unicode码
            if(0x2020 <= hs && hs <= 0x32ff){
              str += substring.charAt(i) + substring.charAt(i+1);
              i += 1; //跳过下一个unicode编码
              continue;
            }
          }
        } 
      }
      if(0x2100 <= hs && hs <= 0x27ff) {
        str += String.fromCharCode(hs);
        continue;
      } else if(0x2B05 <= hs && hs <= 0x2b07) {
        str += String.fromCharCode(hs);
        continue;
      } else if(0x2934 <= hs && hs <= 0x2935) {
        str += String.fromCharCode(hs);
        continue;
      } else if(0x3297 <= hs && hs <= 0x3299) {
        str += String.fromCharCode(hs);
        continue;
      } else if(hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 ||
        hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b ||
        hs == 0x2b50 || hs == 0x231a  || hs == 0x30c4  || hs == 0x2020  || hs == 0x10e6) {//  enco('ღ');//"\u10e6"    //enco('ツ');//"\u30c4     //enco('†');//"\u2020"
        str += String.fromCharCode(hs);
        continue;
      }
    }
    str += '<code>' + String.fromCharCode(hs) + '</code>';
  }
  return str;
}