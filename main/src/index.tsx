import './index.css';
import {For, render} from 'solid-js/web';
import {createStore} from 'solid-js/store';
import * as zebar from 'zebar';
import AudioIcon from "./components/icons/AudioIcon";
import CpuIcon from "./components/icons/CpuIcon";
import MemoryIcon from "./components/icons/MemoryIcon";
import {getWeatherName, WeatherIcon} from "./components/icons/WeatherIcon";
import ClockIcon from "./components/icons/ClockIcon";
import {VolumeIcon} from "./components/icons/VolumeIcon";

const providers = zebar.createProviderGroup({
    audio: {type: 'audio'},
    cpu: {type: 'cpu'},
    battery: {type: 'battery'},
    memory: {type: 'memory'},
    weather: {type: 'weather'},
    media: {type: 'media'},
    network: {type: 'network'},
    date: {type: 'date', formatting: 'EEE d MMM t'},
    glazewm: {type: 'glazewm'},
});

render(() => <App/>, document.getElementById('root')!);


function App() {
    const [output, setOutput] = createStore(providers.outputMap);

    function checkWorkspace(workspace: any): boolean {
        return output.glazewm?.focusedWorkspace == workspace;
    }

    providers.onOutput(outputMap => setOutput(outputMap));

    return (
        <div class="app">
            {output.glazewm && (
                <div class="debug fill-flow direction-horizontal relative-x pad-5 spacing-10">

                    {/* LEFT SECTION: flex-fill + anchor-centre-left */}
                    <div class="flex-fill anchor-centre-left">
                        <div class="debug fill-flow spacing-5 group-container">
                            <For each={output.glazewm.currentWorkspaces}>
                                {(workspace) => (
                                    <div
                                        class={`debug anchor-centre workspace-container ${checkWorkspace(workspace) ? 'workspace-active' : ''}`}>
                                        <p>•</p>
                                    </div>
                                )}
                            </For>
                        </div>
                    </div>

                    {/* CENTER SECTION: flex-fill + anchor-centre */}
                    <div class="flex-fill anchor-centre spacing-10">
                        <div class="debug group-container anchor-centre extra-padding">
                            <WeatherIcon status={output.weather.status}/>
                            <p class="pad-5-lr">{getWeatherName(output.weather.status)}</p>
                        </div>
                        <div class="debug group-container anchor-centre extra-padding">
                            <ClockIcon/>
                            <p class="pad-5-lr">{output.date?.formatted}</p>
                        </div>
                    </div>

                    {/* RIGHT SECTION: flex-fill + anchor-centre-right */}
                    <div class="flex-fill anchor-centre-right spacing-10">
                        <div class="debug group-container anchor-centre extra-padding">
                            <VolumeIcon volumePercentage={output.audio.defaultPlaybackDevice.volume}
                                        isMuted={output.audio.defaultPlaybackDevice.isMuted}/>
                            <p class="pad-5-lr">Volume: {output.audio.defaultPlaybackDevice.volume}%</p>
                        </div>
                        <div class="debug group-container anchor-centre extra-padding">
                            <CpuIcon/>
                            <p class="pad-5-lr">CPU: {output.cpu.usage.toFixed()}%</p>
                        </div>
                        <div class="debug group-container anchor-centre extra-padding">
                            <MemoryIcon/>
                            <p class="pad-5-lr">Memory: {output.memory.usage.toFixed()}%</p>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
