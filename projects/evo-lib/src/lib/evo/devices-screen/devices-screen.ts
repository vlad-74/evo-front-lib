import { ILighthouse } from '../_lighthouse/_lighthouse.interface';
import { IDevices } from './devices/devices';
import { IScreenInfo } from './screen/screen.interfaces';
import { ScreenService } from './screen/screen.service';
import { DevicesLighthouse } from './devices/devices.lighthouse';
import { ScreenLighthouse } from './screen/screen.lighthouse';

export interface IDevicesScreen {
    devices: {
        l: ILighthouse<IDevices>;
    };
    screen: {
        l: ILighthouse<IScreenInfo>;
        s: ScreenService;
    };
}

export class DevicesScreen implements IDevicesScreen {
    public devices: {
        l: ILighthouse<IDevices>;
    };

    public screen: {
        l: ILighthouse<IScreenInfo>;
        s: ScreenService;
    };

    public constructor() {
        this.devices = {
            l: new DevicesLighthouse(),
        };
        this.screen = {
            l: new ScreenLighthouse(),
            s: new ScreenService(),
        };
    }
}
