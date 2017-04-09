/**
 * create by houenteng at 2017-04-08 21:17
 */

if (__DEV__) {
    global.__REMOTE_URL__='http://192.168.1.110:8080';
} else {
    global.__REMOTE_URL__='http://192.168.1.110:8080';
}

import { AppRegistry } from 'react-native';
import IceApp from './IceApp';


import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

global.storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    // 我设置的30天
    defaultExpires: 1000 * 3600 * 24 * 30,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是写到另一个文件里，这里require引入
    // 或是在任何时候，直接对storage.sync进行赋值修改
    sync: {}
})

var Dimensions = require('Dimensions');
global.screenWith = Dimensions.get('window').width;
global.screenHeight = Dimensions.get('window').height;

global.PHONE_REG = /^1[34578]\d{9}$/;

AppRegistry.registerComponent('IceApp', () => IceApp);