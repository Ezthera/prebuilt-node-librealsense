/**
 * Error Information returned from native SDK
 */
export type ErrorInfoObject = {
    /**
     * - True if the error is a recoverable error
     */
    recoverable: boolean;
    /**
     * - Detailed description of the error
     */
    description: string;
    /**
     * - Native function that triggered the error
     */
    nativeFunction: string;
};
/**
 * Motion intrinsics: scale, bias, and variances.
 */
export type MotionIntrinsics = {
    /**
     * - Array(12), Interpret data array values. Indices are:
     * <br>[0 - Scale X, 1 - cross axis, 2 - cross axis, 3 - Bias X,
     * <br> 4 - cross axis, 5 - Scale Y, 6 - cross axis, 7 - Bias Y,
     * <br> 8 - cross axis, 9 - cross axis, 10 - Scale Z, 11 - Bias Z]
     */
    data: Float32[];
    /**
     * - Array(3), Variance of noise for X, Y, and Z axis
     */
    noiseVariances: Float32[];
    /**
     * - Array(3), Variance of bias for X, Y, and Z axis
     */
    biasVariances: Float32[];
};
/**
 * 3D vector in Euclidean coordinate space
 */
export type Vector = {
    /**
     * - value of x coordinate
     */
    x: Float32;
    /**
     * - value of y coordinate
     */
    y: Float32;
    /**
     * - value of z coordinate
     */
    z: Float32;
};
/**
 * Quaternion used to represent rotation
 */
export type Quaternion = {
    x: Float32;
    y: Float32;
    z: Float32;
    w: Float32;
};
/**
 * PoseData
 */
export type PoseData = {
    /**
     * - X, Y, Z values of translation, in meters (relative to
     * initial position)
     */
    translation: Vector;
    /**
     * - X, Y, Z values of velocity, in meter/sec
     */
    velocity: Vector;
    /**
     * - X, Y, Z values of acceleration, in meter/sec^2
     */
    acceleration: Vector;
    /**
     * - Qi, Qj, Qk, Qr components of rotation as represented
     * in quaternion rotation (relative to initial position)
     */
    rotation: Quaternion;
    /**
     * - X, Y, Z values of angular velocity, in radians/sec
     */
    angularVelocity: Vector;
    /**
     * - X, Y, Z values of angular acceleration, in radians/sec^2
     */
    angularAcceleration: Vector;
    /**
     * - pose data confidence 0 - Failed, 1 - Low, 2 - Medium,
     * 3 - High
     */
    trackerConfidence: Integer;
    /**
     * - pose data confidence 0 - Failed, 1 - Low, 2 - Medium,
     * 3 - High
     */
    mapperConfidence: Integer;
};
/**
 * Field of view (FOV) info:
 */
export type FOVObject = {
    /**
     * - horizontal field of view
     */
    h: Float32;
    /**
     * - vertical field of view
     */
    v: Float32;
};
/**
 * Cleanup resources
 */
export function cleanup(): void;
/**
 * Error Information returned from native SDK
 * @typedef {Object} ErrorInfoObject
 * @property {Boolean} recoverable - True if the error is a recoverable error
 * @property {String} description - Detailed description of the error
 * @property {String} nativeFunction - Native function that triggered the error
 * @see [getError()]{@link getError}
 */
/**
 * Get the error info
 * User could call this method to get the detailed error info if the previous
 * API failed.
 * @return {ErrorInfoObject|undefined} If there is no error, undefined is returned
 */
export function getError(): ErrorInfoObject | undefined;
/**
 * UnrecoverableError is the type of error that jeopardized the modue that restart
 * is needed.
 */
export class UnrecoverableError extends Error {
    constructor(message: any);
}
/**
 * Default librealsense context class,
 */
export class Context {
    /**
     * There are only one acceptable form of syntax to create a Context for users:
     * <pre><code>
     *  new Context();
     * </code></pre>
     * other forms are reserved for internal use only.
     */
    constructor();
    constructor(cxxCtx: any, ...args: any[]);
    _events: any;
    cxxCtx: any;
    /**
     * Cleanup underlying C++ context, and release all resources that were created by this context.
     * The JavaScript Context object(s) will not be garbage-collected without call(s) to this function
     */
    destroy(): void;
    /**
     * Get the events object of EventEmitter
     * @return {EventEmitter}
     */
    get events(): EventEmitter;
    /**
    * Create a static snapshot of all connected devices at the time of the call
    * @return {DeviceList|undefined} connected devices at the time of the call
    */
    queryDevices(): DeviceList | undefined;
    /**
    * Generate an array of all available sensors from all RealSense devices
    * @return {Sensor[]|undefined}
    */
    querySensors(): Sensor[] | undefined;
    /**
     * Get the device from one of its sensors
     *
     * @param {Sensor} sensor
     * @return {Device|undefined}
     */
    getSensorParent(sensor: Sensor, ...args: any[]): Device | undefined;
    /**
     * When one or more devices are plugged or unplugged into the system
     * @event Context#device-changed
     * @param {DeviceList} removed - The devices removed from the system
     * @param {DeviceList} added - The devices added to the system
     */
    /**
     * This callback is called when number of devices is changed
     * @callback devicesChangedCallback
     * @param {DeviceList} removed - The devices removed from the system
     * @param {DeviceList} added - The devices added to the system
     *
     * @see [Context.setDevicesChangedCallback]{@link Context#setDevicesChangedCallback}
     */
    /**
     * Register a callback function to receive device-changed notification
     * @param {devicesChangedCallback} callback - devices changed callback
     */
    setDevicesChangedCallback(callback: (removed: DeviceList, added: DeviceList) => any, ...args: any[]): void;
    /**
     * Create a PlaybackDevice to playback recored data file.
     *
     * @param {String} file - the file path
     * @return {PlaybackDevice|undefined}
     */
    loadDevice(file: string, ...args: any[]): PlaybackDevice | undefined;
    /**
     * Removes a PlaybackDevice from the context, if exists
     *
     * @param {String} file The file name that was loaded to create the playback device
     */
    unloadDevice(file: string, ...args: any[]): void;
}
/**
 * This class provides a simple way to retrieve frame data
 */
export class Pipeline {
    /**
     * Construct a Pipeline object
     * There are 2 acceptable syntax
     *
     * <pre><code>
     *  Syntax 1. new Pipeline()
     *  Syntax 2. new Pipeline(context)
     * </code></pre>
     * Syntax 1 uses the default context.
     * Syntax 2 used the context created by application
     * @param {Context} [context] - the {@link Context} that is being used by the pipeline
     */
    constructor(context?: Context, ...args: any[]);
    ctx: any;
    autoConfig: Config;
    cxxPipeline: any;
    started: boolean;
    frameSet: FrameSet;
    /**
     * Destroy the resource associated with this pipeline
     *
     * @return {undefined}
     */
    destroy(): undefined;
    /**
     * Start streaming
     * There are 2 acceptable syntax
     *
     * <pre><code>
     *  Syntax 1. start()
     *  Syntax 2. start(config)
     * </code></pre>
     * Syntax 1 uses the default configuration.
     * Syntax 2 used the configured streams and or device of the config parameter
     *
     * @param {Config} [config] - the {@link Config} object to use for configuration
     * @return {@link PipelineProfile}
     */
    start(...args: any[]): any;
    /**
     * Stop streaming
     *
     * @return {undefined}
     */
    stop(): undefined;
    /**
     * Wait until a new set of frames becomes available.
     * The returned frameset includes time-synchronized frames of each enabled stream in the pipeline.
     * In case of different frame rates of the streams, the frames set include a matching frame of the
     * slow stream, which may have been included in previous frames set.
     * The method blocks the calling thread, and fetches the latest unread frames set.
     * Device frames, which were produced while the function wasn't called, are dropped.
     * To avoid frame drops, this method should be called as fast as the device frame rate.
     *
     * @param {Integer} timeout - max time to wait, in milliseconds, default to 5000 ms
     * @return {FrameSet|undefined} a FrameSet object or Undefined
     * @see See [Pipeline.latestFrame]{@link Pipeline#latestFrame}
     */
    waitForFrames(timeout?: Integer, ...args: any[]): FrameSet | undefined;
    get latestFrame(): FrameSet;
    /**
     * Check if a new set of frames is available and retrieve the latest undelivered set.
     * The frameset includes time-synchronized frames of each enabled stream in the pipeline.
     * The method returns without blocking the calling thread, with status of new frames available
     * or not. If available, it fetches the latest frames set.
     * Device frames, which were produced while the function wasn't called, are dropped.
     * To avoid frame drops, this method should be called as fast as the device frame rate.
     *
     * @return {FrameSet|undefined}
     */
    pollForFrames(): FrameSet | undefined;
    /**
     * Return the active device and streams profiles, used by the pipeline.
     * The pipeline streams profiles are selected during {@link Pipeline.start}. The method returns a
     * valid result only when the pipeline is active -
     * between calls to {@link Pipeline.start} and {@link Pipeline.stop}.
     * After {@link Pipeline.stop} is called, the pipeline doesn't own the device, thus, the pipeline
     * selected device may change in
     * subsequent activations.
     *
     * @return {PipelineProfile} the actual pipeline device and streams profile, which was
     * successfully configured to the streaming device on start.
     */
    getActiveProfile(): PipelineProfile;
}
/**
 * The pipeline profile includes a device and a selection of active streams, with specific profile.
 * The profile is a selection of the above under filters and conditions defined by the pipeline.
 * Streams may belong to more than one sensor of the device.
 */
export class PipelineProfile {
    constructor(profile: any);
    cxxPipelineProfile: any;
    /**
     * Check if the object is valid
     * @return {Boolean}
     */
    get isValid(): boolean;
    /**
     * Return the selected streams profiles, which are enabled in this profile.
     *
     * @return {StreamProfile[]} an array of StreamProfile
     */
    getStreams(): StreamProfile[];
    /**
     * Return the selected stream profile, which are enabled in this profile.
     * @param {Integer|String} streamType the stream type of the desired profile,
     * see {@link stream} for avaiable values
     * @param {Integer} streamIndex stream index of the desired profile, -1 for any matching
     * @return {StreamProfile} the first matching stream profile
     */
    getStream(streamType: Integer | string, streamIndex?: Integer, ...args: any[]): StreamProfile;
    /**
     * Retrieve the device used by the pipeline.
     * The device class provides the application access to control camera additional settings -
     * get device information, sensor options information, options value query and set, sensor
     * specific extensions.
     * Since the pipeline controls the device streams configuration, activation state and frames
     * reading, calling the device API functions, which execute those operations, results in
     * unexpected behavior. The pipeline streaming device is selected during {@link Pipeline.start}.
     * Devices of profiles, which are not returned by
     * {@link Pipeline.start} or {@link Pipeline.getActiveProfile}, are not guaranteed to be used by
     * the pipeline.
     *
     * @return {Device} the pipeline selected device
     */
    getDevice(): Device;
    /**
     * Destroy the resource associated with this object
     *
     * @return {undefined}
     */
    destroy(): undefined;
}
/**
 * The config allows pipeline users to request filters for the pipeline streams and device selection
 * and configuration.
 * This is an optional step in pipeline creation, as the pipeline resolves its streaming device
 * internally.
 * Config provides its users a way to set the filters and test if there is no conflict with the
 * pipeline requirements from the device. It also allows the user to find a matching device for
 * the config filters and the pipeline, in order to select a device explicitly, and modify its
 * controls before streaming starts.
 */
export class Config {
    cxxConfig: any;
    /**
     * Enable a device stream explicitly, with selected stream parameters.
     * The method allows the application to request a stream with specific configuration. If no stream
     * is explicitly enabled, the pipeline configures the device and its streams according to the
     * attached computer vision modules and processing blocks requirements, or default configuration
     * for the first available device.
     * The application can configure any of the input stream parameters according to its requirement,
     * or set to 0 for don't care value. The config accumulates the application calls for enable
     * configuration methods, until the configuration is applied. Multiple enable stream calls for the
     * same stream override each other, and the last call is maintained.
     * Upon calling {@link Config.resolve}, the config checks for conflicts between the application
     * configuration requests and the attached computer vision modules and processing blocks
     * requirements, and fails if conflicts are found.
     * Before {@link Config.resolve} is called, no conflict check is done.
     *
     * @param {Integer|String} stream  stream type to be enabled
     * @param {Integer} index stream index, used for multiple streams of the same type. -1 indicates
     * any.
     * @param {Integer} width stream image width - for images streams. 0 indicates any.
     * @param {Integer} height stream image height - for images streams. 0 indicates any.
     * @param {Integer|String} format stream data format - pixel format for images streams, of data
     * type for other streams. format.FORMAT_ANY indicates any.
     * @param {Integer} fps stream frames per second. 0 indicates any.
     */
    enableStream(stream: Integer | string, index: Integer, width: Integer, height: Integer, format: Integer | string, fps: Integer, ...args: any[]): void;
    /**
     * Disable a device stream explicitly, to remove any requests on this stream profile.
     */
    disableStream(stream: any, ...args: any[]): void;
    /**
     * Enable all device streams explicitly.
     */
    enableAllStreams(): void;
    /**
     * Disable all device streams explicitly.
     */
    disableAllStreams(): void;
    /**
     * Select a specific device explicitly by its serial number, to be used by the pipeline.
     * The conditions and behavior of this method are similar to those of {@link Config.enableStream}.
     * This method is required if the application needs to set device or sensor settings prior to
     * pipeline streaming, to enforce the pipeline to use the configured device.
     *
     * @param {String} serial device serial number, as returned by
     * Device.getCameraInfo(camera_info.CAMERA_INFO_SERIAL_NUMBER).
     */
    enableDevice(serial: string, ...args: any[]): void;
    /**
     * Select a recorded device from a file, to be used by the pipeline through playback.
     * The device available streams are as recorded to the file, and {@link Config.resolve} considers
     * only this device and configuration as available.
     * This request cannot be used if {@link Config.enableRecordToFile} is called for the current
     * config, and vise versa
     *
     * @param {String} fileName the playback file of the device
     * @param {Boolean} repeat whether to repeat the playback automatically
     */
    enableDeviceFromFile(fileName: string, repeat?: boolean, ...args: any[]): void;
    /**
     * Requires that the resolved device would be recorded to file
     * This request cannot be used if {@link Config.enableDeviceFromFile} is called for the current
     * config, and vise versa as available.
     *
     * @param {String} fileName the desired file for the output record
     */
    enableRecordToFile(fileName: string, ...args: any[]): void;
    /**
     * Resolve the configuration filters, to find a matching device and streams profiles.
     * The method resolves the user configuration filters for the device and streams, and combines
     * them with the requirements of the computer vision modules and processing blocks attached to the
     * pipeline. If there are no conflicts of requests,
     * it looks for an available device, which can satisfy all requests, and selects the first
     * matching streams configuration. In the absence of any request, the config selects the first
     * available device and the first color and depth streams configuration.
     * The pipeline profile selection during {@link Pipeline.start} follows the same method. Thus,
     * the selected profile is the same, if no change occurs to the available devices occurs.
     * Resolving the pipeline configuration provides the application access to the pipeline selected
     * device for advanced control.
     * The returned configuration is not applied to the device, so the application doesn't own the
     * device sensors. However, the application can call {@link Cofnig.enableDevice}, to enforce the
     * device returned by this method is selected by pipeline start, and configure the device and
     * sensors options or extensions before streaming starts.
     *
     * @param {Pipeline} pipeline the pipeline for which the selected filters are applied
     * @return {PipelineProfile|undefined} a matching device and streams profile, which satisfies the
     * filters and pipeline requests.
     */
    resolve(pipeline: Pipeline, ...args: any[]): PipelineProfile | undefined;
    /**
     * Check if the config can resolve the configuration filters, to find a matching device and
     * streams profiles. The resolution conditions are as described in {@link Config.resolve}.
     *
     * @param {Pipeline} pipeline the pipeline for which the selected filters are applied
     * @return {boolean} true if a valid profile selection exists, false if no selection can be found
     * under the config filters and the available devices.
     */
    canResolve(pipeline: Pipeline, ...args: any[]): boolean;
    /**
     * Release resources associated with the object
     */
    destroy(): void;
}
/**
 * The Colorizer can be used to quickly visualize the depth data by tranform data into RGB8 format
 */
export class Colorizer extends Options {
    constructor();
    cxxColorizer: any;
    depthRGB: VideoFrame;
    release(): void;
    /**
     * Destroy all resources associated with the colorizer
     */
    destroy(): void;
    get colorizedFrame(): VideoFrame;
    /**
     * Tranform depth data into RGB8 format
     *
     * @param {DepthFrame} depthFrame the depth frame
     * @return {VideoFrame|undefined}
     */
    colorize(depthFrame: DepthFrame, ...args: any[]): VideoFrame | undefined;
}
/**
 * A RealSense camera
 */
export class Device {
    static _internalCreateDevice(cxxDevice: any): Device;
    constructor(cxxDev: any, autoDelete?: boolean);
    cxxDev: any;
    /**
     * Check if everything is OK, e.g. if the device object is connected to underlying hardware
     * @return {Boolean}
     */
    get isValid(): boolean;
    /**
     * get an array of adjacent sensors, sharing the same physical parent composite device
     * @return {Sensor[]}
     */
    querySensors(): Sensor[];
    /**
     * Get the first sensor
     * @return {Sensor|undefined}
     */
    get first(): Sensor;
    /**
     * Information that can be queried from the device.
     * Not all information attributes are available on all camera types.
     * This information is mainly available for camera debug and troubleshooting and should not be
     * used in applications.
     * @typedef {Object} CameraInfoObject
     * @property {String|undefined} name - Device friendly name. <br> undefined is not
     * supported.
     * @property {String|undefined} serialNumber - Device serial number. <br> undefined is not
     * supported.
     * @property {String|undefined} firmwareVersion - Primary firmware version.
     * <br> undefined is not supported.
     * @property {String|undefined} physicalPort - Unique identifier of the port the device is
     * connected to (platform specific). <br> undefined is not supported.
     * @property {String|undefined} debugOpCode - If device supports firmware logging, this is the
     * command to send to get logs from firmware. <br> undefined is not supported.
     * @property {String|undefined} advancedMode - True if the device is in advanced mode.
     * <br> undefined is not supported.
     * @property {String|undefined} productId - Product ID as reported in the USB descriptor.
     * <br> undefined is not supported.
     * @property {Boolean|undefined} cameraLocked - True if EEPROM is locked. <br> undefined is not
     * supported.
     * @property {String|undefined} usbTypeDescriptor - Designated USB specification: USB2/USB3.
     * <br> undefined is not supported.
     * @property {String|undefined} recommendedFirmwareVersion - Latest firmware version.
     * <br> undefined is not supported.
     * @see [Device.getCameraInfo()]{@link Device#getCameraInfo}
     */
    /**
     * Get camera information
     * There are 2 acceptable forms of syntax:
     * <pre><code>
     *  Syntax 1. getCameraInfo()
     *  Syntax 2. getCameraInfo(info)
     * </code></pre>
     *
     * @param {String|Integer} [info] - the camera_info type, see {@link camera_info} for available
     * values
     * @return {CameraInfoObject|String|undefined} if no argument is provided, {CameraInfoObject} is
     * returned. If a camera_info is provided, the specific camera info value string is returned.
     */
    getCameraInfo(info?: string | Integer, ...args: any[]): string | {
        /**
         * - Device friendly name. <br> undefined is not
         * supported.
         */
        name: string | undefined;
        /**
         * - Device serial number. <br> undefined is not
         * supported.
         */
        serialNumber: string | undefined;
        /**
         * - Primary firmware version.
         * <br> undefined is not supported.
         */
        firmwareVersion: string | undefined;
        /**
         * - Unique identifier of the port the device is
         * connected to (platform specific). <br> undefined is not supported.
         */
        physicalPort: string | undefined;
        /**
         * - If device supports firmware logging, this is the
         * command to send to get logs from firmware. <br> undefined is not supported.
         */
        debugOpCode: string | undefined;
        /**
         * - True if the device is in advanced mode.
         * <br> undefined is not supported.
         */
        advancedMode: string | undefined;
        /**
         * - Product ID as reported in the USB descriptor.
         * <br> undefined is not supported.
         */
        productId: string | undefined;
        /**
         * - True if EEPROM is locked. <br> undefined is not
         * supported.
         */
        cameraLocked: boolean | undefined;
        /**
         * - Designated USB specification: USB2/USB3.
         * <br> undefined is not supported.
         */
        usbTypeDescriptor: string | undefined;
        /**
         * - Latest firmware version.
         * <br> undefined is not supported.
         */
        recommendedFirmwareVersion: string | undefined;
    };
    get cameraInfo(): string | {
        /**
         * - Device friendly name. <br> undefined is not
         * supported.
         */
        name: string | undefined;
        /**
         * - Device serial number. <br> undefined is not
         * supported.
         */
        serialNumber: string | undefined;
        /**
         * - Primary firmware version.
         * <br> undefined is not supported.
         */
        firmwareVersion: string | undefined;
        /**
         * - Unique identifier of the port the device is
         * connected to (platform specific). <br> undefined is not supported.
         */
        physicalPort: string | undefined;
        /**
         * - If device supports firmware logging, this is the
         * command to send to get logs from firmware. <br> undefined is not supported.
         */
        debugOpCode: string | undefined;
        /**
         * - True if the device is in advanced mode.
         * <br> undefined is not supported.
         */
        advancedMode: string | undefined;
        /**
         * - Product ID as reported in the USB descriptor.
         * <br> undefined is not supported.
         */
        productId: string | undefined;
        /**
         * - True if EEPROM is locked. <br> undefined is not
         * supported.
         */
        cameraLocked: boolean | undefined;
        /**
         * - Designated USB specification: USB2/USB3.
         * <br> undefined is not supported.
         */
        usbTypeDescriptor: string | undefined;
        /**
         * - Latest firmware version.
         * <br> undefined is not supported.
         */
        recommendedFirmwareVersion: string | undefined;
    };
    /**
     * Check if specific camera info is supported.
     * @param {String|Integer} info - info type to query. See {@link camera_info} for available values
     * @return {Boolean|undefined} Returns undefined if an invalid info type was specified.
     * @see enum {@link camera_info}
     * @example <caption>Example of 3 equivalent calls of the same query</caption>
     * device.supportsCameraInfo('name');
     * device.supportsCameraInfo(realsense2.camera_info.camera_info_name);
     * device.supportsCameraInfo(realsense2.camera_info.CAMERA_INFO_NAME);
     */
    supportsCameraInfo(info: string | Integer, ...args: any[]): boolean | undefined;
    /**
     * Send hardware reset request to the device.
     * @return {undefined}
     */
    reset(): undefined;
    /**
     * Release resources associated with the object
     */
    destroy(): void;
    _events: any;
}
/**
 * This class represents the tm2 device
 */
export class Tm2 extends Device {
    constructor(dev: any);
    /**
     * Enter the given device into loopback operation mode that uses the given file as input for
     * raw data
     * @param {String} file Path to bag file with raw data for loopback
     * @return {undefined}
     */
    enableLoopback(file: string, ...args: any[]): undefined;
    /**
     * Restores the given device into normal operation mode
     * @return {undefined}
     */
    disableLoopback(): undefined;
    /**
     * Checks if the device is in loopback mode or not
     * @return {Boolean}
     */
    get loopbackEnabled(): boolean;
}
/**
 * List of devices
 */
export class DeviceList {
    constructor(cxxList: any);
    cxxList: any;
    /**
     * Release resources associated with the object
     */
    destroy(): void;
    /**
     * Checks if a specific device is contained inside a device list.
     *
     * @param {Device} device the camera to be checked
     * @return {Boolean} true if the camera is contained in the list, otherwise false
     */
    contains(device: Device, ...args: any[]): boolean;
    /**
     * Creates a device by index. The device object represents a physical camera and provides the
     * means to manipulate it.
     *
     * @param {Integer} index the zero based index of the device in the device list
     * @return {Device|undefined}
     */
    getDevice(index: Integer, ...args: any[]): Device | undefined;
    get devices(): Device[];
    /**
     * Determines number of devices in a list.
     * @return {Integer}
     */
    get size(): Integer;
    /**
     * Get the first device
     * @return {Device|undefined}
     */
    get front(): Device;
    /**
     * Get the last device
     * @return {Device|undefined}
     */
    get back(): Device;
}
/**
 * Encapsulate the handling of 'device-changed' notification, when devices are conncted or
 * disconnected. It can connect to the existing device(s) in system, and/or wait for the
 * arrival/removal of devices.
 */
export class DeviceHub {
    /**
     * @param {Context} context - a librealsense2 Context
     */
    constructor(context: Context, ...args: any[]);
    context: Context;
    cxxHub: any;
    /**
     * If any device is connected return it, otherwise wait until next RealSense device connects.
     * Calling this method multiple times will cycle through connected devices
     * @return {Device|undefined}
     */
    waitForDevice(): Device | undefined;
    /**
     * Check if a device is connected
     * @return {Boolean}
     */
    isConnected(device: any, ...args: any[]): boolean;
    /**
     * Release resources associated with the object
     */
    destroy(): void;
}
/**
 * A sensor device in a RealSense camera
 */
export class Sensor extends Options {
    /**
     * Construct a Sensor object, representing a RealSense camera subdevice
     * By default, native resources associated with a Sensor object are freed
     * automatically during cleanup.
     */
    constructor(cxxSensor: any, autoDelete?: boolean);
    cxxSensor: any;
    _events: any;
    /**
     * Check if everything is OK, e.g. if the device object is connected to underlying hardware
     * @return {Boolean}
     */
    get isValid(): boolean;
    /**
     * Open subdevice for exclusive access, by committing to a configuration.
     *  There are 2 acceptable forms of syntax:
     * <pre><code>
     *  Syntax 1. open(streamProfile)
     *  Syntax 2. open(profileArray)
     * </code></pre>
     *  Syntax 2 is for opening multiple profiles in one function call and should be used for
     * interdependent streams, such as depth and infrared, that have to be configured together.
     *
     * @param {StreamProfile} streamProfile configuration commited by the device
     * @param {StreamProfile[]} profileArray configurations array commited by the device
     * @see [Sensor.getStreamProfiles]{@link Sensor#getStreamProfiles} for a list of all supported
     * stream profiles
     */
    open(streamProfile: StreamProfile, ...args: any[]): void;
    /**
     * Check if specific camera info is supported
     * @param {String|Integer} info - info type to query. See {@link camera_info} for available values
     * @return {Boolean|undefined} Returns undefined if an invalid info type was specified.
     * @see enum {@link camera_info}
     */
    supportsCameraInfo(info: string | Integer, ...args: any[]): boolean | undefined;
    /**
     * Get camera information of the sensor
     *
     * @param {String|Integer} info - the camera_info type, see {@link camera_info} for available
     * values
     * @return {String|undefined}
     */
    getCameraInfo(info: string | Integer, ...args: any[]): string | undefined;
    /**
    * Stops any streaming and close subdevice.
    * @return {undefined} No return value
    */
    close(): undefined;
    /**
    * Delete the resource for accessing the subdevice. The device would not be accessable from
    * this object after the operation.
    * @return {undefined} No return value
    */
    destroy(): undefined;
    /**
     * This callback is called when a frame is captured
     * @callback FrameCallback
     * @param {Frame} frame - The captured frame
     *
     * @see [Sensor.start]{@link Sensor#start}
     */
    /**
     * Start passing frames into user provided callback
     * There are 2 acceptable syntax:
     * <pre><code>
     *  Syntax 1. start(callback)
     *  Syntax 2. start(Syncer)
     * </code></pre>
     *
     * @param {FrameCallback} callback
     * @param {Syncer} syncer, the syncer to synchronize frames
     *
     * @example <caption>Simply do logging when a frame is captured</caption>
     *  sensor.start((frame) => {
     *    console.log(frame.timestamp, frame.frameNumber, frame.data);
     *  });
     *
     */
    start(callback: (frame: Frame) => any, ...args: any[]): void;
    frame: Frame;
    depthFrame: DepthFrame;
    videoFrame: VideoFrame;
    disparityFrame: DisparityFrame;
    motionFrame: MotionFrame;
    poseFrame: PoseFrame;
    /**
     * stop streaming
     * @return {undefined} No return value
     */
    stop(): undefined;
    /**
     * @typedef {Object} NotificationEventObject
     * @property {String} descr - The human readable literal description of the notification
     * @property {Float}  timestamp - The timestamp of the notification
     * @property {String} severity - The severity of the notification
     * @property {String} category - The category of the notification
     * @property {String} serializedData - The serialized data of the notification
     */
    /**
     * This callback is called when there is a device notification
     * @callback NotificationCallback
     * @param {NotificationEventObject} info
     * @param {String} info.descr - See {@link NotificationEventObject} for details
     * @param {Float}  info.timestamp - See {@link NotificationEventObject} for details
     * @param {String} info.severity - See {@link NotificationEventObject} for details
     * @param {String} info.category - See {@link NotificationEventObject} for details
     * @param {String} info.serializedData - See {@link NotificationEventObject} for details
     *
     * @see {@link NotificationEventObject}
     * @see [Sensor.setNotificationsCallback()]{@link Sensor#setNotificationsCallback}
     */
    /**
     * @event Sensor#notification
     * @param {NotificationEventObject} evt
     * @param {String} evt.descr - See {@link NotificationEventObject} for details
     * @param {Float}  evt.timestamp - See {@link NotificationEventObject} for details
     * @param {String} evt.severity - See {@link NotificationEventObject} for details
     * @param {String} evt.category - See {@link NotificationEventObject} for details
     * @param {String} evt.serializedData - See {@link NotificationEventObject} for details
     * @see {@link NotificationEventObject}
     * @see [Sensor.setNotificationsCallback()]{@link Sensor#setNotificationsCallback}
     */
    /**
     * register notifications callback
     * @param {NotificationCallback} callback The user-provied notifications callback
     * @see {@link NotificationEventObject}
     * @see [Sensor 'notification']{@link Sensor#event:notification} event
     * @return {undefined}
     */
    setNotificationsCallback(callback: (info: {
        /**
         * - The human readable literal description of the notification
         */
        descr: string;
        /**
         * - The timestamp of the notification
         */
        timestamp: Float;
        /**
         * - The severity of the notification
         */
        severity: string;
        /**
         * - The category of the notification
         */
        category: string;
        /**
         * - The serialized data of the notification
         */
        serializedData: string;
    }, descr: string, timestamp: Float, severity: string, category: string, serializedData: string) => any, ...args: any[]): undefined;
    /**
     * Get a list of stream profiles that given subdevice can provide. The returned profiles should be
     * destroyed by calling its destroy() method.
     *
     * @return {StreamProfile[]} all of the supported stream profiles
     * See {@link StreamProfile}
     */
    getStreamProfiles(): StreamProfile[];
}
/**
 * Depth sensor
 */
export class DepthSensor extends Sensor {
    /**
     * Construct a device object, representing a RealSense camera
     */
    constructor(sensor: any);
    /**
     * Retrieves mapping between the units of the depth image and meters.
     *
     * @return {Float} depth in meters corresponding to a depth value of 1
     */
    get depthScale(): Float;
}
/**
 * Sensor for managing region of interest.
 */
export class ROISensor extends Sensor {
    /**
     * Create a ROISensor out of another sensor
     * @param {Sensor} sensor a sensor object
     * @return {ROISensor|undefined} return a ROISensor if the sensor can be
     * treated as a ROISensor, otherwise return undefined.
     */
    static from(sensor: Sensor): ROISensor | undefined;
    /**
     * Construct a ROISensor object, representing a RealSense camera subdevice
     * The newly created ROISensor object shares native resources with the sensor
     * argument. So the new object shouldn't be freed automatically to make
     * sure resources released only once during cleanup.
     */
    constructor(cxxSensor: any);
    /**
     * @typedef {Object} RegionOfInterestObject
     * @property {Float32} minX - lower horizontal bound in pixels
     * @property {Float32} minY - lower vertical bound in pixels
     * @property {Float32} maxX - upper horizontal bound in pixels
     * @property {Float32} maxY - upper vertical bound in pixels
     * @see [Device.getRegionOfInterest()]{@link Device#getRegionOfInterest}
     */
    /**
     * Get the active region of interest to be used by auto-exposure algorithm.
     * @return {RegionOfInterestObject|undefined} Returns undefined if failed
     * @see {@link RegionOfInterestObject}
     */
    getRegionOfInterest(): {
        /**
         * - lower horizontal bound in pixels
         */
        minX: Float32;
        /**
         * - lower vertical bound in pixels
         */
        minY: Float32;
        /**
         * - upper horizontal bound in pixels
         */
        maxX: Float32;
        /**
         * - upper vertical bound in pixels
         */
        maxY: Float32;
    };
    /**
     * Set the active region of interest to be used by auto-exposure algorithm
     * There are 2 acceptable forms of syntax:
     * <pre><code>
     *  Syntax 1. setRegionOfInterest(region)
     *  Syntax 2. setRegionOfInterest(minX, minY, maxX, maxY)
     * </code></pre>
     *
     * @param {RegionOfInterestObject} region - the region of interest to be used.
     * @param {Float32} region.minX - see {@link RegionOfInterestObject} for details.
     * @param {Float32} region.minY - see {@link RegionOfInterestObject} for details.
     * @param {Float32} region.maxX - see {@link RegionOfInterestObject} for details.
     * @param {Float32} region.maxY - see {@link RegionOfInterestObject} for details.
     *
     * @param {Float32} minX - see {@link RegionOfInterestObject} for details.
     * @param {Float32} minY - see {@link RegionOfInterestObject} for details.
     * @param {Float32} maxX - see {@link RegionOfInterestObject} for details.
     * @param {Float32} maxY - see {@link RegionOfInterestObject} for details.
     */
    setRegionOfInterest(region: {
        /**
         * - lower horizontal bound in pixels
         */
        minX: Float32;
        /**
         * - lower vertical bound in pixels
         */
        minY: Float32;
        /**
         * - upper horizontal bound in pixels
         */
        maxX: Float32;
        /**
         * - upper vertical bound in pixels
         */
        maxY: Float32;
    }, ...args: any[]): void;
}
/**
 * Color sensor
 */
export class ColorSensor extends Sensor {
    /**
     * Construct a device object, representing a RealSense camera
     */
    constructor(sensor: any);
}
/**
 * Motion sensor
 */
export class MotionSensor extends Sensor {
    /**
     * Construct a device object, representing a RealSense camera
     */
    constructor(sensor: any);
}
/**
 * Fisheye sensor
 */
export class FisheyeSensor extends Sensor {
    /**
     * Construct a device object, representing a RealSense camera
     */
    constructor(sensor: any);
}
/**
 * Class represents a stream configuration
 */
export class StreamProfile {
    static _internalCreateStreamProfile(cxxProfile: any): StreamProfile;
    constructor(cxxProfile: any);
    cxxProfile: any;
    streamValue: any;
    formatValue: any;
    fpsValue: any;
    indexValue: any;
    uidValue: any;
    isDefaultValue: any;
    /**
     * Get stream index the input profile in case there are multiple streams of the same type
     *
     * @return {Integer}
     */
    get streamIndex(): Integer;
    /**
     * Get stream type
     *
     * @return {Integer}
     */
    get streamType(): Integer;
    /**
     * Get binary data format
     *
     * @return {Integer}
     */
    get format(): Integer;
    /**
     * Expected rate for data frames to arrive, meaning expected number of frames per second
     *
     * @return {Integer}
     */
    get fps(): Integer;
    /**
     * Get the identifier for the stream profile, unique within the application
     *
     * @return {Integer}
     */
    get uniqueID(): Integer;
    /**
     * Returns non-zero if selected profile is recommended for the sensor
     * This is an optional hint we offer to suggest profiles with best performance-quality tradeof
     *
     * @return {Boolean}
     */
    get isDefault(): boolean;
    /**
     * Extrinsics:
     * @typedef {Object} ExtrinsicsObject
     * @property {Float32[]} rotation - Array(9), Column-major 3x3 rotation matrix
     * @property {Float32[]} translation - Array(3), Three-element translation vector, in meters
     * @see [StreamProfile.getExtrinsicsTo()]{@link StreamProfile#getExtrinsicsTo}
     */
    /**
     * Get extrinsics from a this stream to the target stream
     *
     * @param {StreamProfile} toProfile the target stream profile
     * @return {ExtrinsicsObject}
     */
    getExtrinsicsTo(toProfile: StreamProfile, ...args: any[]): {
        /**
         * - Array(9), Column-major 3x3 rotation matrix
         */
        rotation: Float32[];
        /**
         * - Array(3), Three-element translation vector, in meters
         */
        translation: Float32[];
    };
    destroy(): void;
}
export class VideoStreamProfile extends StreamProfile {
    widthValue: any;
    heightValue: any;
    /**
     * Width in pixels of the video stream
     *
     * @return {Integer}
     */
    get width(): Integer;
    /**
     * height in pixels of the video stream
     *
     * @return {Integer}
     */
    get height(): Integer;
    /**
     * Stream intrinsics:
     * @typedef {Object} IntrinsicsObject
     * @property {Integer} width - Width of the image in pixels
     * @property {Integer} height - Height of the image in pixels
     * @property {Float32} ppx - Horizontal coordinate of the principal point of the image, as a
     * pixel offset from the left edge
     * @property {Float32} ppy - Vertical coordinate of the principal point of the image, as a pixel
     * offset from the top edge
     * @property {Float32} fx - Focal length of the image plane, as a multiple of pixel width
     * @property {Float32} fy - Focal length of the image plane, as a multiple of pixel height
     * @property {Integer} model - Distortion model of the image, see
     * @property {Float32[]} coeffs - Array(5), Distortion coefficients
     * @see [StreamProfile.getIntrinsics()]{@link StreamProfile#getIntrinsics}
     */
    /**
     * When called on a VideoStreamProfile, returns the intrinsics of specific stream configuration
     * @return {IntrinsicsObject|undefined}
     */
    getIntrinsics(): {
        /**
         * - Width of the image in pixels
         */
        width: Integer;
        /**
         * - Height of the image in pixels
         */
        height: Integer;
        /**
         * - Horizontal coordinate of the principal point of the image, as a
         * pixel offset from the left edge
         */
        ppx: Float32;
        /**
         * - Vertical coordinate of the principal point of the image, as a pixel
         * offset from the top edge
         */
        ppy: Float32;
        /**
         * - Focal length of the image plane, as a multiple of pixel width
         */
        fx: Float32;
        /**
         * - Focal length of the image plane, as a multiple of pixel height
         */
        fy: Float32;
        /**
         * - Distortion model of the image, see
         */
        model: Integer;
        /**
         * - Array(5), Distortion coefficients
         */
        coeffs: Float32[];
    };
}
/**
 * Motion intrinsics: scale, bias, and variances.
 * @typedef {Object} MotionIntrinsics
 * @property {Float32[]} data - Array(12), Interpret data array values. Indices are:
 *   <br>[0 - Scale X, 1 - cross axis, 2 - cross axis, 3 - Bias X,
 *   <br> 4 - cross axis, 5 - Scale Y, 6 - cross axis, 7 - Bias Y,
 *   <br> 8 - cross axis, 9 - cross axis, 10 - Scale Z, 11 - Bias Z]
 * @property {Float32[]} noiseVariances - Array(3), Variance of noise for X, Y, and Z axis
 * @property {Float32[]} biasVariances - Array(3), Variance of bias for X, Y, and Z axis
 * @see [MotionStreamProfile.getMotionIntrinsics()]{@link MotionStreamProfile#getMotionIntrinsics}
 */
/**
 * This represent the stream profile of motion stream
 */
export class MotionStreamProfile extends StreamProfile {
    /**
     * Returns scale and bias of a motion stream.
     * @return {MotionIntrinsics} {@link MotionIntrinsics}
     */
    getMotionIntrinsics(): MotionIntrinsics;
}
/**
 * This class resprents a picture frame
 *
 * @property {Boolean} isValid - True if the frame is valid, otherwise false.
 * @property {Uint16Array|Uint8Array} data - A typed array representing the data.
 *  <br>The type of the typed array depends on the <code>format</code> specified in camera
 * configuration.
 * @property {Integer} width - The width of the frame.
 * @property {Integer} height - The height of the frame.
 * @property {Integer|Int64} frameNumber - An integer or an object representing the frame number.
 *  <br>If the frame number is less than 2^53, then the return value is an integer number;
 *  <br>Otherwise it will be an <code>Int64</code> object defined in npm module "node-int64"
 * @property {Number} timestamp - The timestamp of the frame.
 * @property {Integer} streamType - The stream type of the frame.
 * see <code>enum {@link stream}</code>
 * @property {Integer} bitsPerPixel - The number of bits per pixel
 * @property {Integer} timestampDomain - Get the domain (clock name) of timestamp value.
 */
export class Frame {
    static _internalCreateFrame(cxxFrame: any): Frame;
    constructor(cxxFrame: any);
    cxxFrame: any;
    updateProfile(): void;
    streamProfile: StreamProfile;
    release(): void;
    arrayBuffer: any;
    typedArray: Uint8Array | Uint16Array | Float32Array;
    /**
     * Destroy the frame and its resource
     */
    destroy(): void;
    StreamProfile: any;
    /**
     * Retrieve pixel format of the frame
     * @return {Integer} see enum {@link format} for available values
     */
    get format(): Integer;
    /**
     * Retrieve the origin stream type that produced the frame
     * @return {Integer} see {@link stream} for avaiable values
     */
    get streamType(): Integer;
    get profile(): StreamProfile;
    get width(): any;
    get height(): any;
    /**
     * Check if the frame is valid
     * @return {Boolean}
     */
    get isValid(): boolean;
    /**
     * Retrieve timestamp from the frame in milliseconds
     * @return {Integer}
     */
    get timestamp(): Integer;
    /**
     * Retrieve timestamp domain. timestamps can only be comparable if they are in common domain
     * (for example, depth timestamp might come from system time while color timestamp might come
     * from the device)
     * this method is used to check if two timestamp values are comparable (generated from the same
     * clock)
     * @return {Integer} see {@link timestamp_domain} for avaiable values
     */
    get timestampDomain(): Integer;
    /**
     * Retrieve the current value of a single frame metadata
     * @param {String|Number} metadata the type of metadata, see {@link frame_metadata} for avaiable
     * values
     * @return {Uint8Array} The metadata value, 8 bytes, byte order is bigendian.
     */
    frameMetadata(metadata: string | number, ...args: any[]): Uint8Array;
    /**
     * Determine if the device allows a specific metadata to be queried
     * @param {String|Number} metadata The type of metadata
     * @return {Boolean} true if supported, and false if not
     */
    supportsFrameMetadata(metadata: string | number, ...args: any[]): boolean;
    /**
     * Retrieve frame number
     * @return {Integer}
     */
    get frameNumber(): Integer;
    /**
     * Retrieve the frame data
     * @return {Float32Array|Uint16Array|Uint8Array|undefined}
     * if the frame is from the depth stream, the return value is Uint16Array;
     * if the frame is from the XYZ32F or MOTION_XYZ32F stream, the return value is Float32Array;
     * for other cases, return value is Uint8Array.
     */
    get data(): Uint8Array | Uint16Array | Float32Array;
    /**
     * Get the frame buffer data
     *  There are 2 acceptable forms of syntax:
     * <pre><code>
     *  Syntax 1. getData()
     *  Syntax 2. getData(ArrayBuffer)
     * </code></pre>
     *
     * @param {ArrayBuffer} [buffer] The buffer that will be written to.
     * @return {Float32Array|Uint16Array|Uint8Array|undefined}
     *  Returns a <code>TypedArray</code> or <code>undefined</code> for syntax 1,
     *   see {@link Frame#data};
     *  if syntax 2 is used, return value is not used (<code>undefined</code>).
     *
     * @see [VideoFrame.dataByteLength]{@link VideoFrame#dataByteLength} to determine the buffer size
     * in bytes.
     */
    getData(buffer?: ArrayBuffer, ...args: any[]): Float32Array | Uint16Array | Uint8Array | undefined;
    /**
     * communicate to the library you intend to keep the frame alive for a while
     * this will remove the frame from the regular count of the frame pool
     * once this function is called, the SDK can no longer guarantee 0-allocations during frame
     * cycling
     * @return {undefined}
     */
    keep(): undefined;
}
/**
 * Class containing a set of frames
 *
 * @property {Integer} size - count of frames.
 * @property {DepthFrame|undefined} depthFrame - The depth frame in the frameset.
 * @property {VideoFrame|undefined} colorFrame - The color frame in the frameset.
 */
export class FrameSet {
    constructor(cxxFrameSet: any);
    cxxFrameSet: any;
    cache: any[];
    cacheMetadata: any[];
    /**
     * Count of frames
     *
     * @return {Integer}
     */
    get size(): Integer;
    /**
     * Get the depth frame
     *
     * @return {DepthFrame|undefined}
     */
    get depthFrame(): DepthFrame;
    /**
     * Get the color frame
     *
     * @return {VideoFrame|undefined}
     */
    get colorFrame(): VideoFrame;
    /**
     * Get the infrared frame
     * @param {Integer} streamIndex index of the expected infrared stream
     * @return {VideoFrame|undefined}
     */
    getInfraredFrame(streamIndex?: Integer, ...args: any[]): VideoFrame | undefined;
    /**
     * Get the frame at specified index
     *
     * @param {Integer} index the index of the expected frame (Note: this is not
     * stream index)
     * @return {DepthFrame|VideoFrame|Frame|undefined}
     */
    at(index: Integer, ...args: any[]): DepthFrame | VideoFrame | Frame | undefined;
    /**
     * Run the provided callback function with each Frame inside the FrameSet
     * @param {FrameCallback} callback the callback function to process each frame
     * @return {undefined}
     */
    forEach(callback: (frame: Frame) => any, ...args: any[]): undefined;
    __internalGetFrame(stream: any, streamIndex: any): Frame;
    __internalFindFrameInCache(stream: any, streamIndex: any): any;
    __internalGetFrameCache(stream: any, streamIndex: any, callback: any): any;
    /**
     * Get the frame with specified stream
     *
     * @param {Integer|String} stream stream type of the frame
     * @param {Integer} streamIndex index of the stream, 0 means the first
     * matching stream
     * @return {DepthFrame|VideoFrame|Frame|undefined}
     */
    getFrame(stream: Integer | string, streamIndex?: Integer, ...args: any[]): DepthFrame | VideoFrame | Frame | undefined;
    __update(): void;
    sizeValue: any;
    releaseCache(): void;
    release(): void;
    /**
     * Release resources associated with this object
     *
     * @return {undefined}
     */
    destroy(): undefined;
}
/**
 * This class resprents a video frame and is a subclass of Frame
 *
 * @property {Integer} width - The image width in pixels.
 * @property {Integer} height - The image height in pixels.
 * @property {Integer} dataByteLength - The length in bytes
 * @property {Integer} strideInBytes - The stride of the frame. The unit is number of bytes.
 * @property {Integer} bitsPerPixel - The number of bits per pixel
 * @property {Integer} bytesPerPixel - The number of bytes per pixel
 */
export class VideoFrame extends Frame {
    /**
     * Get the data length in bytes
     * @return {Integer}
     */
    get dataByteLength(): Integer;
    /**
     * Retrieve frame stride, the actual line width in bytes (not the logical image width)
     * @return {Integer}
     */
    get strideInBytes(): Integer;
    /**
     * Retrieve count of bits per pixel
     * @return {Integer}
     */
    get bitsPerPixel(): Integer;
    /**
     * Retrieve bytes per pixel
     * @return {Integer}
     */
    get bytesPerPixel(): Integer;
}
/**
 * This class represents depth stream
 */
export class DepthFrame extends VideoFrame {
    /**
     * Get the distance of a point from the camera
     * @param {Integer} x x coordinate of the point
     * @param {Integer} y y coordinate of the point
     * @return {Float}
     */
    getDistance(x: Integer, y: Integer, ...args: any[]): Float;
}
/**
 * Disparity Frame
 */
export class DisparityFrame extends DepthFrame {
    /**
     * Retrieve the stereoscopic baseline value. Applicable to stereo-based depth modules
     * @return {Float} Stereoscopic baseline in millimeters
     */
    get baseLine(): Float;
}
/**
 * 3D vector in Euclidean coordinate space
 * @typedef {Object} Vector
 * @property {Float32} x - value of x coordinate
 * @property {Float32} y - value of y coordinate
 * @property {Float32} z - value of z coordinate
 * @see [MotionFrame.getMotionData()]{@link MotionFrame#getMotionData}
 */
/**
 * Quaternion used to represent rotation
 * @typedef {Object} Quaternion
 * @property {Float32} x
 * @property {Float32} y
 * @property {Float32} z
 * @property {Float32} w
 * @see [PoseFrame.getPoseData()]{@link PoseFrame#getPoseData}
 */
/**
 * This class resprents a motion frame and is a subclass of Frame
 */
export class MotionFrame extends Frame {
    _motion: {
        x: number;
        y: number;
        z: number;
    };
    /**
     * Get the motion data
     * @return {Vector} the motion data on x, y and z coordinates
     */
    get motionData(): Vector;
}
/**
 * PoseData
 * @typedef {Object} PoseData
 * @property {Vector} translation - X, Y, Z values of translation, in meters (relative to
 * initial position)
 * @property {Vector} velocity - X, Y, Z values of velocity, in meter/sec
 * @property {Vector} acceleration - X, Y, Z values of acceleration, in meter/sec^2
 * @property {Quaternion} rotation - Qi, Qj, Qk, Qr components of rotation as represented
 * in quaternion rotation (relative to initial position)
 * @property {Vector} angularVelocity - X, Y, Z values of angular velocity, in radians/sec
 * @property {Vector} angularAcceleration - X, Y, Z values of angular acceleration, in radians/sec^2
 * @property {Integer} trackerConfidence - pose data confidence 0 - Failed, 1 - Low, 2 - Medium,
 * 3 - High
 * @property {Integer} mapperConfidence - pose data confidence 0 - Failed, 1 - Low, 2 - Medium,
 * 3 - High
 * @see [PoseFrame.getPoseData()]{@link PoseFrame#getPoseData}
 */
/**
 * This class resprents a pose frame and is a subclass of Frame
 */
export class PoseFrame extends Frame {
    _pose: {
        translation: {
            x: number;
            y: number;
            z: number;
        };
        velocity: {
            x: number;
            y: number;
            z: number;
        };
        acceleration: {
            x: number;
            y: number;
            z: number;
        };
        rotation: {
            x: number;
            y: number;
            z: number;
            w: number;
        };
        angularVelocity: {
            x: number;
            y: number;
            z: number;
        };
        angularAcceleration: {
            x: number;
            y: number;
            z: number;
        };
        trackerConfidence: number;
        mapperConfidence: number;
    };
    /**
     * Get the pose data
     * @return {PoseData|undefined}
     */
    get poseData(): PoseData;
}
/**
 * This class can be used to perform alignment between a depth frame and another frame.
 */
export class Align {
    /**
     * @param {Integer|String} stream the stream type to be aligned to. see {@link stream} for
     * avaiable values. To perform alignment of a depth frame to the other frame, set the stream
     * argument to the other stream type. To perform alignment of a non depth frame to a depth frame,
     * set the stream argument to stream type of depth.
     */
    constructor(stream: Integer | string, ...args: any[]);
    cxxAlign: any;
    frameSet: FrameSet;
    /**
     * Run the alignment process on the given frameset to get an aligned set of frames
     * @param {FrameSet} frameSet the frames which at least has a depth frame
     * @return {FrameSet}
     */
    process(frameSet: FrameSet, ...args: any[]): FrameSet;
    release(): void;
    /**
     * Destroy resources associated with the object
     */
    destroy(): void;
}
/**
 * PointCloud accepts depth frames and outputs Points frames
 * In addition, given non-depth frame, the block will align texture coordinate to the non-depth
 * stream
 */
export class PointCloud extends Options {
    constructor();
    cxxPointCloud: any;
    pointsFrame: Points;
    /**
     * Calculate to get a frame of type {@link Points}, from the data of specified DepthFrame
     * @param {DepthFrame} depthFrame the depth frame
     * @return {Points|undefined}
     */
    calculate(depthFrame: DepthFrame, ...args: any[]): Points | undefined;
    /**
     * Align texture coordinate to the mappedFrame
     * @param {Frame} mappedFrame the frame being mapped to
     * @return {undefined}
     */
    mapTo(mappedFrame: Frame, ...args: any[]): undefined;
    release(): void;
    /**
     * Destroy all resources associated with the object
     */
    destroy(): void;
}
/**
 * Class used to get 3D vertices and texture coordinates
 */
export class Points extends Frame {
    /**
     * Get an array of 3D vertices.
     * The coordinate system is: X right, Y up, Z away from the camera. Units: Meters
     *
     * @return {Float32Array|undefined}
     */
    get vertices(): Float32Array;
    verticesData: ArrayBuffer;
    verticesArray: Float32Array;
    verticesCoordArray: Int32Array;
    textureCoordData: ArrayBuffer;
    /**
     * Creates a ply file of the model with the given file name.
     * @param {String} fileName name of the ply file
     * @param {VideoFrame} texture texture frame
     * @return {undefined}
     */
    exportToPly(fileName: string, texture: VideoFrame, ...args: any[]): undefined;
    /**
     * Get an array of texture coordinates per vertex
     * Each coordinate represent a (u,v) pair within [0,1] range, to be mapped to texture image
     *
     * @return {Int32Array|undefined}
     */
    get textureCoordinates(): Int32Array;
    /**
     * Get number of vertices
     *
     * @return {Integer}
     */
    get size(): Integer;
}
/**
 * Syncer class, which is used to group synchronized frames into coherent frame-sets.
 */
export class Syncer {
    cxxSyncer: any;
    frameSet: FrameSet;
    waitForFrames(timeout?: number, ...args: any[]): FrameSet;
    /**
     * Check if a coherent set of frames is available, if yes return them
     * @return {Frame[]|undefined} an array of frames if available and undefined if not.
     */
    pollForFrames(): Frame[] | undefined;
    /**
     * Release resources associated with the object
     */
    destroy(): void;
}
/**
 * This class provides the ability to record a live session of streaming to a file
 *
 * There are 2 ways for users to create a RecorderDevice:
 * <pre><code>
 *  Syntax 1. RecorderDevice.from(device);
 *  Syntax 2. new RecorderDevice(file, device);
 * </code></pre>
 *
 * Syntax 1 can only be applied to device that can be converted to RecorderDevice, see
 * below example:
 * <pre><code>
 *  const file = 'record.bag';
 *  let cfg = new rs2.Config();
 *  cfg.enableRecordToFile(file);
 *  let pipe = new rs2.Pipeline();
 *  pipe.start(cfg);
 *  let device = pipe.getActiveProfile().getDevice();
 *  let recorder = rs2.RecorderDevice.from(device);
 *
 *  // record 10 frames.
 *  for (let i = 0; i < 10; i++) {
 *    let frames = pipe.waitForFrames();
 *  }
 *
 *  pipe.stop();
 *  // cleanup and make sure the recorded frames are flushed to file
 *  rs2.cleanup();
 * </code></pre>
 *
 * Syntax 2 is to create a RecorderDevice from a live device, see below example:
 * <pre><code>
 *  let ctx = new rs2.Context();
 *  let dev = ctx.queryDevices().devices[0];
 *  // record to file record.bag
 *  let recorder = new rs2.RecorderDevice('record.bag', dev);
 *  let sensors = recorder.querySensors();
 *  let sensor = sensors[0];
 *  let profiles = sensor.getStreamProfiles();
 *
 *  for (let i =0; i < profiles.length; i++) {
 *    if (profiles[i].streamType === rs2.stream.STREAM_DEPTH &&
 *        profiles[i].fps === 30 &&
 *        profiles[i].width === 640 &&
 *        profiles[i].height === 480 &&
 *        profiles[i].format === rs2.format.FORMAT_Z16) {
 *      sensor.open(profiles[i]);
 *    }
 *  }
 *
 *  // record 10 frames
 *  let cnt = 0;
 *  sensor.start((frame) => {
 *    cnt++;
 *    if (cnt === 10) {
 *      // stop recording
 *      recorder.reset();
 *      rs2.cleanup();
 *      console.log('Recorded ', cnt, ' frames');
 *    }
 *  })
 * </code></pre>
 * @extends Device
 */
export class RecorderDevice extends Device {
    /**
     * Create a RecorderDevice from another device
     *
     * @param {Device} device another existing device
     * @return {RecorderDevice|undefined} If the the input device can be
     * converted to a RecorderDevice, return the newly created RecorderDevice,
     * otherwise, undefined is returned.
     */
    static from(device: Device): RecorderDevice | undefined;
    /**
     * @param {String} file the file name to store the recorded data
     * @param {Device} device the actual device to be recorded
     */
    constructor(file: string, device: Device, cxxDev?: any, autoDelete?: boolean, ...args: any[]);
    /**
     * Pause the recording device without stopping the actual device from streaming.
     */
    pause(): void;
    /**
     * Resume the recording
     */
    resume(): void;
    /**
     * Gets the name of the file to which the recorder is writing
     * @return {String}
     */
    get fileName(): string;
}
/**
 * This class is used to playback the file recorded by RecorderDevice
 * There are 2 ways for users to create a PlaybackDevice:
 * <pre><code>
 *  Syntax 1: PlaybackDevice.from(device)
 *  Syntax 2: Context.loadDevice(filePath)
 * </code></pre>
 *
 * Syntax 1 is to convert an existing device to a PlaybackDevice which can only be
 * applied to device that can be converted. Here is an example:
 * <pre><code>
 *  const file = 'record.bag';
 *  let cfg = new rs2.Config();
 *  cfg.enableDeviceFromFile(file);
 *  let pipe = new rs2.Pipeline();
 *  pipe.start(cfg);
 *  let device = pipe.getActiveProfile().getDevice();
 *  let playback = rs2.PlaybackDevice.from(device);
 *
 *  for (let i = 0; i < 10; i++) {
 *    let frames = pipe.waitForFrames();
 *  }
 *
 *  pipe.stop();
 *  rs2.cleanup();
 * </code></pre>
 *
 * Syntax 2 is to create a PlaybackDevice through Context. Here is an example:
 * <pre><code>
 *  let ctx = new rs2.Context();
 *  // load the recorded file
 *  let dev = ctx.loadDevice('record.bag');
 *  let sensors = dev.querySensors();
 *  let sensor = sensors[0];
 *  let profiles = sensor.getStreamProfiles();
 *  let cnt = 0;
 *
 *  // when received 'stopped' status, stop playback
 *  dev.setStatusChangedCallback((status) => {
 *    console.log('playback status: ', status);
 *    if (status.description === 'stopped') {
 *      dev.stop();
 *      ctx.unloadDevice('record.bag');
 *      rs2.cleanup();
 *      console.log('Playback ', cnt, ' frames');
 *    }
 *  });
 *
 *  // start playback
 *  sensor.open(profiles);
 *  sensor.start((frame) => {
 *    cnt ++;
 *  });
 * </code></pre>
 * @extends Device
 * @see [Context.loadDevice]{@link Context#loadDevice}
 */
export class PlaybackDevice extends Device {
    /**
     * Create a PlaybackDevice from another device
     *
     * @param {Device} device another existing device that can be converted to a
     * PlaybackDevice
     * @return {PlaybackDevice|undefined} If the the input device can be
     * converted to a PlaybackDevice, return the newly created PlaybackDevice,
     * otherwise, undefined is returned.
     */
    static from(device: Device): PlaybackDevice | undefined;
    constructor(cxxdevice: any, autoDelete: any);
    /**
     * Pauses the playback
     * Calling pause() in "paused" status does nothing
     * If pause() is called while playback status is "playing" or "stopped", the playback will not
     * play until resume() is called
     * @return {undefined}
     */
    pause(): undefined;
    /**
     * Resumes the playback
     * Calling resume() while playback status is "playing" or "stopped" does nothing
     * @return {undefined}
     */
    resume(): undefined;
    /**
     * Stops playback
     * @return {undefined}
     */
    stop(): undefined;
    /**
     * Retrieves the name of the playback file
     * @return {String}
     */
    get fileName(): string;
    /**
     * Retrieves the current position of the playback in the file in terms of time. Unit is
     * millisecond
     * @return {Integer}
     */
    get position(): Integer;
    /**
     * Retrieves the total duration of the file, unit is millisecond.
     * @return {Integer}
     */
    get duration(): Integer;
    /**
     * Sets the playback to a specified time point of the played data
     * @param {time} time the target time to seek to, unit is millisecond
     * @return {undefined}
     */
    seek(time: any, ...args: any[]): undefined;
    /**
     * Set the playback to work in real time or non real time
     * @param {boolean} val whether real time mode is used
     * @return {undefined}
     */
    set isRealTime(arg: boolean);
    /**
     * Indicates if playback is in real time mode or non real time
     * In real time mode, playback will play the same way the file was recorded. If the application
     * takes too long to handle the callback, frames may be dropped.
     * In non real time mode, playback will wait for each callback to finish handling the data before
     * reading the next frame. In this mode no frames will be dropped, and the application controls
     * the frame rate of the playback (according to the callback handler duration).
     * @return {Boolean}
     */
    get isRealTime(): boolean;
    /**
     * Set the playing speed
     * @param {Float} speed indicates a multiplication of the speed to play (e.g: 1 = normal,
     * 0.5 half normal speed)
     */
    setPlaybackSpeed(speed: Float, ...args: any[]): void;
    /**
     * @typedef {Object} PlaybackStatusObject
     * @property {Integer} status - The status of the notification, see {@link playback_status}
     * for details
     * @property {String} description - The human readable literal description of the status
     */
    /**
     * This callback is called when the status of the playback device changed
     * @callback StatusChangedCallback
     * @param {PlaybackStatusObject} status
     *
     * @see [PlaybackDevice.setStatusChangedCallback]{@link PlaybackDevice#setStatusChangedCallback}
     */
    /**
     * Returns the current state of the playback device
     * @return {PlaybackStatusObject}
     */
    get currentStatus(): {
        /**
         * - The status of the notification, see {@link playback_status }
         * for details
         */
        status: Integer;
        /**
         * - The human readable literal description of the status
         */
        description: string;
    };
    /**
     * Register a callback to receive the playback device's status changes
     * @param {StatusChangedCallback} callback the callback method
     * @return {undefined}
     */
    setStatusChangedCallback(callback: (status: {
        /**
         * - The status of the notification, see {@link playback_status }
         * for details
         */
        status: Integer;
        /**
         * - The human readable literal description of the status
         */
        description: string;
    }) => any, ...args: any[]): undefined;
}
/**
 * Depth post-processing filter block. This block can apply decimation filter on depth frame.
 */
export class DecimationFilter extends Filter {
    constructor();
    _internalGetInputType(): typeof VideoFrame;
}
/**
 * Depth post-processing filter block. This block can apply temporal filter on depth frame.
 */
export class TemporalFilter extends Filter {
    constructor();
}
/**
 * Depth post-processing filter block. This block can apply spatial filter on depth frame.
 */
export class SpatialFilter extends Filter {
    constructor();
}
/**
 * Depth post-processing filter block. This block replaces empty pixels with data from adjacent
 * pixels based on the method selected.
 */
export class HoleFillingFilter extends Filter {
    constructor();
}
/**
 * Post processing block that could transform disparity frame to depth frame
 */
export class DisparityToDepthTransform extends Filter {
    constructor();
    _internalGetInputType(): typeof DisparityFrame;
}
/**
 * Post processing block that could transform depth frame to disparity frame
 */
export class DepthToDisparityTransform extends Filter {
    constructor();
}
/**
 * Enum for stream values.
 */
export type stream = string;
export namespace stream {
    const stream_any: string;
    const stream_depth: string;
    const stream_color: string;
    const stream_infrared: string;
    const stream_fisheye: string;
    const stream_gyro: string;
    const stream_accel: string;
    const stream_gpio: string;
    const stream_pose: string;
    const stream_confidence: string;
    const STREAM_ANY: Integer;
    const STREAM_DEPTH: Integer;
    const STREAM_COLOR: Integer;
    const STREAM_INFRARED: Integer;
    const STREAM_FISHEYE: Integer;
    const STREAM_GYRO: Integer;
    const STREAM_ACCEL: Integer;
    const STREAM_GPIO: Integer;
    const STREAM_POSE: Integer;
    const STREAM_CONFIDENCE: Integer;
    const STREAM_COUNT: Integer;
    function streamToString(stream: Integer, ...args: any[]): string;
}
/**
 * Enum for format values.
 */
export type format = string;
export namespace format {
    const format_any: string;
    const format_z16: string;
    const format_disparity16: string;
    const format_xyz32f: string;
    const format_yuyv: string;
    const format_rgb8: string;
    const format_bgr8: string;
    const format_rgba8: string;
    const format_bgra8: string;
    const format_y8: string;
    const format_y16: string;
    const format_raw10: string;
    const format_raw16: string;
    const format_raw8: string;
    const format_uyvy: string;
    const format_motion_raw: string;
    const format_motion_xyz32f: string;
    const format_gpio_raw: string;
    const format_6dof: string;
    const format_disparity32: string;
    const format_mjpeg: string;
    const format_y8i: string;
    const format_y12i: string;
    const format_inzi: string;
    const format_invi: string;
    const format_w10: string;
    const format_FG: string;
    const format_Y411: string;
    const FORMAT_ANY: Integer;
    const FORMAT_Z16: Integer;
    const FORMAT_DISPARITY16: Integer;
    const FORMAT_XYZ32F: Integer;
    const FORMAT_YUYV: Integer;
    const FORMAT_RGB8: Integer;
    const FORMAT_BGR8: Integer;
    const FORMAT_RGBA8: Integer;
    const FORMAT_BGRA8: Integer;
    const FORMAT_Y8: Integer;
    const FORMAT_Y16: Integer;
    const FORMAT_RAW10: Integer;
    const FORMAT_RAW16: Integer;
    const FORMAT_RAW8: Integer;
    const FORMAT_UYVY: Integer;
    const FORMAT_MOTION_RAW: Integer;
    const FORMAT_MOTION_XYZ32F: Integer;
    const FORMAT_GPIO_RAW: Integer;
    const FORMAT_6DOF: Integer;
    const FORMAT_DISPARITY32: Integer;
    const FORMAT_MJPEG: Integer;
    const FORMAT_Y8I: Integer;
    const FORMAT_Y12I: Integer;
    const FORMAT_INZI: Integer;
    const FORMAT_INVI: Integer;
    const FORMAT_W10: Integer;
    const FORMAT_FG: Integer;
    const FORMAT_Y411: Integer;
    const FORMAT_COUNT: Integer;
    function formatToString(format: Integer, ...args: any[]): string;
}
/**
 * *
 */
export type option = string;
export namespace option {
    const option_backlight_compensation: string;
    const option_brightness: string;
    const option_contrast: string;
    const option_exposure: string;
    const option_gain: string;
    const option_gamma: string;
    const option_hue: string;
    const option_saturation: string;
    const option_sharpness: string;
    const option_white_balance: string;
    const option_enable_auto_exposure: string;
    const option_enable_auto_white_balance: string;
    const option_visual_preset: string;
    const option_laser_power: string;
    const option_accuracy: string;
    const option_motion_range: string;
    const option_filter_option: string;
    const option_confidence_threshold: string;
    const option_emitter_enabled: string;
    const option_frames_queue_size: string;
    const option_total_frame_drops: string;
    const option_auto_exposure_mode: string;
    const option_power_line_frequency: string;
    const option_asic_temperature: string;
    const option_error_polling_enabled: string;
    const option_projector_temperature: string;
    const option_output_trigger_enabled: string;
    const option_motion_module_temperature: string;
    const option_depth_units: string;
    const option_enable_motion_correction: string;
    const option_auto_exposure_priority: string;
    const option_color_scheme: string;
    const option_histogram_equalization_enabled: string;
    const option_min_distance: string;
    const option_max_distance: string;
    const option_texture_source: string;
    const option_filter_magnitude: string;
    const option_filter_smooth_alpha: string;
    const option_filter_smooth_delta: string;
    const option_holes_fill: string;
    const option_stereo_baseline: string;
    const option_auto_exposure_converge_step: string;
    const option_inter_cam_sync_mode: string;
    const option_stream_filter: string;
    const option_stream_format_filter: string;
    const option_stream_index_filter: string;
    const option_emitter_on_off: string;
    const option_zero_order_point_x: string;
    const option_zero_order_point_y: string;
    const option_lld_temperature: string;
    const option_mc_temperature: string;
    const option_ma_temperature: string;
    const option_apd_temperature: string;
    const option_hardware_preset: string;
    const option_global_time_enabled: string;
    const option_enable_mapping: string;
    const option_enable_relocalization: string;
    const option_enable_pose_jumping: string;
    const option_enable_dynamic_calibration: string;
    const option_depth_offset: string;
    const option_led_power: string;
    const option_zero_order_enabled: string;
    const option_enable_map_preservation: string;
    const OPTION_BACKLIGHT_COMPENSATION: Integer;
    const OPTION_BRIGHTNESS: Integer;
    const OPTION_CONTRAST: Integer;
    const OPTION_EXPOSURE: Integer;
    const OPTION_GAIN: Integer;
    const OPTION_GAMMA: Integer;
    const OPTION_HUE: Integer;
    const OPTION_SATURATION: Integer;
    const OPTION_SHARPNESS: Integer;
    const OPTION_WHITE_BALANCE: Integer;
    const OPTION_ENABLE_AUTO_EXPOSURE: Integer;
    const OPTION_ENABLE_AUTO_WHITE_BALANCE: Integer;
    const OPTION_VISUAL_PRESET: Integer;
    const OPTION_LASER_POWER: Integer;
    const OPTION_ACCURACY: Integer;
    const OPTION_MOTION_RANGE: Integer;
    const OPTION_FILTER_OPTION: Integer;
    const OPTION_CONFIDENCE_THRESHOLD: Integer;
    const OPTION_EMITTER_ENABLED: Integer;
    const OPTION_FRAMES_QUEUE_SIZE: Integer;
    const OPTION_TOTAL_FRAME_DROPS: Integer;
    const OPTION_AUTO_EXPOSURE_MODE: Integer;
    const OPTION_POWER_LINE_FREQUENCY: Integer;
    const OPTION_ASIC_TEMPERATURE: Integer;
    const OPTION_ERROR_POLLING_ENABLED: Integer;
    const OPTION_PROJECTOR_TEMPERATURE: Integer;
    const OPTION_OUTPUT_TRIGGER_ENABLED: Integer;
    const OPTION_MOTION_MODULE_TEMPERATURE: Integer;
    const OPTION_DEPTH_UNITS: Integer;
    const OPTION_ENABLE_MOTION_CORRECTION: Integer;
    const OPTION_AUTO_EXPOSURE_PRIORITY: Integer;
    const OPTION_COLOR_SCHEME: Integer;
    const OPTION_HISTOGRAM_EQUALIZATION_ENABLED: Integer;
    const OPTION_MIN_DISTANCE: Integer;
    const OPTION_MAX_DISTANCE: Integer;
    const OPTION_TEXTURE_SOURCE: Integer;
    const OPTION_FILTER_MAGNITUDE: Integer;
    const OPTION_FILTER_SMOOTH_ALPHA: Integer;
    const OPTION_FILTER_SMOOTH_DELTA: Integer;
    const OPTION_HOLES_FILL: Integer;
    const OPTION_STEREO_BASELINE: Integer;
    const OPTION_AUTO_EXPOSURE_CONVERGE_STEP: Integer;
    const OPTION_INTER_CAM_SYNC_MODE: Integer;
    const OPTION_STREAM_FILTER: any;
    const OPTION_STREAM_FORMAT_FILTER: any;
    const OPTION_STREAM_INDEX_FILTER: any;
    const OPTION_EMITTER_ON_OFF: any;
    const OPTION_ZERO_ORDER_POINT_X: any;
    const OPTION_ZERO_ORDER_POINT_Y: any;
    const OPTION_LLD_TEMPERATURE: any;
    const OPTION_MC_TEMPERATURE: any;
    const OPTION_MA_TEMPERATURE: any;
    const OPTION_HARDWARE_PRESET: any;
    const OPTION_GLOBAL_TIME_ENABLED: any;
    const OPTION_APD_TEMPERATURE: any;
    const OPTION_ENABLE_MAPPING: any;
    const OPTION_ENABLE_RELOCALIZATION: any;
    const OPTION_ENABLE_POSE_JUMPING: any;
    const OPTION_ENABLE_DYNAMIC_CALIBRATION: any;
    const OPTION_DEPTH_OFFSET: any;
    const OPTION_LED_POWER: any;
    const OPTION_ZERO_ORDER_ENABLED: any;
    const OPTION_ENABLE_MAP_PRESERVATION: any;
    const OPTION_FREEFALL_DETECTION_ENABLED: any;
    const OPTION_DIGITAL_GAIN: any;
    const OPTION_EMITTER_ALWAYS_ON: Integer;
    const OPTION_THERMAL_COMPENSATION: any;
    const OPTION_TRIGGER_CAMERA_ACCURACY_HEALTH: any;
    const OPTION_RESET_CAMERA_ACCURACY_HEALTH: any;
    const OPTION_HOST_PERFORMANCE: any;
    const OPTION_HDR_ENABLED: any;
    const OPTION_SEQUENCE_NAME: any;
    const OPTION_SEQUENCE_SIZE: any;
    const OPTION_SEQUENCE_ID: any;
    const OPTION_HUMIDITY_TEMPERATURE: any;
    const OPTION_ENABLE_MAX_USABLE_RANGE: any;
    const OPTION_ALTERNATE_IR: any;
    const OPTION_NOISE_ESTIMATION: any;
    const OPTION_ENABLE_IR_REFLECTIVITY: any;
    const OPTION_AUTO_EXPOSURE_LIMIT: Integer;
    const OPTION_AUTO_GAIN_LIMIT: Integer;
    const OPTION_AUTO_RX_SENSITIVITY: Integer;
    const OPTION_COUNT: Integer;
    function optionToString(option: Integer, ...args: any[]): string;
}
/**
 * *
 */
export type camera_info = string;
export namespace camera_info {
    const camera_info_name: string;
    const camera_info_serial_number: string;
    const camera_info_firmware_version: string;
    const camera_info_recommended_firmware_version: string;
    const camera_info_physical_port: string;
    const camera_info_debug_op_code: string;
    const camera_info_advanced_mode: string;
    const camera_info_product_id: string;
    const camera_info_camera_locked: string;
    const camera_info_usb_type_descriptor: string;
    const CAMERA_INFO_NAME: Integer;
    const CAMERA_INFO_SERIAL_NUMBER: Integer;
    const CAMERA_INFO_FIRMWARE_VERSION: Integer;
    const CAMERA_INFO_RECOMMENDED_FIRMWARE_VERSION: Integer;
    const CAMERA_INFO_PHYSICAL_PORT: Integer;
    const CAMERA_INFO_DEBUG_OP_CODE: Integer;
    const CAMERA_INFO_ADVANCED_MODE: Integer;
    const CAMERA_INFO_PRODUCT_ID: Integer;
    const CAMERA_INFO_CAMERA_LOCKED: Integer;
    const CAMERA_INFO_USB_TYPE_DESCRIPTOR: Integer;
    const CAMERA_INFO_COUNT: Integer;
    function cameraInfoToString(info: Integer, ...args: any[]): string;
}
/**
 * *
 */
export type recording_mode = string;
export namespace recording_mode {
    const recording_mode_blank_frames: string;
    const recording_mode_compressed: string;
    const recording_mode_best_quality: string;
    const RECORDING_MODE_BLANK_FRAMES: Integer;
    const RECORDING_MODE_COMPRESSED: Integer;
    const RECORDING_MODE_BEST_QUALITY: Integer;
    const RECORDING_MODE_COUNT: Integer;
}
/**
 * Enum for timestamp domain.
 */
export type timestamp_domain = string;
export namespace timestamp_domain {
    const timestamp_domain_hardware_clock: string;
    const timestamp_domain_system_time: string;
    const TIMESTAMP_DOMAIN_HARDWARE_CLOCK: Integer;
    const TIMESTAMP_DOMAIN_SYSTEM_TIME: Integer;
    const TIMESTAMP_DOMAIN_COUNT: Integer;
    function timestampDomainToString(domainVal: Integer, ...args: any[]): string;
}
/**
 * Enum for notification category
 */
export type notification_category = string;
export namespace notification_category {
    const notification_category_frames_timeout: string;
    const notification_category_frame_corrupted: string;
    const notification_category_hardware_error: string;
    const notification_category_hardware_event: string;
    const notification_category_unknown_error: string;
    const notification_category_firmware_update_recommended: string;
    const NOTIFICATION_CATEGORY_FRAMES_TIMEOUT: Integer;
    const NOTIFICATION_CATEGORY_FRAME_CORRUPTED: Integer;
    const NOTIFICATION_CATEGORY_HARDWARE_ERROR: Integer;
    const NOTIFICATION_CATEGORY_HARDWARE_EVENT: Integer;
    const NOTIFICATION_CATEGORY_UNKNOWN_ERROR: Integer;
    const NOTIFICATION_CATEGORY_FIRMWARE_UPDATE_RECOMMENDED: Integer;
    const NOTIFICATION_CATEGORY_COUNT: Integer;
    function notificationCategoryToString(notification: Integer, ...args: any[]): string;
}
/**
 * Enum for notification severity
 */
export type log_severity = string;
export namespace log_severity {
    const log_severity_debug: string;
    const log_severity_info: string;
    const log_severity_warn: string;
    const log_severity_error: string;
    const log_severity_fatal: string;
    const log_severity_none: string;
    const LOG_SEVERITY_DEBUG: Integer;
    const LOG_SEVERITY_INFO: Integer;
    const LOG_SEVERITY_WARN: Integer;
    const LOG_SEVERITY_ERROR: Integer;
    const LOG_SEVERITY_FATAL: Integer;
    const LOG_SEVERITY_NONE: Integer;
    const LOG_SEVERITY_COUNT: Integer;
    function logSeverityToString(severity: Integer, ...args: any[]): string;
}
/**
 * Enum for distortion types
 */
export type distortion = string;
export namespace distortion {
    const distortion_none: string;
    const distortion_modified_brown_conrady: string;
    const distortion_inverse_brown_conrady: string;
    const distortion_ftheta: string;
    const distortion_brown_conrady: string;
    const DISTORTION_NONE: Integer;
    const DISTORTION_MODIFIED_BROWN_CONRADY: Integer;
    const DISTORTION_INVERSE_BROWN_CONRADY: Integer;
    const DISTORTION_FTHETA: Integer;
    const DISTORTION_BROWN_CONRADY: Integer;
    const DISTORTION_COUNT: Integer;
    function distortionToString(distortionVal: Integer, ...args: any[]): string;
}
/**
 * *
 */
export type frame_metadata = string;
export namespace frame_metadata {
    const frame_metadata_frame_counter: string;
    const frame_metadata_frame_timestamp: string;
    const frame_metadata_sensor_timestamp: string;
    const frame_metadata_actual_exposure: string;
    const frame_metadata_gain_level: string;
    const frame_metadata_auto_exposure: string;
    const frame_metadata_white_balance: string;
    const frame_metadata_time_of_arrival: string;
    const frame_metadata_temperature: string;
    const frame_metadata_backend_timestamp: string;
    const frame_metadata_actual_fps: string;
    const frame_metadata_frame_laser_power: string;
    const frame_metadata_frame_laser_power_mode: string;
    const frame_metadata_exposure_priority: string;
    const frame_metadata_exposure_roi_left: string;
    const frame_metadata_exposure_roi_right: string;
    const frame_metadata_exposure_roi_top: string;
    const frame_metadata_exposure_roi_bottom: string;
    const frame_metadata_brightness: string;
    const frame_metadata_contrast: string;
    const frame_metadata_saturation: string;
    const frame_metadata_sharpness: string;
    const frame_metadata_auto_white_balance_temperature: string;
    const frame_metadata_backlight_compensation: string;
    const frame_metadata_hue: string;
    const frame_metadata_gamma: string;
    const frame_metadata_manual_white_balance: string;
    const frame_metadata_power_line_frequency: string;
    const frame_metadata_low_light_compensation: string;
    const FRAME_METADATA_FRAME_COUNTER: Integer;
    const FRAME_METADATA_FRAME_TIMESTAMP: Integer;
    const FRAME_METADATA_SENSOR_TIMESTAMP: Integer;
    const FRAME_METADATA_ACTUAL_EXPOSURE: Integer;
    const FRAME_METADATA_GAIN_LEVEL: Integer;
    const FRAME_METADATA_AUTO_EXPOSURE: Integer;
    const FRAME_METADATA_WHITE_BALANCE: Integer;
    const FRAME_METADATA_TIME_OF_ARRIVAL: Integer;
    const FRAME_METADATA_TEMPERATURE: Integer;
    const FRAME_METADATA_BACKEND_TIMESTAMP: Integer;
    const FRAME_METADATA_ACTUAL_FPS: Integer;
    const FRAME_METADATA_FRAME_LASER_POWER: Integer;
    const FRAME_METADATA_FRAME_LASER_POWER_MODE: Integer;
    const FRAME_METADATA_EXPOSURE_PRIORITY: Integer;
    const FRAME_METADATA_EXPOSURE_ROI_LEFT: Integer;
    const FRAME_METADATA_EXPOSURE_ROI_RIGHT: Integer;
    const FRAME_METADATA_EXPOSURE_ROI_TOP: Integer;
    const FRAME_METADATA_EXPOSURE_ROI_BOTTOM: Integer;
    const FRAME_METADATA_BRIGHTNESS: Integer;
    const FRAME_METADATA_CONTRAST: Integer;
    const FRAME_METADATA_SATURATION: Integer;
    const FRAME_METADATA_SHARPNESS: Integer;
    const FRAME_METADATA_AUTO_WHITE_BALANCE_TEMPERATURE: Integer;
    const FRAME_METADATA_BACKLIGHT_COMPENSATION: Integer;
    const FRAME_METADATA_HUE: Integer;
    const FRAME_METADATA_GAMMA: Integer;
    const FRAME_METADATA_MANUAL_WHITE_BALANCE: Integer;
    const FRAME_METADATA_POWER_LINE_FREQUENCY: Integer;
    const FRAME_METADATA_LOW_LIGHT_COMPENSATION: Integer;
    const FRAME_METADATA_COUNT: Integer;
    function frameMetadataToString(metadata: Integer, ...args: any[]): string;
}
/**
 * Enum for visual preset of SR300 devices: provides optimized settings (presets) for specific
 * types of usage.
 */
export type sr300_visual_preset = string;
export namespace sr300_visual_preset {
    const sr300_visual_preset_short_range: string;
    const sr300_visual_preset_long_range: string;
    const sr300_visual_preset_background_segmentation: string;
    const sr300_visual_preset_gesture_recognition: string;
    const sr300_visual_preset_object_scanning: string;
    const sr300_visual_preset_face_analytics: string;
    const sr300_visual_preset_face_login: string;
    const sr300_visual_preset_gr_cursor: string;
    const sr300_visual_preset_default: string;
    const sr300_visual_preset_mid_range: string;
    const sr300_visual_preset_ir_only: string;
    const SR300_VISUAL_PRESET_SHORT_RANGE: Integer;
    const SR300_VISUAL_PRESET_LONG_RANGE: Integer;
    const SR300_VISUAL_PRESET_BACKGROUND_SEGMENTATION: Integer;
    const SR300_VISUAL_PRESET_GESTURE_RECOGNITION: Integer;
    const SR300_VISUAL_PRESET_OBJECT_SCANNING: Integer;
    const SR300_VISUAL_PRESET_FACE_ANALYTICS: Integer;
    const SR300_VISUAL_PRESET_FACE_LOGIN: Integer;
    const SR300_VISUAL_PRESET_GR_CURSOR: Integer;
    const SR300_VISUAL_PRESET_DEFAULT: Integer;
    const SR300_VISUAL_PRESET_MID_RANGE: Integer;
    const SR300_VISUAL_PRESET_IR_ONLY: Integer;
    const SR300_VISUAL_PRESET_COUNT: Integer;
    function sr300VisualPresetToString(preset: Integer, ...args: any[]): string;
}
/**
 * Enum for visual preset of RS400 devices: provides optimized settings (presets) for specific
 * types of usage.
 */
export type rs400_visual_preset = string;
export namespace rs400_visual_preset {
    const rs400_visual_preset_custom: string;
    const rs400_visual_preset_default: string;
    const rs400_visual_preset_hand: string;
    const rs400_visual_preset_high_accuracy: string;
    const rs400_visual_preset_high_density: string;
    const rs400_visual_preset_medium_density: string;
    const rs400_visual_preset_remove_ir_pattern: string;
    const RS400_VISUAL_PRESET_CUSTOM: Integer;
    const RS400_VISUAL_PRESET_DEFAULT: Integer;
    const RS400_VISUAL_PRESET_HAND: Integer;
    const RS400_VISUAL_PRESET_HIGH_ACCURACY: Integer;
    const RS400_VISUAL_PRESET_HIGH_DENSITY: Integer;
    const RS400_VISUAL_PRESET_MEDIUM_DENSITY: Integer;
    const RS400_VISUAL_PRESET_REMOVE_IR_PATTERN: Integer;
    const RS400_VISUAL_PRESET_COUNT: Integer;
    function rs400VisualPresetToString(preset: Integer, ...args: any[]): string;
}
export namespace playback_status {
    const playback_status_unknown: string;
    const playback_status_playing: string;
    const playback_status_paused: string;
    const playback_status_stopped: string;
    const PLAYBACK_STATUS_UNKNOWN: any;
    const PLAYBACK_STATUS_PLAYING: any;
    const PLAYBACK_STATUS_PAUSED: any;
    const PLAYBACK_STATUS_STOPPED: any;
    const PLAYBACK_STATUS_COUNT: Integer;
    function playbackStatusToString(status: Integer, ...args: any[]): string;
}
export namespace util {
    export { preset_preference };
    export const __stack: string;
    export const __line: any;
    export const __file: any;
    /**
     * Given a point in 3D space, compute the corresponding pixel coordinates in an image with no
     * distortion or forward distortion coefficients produced by the same camera.
     * @param {Intrinsics} intrinsics - The intrinsics of the image stream
     * @param {Object} pointCoordinate - The 3D space coordinate of the point, linke {x: 0, y: 0, z:1}.
     * @return {Object} like {x: 0, y:0}.
     */
    export function projectPointToPixel(intrinsics: Intrinsics, pointCoordinate: any, ...args: any[]): any;
    /**
     * Given pixel coordinates and depth in an image with no distortion or inverse distortion
     * coefficients, compute the corresponding point in 3D space relative to the same camera
     * @param {Intrinsics} intrinsics - The intrinsics of the depth stream
     * @param {Object} pixelCoordinate - The pixel coordinate of the point, linke {x: 0, y: 0}.
     * @param {Number} depth - The depth value of the point
     * @return {Object} like {x: 0, y:0, z:0}.
     */
    export function deprojectPixelToPoint(intrinsics: Intrinsics, pixelCoordinate: any, depth: number, ...args: any[]): any;
    /**
     * Transform 3D coordinates relative to one sensor to 3D coordinates relative to another viewpoint
     * @param {ExtrinsicsObject} extrinsics - The exrinsics from the original stream to the target
     * stream
     * @param {Object} pointCoordinate - The 3D space coordinate of the original point,
     * like {x: 0, y: 0, z:1}.
     * @return {Object} The tranformed 3D coordinate, like {x:0, y:0, z:0}.
     */
    export function transformPointToPoint(extrinsics: {
        /**
         * - Array(9), Column-major 3x3 rotation matrix
         */
        rotation: Float32[];
        /**
         * - Array(3), Three-element translation vector, in meters
         */
        translation: Float32[];
    }, pointCoordinate: any, ...args: any[]): any;
    /**
     * Save the frame to a file asynchronously
     *
     * @param {string} path target file path
     * @param {Frame} frame frame to be saved
     * @param {string} fileFormat the target file format, currently only 'png' is supported
     * @return {Promise}
     */
    export function writeFrameToFileAsync(path: string, frame: Frame, fileFormat?: string, ...args: any[]): Promise<any>;
    /**
     * Field of view (FOV) info:
     * @typedef {Object} FOVObject
     * @property {Float32} h - horizontal field of view
     * @property {Float32} v - vertical field of view
     * @see [util.fov]{@link util#fov}
     */
    /**
     * Get the field of view from an IntrinsicsObject
     * @param {IntrinsicsObject} intrinsics the intrinsics to calculate field of view.
     * @return {FOVObject}
     */
    export function fov(intrinsics: {
        /**
         * - Width of the image in pixels
         */
        width: Integer;
        /**
         * - Height of the image in pixels
         */
        height: Integer;
        /**
         * - Horizontal coordinate of the principal point of the image, as a
         * pixel offset from the left edge
         */
        ppx: Float32;
        /**
         * - Vertical coordinate of the principal point of the image, as a pixel
         * offset from the top edge
         */
        ppy: Float32;
        /**
         * - Focal length of the image plane, as a multiple of pixel width
         */
        fx: Float32;
        /**
         * - Focal length of the image plane, as a multiple of pixel height
         */
        fy: Float32;
        /**
         * - Distortion model of the image, see
         */
        model: Integer;
        /**
         * - Array(5), Distortion coefficients
         */
        coeffs: Float32[];
    }, ...args: any[]): FOVObject;
    /**
     * Save the frame to a file synchronously
     *
     * @param {string} path target file path
     * @param {Frame} frame frame to be saved
     * @param {string} fileFormat the target file format, currently only 'png' is supported
     * @return {undefined}
     */
    export function writeFrameToFile(path: string, frame: Frame, fileFormat?: string, ...args: any[]): undefined;
    /**
     * Save the frame metadata string representation to a file asynchronously
     *
     * @param {string} path target file path
     * @param {Frame} frame frame to extract metadata from
     * @return {undefined}
     */
    export function writeFrameMetadataToFileAsync(path: string, frame: Frame, ...args: any[]): undefined;
    /**
     * Save the frame metadata string representation to a file asynchronously
     *
     * @param {String} path target file path
     * @param {Frame} frame to extract metadata from
     * @return {undefined}
     */
    export function writeFrameMetadataToFile(path: string, frame: Frame, ...args: any[]): undefined;
}
export namespace internal {
    export { RecordingContext };
    export { PlaybackContext };
}
declare function str2Int(str: any, category: any): any;
declare class Options {
    constructor(cxxObj: any);
    cxxObj: any;
    setCxxOptionsObject(cxxObj: any): void;
    /**
    * Check if particular option is read-only
    * @param {String|Number} option The option to be checked
    * @return {Boolean|undefined} true if option is read-only and undefined if not supported
    */
    isOptionReadOnly(option: string | number, ...args: any[]): boolean | undefined;
    /**
     * Read option value from the sensor.
     * @param {String|Number} option  The option to be queried
     * @return {Float32|undefined} The value of the option, or <code>undefined</code> if invalid
     * option
     * @see {@link option}
     */
    getOption(option: string | number, ...args: any[]): Float32 | undefined;
    /**
     * @typedef {Object} OptionRangeObject
     * @property {Float32} minValue - the minimum value which will be accepted for this option
     * @property {Float32} maxValue - the maximum value which will be accepted for this option
     * @property {Float32} defaultValue - the default value of the option
     * @property {Float32} step - the granularity of options which accept discrete values, or zero if
     * the option accepts continuous values
     * @see [Sensor.getOptionRange()]{@link Sensor#getOptionRange}
     */
    /**
     * Retrieve the available range of values of a supported option.
     * @param {String|Integer} option - the option that is being queried. See {@link option} for
     * available values
     * @return {OptionRangeObject|undefined} Returns undefined if an invalid option was specified
     * @see {@link OptionRangeObject}
     * @see {@link option}
     *
     * @example <caption>Example of 3 equivalent calls of the same option range</caption>
     * Sensor.getOptionRange('backlight-compensation');
     * Sensor.getOptionRange(realsense2.option.option_backlight_compensation);
     * Sensor.getOptionRange(realsense2.option.OPTION_BACKLIGHT_COMPENSATION);
     */
    getOptionRange(option: string | Integer, ...args: any[]): {
        /**
         * - the minimum value which will be accepted for this option
         */
        minValue: Float32;
        /**
         * - the maximum value which will be accepted for this option
         */
        maxValue: Float32;
        /**
         * - the default value of the option
         */
        defaultValue: Float32;
        /**
         * - the granularity of options which accept discrete values, or zero if
         * the option accepts continuous values
         */
        step: Float32;
    };
    /**
     * Write new value to device option.
     * @param {String|Integer} option - the option that is being queried. See {@link option} for
     * available values
     * @param {Float32} value - the new value to be set
     * @see {@link option}
     * @return {undefined}
     */
    setOption(option: string | Integer, value: Float32, ...args: any[]): undefined;
    /**
     * Check if particular option is supported by a subdevice.
     * @param {String|Integer} option - the option that is being queried. See {@link option} for
     * available values
     * @return {Boolean|undefined} Returns undefined if an invalid option was specified
     * @see {@link option}
     */
    supportsOption(option: string | Integer, ...args: any[]): boolean | undefined;
    /**
     * Get option description.
     * @param {String|Integer} option - the option that is being queried. See {@link option} for
     * available values
     * @return {String|undefined} the human readable description of the option. Returns undefined if
     * an invalid option was specified
     * @see {@link option}
     */
    getOptionDescription(option: string | Integer, ...args: any[]): string | undefined;
    /**
     * Get option value description (in case specific option value hold special meaning).
     * @param {String|Integer} option - the option that is being queried. See {@link option} for
     * available values
     * @return {String|undefined} the human readable description of the option value. Returns
     * undefined if an invalid option was specified
     * @see {@link option}
     */
    getOptionValueDescription(option: string | Integer, value: any, ...args: any[]): string | undefined;
    _internalIsOptionValueInRange(option: any, value: any): boolean;
}
/**
 * Base class of specific filter classes, see {@link DecimationFilter}.
 * Don't create Filter objects directly from this class, use child classes,
 */
declare class Filter extends Options {
    _internalGetInputType(): typeof DepthFrame;
    _internalPrepareOutputFrame(): void;
    frame: DepthFrame;
    /**
     * Apply the filter processing on the frame and return the processed frame
     * @param {Frame} frame the depth frame to be processed
     * @return {Frame}
     */
    process(frame: Frame, ...args: any[]): Frame;
    /**
     * Release resources associated with the object
     */
    destroy(): void;
}
/**
 * <code>util.preset_preference</code>: The enum for preset preference values.
 */
type preset_preference = string;
declare namespace preset_preference {
    const best_quality: string;
    const largest_image: string;
    const highest_framerate: string;
    const BEST_QUALITY: Integer;
    const LARGEST_IMAGE: Integer;
    const HIGHEST_FRAMERATE: Integer;
    const PRESET_BEGIN: number;
    const PRESET_END: number;
}
/**
 * This class is for testing purpose.
 * It is used to record all operations over librealsense into a file
 * @extends Context
 */
declare class RecordingContext extends Context {
    /**
     * @param {String} fileName The file name to store the recorded data
     * @param {String} section The section name within the recording
     * @param {String|Integer} mode Recording mode, default to 'blank-frames'
     * @see [enum recording_mode]{@link recording_mode}
     */
    constructor(fileName: string, section?: string, mode?: string | Integer, ...args: any[]);
}
/**
 * This class is for testing purpose.
 * It is used to reproduce the same responses for the same operations as
 * recording. The user must call the same methods as recorded in the file
 * to get correct response.
 * @extends Context
 */
declare class PlaybackContext extends Context {
    /**
     * @param {String} fileName The file name of the recording
     * @param {String} section The section name used in recording
     */
    constructor(fileName: string, section?: string, ...args: any[]);
}
export { str2Int as stringConstantToIntegerValue };
