import { ILighthouse } from '../_lighthouse/_lighthouse.interface';
import { IDevices } from './devices/devices';
import { IScreenInfo } from './screen/screen.interfaces';
import { ScreenService } from './screen/screen.service';
import { DevicesLighthouse } from './devices/devices.lighthouse';
import { ScreenLighthouse } from './screen/screen.lighthouse';

export interface IDevicesScreen {
    devices: ILighthouse<IDevices>;
    screen: ILighthouse<IScreenInfo>;
    screenService: ScreenService;
}

export class DevicesScreen implements IDevicesScreen {
    public devices: ILighthouse<IDevices>;

    public screen: ILighthouse<IScreenInfo>;
    public screenService: ScreenService;


    public constructor() {
        this.devices = new DevicesLighthouse();
        this.screen = new ScreenLighthouse();
        this.screenService = new ScreenService();
    }
}
