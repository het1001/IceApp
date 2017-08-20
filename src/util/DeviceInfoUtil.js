/**
 * Created by Administrator on 2017/5/20.
 */

import DeviceInfo from 'react-native-device-info'

const DeviceInfoUtil = {
    getDeviceInfo: () => {
        return {
            deviceUniqueId: DeviceInfo.getUniqueID(),
            manufacturer: DeviceInfo.getManufacturer(),
            model: DeviceInfo.getModel(),
            deviceId: DeviceInfo.getDeviceId(),
            deviceName: DeviceInfo.getDeviceName(),
            sysName: DeviceInfo.getSystemName(),
            sysVersion: DeviceInfo.getSystemVersion(),
            appVersion: DeviceInfo.getReadableVersion()
        };
    }
}

export default DeviceInfoUtil;