import { useState, memo } from "react";

const CharacterSettings = () => {
    const [settings, setSettings] = useState({
        min: -1.0,
        max: 1.0,
        noseW: 0,
        noseH: 0,
        noseL: 0,
        noseB: 0,
        noseTip: 0,
        noseBS: 0,
        browH: 0,
        browW: 0,
        cheekboneH: 0,
        cheekboneW: 0,
        eyes: 0,
        lips: 0,
        jawW: 0,
        jawH: 0,
        chinL: 0,
        chinP: 0,
        chinW: 0,
        chinS: 0,
        neckW: 0
    });

    const setNoseW = (e: any, type: 'W' | 'H' | 'L' | 'B' | 'T' | 'BS') => {
        switch (type) {
            case 'W':
                let data = e.target.value;
                let dataToNumber = Number(data);
                setSettings({ ...settings, noseW: dataToNumber })
                break;

            default: break;
        }
    }

    return (
        <div className="settings">
            <p className='title'>Настройка персонажа</p>

            <div className='char'>
                <label htmlFor="nose">{settings.noseW}</label>
                <input
                    name="nose"
                    className='char_input'
                    step={0.1} min={settings.min} max={settings.max}
                    onChange={(e) => setNoseW(e, 'W')}
                    type="range"
                />
            </div>
        </div>
    )
}

export default memo(CharacterSettings);